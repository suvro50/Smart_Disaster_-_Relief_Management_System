import { useEffect, useState } from "react";
import { rescueService } from "../../services/rescueService";
import { volunteerService } from "../../services/volunteerService";

const STATUS_COLORS = {
  pending: "bg-yellow-500/20 text-yellow-400",
  approved: "bg-green-500/20 text-green-400",
  rejected: "bg-red-500/20 text-red-400",
  available: "bg-green-500/20 text-green-400",
  deployed: "bg-orange-500/20 text-orange-400",
  offline: "bg-white/10 text-white/40",
};

export default function RescueManager() {
  const [teams, setTeams] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [missions, setMissions] = useState([]);

  const loadData = async () => {
    try {
      const [teamsData, volunteersData] = await Promise.all([rescueService.getAll(), volunteerService.getAll()]);
      setTeams(teamsData || []);
      setVolunteers(volunteersData || []);
      if (!selectedTeam && teamsData?.length) setSelectedTeam(String(teamsData[0].id));
    } catch {}
  };

  useEffect(() => { loadData(); }, []);

  useEffect(() => {
    if (!selectedTeam) return;
    rescueService.getMissionHistory(selectedTeam).then((data) => setMissions(data.missions || [])).catch(() => setMissions([]));
  }, [selectedTeam]);

  const handleApprove = async (id) => { await volunteerService.approve(id); await loadData(); };
  const handleAssign = async (volunteerId, teamId) => { await volunteerService.assignToTeam(volunteerId, teamId); await loadData(); };

  return (
    <main className="page">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-6">
        Rescue Team Manager
      </h2>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 mb-6">
        <label className="text-white/60 text-sm mb-1 block">Select Team for Mission History</label>
        <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
          {teams.map((team) => (<option key={team.id} value={team.id} className="bg-gray-900">{team.name || team.team_name}</option>))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
          <h4 className="text-white font-semibold mb-4">Volunteers</h4>
          {volunteers.length === 0 ? (
            <p className="text-white/30 text-sm">No volunteers registered</p>
          ) : (
            <div className="space-y-3">
              {volunteers.map((v) => (
                <div key={v.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div>
                    <p className="text-white text-sm font-medium">{v.full_name || `Volunteer #${v.id}`}</p>
                    <p className="text-white/40 text-xs">{v.skills}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLORS[v.status] || STATUS_COLORS.pending}`}>{v.status}</span>
                    {v.status === "pending" && (
                      <button onClick={() => handleApprove(v.id)} className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-lg hover:bg-green-500/30">Approve</button>
                    )}
                    <button onClick={() => handleAssign(v.id, selectedTeam)} disabled={!selectedTeam} className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-500/30 disabled:opacity-30">Assign</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5">
          <h4 className="text-white font-semibold mb-4">Mission History</h4>
          {missions.length === 0 ? (
            <p className="text-white/30 text-sm">No missions for this team yet</p>
          ) : (
            <div className="space-y-2">
              {missions.map((m) => (
                <div key={m.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <span className="text-white text-sm">#{m.id} — {m.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLORS[m.status] || STATUS_COLORS.pending}`}>{m.status?.replace("_", " ")}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
