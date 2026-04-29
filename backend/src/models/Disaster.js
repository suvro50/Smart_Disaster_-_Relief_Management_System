import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Disaster = sequelize.define(
  "Disaster",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    type: {
      type: DataTypes.ENUM(
        "flood",
        "earthquake",
        "cyclone",
        "fire",
        "landslide",
        "drought",
        "tsunami",
        "other"
      ),
      allowNull: false
    },
    severity: { type: DataTypes.ENUM("low", "medium", "high", "critical"), allowNull: false },
    status: {
      type: DataTypes.ENUM("active", "monitoring", "resolved", "false_alarm"),
      defaultValue: "active"
    },
    description: { type: DataTypes.TEXT, allowNull: true },
    location_lat: { type: DataTypes.DECIMAL(10, 8), allowNull: false },
    location_lng: { type: DataTypes.DECIMAL(11, 8), allowNull: false },
    affected_area: { type: DataTypes.STRING(200), allowNull: true },
    district: { type: DataTypes.STRING(100), allowNull: true },
    affected_population: { type: DataTypes.INTEGER, defaultValue: 0 },
    casualties: { type: DataTypes.INTEGER, defaultValue: 0 },
    injuries: { type: DataTypes.INTEGER, defaultValue: 0 },
    reported_by: { type: DataTypes.INTEGER, allowNull: true },
    verified_by: { type: DataTypes.INTEGER, allowNull: true },
    image_url: { type: DataTypes.STRING(255), allowNull: true },
    started_at: { type: DataTypes.DATE, allowNull: true },
    ended_at: { type: DataTypes.DATE, allowNull: true }
  },
  {
    tableName: "disasters",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

export default Disaster;
