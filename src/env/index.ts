import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '.\\..\\.env' });

export default {
  SERVER_PORT: process.env.PORT || process.env.SERVER_PORT,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  EXCHANGE_RATE_API: process.env.EXCHANGE_RATE_API,
  EXCHANGE_RATE_API_KEY: process.env.EXCHANGE_RATE_API_KEY,
}