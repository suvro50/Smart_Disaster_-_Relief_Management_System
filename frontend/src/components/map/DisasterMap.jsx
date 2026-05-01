import { useEffect, useMemo, useState } from "react";
import { Circle, CircleMarker, LayersControl, MapContainer, Polygon, Popup, TileLayer } from "react-leaflet";
import { disasterService } from "../../services/disasterService";
import { evacuationService } from "../../services/evacuationService";

const severityColor = {
  low: "#4caf50",
  medium: "#ffb300",
  high: "#ff7043",
  critical: "#ff1744"
};

export default function DisasterMap() {
  const [disasters, setDisasters] = useState([]);
  const [zones, setZones] = useState([]);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      disasterService.getAll().then(setDisasters).catch(() => setDisasters([])),
      evacuationService.getAll().then(setZones).catch(() => setZones([]))
    ]).finally(() => setLoading(false));
  }, []);

  const center = useMemo(() => {
    if (!disasters.length) return [23.8103, 90.4125];
    const first = disasters[0];
    return [Number(first.location_lat), Number(first.location_lng)];
  }, [disasters]);

  return (
    <div className="map-box">
      <div className="map-controls">
        <label>
          <input type="checkbox" checked={showMarkers} onChange={(e) => setShowMarkers(e.target.checked)} />
          Markers
        </label>
        <label>
          <input type="checkbox" checked={showHeatmap} onChange={(e) => setShowHeatmap(e.target.checked)} />
          Heatmap
        </label>
        <label>
          <input type="checkbox" checked={showZones} onChange={(e) => setShowZones(e.target.checked)} />
          Evacuation Zones
        </label>
      </div>
      <MapContainer center={center} zoom={7} className="leaflet-map" style={{ height: "100%", width: "100%" }}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Dark">
            <TileLayer 
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {showHeatmap &&
          disasters.map((disaster) => {
            if (!disaster.location_lat || !disaster.location_lng) return null;
            return (
              <Circle
                key={`heat-${disaster.id}`}
                center={[Number(disaster.location_lat), Number(disaster.location_lng)]}
                radius={12000}
                pathOptions={{
                  color: severityColor[disaster.severity] || "#4fc3f7",
                  fillOpacity: 0.2,
                  opacity: 0.25
                }}
              />
            );
          })}

        {showMarkers &&
          disasters.map((disaster) => {
            if (!disaster.location_lat || !disaster.location_lng) return null;
            return (
              <CircleMarker
                key={disaster.id}
                center={[Number(disaster.location_lat), Number(disaster.location_lng)]}
                radius={10}
                pathOptions={{ color: severityColor[disaster.severity] || "#4fc3f7" }}
              >
                <Popup>
                  <strong>{disaster.title}</strong>
                  <div>Type: {disaster.type}</div>
                  <div>Severity: {disaster.severity}</div>
                  <div>Status: {disaster.status}</div>
                </Popup>
              </CircleMarker>
            );
          })}

        {showZones &&
          zones.map((zone) => {
            const coordinates = Array.isArray(zone.boundary_coordinates) ? zone.boundary_coordinates : [];
            if (!coordinates.length) return null;
            return (
              <Polygon key={zone.id} positions={coordinates} pathOptions={{ color: "#ffd54f", weight: 2 }}>
                <Popup>{zone.zone_name}</Popup>
              </Polygon>
            );
          })}

        {!loading && disasters.length === 0 && zones.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
              <p className="text-white/70 text-lg mb-2">📍 Map is ready!</p>
              <p className="text-white/50 text-sm">Add some disasters in the admin panel to see them here</p>
            </div>
          </div>
        )}
      </MapContainer>
    </div>
  );
}
