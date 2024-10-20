import { Request, Response } from "express";
import categoryModel from "../../models/category.model";
import { tourModel } from "../../models/tour.model";


export const index = async (req: Request, res: Response) => {
  const listTours = await tourModel.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true
  });

  listTours.forEach(item => {
    item["images"] = JSON.parse(item["images"])[0];
  });


  res.render("admin/pages/tours/index.pug", {
    pageTitle: "Trang danh sách tours",
    listProducts: listTours
  });

};

export const creat = async (req: Request, res: Response) => {
  const listCategory = await categoryModel.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    attributes: ["id", "title", "slug"]
  });

  res.render("admin/pages/tours/create.pug", {
    pageTitle: "Tạo tour",
    listCategory: listCategory
  });
}

export const creatPost = async(req:Request, res: Response) => {

  console.log(req.body);

  res.send("ok");
}