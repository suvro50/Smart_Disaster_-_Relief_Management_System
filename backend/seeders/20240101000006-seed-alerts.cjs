"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("alerts", [
      {
        title: "Flash Flood Warning - Sylhet",
        message: "Heavy rainfall expected in next 48 hours. River levels rising rapidly. Evacuate low-lying areas immediately.",
        severity: "critical",
        alert_type: "warning",
        target_district: "Sylhet",
        is_active: true,
        sent_by: 1,
        expires_at: new Date(now.getTime() + 48 * 3600000),
        created_at: new Date(now - 2 * 86400000),
      },
      {
        title: "Cyclone Alert - Coastal Areas",
        message: "Cyclone Remal approaching. Wind speeds 100+ km/h. Coastal districts advised to move to shelters.",
        severity: "critical",
        alert_type: "evacuation",
        target_district: "Chittagong",
        is_active: true,
        sent_by: 1,
        expires_at: new Date(now.getTime() + 24 * 3600000),
        created_at: new Date(now - 86400000),
      },
      {
        title: "Landslide Risk - Hill Districts",
        message: "Soil saturation at critical levels. Landslide risk high in Rangamati, Bandarban, Khagrachhari.",
        severity: "danger",
        alert_type: "warning",
        target_district: "Chittagong",
        is_active: true,
        sent_by: 2,
        expires_at: new Date(now.getTime() + 72 * 3600000),
        created_at: now,
      },
      {
        title: "Water Contamination - Sirajganj",
        message: "Flood water contaminated. Boil water before drinking. Distribution of water purification tablets ongoing.",
        severity: "warning",
        alert_type: "update",
        target_district: "Rajshahi",
        is_active: true,
        sent_by: 7,
        expires_at: new Date(now.getTime() + 96 * 3600000),
        created_at: new Date(now - 3 * 86400000),
      },
      {
        title: "Drought Advisory - Northern Region",
        message: "Extended dry period expected. Conserve water. Irrigation priority for staple crops.",
        severity: "info",
        alert_type: "update",
        target_district: "Rajshahi",
        is_active: true,
        sent_by: 7,
        expires_at: new Date(now.getTime() + 168 * 3600000),
        created_at: new Date(now - 7 * 86400000),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("alerts", null, {});
  },
};
