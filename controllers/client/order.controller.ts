import { Request, Response } from "express";
import { generateOrderCode } from "../../helpers/generate.helper";
import { orderModel } from "../../models/order.model";

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
    


    res.json({
      code: 200,
      codeOrderId: record.dataValues.code
    });
  }
}