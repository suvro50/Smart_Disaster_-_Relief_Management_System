"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("rescue_teams", [
      {
        team_name: "Fire Brigade Dhaka",
        team_type: "fire",
        status: "available",
        location_lat: 23.8103,
        location_lng: 90.4125,
        base_district: "Dhaka",
        contact_number: "+8801700111111",
        capacity: 20,
        leader_id: 3,
        created_at: now,
      },
      {
        team_name: "NDRF Alpha Team",
        team_type: "search_rescue",
        status: "deployed",
        location_lat: 24.8949,
        location_lng: 91.8687,
        base_district: "Sylhet",
        contact_number: "+8801700222222",
        capacity: 30,
        leader_id: 6,
        created_at: now,
      },
      {
        team_name: "Coastal Guard Unit 3",
        team_type: "water_rescue",
        status: "deployed",
        location_lat: 21.4272,
        location_lng: 92.0058,
        base_district: "Chittagong",
        contact_number: "+8801700333333",
        capacity: 25,
        leader_id: null,
        created_at: now,
      },
      {
        team_name: "Red Crescent Medical Team",
        team_type: "medical",
        status: "available",
        location_lat: 22.8456,
        location_lng: 89.5403,
        base_district: "Khulna",
        contact_number: "+8801700444444",
        capacity: 15,
        leader_id: null,
        created_at: now,
      },
      {
        team_name: "Army Engineering Corps",
        team_type: "logistics",
        status: "available",
        location_lat: 23.7271,
        location_lng: 90.4086,
        base_district: "Dhaka",
        contact_number: "+8801700555555",
        capacity: 40,
        leader_id: null,
        created_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("rescue_teams", null, {});
  },
};
