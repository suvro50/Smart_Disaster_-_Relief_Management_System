import { useEffect, useState } from "react";
import { Circle, MapContainer, TileLayer } from "react-leaflet";
import { disasterService } from "../../services/disasterService";

const severityColor = {
  low: "#4caf50",
  medium: "#ffb300",
  high: "#ff7043",
  critical: "#ff1744",
};

export default function DisasterHeatmap() {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    disasterService.getAll().then(setDisasters).catch(() => setDisasters([]));
  }, []);

  const center = disasters.length
    ? [Number(disasters[0].location_lat), Number(disasters[0].location_lng)]
    : [23.8103, 90.4125];

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
      <div className="px-4 py-2 border-b border-white/10">
        <h3 className="text-white font-semibold text-sm">Disaster Heatmap</h3>
      </div>
      <MapContainer center={center} zoom={6} style={{ height: 250, width: "100%" }}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        {disasters.map((d) => (
          <Circle
            key={d.id}
            center={[Number(d.location_lat), Number(d.location_lng)]}
            radius={15000}
            pathOptions={{
              color: severityColor[d.severity] || "#4fc3f7",
              fillOpacity: 0.25,
              opacity: 0.3,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}
