import { Express } from "express"
import { getUser } from "./controllers/UserController";
import env from './env';

const routes = (app: Express) => {
  app.get("/", async (_, res) => {
    res.send(await getUser());
  })

  app.get("/test", (_, res) => {
    res.send(env.DATABASE_HOST);
  })
}

export default routes;