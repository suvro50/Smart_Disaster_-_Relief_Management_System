"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("disasters", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING(200), allowNull: false },
      type: {
        type: Sequelize.ENUM("flood", "earthquake", "cyclone", "fire", "landslide", "drought", "tsunami", "other"),
        allowNull: false
      },
      severity: { type: Sequelize.ENUM("low", "medium", "high", "critical"), allowNull: false },
      status: { type: Sequelize.ENUM("active", "monitoring", "resolved", "false_alarm"), defaultValue: "active" },
      description: { type: Sequelize.TEXT, allowNull: true },
      location_lat: { type: Sequelize.DECIMAL(10, 8), allowNull: false },
      location_lng: { type: Sequelize.DECIMAL(11, 8), allowNull: false },
      affected_area: { type: Sequelize.STRING(200), allowNull: true },
      district: { type: Sequelize.STRING(100), allowNull: true },
      affected_population: { type: Sequelize.INTEGER, defaultValue: 0 },
      casualties: { type: Sequelize.INTEGER, defaultValue: 0 },
      injuries: { type: Sequelize.INTEGER, defaultValue: 0 },
      reported_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      verified_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      image_url: { type: Sequelize.STRING(255), allowNull: true },
      started_at: { type: Sequelize.DATE, allowNull: true },
      ended_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("disasters");
  }
};
