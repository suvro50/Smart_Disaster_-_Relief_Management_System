import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Report = sequelize.define(
  "Report",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(200), allowNull: false },
    report_type: {
      type: DataTypes.ENUM(
        "incident",
        "damage_assessment",
        "resource_usage",
        "response_summary",
        "monthly"
      ),
      allowNull: false
    },
    disaster_id: { type: DataTypes.INTEGER, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: true },
    file_url: { type: DataTypes.STRING(255), allowNull: true },
    generated_by: { type: DataTypes.INTEGER, allowNull: true }
  },
  {
    tableName: "reports",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  }
);

export default Report;
