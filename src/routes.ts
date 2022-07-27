import { Express } from "express"

const routes = (app: Express) => {
  app.get("/", (_, res) => {
    res.send("Server is running!");
  })

  app.get("/test", (_, res) => {
    res.send(process.env.SERVER_PORT);
  })
}

export default routes;