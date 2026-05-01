import { useEffect, useState } from "react";
import { rescueService } from "../../services/rescueService";
import { useAuth } from "../../hooks/useAuth";

const STATUS_COLORS = {
  pending: "bg-yellow-500/20 text-yellow-400",
  assigned: "bg-blue-500/20 text-blue-400",
  in_progress: "bg-orange-500/20 text-orange-400",
  completed: "bg-green-500/20 text-green-400",
  cancelled: "bg-white/10 text-white/40",
};

export default function MyMissions() {
  const { user } = useAuth();
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const data = await rescueService.getMissions();
        setMissions(data);
      } catch {
        setMissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMissions();
  }, []);

  const updateMissionStatus = async (id, status) => {
    try {
      await rescueService.updateMission(id, { status });
      setMissions((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    } catch {}
  };

  return (
    <main className="page">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-6">
        My Missions
      </h2>

      {loading ? (
        <div className="text-white/40 text-center py-12">Loading missions...</div>
      ) : missions.length === 0 ? (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 text-center">
          <p className="text-white/40 text-lg">No missions assigned yet</p>
          <p className="text-white/25 text-sm mt-2">New missions will appear here when assigned by admin</p>
        </div>
      ) : (
        <div className="space-y-4">
          {missions.map((mission) => (
            <div key={mission.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-white font-semibold">{mission.title || `Mission #${mission.id}`}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[mission.status] || STATUS_COLORS.pending}`}>
                      {mission.status?.replace("_", " ")}
                    </span>
                  </div>
                  {mission.description && <p className="text-white/50 text-sm mb-2">{mission.description}</p>}
                  <div className="flex gap-4 text-xs text-white/40">
                    {mission.request_type && <span>Type: {mission.request_type}</span>}
                    {mission.urgency && <span>Urgency: {mission.urgency}</span>}
                    {mission.people_count && <span>People: {mission.people_count}</span>}
                    {mission.address && <span>Address: {mission.address}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  {mission.status === "assigned" && (
                    <button onClick={() => updateMissionStatus(mission.id, "in_progress")} className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1.5 rounded-lg hover:bg-orange-500/30 transition-colors">
                      Start
                    </button>
                  )}
                  {mission.status === "in_progress" && (
                    <button onClick={() => updateMissionStatus(mission.id, "completed")} className="text-xs bg-green-500/20 text-green-400 px-3 py-1.5 rounded-lg hover:bg-green-500/30 transition-colors">
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
