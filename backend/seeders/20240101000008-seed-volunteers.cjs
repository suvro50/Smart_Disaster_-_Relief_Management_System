"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.bulkInsert("volunteers", [
      {
        skills: "first aid, swimming, driving",
        availability: "full_time",
        status: "active",
        user_id: 4,
        is_trained: true,
        training_date: new Date(now - 30 * 86400000),
        created_at: now,
      },
      {
        skills: "nursing, cooking, child care",
        availability: "part_time",
        status: "active",
        user_id: null,
        created_at: now,
      },
      {
        skills: "boat operation, rescue swimming",
        availability: "on_call",
        status: "active",
        user_id: null,
        created_at: now,
      },
      {
        skills: "teaching, food distribution, counseling",
        availability: "on_call",
        status: "inactive",
        user_id: null,
        created_at: now,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("volunteers", null, {});
  },
};
