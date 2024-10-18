import express from "express";
const route = express.Router();
import * as controller from "../../controllers/admin/dashboard.controller";

route.get("", controller.index);


export const routeDashBoard = route;
