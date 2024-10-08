import sequelize from "../config/database";
import { DataType, DataTypes } from "sequelize";

const categoryModel =  sequelize.define("categories", {
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
  image: {
    type: DataTypes.STRING(400),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT("long")
  },
  status: {
    type: DataTypes.STRING(50)
  },
  position: {
    type: DataTypes.INTEGER
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Đặt giá trị mặc định là false
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'categories',
  timestamps: true,
});

export default categoryModel;