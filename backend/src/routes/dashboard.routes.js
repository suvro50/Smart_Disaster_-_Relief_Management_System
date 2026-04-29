import { Router } from "express";
import { getDashboardLiveFeed, getDashboardStats } from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";

const router = Router();

router.get("/stats", protect, allowRoles("super_admin", "relief_manager"), getDashboardStats);
router.get("/live-feed", protect, allowRoles("super_admin", "relief_manager"), getDashboardLiveFeed);

export default router;
