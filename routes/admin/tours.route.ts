import express from "express";
import * as controller from "../../controllers/admin/tours.controller"
import multer from "multer";
import { uploadToCloudinary } from "../../middlewares/admin/uploadToCloud.middleware";
const route = express.Router();

const upload = multer();

route.get("", controller.index);
route.get("/create", controller.creat);
route.post(
  "/create", 
  upload.array("images", 6),
  uploadToCloudinary,
  controller.creatPost
);

export const routeTours = route;