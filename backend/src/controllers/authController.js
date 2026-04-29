import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/index.js";
import { sendError, sendSuccess } from "../utils/response.js";

const signToken = (user) => {
  return jwt.sign({ userId: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
};

const sanitizeUser = (user) => {
  const userJson = user.toJSON();
  delete userJson.password_hash;
  return userJson;
};

export const register = async (req, res) => {
  try {
    const { full_name, email, password, role, phone, district } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendError(res, "Email already in use.", 409);
    }

    const password_hash = await bcrypt.hash(password, 12);
    const createdUser = await User.create({
      full_name,
      email,
      password_hash,
      role: role || "public",
      phone: phone || null,
      district: district || null
    });

    const token = signToken(createdUser);
    return sendSuccess(
      res,
      {
        token,
        user: sanitizeUser(createdUser)
      },
      "User registered successfully.",
      201
    );
  } catch (error) {
    return sendError(res, error.message || "Registration failed.");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return sendError(res, "Invalid email or password.", 401);
    }

    const passwordMatched = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatched) {
      return sendError(res, "Invalid email or password.", 401);
    }

    if (!user.is_active) {
      return sendError(res, "Your account is inactive. Contact admin.", 403);
    }

    user.last_login = new Date();
    await user.save();

    const token = signToken(user);
    return sendSuccess(
      res,
      {
        token,
        user: sanitizeUser(user)
      },
      "Login successful."
    );
  } catch (error) {
    return sendError(res, error.message || "Login failed.");
  }
};

export const me = async (req, res) => {
  return sendSuccess(res, { user: req.user }, "Current user fetched successfully.");
};
