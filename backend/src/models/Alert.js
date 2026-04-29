import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Alert = sequelize.define(
  "Alert",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    disaster_id: { type: DataTypes.INTEGER, allowNull: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    alert_type: {
      type: DataTypes.ENUM("warning", "evacuation", "shelter", "all_clear", "update", "critical"),
      allowNull: false
    },
    severity: { type: DataTypes.ENUM("info", "warning", "danger", "critical"), defaultValue: "warning" },
    target_district: { type: DataTypes.STRING(100), allowNull: true },
    is_broadcast: { type: DataTypes.BOOLEAN, defaultValue: false },
    sent_by: { type: DataTypes.INTEGER, allowNull: true },
    sent_via: { type: DataTypes.JSON, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    expires_at: { type: DataTypes.DATE, allowNull: true }
  },
  {
    tableName: "alerts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  }
);

export default Alert;
