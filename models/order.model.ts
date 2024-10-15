import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  code: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  note: {
    type: DataTypes.STRING(300)
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  deletedAt: {
    type: DataTypes.DATE
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }}, {
    tableName: "orders",
    timestamps: true
  }
);

export const orderModel = order;