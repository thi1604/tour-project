import express from "express";

const route = express.Router();

import * as controller from "../../controllers/admin/category.controller";

route.get("", controller.index);

export const routeCategory = route;
