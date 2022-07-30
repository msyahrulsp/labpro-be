import express from 'express';

import { database } from './database';
import routes from './routes';
import env from './env';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
})

routes(app);

app.listen(env.SERVER_PORT, () => {
  database.initialize().then(() => {
    console.log("Connected to database");
  });
  console.log(`Server started on port ${env.SERVER_PORT}!\nLast Update on: ` + new Date());
})