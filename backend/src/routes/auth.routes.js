import { Router } from "express";
import { body } from "express-validator";
import { login, me, register } from "../controllers/authController.js";
import { protect } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";

const router = Router();

router.post(
  "/register",
  [
    body("full_name").trim().isLength({ min: 2, max: 100 }).withMessage("Full name is required."),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
    body("role")
      .optional()
      .isIn(["super_admin", "relief_manager", "rescue_team", "volunteer", "public"])
      .withMessage("Invalid role.")
  ],
  validateRequest,
  register
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

export default router;
