import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const orderItem = sequelize.define("order_item", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  tourId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  discount : {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  timeStart: {
    type: DataTypes.TIME
  }
}, {
  tableName: "order_item",
  timestamps: false // Khong khai bao, mac dinh la true(neu trong database khong co 2 truong creat, updateAt thi se khong duocc them vao db)
});

export const orderItemModel = orderItem;