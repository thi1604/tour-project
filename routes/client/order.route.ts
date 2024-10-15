import express from "express";
import * as controller from "../../controllers/client/order.controller";
const route = express.Router();

route.post("", controller.orderPost);


export const routeOrder = route;