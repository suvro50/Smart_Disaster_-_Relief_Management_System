"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      full_name: { type: Sequelize.STRING(100), allowNull: false },
      email: { type: Sequelize.STRING(100), allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING(255), allowNull: false },
      role: {
        type: Sequelize.ENUM("super_admin", "relief_manager", "rescue_team", "volunteer", "public"),
        defaultValue: "public"
      },
      phone: { type: Sequelize.STRING(20), allowNull: true },
      location_lat: { type: Sequelize.DECIMAL(10, 8), allowNull: true },
      location_lng: { type: Sequelize.DECIMAL(11, 8), allowNull: true },
      district: { type: Sequelize.STRING(100), allowNull: true },
      profile_image: { type: Sequelize.STRING(255), allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      last_login: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
  }
};
