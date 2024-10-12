import { Request, Response } from "express"
import { tourModel } from "../../models/tour.model";

export const index = async (req: Request, res: Response) => {
  res.render("client/pages/cart/index.pug", {
    pageTitle: "Trang giỏ hàng"
  });
}


export const listCartJson = async (req: Request, res: Response) => {
  // console.log(req.body);
  if(req.body){
    let dataListTour = req.body;
    for (const item of dataListTour) {
      const record = await tourModel.findOne({
        where: {
          id: item.tourId,
          deleted: false,
          status: "active"
        },
        raw: true
      });
      // console.log(record);
      record["priceSpecial"] = (1 - record["discount"]/100) * record["price"];
      item["total"] = record["priceSpecial"] * item["quantity"];
      const listImg = JSON.parse(record["images"]);
      item["image"] = listImg[0];
      item["price"] = record["price"];
      item["title"] = record["title"];
      item["slug"] = record["slug"];
    } 
    // console.log(dataListTour);
    res.json({
      code: 200,
      listTours: dataListTour
    });
  }
  else{
    res.json({
      code: 400
    })
  }
  
}
