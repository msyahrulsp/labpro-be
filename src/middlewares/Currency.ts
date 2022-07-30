import env from '../env';

const axios = require('axios');
const redis = require('redis');
const client = redis.createClient({ url: 'redis://redis:6379' });

export const IDRRate = async (cur: string) => {
  await client.connect();
  // Dark Magic
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
    await client.set(cur, res.data.result);
    result = res.data.result;
  }).catch((err: any) => {
    // console.log(err.message);
  });
  await client.disconnect();
  return result;
}