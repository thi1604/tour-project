import { routeHome } from "./home.route"


export const routeClient = (app) => {
  app.use("", routeHome);
}