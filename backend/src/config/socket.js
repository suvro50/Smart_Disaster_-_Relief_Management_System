import { Server } from "socket.io";
import { RescueTeam } from "../models/index.js";
import { env } from "./env.js";

let io;

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: env.clientUrl,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    socket.on("join_victim_room", (victimId) => {
      if (victimId) {
        socket.join(`victim:${victimId}`);
      }
    });

    socket.on("join_district", (district) => {
      if (typeof district === "string" && district.trim().length > 0) {
        socket.join(`district:${district.trim().toLowerCase()}`);
      }
    });

    socket.on("join_admin_room", () => {
      socket.join("room:admin");
    });

    socket.on("team_location", async (payload) => {
      try {
        const { teamId, lat, lng } = payload || {};
        if (!teamId || lat === undefined || lng === undefined) return;
        const team = await RescueTeam.findByPk(teamId);
        if (!team) return;
        await team.update({ location_lat: lat, location_lng: lng });
        io.to("room:admin").emit("team_location_update", {
          teamId: team.id,
          lat,
          lng,
          updatedAt: new Date().toISOString()
        });
      } catch (_error) {
        // Keep socket channel resilient without crashing connection.
      }
    });

    socket.on("disconnect", () => {
      // Keeping connection clean is enough for Phase 1.
    });
  });

  return io;
};

export const getSocketIO = () => {
  if (!io) {
    throw new Error("Socket.io has not been initialized yet.");
  }
  return io;
};
