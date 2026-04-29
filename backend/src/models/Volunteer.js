import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Volunteer = sequelize.define(
  "Volunteer",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: true },
    skills: { type: DataTypes.TEXT, allowNull: true },
    availability: { type: DataTypes.ENUM("full_time", "part_time", "on_call"), defaultValue: "on_call" },
    is_trained: { type: DataTypes.BOOLEAN, defaultValue: false },
    training_date: { type: DataTypes.DATEONLY, allowNull: true },
    assigned_team_id: { type: DataTypes.INTEGER, allowNull: true },
    status: { type: DataTypes.ENUM("active", "inactive", "deployed"), defaultValue: "active" }
  },
  {
    tableName: "volunteers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false
  }
);

export default Volunteer;
