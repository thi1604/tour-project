import {Request, Response} from "express";
import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";
import { tourModel } from "../../models/tour.model";

export const index = async(req:Request, res: Response) => {
  
  const slug = req.params.slugTour;
  
  const listTours = await sequelize.query(`
    SELECT tours.*, ROUND(price * (1 - discount/100)) AS price_special
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = '${slug}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active'; 
    `, {
      type: QueryTypes.SELECT
    }
  );

  for(const item of listTours){
    if(item["images"]){
      const listImage = JSON.parse(item["images"]);
      if(listImage.length > 0){
        item["image"] = listImage[0];
      }
    }
    item["price_special"] = parseInt(item["price_special"]);
  }

  // console.log(listTours);

  res.render("client/pages/tour/index.pug", {
    pageTitle: `Danh sách tours theo danh mục`,
    tours: listTours
  });
  // res.send("ok");
};


export const detail = async(req:Request, res: Response) => {
  const slugItem = req.params.slugItem;
  const thisTour = await tourModel.findOne({
    where: {
      slug: slugItem,
      deleted: false,
      status: "active"
    },
    raw: true
  });
  // console.log(thisTour);
  if(thisTour["images"]){
    thisTour["images"] = JSON.parse(thisTour["images"]);
  }

  // console.log(thisTour["images"]);

  // res.send("ok");
  
  res.render("client/pages/tour/detail.pug", {
    pageTitle: "Chi tiết tour",
    itemTour: thisTour
  });
}