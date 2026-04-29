import { Router } from "express";
import { body, param } from "express-validator";
import {
  createAidRequest,
  deleteAidRequest,
  getAidRequests,
  updateAidRequest
} from "../controllers/aidController.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

router.get("/", protect, getAidRequests);

router.post(
  "/",
  [
    body("request_type").isIn(["food", "water", "medicine", "shelter", "rescue", "clothing", "other"]),
    body("urgency").optional().isIn(["low", "medium", "high", "critical"]),
    body("people_count").optional().isInt({ min: 1 }),
    body("location_lat").optional().isFloat(),
    body("location_lng").optional().isFloat()
  ],
  validateRequest,
  createAidRequest
);

router.put(
  "/:id",
  protect,
  allowRoles("super_admin", "relief_manager", "rescue_team"),
  [param("id").isInt({ min: 1 })],
  validateRequest,
  updateAidRequest
);

router.delete(
  "/:id",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [param("id").isInt({ min: 1 })],
  validateRequest,
  deleteAidRequest
);

export default router;
