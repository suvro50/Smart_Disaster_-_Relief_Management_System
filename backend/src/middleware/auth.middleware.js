import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/index.js";
import { sendError } from "../utils/response.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return sendError(res, "Unauthorized. Missing token.", 401);
    }

    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ["password_hash"] }
    });

    if (!user || !user.is_active) {
      return sendError(res, "Unauthorized. Invalid user.", 401);
    }

    req.user = user;
    return next();
  } catch (error) {
    return sendError(res, "Unauthorized. Invalid or expired token.", 401);
  }
};
