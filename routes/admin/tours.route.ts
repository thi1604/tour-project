import express from "express";
import * as controller from "../../controllers/admin/tours.controller"
const route = express.Router();

route.get("", controller.index);

export const routeTours = route;