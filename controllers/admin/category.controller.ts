import { Request, Response } from "express";
import categoryModel from "../../models/category.model";


export const index = async (req: Request, res: Response) => {
  const listCategory = await categoryModel.findAll({
    where: {
      deleted: false,
      status: "active"
    },
    raw: true
  });

  res.render("admin/pages/tours-category/index.pug", {
    pageTitle: "Trang danh mục tour",
    listRecord: listCategory
  });
};