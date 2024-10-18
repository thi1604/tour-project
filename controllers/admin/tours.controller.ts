import { Request, Response } from "express";
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
