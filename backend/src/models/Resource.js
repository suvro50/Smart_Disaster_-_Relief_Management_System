import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Resource = sequelize.define(
  "Resource",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    category: {
      type: DataTypes.ENUM("food", "water", "medicine", "shelter", "equipment", "vehicle", "clothing"),
      allowNull: false
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    unit: { type: DataTypes.STRING(50), allowNull: true },
    location: { type: DataTypes.STRING(200), allowNull: true },
    location_lat: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
    location_lng: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
    warehouse_name: { type: DataTypes.STRING(100), allowNull: true },
    district: { type: DataTypes.STRING(100), allowNull: true },
    expiry_date: { type: DataTypes.DATEONLY, allowNull: true },
    minimum_stock: { type: DataTypes.INTEGER, defaultValue: 10 },
    managed_by: { type: DataTypes.INTEGER, allowNull: true },
    last_updated: { type: DataTypes.DATE, allowNull: true }
  },
  {
    tableName: "resources",
    timestamps: false,
    hooks: {
      beforeUpdate: (resource) => {
        resource.last_updated = new Date();
      },
      beforeCreate: (resource) => {
        if (!resource.last_updated) {
          resource.last_updated = new Date();
        }
      }
    }
  }
);

export default Resource;
