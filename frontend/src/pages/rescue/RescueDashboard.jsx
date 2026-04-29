import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";

export default function RescueDashboard() {
  const { sendTeamLocation } = useSocket();
  const [teamId, setTeamId] = useState("1");
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  useEffect(() => {
    if (!isBroadcasting) return;
    const timer = setInterval(() => {
      const lat = 23.78 + Math.random() * 0.01;
      const lng = 90.41 + Math.random() * 0.01;
      sendTeamLocation(Number(teamId), Number(lat.toFixed(6)), Number(lng.toFixed(6)));
    }, 30000);
    return () => clearInterval(timer);
  }, [isBroadcasting, sendTeamLocation, teamId]);

  return (
    <main className="page">
      <h2>Rescue Dashboard</h2>
      <p>Mission and team status overview with live GPS sharing every 30 seconds.</p>
      <div className="form">
        <input value={teamId} onChange={(e) => setTeamId(e.target.value)} placeholder="Team ID" />
        <button type="button" onClick={() => setIsBroadcasting((prev) => !prev)}>
          {isBroadcasting ? "Stop GPS Broadcast" : "Start GPS Broadcast"}
        </button>
      </div>
    </main>
  );
}
