import { sendError } from "../utils/response.js";

export const allowRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, "Unauthorized. User context missing.", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(res, "Forbidden. You do not have permission.", 403);
    }

    return next();
  };
};
