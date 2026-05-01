import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    full_name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    role: {
      type: DataTypes.ENUM(
        "super_admin",
        "relief_manager",
        "rescue_team",
        "volunteer",
        "public"
      ),
      defaultValue: "public"
    },
    phone: { type: DataTypes.STRING(20), allowNull: true },
    location_lat: { type: DataTypes.DECIMAL(10, 8), allowNull: true },
    location_lng: { type: DataTypes.DECIMAL(11, 8), allowNull: true },
    district: { type: DataTypes.STRING(100), allowNull: true },
    profile_image: { type: DataTypes.STRING(255), allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
    verification_code: { type: DataTypes.STRING(6), allowNull: true },
    verification_code_expires_at: { type: DataTypes.DATE, allowNull: true },
    last_login: { type: DataTypes.DATE, allowNull: true }
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

export default User;
