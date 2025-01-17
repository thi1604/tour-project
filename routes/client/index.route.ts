import { routeCart } from "./cart.route";
import { routeCategory } from "./category.route";
import { routeHome } from "./home.route"
import { routeOrder } from "./order.route";
import { routeTours } from "./tours.route";


export const routeClient = (app) => {
  app.use("", routeHome);
  app.use("/tours", routeTours);
  app.use("/categories", routeCategory);
  app.use("/cart", routeCart);
  app.use("/order", routeOrder);
}