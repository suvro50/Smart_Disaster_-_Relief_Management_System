import { createContext, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { token } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketClient = io("http://localhost:5000", {
      transports: ["websocket"],
      auth: { token }
    });
    socketClient.emit("join_admin_room");
    setSocket(socketClient);
    return () => socketClient.disconnect();
  }, [token]);

  const joinDistrict = (district) => {
    if (!socket || !district) return;
    socket.emit("join_district", district);
  };

  const joinVictimRoom = (victimId) => {
    if (!socket || !victimId) return;
    socket.emit("join_victim_room", victimId);
  };

  const sendTeamLocation = (teamId, lat, lng) => {
    if (!socket || !teamId) return;
    socket.emit("team_location", { teamId, lat, lng });
  };

  const value = useMemo(
    () => ({ socket, joinDistrict, joinVictimRoom, sendTeamLocation }),
    [socket]
  );
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
