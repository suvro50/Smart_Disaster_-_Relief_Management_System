import { Alert } from "../models/index.js";
import { emitNewAlert } from "../services/socketService.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const createAlert = async (req, res) => {
  try {
    const payload = { ...req.body, sent_by: req.user?.id ?? null };
    const alert = await Alert.create(payload);
    emitNewAlert(alert);

    return sendSuccess(res, alert, "Alert created successfully.", 201);
  } catch (error) {
    return sendError(res, error.message || "Failed to create alert.");
  }
};

export const getAlerts = async (_req, res) => {
  try {
    const alerts = await Alert.findAll({ order: [["created_at", "DESC"]] });
    return sendSuccess(res, alerts, "Alerts fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch alerts.");
  }
};

export const deactivateAlert = async (req, res) => {
  try {
    const alert = await Alert.findByPk(req.params.id);
    if (!alert) return sendError(res, "Alert not found.", 404);
    await alert.update({ is_active: false });
    return sendSuccess(res, alert, "Alert deactivated successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to deactivate alert.");
  }
};
