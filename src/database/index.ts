import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/User';
import env from '../env';

const database = new DataSource({
  type: 'mariadb',
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [User],
  synchronize: true,
  logging: false,
});

export default database;