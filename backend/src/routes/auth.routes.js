import { Router } from "express";
import { body, param } from "express-validator";
import { getUsers, login, me, register, updateUser, verifyEmail } from "../controllers/authController.js";
import { protect } from "../middleware/auth.middleware.js";
import { allowRoles } from "../middleware/role.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

router.post(
  "/register",
  [
    body("full_name").trim().isLength({ min: 2, max: 100 }).withMessage("Full name is required."),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("role")
      .optional()
      .isIn(["super_admin", "relief_manager", "rescue_team", "volunteer", "public"])
      .withMessage("Invalid role.")
  ],
  validateRequest,
  register
);

router.post(
  "/verify-email",
  [
    body("userId").isInt({ min: 1 }).withMessage("User ID is required."),
    body("code").isLength({ min: 6, max: 6 }).withMessage("Verification code must be 6 digits.")
  ],
  validateRequest,
  verifyEmail
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required."),
    body("password").notEmpty().withMessage("Password is required.")
  ],
  validateRequest,
  login
);

router.get("/me", protect, me);

router.get("/users", protect, allowRoles("super_admin", "relief_manager"), getUsers);

router.put(
  "/:id",
  protect,
  allowRoles("super_admin", "relief_manager"),
  [param("id").isInt({ min: 1 })],
  validateRequest,
  updateUser
);

export default router;
