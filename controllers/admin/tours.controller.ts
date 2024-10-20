import { Request, Response } from "express";
import categoryModel from "../../models/category.model";
import { tourModel } from "../../models/tour.model";
import slugify  from "slugify";
import { generateTourCode } from "../../helpers/generate.helper";
import { toursCategoryModel } from "../../models/tours-category.model";

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

  if(!req.body["position"]){
     let newPosition  = await tourModel.count({
      where: {
        deleted: false,
        status: "active"
      }
     });
     newPosition += 1;
     req.body["position"] = newPosition;
  }

  req.body["linkImg"] = JSON.stringify(req.body["linkImg"]);

  const slug = slugify(`${req.body["title"]}-${Date.now()}`, {
    lower: true
  });

  //Tao tour va luu vao database
  
  const dataNewTour = {
    title: req.body["title"],
    price: parseInt(req.body["price"]),
    discount: parseInt(req.body["discount"]),
    stock: parseInt(req.body["stock"]),
    position: parseInt(req.body["position"]),
    status: req.body["status"],
    timeStart: req.body["timeStart"],
    images: req.body["linkImg"],
    code: "",
    slug: slug
  }

  console.log(dataNewTour);

  const tour = await tourModel.create(dataNewTour);

  const idNewTour = tour.dataValues.id;
  const code = generateTourCode(idNewTour);

  await tourModel.update({
    code: code
  }, {
    where: {
      id: idNewTour
    }
  });

  //Cap nhat tour moi theo danh muc cha

  const listCategory = req.body["list-id"];

  listCategory.forEach(async item => {
    item = parseInt(item);
    await toursCategoryModel.create({
      tour_id: idNewTour,
      category_id: item
    });
  });

  res.send("ok");
}