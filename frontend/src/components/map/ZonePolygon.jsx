import { Polygon, Popup } from "react-leaflet";

const ZONE_COLORS = {
  danger: { color: "#ef4444", fillColor: "#ef4444", fillOpacity: 0.2, weight: 3 },
  warning: { color: "#eab308", fillColor: "#eab308", fillOpacity: 0.15, weight: 2 },
  safe: { color: "#22c55e", fillColor: "#22c55e", fillOpacity: 0.1, weight: 2 },
  shelter: { color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.1, weight: 2 },
};

export default function ZonePolygon({ zone }) {
  if (!zone?.boundary_coordinates) return null;
  const coords = Array.isArray(zone.boundary_coordinates) ? zone.boundary_coordinates : [];
  if (!coords.length) return null;

  const options = ZONE_COLORS[zone.zone_type] || ZONE_COLORS.warning;

  return (
    <Polygon positions={coords} pathOptions={options}>
      <Popup>
        <strong>{zone.zone_name}</strong>
        <div style={{ fontSize: 12 }}>Type: {zone.zone_type}</div>
        <div style={{ fontSize: 12 }}>Population: {zone.population_affected || 0}</div>
        <div style={{ fontSize: 12 }}>Capacity: {zone.shelter_capacity || 0}</div>
        {zone.evacuation_route && <div style={{ fontSize: 12 }}>Route: {zone.evacuation_route}</div>}
      </Popup>
    </Polygon>
  );
}
