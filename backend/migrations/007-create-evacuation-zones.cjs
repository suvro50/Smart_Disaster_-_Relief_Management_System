"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("evacuation_zones", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      disaster_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "disasters", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      },
      zone_name: { type: Sequelize.STRING(100), allowNull: false },
      zone_type: { type: Sequelize.ENUM("danger", "warning", "safe", "shelter"), allowNull: false },
      boundary_coordinates: { type: Sequelize.JSON, allowNull: false },
      population_affected: { type: Sequelize.INTEGER, defaultValue: 0 },
      shelter_capacity: { type: Sequelize.INTEGER, defaultValue: 0 },
      evacuation_route: { type: Sequelize.TEXT, allowNull: true },
      shelter_location: { type: Sequelize.STRING(200), allowNull: true },
      status: { type: Sequelize.ENUM("active", "inactive"), defaultValue: "active" },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("evacuation_zones");
  }
};
