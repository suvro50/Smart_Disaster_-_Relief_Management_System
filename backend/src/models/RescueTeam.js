import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const RescueTeam = sequelize.define(
  "RescueTeam",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    team_name: { type: DataTypes.STRING(100), allowNull: false },
    leader_id: { type: DataTypes.INTEGER, allowNull: true },
    team_type: {
      type: DataTypes.ENUM("search_rescue", "medical", "fire", "logistics", "water_rescue"),
      allowNull: false
    },
    capacity: { type: DataTypes.INTEGER, defaultValue: 10 },
    current_members: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.ENUM("available", "deployed", "standby", "off_duty"), defaultValue: "available" },
    location_lat: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
    location_lng: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
    base_district: { type: DataTypes.STRING(100), allowNull: true },
    contact_number: { type: DataTypes.STRING(20), allowNull: true },
    equipment: { type: DataTypes.TEXT, allowNull: true }
  },
  {
    tableName: "rescue_teams",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  }
);

export default RescueTeam;
