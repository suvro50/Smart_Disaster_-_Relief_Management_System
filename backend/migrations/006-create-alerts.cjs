"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("alerts", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      disaster_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "disasters", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      title: { type: Sequelize.STRING(200), allowNull: false },
      message: { type: Sequelize.TEXT, allowNull: false },
      alert_type: {
        type: Sequelize.ENUM("warning", "evacuation", "shelter", "all_clear", "update", "critical"),
        allowNull: false
      },
      severity: { type: Sequelize.ENUM("info", "warning", "danger", "critical"), defaultValue: "warning" },
      target_district: { type: Sequelize.STRING(100), allowNull: true },
      is_broadcast: { type: Sequelize.BOOLEAN, defaultValue: false },
      sent_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      sent_via: { type: Sequelize.JSON, allowNull: true },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      expires_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("alerts");
  }
};
