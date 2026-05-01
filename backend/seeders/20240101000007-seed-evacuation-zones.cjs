"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("evacuation_zones", [
      {
        zone_name: "Sylhet Central Shelter",
        zone_type: "shelter",
        population_affected: 5000,
        shelter_capacity: 3000,
        boundary_coordinates: [[24.90, 91.86], [24.90, 91.88], [24.88, 91.88], [24.88, 91.86]],
        evacuation_route: "Main Road -> Sylhet Stadium -> Shelter Complex",
        status: "active",
        created_at: now,
      },
      {
        zone_name: "Cox Bazar Danger Zone A",
        zone_type: "danger",
        population_affected: 15000,
        shelter_capacity: 0,
        boundary_coordinates: [[21.45, 92.00], [21.45, 92.03], [21.40, 92.03], [21.40, 92.00]],
        evacuation_route: "Beach Road -> Cox Bazar High School Shelter",
        status: "active",
        created_at: now,
      },
      {
        zone_name: "Sirajganj Safe Zone",
        zone_type: "safe",
        population_affected: 0,
        shelter_capacity: 5000,
        boundary_coordinates: [[24.46, 89.72], [24.46, 89.75], [24.44, 89.75], [24.44, 89.72]],
        evacuation_route: "Embankment Road -> Sirajganj Town Hall",
        status: "active",
        created_at: now,
      },
      {
        zone_name: "Rangamati Warning Zone",
        zone_type: "warning",
        population_affected: 3000,
        shelter_capacity: 1500,
        boundary_coordinates: [[22.67, 92.35], [22.67, 92.38], [22.64, 92.38], [22.64, 92.35]],
        evacuation_route: "Hill Road -> Rangamati Government College",
        status: "active",
        created_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("evacuation_zones", null, {});
  },
};
