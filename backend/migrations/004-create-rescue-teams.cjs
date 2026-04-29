"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rescue_teams", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      team_name: { type: Sequelize.STRING(100), allowNull: false },
      leader_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      team_type: {
        type: Sequelize.ENUM("search_rescue", "medical", "fire", "logistics", "water_rescue"),
        allowNull: false
      },
      capacity: { type: Sequelize.INTEGER, defaultValue: 10 },
      current_members: { type: Sequelize.INTEGER, defaultValue: 0 },
      status: { type: Sequelize.ENUM("available", "deployed", "standby", "off_duty"), defaultValue: "available" },
      location_lat: { type: Sequelize.DECIMAL(10, 8), allowNull: true },
      location_lng: { type: Sequelize.DECIMAL(11, 8), allowNull: true },
      base_district: { type: Sequelize.STRING(100), allowNull: true },
      contact_number: { type: Sequelize.STRING(20), allowNull: true },
      equipment: { type: Sequelize.TEXT, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("rescue_teams");
  }
};
