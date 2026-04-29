import { AidRequest, Alert, Disaster, Resource, RescueTeam } from "../models/index.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const getDashboardStats = async (_req, res) => {
  try {
    const [totalDisasters, activeDisasters, resolvedDisasters, activeRescues, pendingAid, criticalAlerts] =
      await Promise.all([
        Disaster.count(),
        Disaster.count({ where: { status: "active" } }),
        Disaster.count({ where: { status: "resolved" } }),
        RescueTeam.count({ where: { status: "deployed" } }),
        AidRequest.count({ where: { status: "pending" } }),
        Alert.count({ where: { severity: "critical", is_active: true } })
      ]);

    return sendSuccess(
      res,
      {
        totalDisasters,
        activeDisasters,
        resolvedDisasters,
        activeRescues,
        pendingAid,
        criticalAlerts
      },
      "Dashboard stats fetched successfully."
    );
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch dashboard stats.");
  }
};

export const getDashboardLiveFeed = async (_req, res) => {
  try {
    const [disasters, alerts, aidRequests, resources] = await Promise.all([
      Disaster.findAll({ limit: 5, order: [["created_at", "DESC"]] }),
      Alert.findAll({ limit: 5, order: [["created_at", "DESC"]] }),
      AidRequest.findAll({ limit: 5, order: [["created_at", "DESC"]] }),
      Resource.findAll({ limit: 5, order: [["last_updated", "DESC"]] })
    ]);

    const feed = [
      ...disasters.map((d) => ({ type: "disaster", time: d.created_at, payload: d })),
      ...alerts.map((a) => ({ type: "alert", time: a.created_at, payload: a })),
      ...aidRequests.map((a) => ({ type: "aid_request", time: a.created_at, payload: a })),
      ...resources.map((r) => ({ type: "resource", time: r.last_updated, payload: r }))
    ]
      .filter((item) => item.time)
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 20);

    return sendSuccess(res, feed, "Dashboard live feed fetched successfully.");
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch dashboard live feed.");
  }
};
