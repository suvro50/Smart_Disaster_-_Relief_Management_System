import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { aidService } from "../../services/aidService";

const STATUS_COLORS = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  assigned: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  in_progress: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
};

export default function TrackRequest() {
  const { socket, joinVictimRoom } = useSocket();
  const [requestId, setRequestId] = useState("");
  const [updates, setUpdates] = useState([]);
  const [request, setRequest] = useState(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    if (!socket) return;
    const onAidUpdate = (payload) => setUpdates((prev) => [payload, ...prev].slice(0, 10));
    socket.on("aid_request_update", onAidUpdate);
    return () => socket.off("aid_request_update", onAidUpdate);
  }, [socket]);

  const handleTrack = async () => {
    if (!requestId) return;
    try {
      const data = await aidService.getById(requestId);
      setRequest(data);
      setTracking(true);
      joinVictimRoom(requestId);
    } catch {
      alert("Request not found. Check your request ID.");
    }
  };

  return (
    <main className="page">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-6">
        Track Your Request
      </h2>

      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6">
        <p className="text-white/50 text-sm mb-4">Enter your request ID to track its status in real-time</p>
        <div className="flex gap-3">
          <input value={requestId} onChange={(e) => setRequestId(e.target.value)} placeholder="Request ID" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          <button onClick={handleTrack} className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-red-500 hover:to-orange-500 transition-all">
            Track
          </button>
        </div>
      </div>

      {tracking && request && (
        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">Request #{request.id}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[request.status] || STATUS_COLORS.pending}`}>
              {request.status?.replace("_", " ")}
            </span>
          </div>
          <div className="text-white/50 text-sm space-y-1">
            <p>Type: {request.request_type}</p>
            <p>Urgency: {request.urgency}</p>
            <p>People: {request.people_count}</p>
            {request.assigned_team && <p className="text-green-400">Team assigned ✓</p>}
          </div>
        </div>
      )}

      {updates.length > 0 && (
        <div className="max-w-md mx-auto">
          <h3 className="text-white/60 text-sm font-medium mb-3">Live Updates</h3>
          <div className="space-y-2">
            {updates.map((item, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-3 flex items-center justify-between">
                <span className="text-white text-sm">Request #{item.id}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLORS[item.status] || STATUS_COLORS.pending}`}>{item.status?.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
