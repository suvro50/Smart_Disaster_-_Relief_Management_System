import { useState } from "react";
import DisasterMap from "../../components/map/DisasterMap";
import { useSocket } from "../../hooks/useSocket";

export default function PublicMap() {
  const { joinDistrict } = useSocket();
  const [district, setDistrict] = useState("dhaka");

  return (
    <main className="page">
      <h2>Public Disaster Map</h2>
      <div className="form">
        <input
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          placeholder="District to subscribe"
        />
        <button type="button" onClick={() => joinDistrict(district)}>
          Join District Alerts
        </button>
      </div>
      <DisasterMap />
    </main>
  );
}
