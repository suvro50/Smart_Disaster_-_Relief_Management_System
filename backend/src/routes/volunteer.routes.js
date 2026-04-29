import { Router } from "express";
import { param } from "express-validator";
import {
  approveVolunteer,
  assignVolunteerToTeam,
  createVolunteer,
  getVolunteers,
  updateVolunteer
} from "../controllers/volunteerController.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

router.get("/", protect, allowRoles("super_admin", "relief_manager"), getVolunteers);
router.post("/", createVolunteer);
router.put("/:id", protect, allowRoles("super_admin", "relief_manager"), updateVolunteer);
router.put(
  "/:id/approve",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [param("id").isInt({ min: 1 })],
  validateRequest,
  approveVolunteer
);
router.put(
  "/:id/assign-team/:teamId",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [param("id").isInt({ min: 1 }), param("teamId").isInt({ min: 1 })],
  validateRequest,
  assignVolunteerToTeam
);

export default router;
