import env from '../env';

const axios = require('axios');
const redis = require('redis');
const client = redis.createClient({
  socket: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
  },
  password: env.REDIS_PASSWORD,
});

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
    result = res.data.result;
    await client.set(cur, result);
  }).catch((err: any) => {
    // console.log(err.message);
  });
  await client.disconnect();
  return result;
}