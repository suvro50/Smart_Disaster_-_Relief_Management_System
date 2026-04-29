import { Router } from "express";
import { body, param, query } from "express-validator";
import {
  createDisaster,
  deleteDisaster,
  predictDisasterRisk,
  getDisasters,
  getDisasterStats,
  updateDisaster
} from "../controllers/disasterController.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

router.get(
  "/",
  [
    query("type")
      .optional()
      .isIn(["flood", "earthquake", "cyclone", "fire", "landslide", "drought", "tsunami", "other"]),
    query("severity").optional().isIn(["low", "medium", "high", "critical"]),
    query("status").optional().isIn(["active", "monitoring", "resolved", "false_alarm"]),
    query("district").optional().isString()
  ],
  validateRequest,
  getDisasters
);

router.post(
  "/risk-score",
  protect,
  allowRoles("super_admin", "relief_manager", "rescue_team"),
  [
    body("type")
      .optional()
      .isIn(["flood", "earthquake", "cyclone", "fire", "landslide", "drought", "tsunami", "other"]),
    body("affected_population").optional().isInt({ min: 0 }),
    body("casualties").optional().isInt({ min: 0 }),
    body("injuries").optional().isInt({ min: 0 }),
    body("weather_risk_score").optional().isFloat({ min: 0, max: 100 })
  ],
  validateRequest,
  predictDisasterRisk
);

router.post(
  "/",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [
    body("title").isLength({ min: 3, max: 200 }),
    body("type").isIn(["flood", "earthquake", "cyclone", "fire", "landslide", "drought", "tsunami", "other"]),
    body("severity").isIn(["low", "medium", "high", "critical"]),
    body("location_lat").isFloat(),
    body("location_lng").isFloat()
  ],
  validateRequest,
  createDisaster
);

router.put(
  "/:id",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [param("id").isInt({ min: 1 })],
  validateRequest,
  updateDisaster
);

router.delete(
  "/:id",
  protect,
  allowRoles("super_admin"),
  [param("id").isInt({ min: 1 })],
  validateRequest,
  deleteDisaster
);

router.get(
  "/:id/stats",
  protect,
  [param("id").isInt({ min: 1 })],
  validateRequest,
  getDisasterStats
);

export default router;
