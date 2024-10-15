import express from "express";
import * as controller from "../../controllers/client/order.controller";
const route = express.Router();

route.post("", controller.orderPost);

route.get("/success/:codeOrder", controller.orderSuccess);


export const routeOrder = route;