import { raw } from "body-parser";
import {Request, Response} from "express";
import categoryModel from "../../models/category.model";

export const index = async(req:Request, res: Response) => {
  const listCategory = await categoryModel.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true
  });

  res.render("client/pages/category/index.pug", {
    pageTitle: "Danh mục tour du lịch",
    categories: listCategory
  });
};