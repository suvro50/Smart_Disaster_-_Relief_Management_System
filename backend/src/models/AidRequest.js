import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const AidRequest = sequelize.define(
  "AidRequest",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    disaster_id: { type: DataTypes.INTEGER, allowNull: true },
    victim_id: { type: DataTypes.INTEGER, allowNull: true },
    request_type: {
      type: DataTypes.ENUM("food", "water", "medicine", "shelter", "rescue", "clothing", "other"),
      allowNull: false
    },
    urgency: { type: DataTypes.ENUM("low", "medium", "high", "critical"), defaultValue: "medium" },
    status: {
      type: DataTypes.ENUM("pending", "assigned", "in_progress", "completed", "cancelled"),
      defaultValue: "pending"
    },
    description: { type: DataTypes.TEXT, allowNull: true },
    people_count: { type: DataTypes.INTEGER, defaultValue: 1 },
    location_lat: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
    location_lng: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    assigned_team_id: { type: DataTypes.INTEGER, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true }
  },
  {
    tableName: "aid_requests",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

export default AidRequest;
