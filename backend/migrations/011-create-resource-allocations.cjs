"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("resource_allocations", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      resource_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "resources", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      disaster_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "disasters", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      quantity_allocated: { type: Sequelize.INTEGER, allowNull: false },
      allocated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      notes: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("resource_allocations");
  }
};
