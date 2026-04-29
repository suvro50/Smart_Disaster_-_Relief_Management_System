"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("volunteers", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      skills: { type: Sequelize.TEXT, allowNull: true },
      availability: { type: Sequelize.ENUM("full_time", "part_time", "on_call"), defaultValue: "on_call" },
      is_trained: { type: Sequelize.BOOLEAN, defaultValue: false },
      training_date: { type: Sequelize.DATEONLY, allowNull: true },
      assigned_team_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "rescue_teams", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      status: { type: Sequelize.ENUM("active", "inactive", "deployed"), defaultValue: "active" },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("volunteers");
  }
};
