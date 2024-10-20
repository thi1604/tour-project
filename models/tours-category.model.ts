import sequelize from "../config/database";
import { DataTypes } from "sequelize";

const toursCategory = sequelize.define("tour-category",{
  tour_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "tours",
      key: "id"
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "categories",
      key: "id"
    }
  }
}, {
  tableName: "tours_categories",
  timestamps: false
});

export const toursCategoryModel = toursCategory;