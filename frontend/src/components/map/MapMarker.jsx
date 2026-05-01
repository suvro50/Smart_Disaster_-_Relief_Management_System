import { CircleMarker, Popup } from "react-leaflet";

const TYPE_COLORS = {
  flood: "#2196f3",
  earthquake: "#ff9800",
  cyclone: "#9c27b0",
  fire: "#f44336",
  landslide: "#795548",
  drought: "#ffc107",
  tsunami: "#00bcd4",
  other: "#607d8b",
};

export default function MapMarker({ disaster }) {
  if (!disaster?.location_lat || !disaster?.location_lng) return null;

  const color = TYPE_COLORS[disaster.type] || TYPE_COLORS.other;

  return (
    <CircleMarker
      center={[Number(disaster.location_lat), Number(disaster.location_lng)]}
      radius={10}
      pathOptions={{ color, fillOpacity: 0.8, weight: 2 }}
    >
      <Popup>
        <div style={{ minWidth: 150 }}>
          <strong>{disaster.title}</strong>
          <div style={{ fontSize: 12, color: "#666" }}>Type: {disaster.type}</div>
          <div style={{ fontSize: 12, color: "#666" }}>Severity: {disaster.severity}</div>
          <div style={{ fontSize: 12, color: "#666" }}>Status: {disaster.status}</div>
          {disaster.district && <div style={{ fontSize: 12, color: "#666" }}>District: {disaster.district}</div>}
        </div>
      </Popup>
    </CircleMarker>
  );
}
