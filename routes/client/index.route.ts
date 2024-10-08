import { routeCategory } from "./category.route";
import { routeHome } from "./home.route"
import { routeTours } from "./tours.route";


export const routeClient = (app) => {
  app.use("", routeHome);
  app.use("/tours", routeTours);
  app.use("/categories", routeCategory);
}