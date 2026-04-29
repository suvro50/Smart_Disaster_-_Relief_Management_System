import { Volunteer } from "../models/index.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const getVolunteers = async (_req, res) => {
  try {
    const volunteers = await Volunteer.findAll({ order: [["created_at", "DESC"]] });
    return sendSuccess(res, volunteers, "Volunteers fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch volunteers.");
  }
};

export const createVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.create(req.body);
    return sendSuccess(res, volunteer, "Volunteer created successfully.", 201);
  } catch (error) {
    return sendError(res, error.message || "Failed to create volunteer.");
  }
};

export const updateVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) return sendError(res, "Volunteer not found.", 404);
    await volunteer.update(req.body);
    return sendSuccess(res, volunteer, "Volunteer updated successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to update volunteer.");
  }
};

export const approveVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) return sendError(res, "Volunteer not found.", 404);
    await volunteer.update({ is_trained: true, status: "active" });
    return sendSuccess(res, volunteer, "Volunteer approved successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to approve volunteer.");
  }
};

export const assignVolunteerToTeam = async (req, res) => {
  try {
    const volunteer = await Volunteer.findByPk(req.params.id);
    if (!volunteer) return sendError(res, "Volunteer not found.", 404);
    await volunteer.update({
      assigned_team_id: Number(req.params.teamId),
      status: "deployed"
    });
    return sendSuccess(res, volunteer, "Volunteer assigned to team successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to assign volunteer.");
  }
};
