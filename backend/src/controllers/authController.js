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
  delete userJson.verification_code;
  return userJson;
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const register = async (req, res) => {
  try {
    const { full_name, email, password, role, phone, district } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendError(res, "An account with this email already exists. Please use a different email or login.", 409);
    }

    const verificationCode = generateVerificationCode();
    const password_hash = await bcrypt.hash(password, 12);
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    const createdUser = await User.create({
      full_name,
      email,
      password_hash,
      role: role || "public",
      phone: phone || null,
      district: district || null,
      verification_code: verificationCode,
      verification_code_expires_at: expiresAt,
      is_verified: false
    });

    console.log(`\n📧 VERIFICATION CODE for ${email}: ${verificationCode}\n`);

    return sendSuccess(
      res,
      {
        userId: createdUser.id,
        message: "Verification code sent to your email. Check console for demo code.",
        verificationRequired: true
      },
      "Registration successful. Please verify your email.",
      201
    );
  } catch (error) {
    return sendError(res, error.message || "Registration failed.");
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userId, code } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return sendError(res, "User not found.", 404);
    }

    if (user.is_verified) {
      return sendError(res, "Email already verified.", 400);
    }

    if (user.verification_code !== code) {
      return sendError(res, "Invalid verification code.", 400);
    }

    if (new Date() > new Date(user.verification_code_expires_at)) {
      return sendError(res, "Verification code expired. Please register again.", 400);
    }

    user.is_verified = true;
    user.verification_code = null;
    user.verification_code_expires_at = null;
    await user.save();

    const token = signToken(user);
    return sendSuccess(
      res,
      {
        token,
        user: sanitizeUser(user)
      },
      "Email verified successfully. You are now logged in."
    );
  } catch (error) {
    return sendError(res, error.message || "Verification failed.");
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

    if (!user.is_verified) {
      return sendError(res, "Please verify your email first.", 403);
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
  return sendSuccess(res, req.user, "Current user fetched successfully.");
};

export const getUsers = async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password_hash"] },
      order: [["created_at", "DESC"]]
    });
    return sendSuccess(res, users, "Users fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch users.");
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return sendError(res, "User not found.", 404);

    const allowedFields = ["full_name", "email", "role", "phone", "district", "is_active"];
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    }

    if (req.body.password) {
      updates.password_hash = await bcrypt.hash(req.body.password, 12);
    }

    await user.update(updates);
    return sendSuccess(res, sanitizeUser(user), "User updated successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to update user.");
  }
};
