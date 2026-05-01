"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("resources", [
      { name: "Bottled Water (500ml)", category: "water", quantity: 5000, unit: "bottles", location: "Dhaka Central Warehouse", warehouse_name: "Dhaka Central Warehouse", district: "Dhaka", managed_by: 1, last_updated: now },
      { name: "Rice (50kg bags)", category: "food", quantity: 200, unit: "bags", location: "Sylhet Relief Store", warehouse_name: "Sylhet Relief Store", district: "Sylhet", managed_by: 2, last_updated: now },
      { name: "ORS Saline Packets", category: "medicine", quantity: 10000, unit: "packets", location: "Chittagong Medical Depot", warehouse_name: "Chittagong Medical Depot", district: "Chittagong", managed_by: 2, last_updated: now },
      { name: "Tarpaulin Sheets", category: "shelter", quantity: 50, unit: "pieces", location: "Cox Bazar Camp Storage", warehouse_name: "Cox Bazar Camp Storage", district: "Chittagong", managed_by: 2, last_updated: now },
      { name: "Life Jackets", category: "equipment", quantity: 100, unit: "pieces", location: "NDRF Base Sylhet", warehouse_name: "NDRF Base Sylhet", district: "Sylhet", managed_by: 3, last_updated: now },
      { name: "First Aid Kits", category: "medicine", quantity: 200, unit: "kits", location: "Red Crescent Khulna", warehouse_name: "Red Crescent Khulna", district: "Khulna", managed_by: 2, last_updated: now },
      { name: "Blankets", category: "clothing", quantity: 300, unit: "pieces", location: "Rajshahi Relief Store", warehouse_name: "Rajshahi Relief Store", district: "Rajshahi", managed_by: 7, last_updated: now },
      { name: "Rescue Boats", category: "vehicle", quantity: 8, unit: "boats", location: "Sylhet River Station", warehouse_name: "Sylhet River Station", district: "Sylhet", managed_by: 3, last_updated: now },
      { name: "Dry Food Packets", category: "food", quantity: 1500, unit: "packets", location: "Barishal Warehouse", warehouse_name: "Barishal Warehouse", district: "Barishal", managed_by: 7, last_updated: now },
      { name: "Generator Sets", category: "equipment", quantity: 5, unit: "units", location: "Dhaka Central Warehouse", warehouse_name: "Dhaka Central Warehouse", district: "Dhaka", managed_by: 1, last_updated: now },
      { name: "Antibiotics (Amoxicillin)", category: "medicine", quantity: 5000, unit: "tablets", location: "Rangpur Medical Store", warehouse_name: "Rangpur Medical Store", district: "Rangpur", managed_by: 7, last_updated: now },
      { name: "Tents (4-person)", category: "shelter", quantity: 75, unit: "tents", location: "Army Depot Dhaka", warehouse_name: "Army Depot Dhaka", district: "Dhaka", managed_by: 1, last_updated: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("resources", null, {});
  },
};
