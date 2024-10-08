import express from "express";
import * as controller from "../../controllers/client/tours.controller";
const route = express.Router();

route.get("/", controller.index);
route.get("/detail/:slugTour", controller.index);

export const routeTours = route;