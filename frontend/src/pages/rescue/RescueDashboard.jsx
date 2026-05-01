import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { rescueService } from "../../services/rescueService";

export default function RescueDashboard() {
  const { sendTeamLocation } = useSocket();
  const [teamId, setTeamId] = useState("");
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [team, setTeam] = useState(null);
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    if (!isBroadcasting || !teamId) return;
    const timer = setInterval(() => {
      const lat = 23.78 + Math.random() * 0.01;
      const lng = 90.41 + Math.random() * 0.01;
      sendTeamLocation(Number(teamId), Number(lat.toFixed(6)), Number(lng.toFixed(6)));
    }, 30000);
    return () => clearInterval(timer);
  }, [isBroadcasting, sendTeamLocation, teamId]);

  useEffect(() => {
    if (!teamId) return;
    rescueService.getById(teamId).then(setTeam).catch(() => setTeam(null));
    rescueService.getMissions().then(setMissions).catch(() => setMissions([]));
  }, [teamId]);

  return (
    <main className="page">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-6">
        Rescue Dashboard
      </h2>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-3">Live GPS Broadcast</h3>
        <p className="text-white/40 text-sm mb-4">Share your team location every 30 seconds for real-time tracking</p>
        <div className="flex gap-3">
          <input value={teamId} onChange={(e) => setTeamId(e.target.value)} placeholder="Your Team ID" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          <button onClick={() => setIsBroadcasting((prev) => !prev)} className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${isBroadcasting ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30" : "bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-500 hover:to-orange-500"}`}>
            {isBroadcasting ? "⏹ Stop Broadcast" : "📡 Start GPS Broadcast"}
          </button>
        </div>
        {isBroadcasting && (
          <div className="mt-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 text-sm">Broadcasting location...</span>
          </div>
        )}
      </div>

      {team && (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-semibold mb-2">Team Info</h3>
          <div className="text-white/50 text-sm space-y-1">
            <p>Name: {team.name || team.team_name}</p>
            <p>Type: {team.team_type}</p>
            <p>Status: <span className={team.status === "deployed" ? "text-orange-400" : "text-green-400"}>{team.status}</span></p>
            <p>District: {team.district}</p>
          </div>
        </div>
      )}

      {missions.length > 0 && (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-3">My Active Missions</h3>
          <div className="space-y-2">
            {missions.map((m) => (
              <div key={m.id} className="bg-white/5 rounded-lg p-3 flex items-center justify-between">
                <span className="text-white text-sm">{m.title || `Mission #${m.id}`}</span>
                <span className="text-xs text-orange-400">{m.status?.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
