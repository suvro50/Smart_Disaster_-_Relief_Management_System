import { Router } from "express";
import { param } from "express-validator";
import {
  assignRescueTeamToDisaster,
  createRescueTeam,
  getMyMissions,
  getRescueTeamById,
  getRescueTeamMissionHistory,
  getRescueTeams,
  updateRescueTeam
} from "../controllers/rescueController.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

router.get("/", protect, getRescueTeams);
router.get("/my-missions", protect, allowRoles("rescue_team"), getMyMissions);
router.get("/:id", protect, [param("id").isInt({ min: 1 })], validateRequest, getRescueTeamById);
router.post("/", protect, allowRoles("super_admin", "relief_manager"), createRescueTeam);
router.put("/:id", protect, allowRoles("super_admin", "relief_manager"), updateRescueTeam);
router.post(
  "/:id/assign/:disasterId",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [param("id").isInt({ min: 1 }), param("disasterId").isInt({ min: 1 })],
  validateRequest,
  assignRescueTeamToDisaster
);
router.get(
  "/:id/missions",
  protect,
  [param("id").isInt({ min: 1 })],
  validateRequest,
  getRescueTeamMissionHistory
);

export default router;
