import express from "express";
import * as controller from "../../controllers/client/category.controller";
const route = express.Router();

route.get("", controller.index);

export const routeCategory = route;