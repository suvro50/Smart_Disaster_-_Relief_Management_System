import { Router } from "express";
import {
  createEvacuationZone,
  getEvacuationZones,
  updateEvacuationZone
} from "../controllers/evacuationController.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", protect, getEvacuationZones);
router.post("/", protect, allowRoles("super_admin", "relief_manager"), createEvacuationZone);
router.put("/:id", protect, allowRoles("super_admin", "relief_manager"), updateEvacuationZone);

export default router;
