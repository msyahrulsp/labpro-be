import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { VerifikasiAkun } from '../models/VerifikasiAkun';
import { History } from '../models/History';
import env from '../env';

export const database = new DataSource({
  type: 'mariadb',
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [User, VerifikasiAkun, History],
  migrations: [],
  subscribers: [],
  synchronize: false,
  logging: false,
});