import prefixAdmin from "../../config/system"
import { routeDashBoard } from "./dashboard.route";


export const routeAdmin = (app) => {
  const prefix = prefixAdmin;
  app.use(`/${prefix}/dashboard`, routeDashBoard);
}