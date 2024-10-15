import { Request, Response } from "express";
import { generateOrderCode } from "../../helpers/generate.helper";
import { orderItemModel } from "../../models/order-item.model";
import { orderModel } from "../../models/order.model";
import { tourModel } from "../../models/tour.model";

export const orderPost = async (req: Request, res: Response) => {
  
  // console.log(req.body);

  const {fullName, phone, email} = req.body["infor"];
  const listTourInCart = req.body["cart"];

  if(fullName == "" || phone == "" || email == "" || listTourInCart.length < 1){
    res.json({
      code: 400
    })
  }
  else{
    // Update order table
    const dataOrder = {
      fullName: fullName,
      phone: phone,
      email: email,
      note: req.body.note,
      status: "initial",
      code: ""
    }
    const record = await orderModel.create(dataOrder);
    // updated code in record
    await orderModel.update({
      code : generateOrderCode(record.dataValues.id)
    }, {
      where: {
        id: record.dataValues.id
      }
    })
    // Update order-item table
    for (const item of listTourInCart) {
      try {
        const tour = await tourModel.findOne({
          where: {
            id: item["tourId"]
          }
        });
        if(tour){
          const dataOrderItem = {
            tourId: tour["id"],
            orderId: record["id"],
            quantity: item["quantity"],
            price: tour["price"],
            discount: tour["discount"],
            timeStart: tour["timeStart"]
          }
          console.log(dataOrderItem);
          try {
            await orderItemModel.create(dataOrderItem);
            
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        continue;
      }
    }
    res.json({
      code: 200,
      codeOrderId: record.dataValues.code
    });
  }
}