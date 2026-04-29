import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";

export default function TrackRequest() {
  const { socket, joinVictimRoom } = useSocket();
  const [victimId, setVictimId] = useState("1");
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (!socket) return;
    const onAidUpdate = (payload) => {
      setUpdates((prev) => [payload, ...prev].slice(0, 10));
    };
    socket.on("aid_request_update", onAidUpdate);
    return () => socket.off("aid_request_update", onAidUpdate);
  }, [socket]);

  const handleJoin = () => {
    joinVictimRoom(victimId);
  };

  return (
    <main className="page">
      <h2>Track Request</h2>
      <p>Join your victim room to receive live aid status updates.</p>
      <div className="form">
        <input value={victimId} onChange={(e) => setVictimId(e.target.value)} placeholder="Victim ID" />
        <button type="button" onClick={handleJoin}>
          Start Live Tracking
        </button>
      </div>
      <div className="grid">
        {updates.map((item, idx) => (
          <div className="card" key={idx}>
            <strong>Request #{item.id}</strong>
            <p>Status: {item.status}</p>
            <p>Type: {item.request_type}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
