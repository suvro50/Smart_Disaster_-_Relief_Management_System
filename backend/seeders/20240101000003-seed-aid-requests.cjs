"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("aid_requests", [
      {
        request_type: "food",
        urgency: "critical",
        description: "Stranded families in flooded village need emergency food supplies. 3 days without food.",
        people_count: 250,
        location_lat: 24.8949,
        location_lng: 91.8687,
        address: "Village Charikata, South Surma, Sylhet",
        status: "assigned",
        disaster_id: 1,
        victim_id: 5,
        assigned_team_id: 1,
        created_at: new Date(now - 2 * 86400000),
        updated_at: now,
      },
      {
        request_type: "shelter",
        urgency: "high",
        description: "Homes destroyed by cyclone. Families need temporary shelter. Children and elderly among displaced.",
        people_count: 500,
        location_lat: 21.4272,
        location_lng: 92.0058,
        address: "Cox Bazar Rohingya Camp 8W",
        status: "pending",
        disaster_id: 2,
        victim_id: 5,
        assigned_team_id: null,
        created_at: new Date(now - 86400000),
        updated_at: now,
      },
      {
        request_type: "rescue",
        urgency: "critical",
        description: "People trapped in landslide debris. Urgent rescue needed. Access road blocked.",
        people_count: 30,
        location_lat: 22.6568,
        location_lng: 92.3597,
        address: "Barkal Upazila, Rangamati",
        status: "in_progress",
        disaster_id: 3,
        victim_id: 3,
        assigned_team_id: 2,
        created_at: now,
        updated_at: now,
      },
      {
        request_type: "water",
        urgency: "high",
        description: "Clean drinking water shortage in drought-affected area. Tube wells dried up.",
        people_count: 1000,
        location_lat: 24.5966,
        location_lng: 88.3583,
        address: "Gomastapur, Chapainawabganj",
        status: "pending",
        disaster_id: 6,
        victim_id: 4,
        assigned_team_id: null,
        created_at: new Date(now - 5 * 86400000),
        updated_at: now,
      },
      {
        request_type: "medicine",
        urgency: "medium",
        description: "Waterborne diseases spreading in flood shelters. Need ORS, antibiotics, and first aid kits.",
        people_count: 150,
        location_lat: 24.4536,
        location_lng: 89.7227,
        address: "Belkuchi Shelter Camp, Sirajganj",
        status: "assigned",
        disaster_id: 4,
        victim_id: 5,
        assigned_team_id: 1,
        created_at: new Date(now - 4 * 86400000),
        updated_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("aid_requests", null, {});
  },
};
