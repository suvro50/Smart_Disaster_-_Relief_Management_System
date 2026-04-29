import { Router } from "express";
import {
  allocateResourceToDisaster,
  createResource,
  getResourceAllocationHistory,
  getResourceAnalytics,
  getLowStockResources,
  getResources,
  updateResource
} from "../controllers/resourceController.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

router.get("/", protect, getResources);
router.post("/", protect, allowRoles("super_admin", "relief_manager"), createResource);
router.put("/:id", protect, allowRoles("super_admin", "relief_manager"), updateResource);
router.get("/low-stock", protect, allowRoles("super_admin", "relief_manager"), getLowStockResources);
router.get("/analytics", protect, allowRoles("super_admin", "relief_manager"), getResourceAnalytics);
router.get(
  "/allocations",
  protect,
  allowRoles("super_admin", "relief_manager", "rescue_team"),
  getResourceAllocationHistory
);
router.post(
  "/:id/allocate/:disasterId",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [
    param("id").isInt({ min: 1 }),
    param("disasterId").isInt({ min: 1 }),
    body("quantity_allocated").isInt({ min: 1 })
  ],
  validateRequest,
  allocateResourceToDisaster
);

export default router;
