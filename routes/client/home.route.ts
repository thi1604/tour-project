import express from "express";
import * as controller from "../../controllers/client/home.controller";
const route = express.Router();

route.get("/", controller.index);

export const routeHome = route;