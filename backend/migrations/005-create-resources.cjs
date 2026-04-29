"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("resources", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(100), allowNull: false },
      category: {
        type: Sequelize.ENUM("food", "water", "medicine", "shelter", "equipment", "vehicle", "clothing"),
        allowNull: false
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      unit: { type: Sequelize.STRING(50), allowNull: true },
      location: { type: Sequelize.STRING(200), allowNull: true },
      location_lat: { type: Sequelize.DECIMAL(10, 8), allowNull: true },
      location_lng: { type: Sequelize.DECIMAL(11, 8), allowNull: true },
      warehouse_name: { type: Sequelize.STRING(100), allowNull: true },
      district: { type: Sequelize.STRING(100), allowNull: true },
      expiry_date: { type: Sequelize.DATEONLY, allowNull: true },
      minimum_stock: { type: Sequelize.INTEGER, defaultValue: 10 },
      managed_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      last_updated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("resources");
  }
};
