import prefixAdmin from "../../config/system"
import { routeCategory } from "./category.route";
import { routeDashBoard } from "./dashboard.route";
import { routeTours } from "./tours.route";


export const routeAdmin = (app) => {
  const prefix = prefixAdmin;
  app.use(`/${prefix}/dashboard`, routeDashBoard);
  app.use(`/${prefix}/tours-category`, routeCategory);
  app.use(`/${prefix}/tours`, routeTours);
}