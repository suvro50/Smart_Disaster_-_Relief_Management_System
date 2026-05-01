import { useState } from "react";
import DisasterMap from "../../components/map/DisasterMap";
import { useSocket } from "../../hooks/useSocket";

const DISTRICTS = [
  "Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna",
  "Barishal", "Rangpur", "Mymensingh", "Comilla", "Gazipur",
];

export default function PublicMap() {
  const { joinDistrict } = useSocket();
  const [district, setDistrict] = useState("Dhaka");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    joinDistrict(district.toLowerCase());
    setJoined(true);
  };

  return (
    <main className="page">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-6">
        Public Disaster Map
      </h2>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-3">
          <select value={district} onChange={(e) => { setDistrict(e.target.value); setJoined(false); }} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
            {DISTRICTS.map((d) => (<option key={d} value={d} className="bg-gray-900">{d}</option>))}
          </select>
          <button onClick={handleJoin} className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-red-500 hover:to-orange-500 transition-all">
            {joined ? "✓ Subscribed" : "Subscribe Alerts"}
          </button>
        </div>
        {joined && (
          <p className="text-green-400 text-sm mt-2">You will receive real-time alerts for {district}</p>
        )}
      </div>

      <DisasterMap />
    </main>
  );
}
