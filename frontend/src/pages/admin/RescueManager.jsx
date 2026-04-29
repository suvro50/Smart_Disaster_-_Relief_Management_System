import { useEffect, useState } from "react";
import { rescueService } from "../../services/rescueService";
import { volunteerService } from "../../services/volunteerService";

export default function RescueManager() {
  const [teams, setTeams] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [missions, setMissions] = useState([]);

  const loadData = async () => {
    const [teamsData, volunteersData] = await Promise.all([
      rescueService.getAll(),
      volunteerService.getAll()
    ]);
    setTeams(teamsData || []);
    setVolunteers(volunteersData || []);
    if (!selectedTeam && teamsData?.length) {
      setSelectedTeam(String(teamsData[0].id));
    }
  };

  useEffect(() => {
    loadData().catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!selectedTeam) return;
    rescueService
      .getMissionHistory(selectedTeam)
      .then((data) => setMissions(data.missions || []))
      .catch(() => setMissions([]));
  }, [selectedTeam]);

  const handleApprove = async (id) => {
    await volunteerService.approve(id);
    await loadData();
  };

  const handleAssign = async (volunteerId, teamId) => {
    await volunteerService.assignToTeam(volunteerId, teamId);
    await loadData();
  };

  return (
    <main className="page">
      <h2>Rescue Team Manager</h2>
      <p>Assign teams to incidents, approve volunteers, and review mission history.</p>
      <div className="form">
        <label>Mission History Team</label>
        <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.team_name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid">
        <div className="card">
          <h4>Volunteers</h4>
          {volunteers.map((volunteer) => (
            <div key={volunteer.id} className="row">
              <span>
                Volunteer #{volunteer.id} ({volunteer.status})
              </span>
              <button type="button" onClick={() => handleApprove(volunteer.id)}>
                Approve
              </button>
              <button
                type="button"
                disabled={!selectedTeam}
                onClick={() => handleAssign(volunteer.id, selectedTeam)}
              >
                Assign to Team
              </button>
            </div>
          ))}
        </div>
        <div className="card">
          <h4>Mission History</h4>
          {missions.length ? (
            missions.map((mission) => (
              <p key={mission.id}>
                #{mission.id} - {mission.title} ({mission.status})
              </p>
            ))
          ) : (
            <p>No missions linked to this team yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
