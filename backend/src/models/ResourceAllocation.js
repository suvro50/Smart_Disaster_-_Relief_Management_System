import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ResourceAllocation = sequelize.define(
  "ResourceAllocation",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    resource_id: { type: DataTypes.INTEGER, allowNull: false },
    disaster_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity_allocated: { type: DataTypes.INTEGER, allowNull: false },
    allocated_by: { type: DataTypes.INTEGER, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true }
  },
  {
    tableName: "resource_allocations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  }
);

export default ResourceAllocation;
