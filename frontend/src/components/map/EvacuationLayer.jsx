import { useEffect, useState } from "react";
import { Polygon, Popup } from "react-leaflet";
import { evacuationService } from "../../services/evacuationService";

const ZONE_COLORS = {
  danger: { color: "#ef4444", weight: 3, fillOpacity: 0.15 },
  warning: { color: "#eab308", weight: 2, fillOpacity: 0.1 },
  safe: { color: "#22c55e", weight: 2, fillOpacity: 0.1 },
  shelter: { color: "#3b82f6", weight: 2, fillOpacity: 0.1 },
};

export default function EvacuationLayer() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    evacuationService.getAll().then(setZones).catch(() => setZones([]));
  }, []);

  return (
    <>
      {zones.map((zone) => {
        const coords = Array.isArray(zone.boundary_coordinates) ? zone.boundary_coordinates : [];
        if (!coords.length) return null;
        const options = ZONE_COLORS[zone.zone_type] || ZONE_COLORS.warning;
        return (
          <Polygon key={zone.id} positions={coords} pathOptions={options}>
            <Popup>
              <strong>{zone.zone_name}</strong>
              <div style={{ fontSize: 12 }}>Type: {zone.zone_type}</div>
              <div style={{ fontSize: 12 }}>Population: {zone.population_affected || 0}</div>
              <div style={{ fontSize: 12 }}>Shelter Capacity: {zone.shelter_capacity || 0}</div>
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
}
