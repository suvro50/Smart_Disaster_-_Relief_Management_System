import { AidRequest } from "../models/index.js";
import { emitAidRequestUpdate } from "../services/socketService.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const getAidRequests = async (req, res) => {
  try {
    if (req.params.id) {
      const aidRequest = await AidRequest.findByPk(req.params.id);
      if (!aidRequest) return sendError(res, "Aid request not found.", 404);
      return sendSuccess(res, aidRequest, "Aid request fetched successfully.");
    }
    const aidRequests = await AidRequest.findAll({ order: [["created_at", "DESC"]] });
    return sendSuccess(res, aidRequests, "Aid requests fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch aid requests.");
  }
};

export const createAidRequest = async (req, res) => {
  try {
    const aidRequest = await AidRequest.create(req.body);
    return sendSuccess(res, aidRequest, "Aid request created successfully.", 201);
  } catch (error) {
    return sendError(res, error.message || "Failed to create aid request.");
  }
};

export const updateAidRequest = async (req, res) => {
  try {
    const aidRequest = await AidRequest.findByPk(req.params.id);
    if (!aidRequest) return sendError(res, "Aid request not found.", 404);

    await aidRequest.update(req.body);
    emitAidRequestUpdate(aidRequest.victim_id, aidRequest);
    return sendSuccess(res, aidRequest, "Aid request updated successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to update aid request.");
  }
};

export const deleteAidRequest = async (req, res) => {
  try {
    const aidRequest = await AidRequest.findByPk(req.params.id);
    if (!aidRequest) return sendError(res, "Aid request not found.", 404);
    await aidRequest.destroy();
    return sendSuccess(res, null, "Aid request deleted successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to delete aid request.");
  }
};
