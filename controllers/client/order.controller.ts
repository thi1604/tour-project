import { Request, Response } from "express";
import { generateOrderCode } from "../../helpers/generate.helper";
import { sendEmail } from "../../helpers/sendEmail.helper";
import { orderItemModel } from "../../models/order-item.model";
import { orderModel } from "../../models/order.model";
import { tourModel } from "../../models/tour.model";

export const orderPost = async (req: Request, res: Response) => {
  
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
    const code = generateOrderCode(record.dataValues.id);
    await orderModel.update({
      code : code
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
          // console.log(dataOrderItem);
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
      codeOrderId: code
    });
  }
}

export const orderSuccess = async (req: Request, res: Response) => {
  const code = req.params.codeOrder;
  const order = await orderModel.findOne({
    where: {
      code: code
    },
    attributes: ["id", "email", "code", "fullName"],
    raw: true
  });

  const listTourInOrder = await orderItemModel.findAll({
    where: {
      orderId: order["id"]
    },
    raw: true 
  });
  let totalPrice = 0;
  for (const item of listTourInOrder) {
    const record = await tourModel.findOne({
      where: {
        id: item["tourId"],
        deleted: false,
        status: "active"
      },
      attributes: ["images", "title"],
      raw: true
    });
    item["priceSpecial"] = (1 - item["discount"]/100) * item["price"];
    item["total"] = item["priceSpecial"] * item["quantity"];
    totalPrice += item["total"];
    const listImg = JSON.parse(record["images"]);
    item["image"] = listImg[0];
    item["title"] = record["title"]
  } 

  const dataOrder = {
    inforUser: order,
    listTour: listTourInOrder,
    totalPrice: totalPrice
  }

  // console.log(dataOrder);
  sendEmail(order["email"], `Thông báo xác nhận đơn hàng #${order["id"]}`, `<b>Cám ơn bạn đã đặt tour của chúng tôi!</b><br>
  Xin chào ${order["fullName"]}!, Chúng tôi đã nhận được đơn đặt tour của bạn và đã sẵn sàng sắp xếp thời gian. Chúng tôi sẽ thông báo tới bạn thời gian sớm nhất.
  <br>Chúc một ngày tốt lành! ^^ 
  `);

  res.render("client/pages/order/success.pug", {
    pageTitle: "Trang thông tin đơn hàng",
    dataOrder: dataOrder
  });
}