import { getSocketIO } from "../config/socket.js";

export const emitNewDisaster = (disaster) => {
  getSocketIO().emit("new_disaster", disaster);
};

export const emitDisasterUpdated = (disaster) => {
  getSocketIO().emit("disaster_updated", disaster);
};

export const emitNewAlert = (alert) => {
  const io = getSocketIO();
  io.emit("new_alert", alert);
  if (alert.target_district) {
    io.to(`district:${alert.target_district.toLowerCase()}`).emit("new_alert", alert);
  }
};

export const emitAidRequestUpdate = (victimId, aidRequest) => {
  if (!victimId) return;
  getSocketIO().to(`victim:${victimId}`).emit("aid_request_update", aidRequest);
};

export const emitResourceLow = (resource) => {
  getSocketIO().to("room:admin").emit("resource_low", resource);
};

export const emitTeamLocationUpdate = (payload) => {
  getSocketIO().to("room:admin").emit("team_location_update", payload);
};
