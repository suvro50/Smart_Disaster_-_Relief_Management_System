import { Disaster, RescueTeam } from "../models/index.js";
import { emitTeamLocationUpdate } from "../services/socketService.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const getRescueTeams = async (_req, res) => {
  try {
    const teams = await RescueTeam.findAll({ order: [["created_at", "DESC"]] });
    return sendSuccess(res, teams, "Rescue teams fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch rescue teams.");
  }
};

export const createRescueTeam = async (req, res) => {
  try {
    const team = await RescueTeam.create(req.body);
    return sendSuccess(res, team, "Rescue team created successfully.", 201);
  } catch (error) {
    return sendError(res, error.message || "Failed to create rescue team.");
  }
};

export const updateRescueTeam = async (req, res) => {
  try {
    const team = await RescueTeam.findByPk(req.params.id);
    if (!team) return sendError(res, "Rescue team not found.", 404);
    await team.update(req.body);
    return sendSuccess(res, team, "Rescue team updated successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to update rescue team.");
  }
};

export const assignRescueTeamToDisaster = async (req, res) => {
  try {
    const team = await RescueTeam.findByPk(req.params.id);
    if (!team) return sendError(res, "Rescue team not found.", 404);

    const disaster = await Disaster.findByPk(req.params.disasterId);
    if (!disaster) return sendError(res, "Disaster not found.", 404);

    await team.addAssignedDisaster(disaster);
    await team.update({ status: "deployed" });
    emitTeamLocationUpdate({
      teamId: team.id,
      disasterId: disaster.id,
      status: team.status
    });

    return sendSuccess(res, { teamId: team.id, disasterId: disaster.id }, "Team assigned successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to assign rescue team.");
  }
};

export const getRescueTeamMissionHistory = async (req, res) => {
  try {
    const team = await RescueTeam.findByPk(req.params.id, {
      include: [
        {
          association: "assignedDisasters",
          attributes: ["id", "title", "severity", "status", "district", "created_at"],
          through: { attributes: [] }
        }
      ]
    });
    if (!team) return sendError(res, "Rescue team not found.", 404);
    return sendSuccess(
      res,
      {
        teamId: team.id,
        teamName: team.team_name,
        missions: team.assignedDisasters || []
      },
      "Mission history fetched successfully."
    );
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch mission history.");
  }
};
