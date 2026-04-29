import { Op } from "sequelize";
import { Disaster } from "../models/index.js";
import { calculateDisasterRiskScore } from "../services/aiPredictService.js";
import { emitDisasterUpdated, emitNewDisaster } from "../services/socketService.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const getDisasters = async (req, res) => {
  try {
    const { type, severity, status, district } = req.query;
    const where = {};
    if (type) where.type = type;
    if (severity) where.severity = severity;
    if (status) where.status = status;
    if (district) where.district = { [Op.like]: `%${district}%` };

    const disasters = await Disaster.findAll({
      where,
      order: [["created_at", "DESC"]]
    });
    return sendSuccess(res, disasters, "Disasters fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch disasters.");
  }
};

export const createDisaster = async (req, res) => {
  try {
    const payload = { ...req.body, reported_by: req.user?.id || null };
    const riskAssessment = calculateDisasterRiskScore(payload);
    if (!payload.severity) {
      payload.severity = riskAssessment.severity;
    }
    const disaster = await Disaster.create(payload);
    emitNewDisaster(disaster);
    return sendSuccess(res, { disaster, riskAssessment }, "Disaster created successfully.", 201);
  } catch (error) {
    return sendError(res, error.message || "Failed to create disaster.");
  }
};

export const updateDisaster = async (req, res) => {
  try {
    const disaster = await Disaster.findByPk(req.params.id);
    if (!disaster) return sendError(res, "Disaster not found.", 404);

    await disaster.update(req.body);
    const riskAssessment = calculateDisasterRiskScore(disaster.toJSON());
    emitDisasterUpdated(disaster);
    return sendSuccess(res, { disaster, riskAssessment }, "Disaster updated successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to update disaster.");
  }
};

export const deleteDisaster = async (req, res) => {
  try {
    const disaster = await Disaster.findByPk(req.params.id);
    if (!disaster) return sendError(res, "Disaster not found.", 404);
    await disaster.destroy();
    return sendSuccess(res, null, "Disaster deleted successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to delete disaster.");
  }
};

export const getDisasterStats = async (req, res) => {
  try {
    const disaster = await Disaster.findByPk(req.params.id);
    if (!disaster) return sendError(res, "Disaster not found.", 404);

    const all = await Disaster.findAll({ attributes: ["severity", "status"] });
    const summary = {
      totalDisasters: all.length,
      activeDisasters: all.filter((d) => d.status === "active").length,
      resolvedDisasters: all.filter((d) => d.status === "resolved").length,
      criticalDisasters: all.filter((d) => d.severity === "critical").length
    };

    return sendSuccess(
      res,
      {
        disaster,
        summary
      },
      "Disaster stats fetched successfully."
    );
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch disaster stats.");
  }
};

export const predictDisasterRisk = async (req, res) => {
  try {
    const riskAssessment = calculateDisasterRiskScore(req.body);
    return sendSuccess(res, riskAssessment, "Risk score predicted successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to predict risk score.");
  }
};
