import env from '../env';

const redis = require('redis');
export const client = redis.createClient({
  url: env.REDIS_URL || '',
  socket: {
    host: env.REDIS_HOST || 'localhost',
    port: env.REDIS_PORT || 6379,
  },
  password: env.REDIS_PASSWORD || '',
});