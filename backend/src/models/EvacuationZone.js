import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const EvacuationZone = sequelize.define(
  "EvacuationZone",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    disaster_id: { type: DataTypes.INTEGER, allowNull: true },
    zone_name: { type: DataTypes.STRING(100), allowNull: false },
    zone_type: { type: DataTypes.ENUM("danger", "warning", "safe", "shelter"), allowNull: false },
    boundary_coordinates: { type: DataTypes.JSON, allowNull: false },
    population_affected: { type: DataTypes.INTEGER, defaultValue: 0 },
    shelter_capacity: { type: DataTypes.INTEGER, defaultValue: 0 },
    evacuation_route: { type: DataTypes.TEXT, allowNull: true },
    shelter_location: { type: DataTypes.STRING(200), allowNull: true },
    status: { type: DataTypes.ENUM("active", "inactive"), defaultValue: "active" }
  },
  {
    tableName: "evacuation_zones",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  }
);

export default EvacuationZone;
