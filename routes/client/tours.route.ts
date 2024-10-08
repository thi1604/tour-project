import express from "express";
import * as controller from "../../controllers/client/tours.controller";
const route = express.Router();

route.get("/", controller.index);
route.get("/:slugTour", controller.index);
route.get("/detail/:slugItem", controller.detail);

export const routeTours = route;