import { Router } from "express";
import { body, param, query } from "express-validator";
import {
  createMonthlySummaryReport,
  createReport,
  exportReport,
  getReports
} from "../controllers/reportController.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

router.get("/", protect, allowRoles("super_admin", "relief_manager"), getReports);
router.post(
  "/",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [body("title").isLength({ min: 3 }), body("report_type").isString()],
  validateRequest,
  createReport
);
router.get(
  "/:id/export",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [param("id").isInt({ min: 1 }), query("format").optional().isIn(["pdf", "csv"])],
  validateRequest,
  exportReport
);
router.post(
  "/monthly-summary",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [body("month").optional().matches(/^\d{4}-\d{2}$/)],
  validateRequest,
  createMonthlySummaryReport
);

export default router;
