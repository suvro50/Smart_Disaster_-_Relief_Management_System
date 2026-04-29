import { sendError } from "../utils/response.js";

export const notFoundHandler = (req, res) => {
  return sendError(res, `Route not found: ${req.originalUrl}`, 404);
};

export const errorHandler = (error, _req, res, _next) => {
  console.error("Unhandled error:", error);
  return sendError(res, error.message || "Internal server error", error.statusCode || 500);
};
