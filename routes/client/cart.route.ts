import express from 'express';
import * as controller from "../../controllers/client/cart.controller";
const route = express.Router();


route.get("", controller.index);


route.post("/listTourJson", controller.listCartJson);

export const routeCart = route; 