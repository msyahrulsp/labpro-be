import express from 'express';

import { database } from './database';
import routes from './routes';
import env from './env';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(env.SERVER_PORT, () => {
  database.initialize().then(() => {
    console.log("Connected to database");
  });
  console.log(`Server started on port ${env.SERVER_PORT}!\nLast Update on: ` + new Date());
})