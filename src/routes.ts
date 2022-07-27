import { Express } from "express"
import env from './env';

const routes = (app: Express) => {
  app.get("/", (_, res) => {
    res.send("Server is running!");
  })

  app.get("/test", (_, res) => {
    res.send(env.DATABASE_HOST);
  })
}

export default routes;