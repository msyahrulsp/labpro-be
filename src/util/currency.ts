import env from '../env';
import { client } from '../services/redis';

const axios = require('axios');

export const IDRRate = async (cur: string) => {
  await client.connect();
  let result = null;

  await client.get(cur).then((res: any) => {
    result = res;
  }).catch((err: any) => {
    // console.log(err.message);
  })
  if (result !== null) {
    await client.disconnect();
    return result;
  }

  await axios.get(
    `${env.EXCHANGE_RATE_API}`, {
      params: {
        apikey: env.EXCHANGE_RATE_API_KEY,
        from: cur,
        to: 'IDR',
        amount: 1,
      }}
  ).then(async (res: any) => {
    result = res.data.result;
    await client.set(cur, result);
  }).catch((err: any) => {
    // console.log(err.message);
  });
  await client.disconnect();
  return result;
}