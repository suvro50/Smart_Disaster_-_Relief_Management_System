"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("aid_requests", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      disaster_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "disasters", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      victim_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      request_type: {
        type: Sequelize.ENUM("food", "water", "medicine", "shelter", "rescue", "clothing", "other"),
        allowNull: false
      },
      urgency: { type: Sequelize.ENUM("low", "medium", "high", "critical"), defaultValue: "medium" },
      status: {
        type: Sequelize.ENUM("pending", "assigned", "in_progress", "completed", "cancelled"),
        defaultValue: "pending"
      },
      description: { type: Sequelize.TEXT, allowNull: true },
      people_count: { type: Sequelize.INTEGER, defaultValue: 1 },
      location_lat: { type: Sequelize.DECIMAL(10, 8), allowNull: true },
      location_lng: { type: Sequelize.DECIMAL(11, 8), allowNull: true },
      address: { type: Sequelize.TEXT, allowNull: true },
      assigned_team_id: { type: Sequelize.INTEGER, allowNull: true },
      notes: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("aid_requests");
  }
};
