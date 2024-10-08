import express from "express";
import * as controller from "../../controllers/client/tours.controller";
const route = express.Router();

route.get("/", controller.index);

export const routeTours = route;