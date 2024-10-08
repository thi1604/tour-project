import sequelize from "../config/database";

import { DataTypes } from "sequelize";

const tour = sequelize.define("tours", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }, 
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  code: {
    type: DataTypes.STRING(20)
  },
  images: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  price: {
    type: DataTypes.NUMBER
  },
  discount: {
    type: DataTypes.NUMBER
  },
  information: {
    type: DataTypes.STRING(300)
  },
  schedule: {
    type: DataTypes.STRING(300)
  },
  timeStart: {
    type: DataTypes.TIME
  },
  stock: {
    type: DataTypes.NUMBER
  },
  status: {
    type: DataTypes.STRING(10),
    defaultValue: "active"
  },
  position: {
    type: DataTypes.NUMBER
  },
  slug: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deletedAt: {
    type: DataTypes.DATE
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: "tours",
  timestamps: true
});

export const tourModel = tour;