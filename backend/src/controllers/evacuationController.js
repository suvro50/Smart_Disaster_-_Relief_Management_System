import { EvacuationZone } from "../models/index.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const getEvacuationZones = async (_req, res) => {
  try {
    const zones = await EvacuationZone.findAll({ order: [["created_at", "DESC"]] });
    return sendSuccess(res, zones, "Evacuation zones fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch evacuation zones.");
  }
};

export const createEvacuationZone = async (req, res) => {
  try {
    const zone = await EvacuationZone.create(req.body);
    return sendSuccess(res, zone, "Evacuation zone created successfully.", 201);
  } catch (error) {
    return sendError(res, error.message || "Failed to create evacuation zone.");
  }
};

export const updateEvacuationZone = async (req, res) => {
  try {
    const zone = await EvacuationZone.findByPk(req.params.id);
    if (!zone) return sendError(res, "Evacuation zone not found.", 404);
    await zone.update(req.body);
    return sendSuccess(res, zone, "Evacuation zone updated successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to update evacuation zone.");
  }
};
