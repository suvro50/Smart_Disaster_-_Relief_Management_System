import { Router } from "express";
import { param } from "express-validator";
import { createAlert, deactivateAlert, getAlerts } from "../controllers/alertController.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

router.post("/", protect, allowRoles("super_admin", "relief_manager"), createAlert);
router.get("/", protect, getAlerts);
router.put(
  "/:id/deactivate",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [param("id").isInt({ min: 1 })],
  validateRequest,
  deactivateAlert
);

export default router;
