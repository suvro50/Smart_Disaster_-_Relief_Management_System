"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reports", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING(200), allowNull: false },
      report_type: {
        type: Sequelize.ENUM("incident", "damage_assessment", "resource_usage", "response_summary", "monthly"),
        allowNull: false
      },
      disaster_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "disasters", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      content: { type: Sequelize.TEXT, allowNull: true },
      file_url: { type: Sequelize.STRING(255), allowNull: true },
      generated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("reports");
  }
};
