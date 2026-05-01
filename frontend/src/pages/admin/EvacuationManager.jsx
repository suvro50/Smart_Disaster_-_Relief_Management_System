import { useEffect, useState } from "react";
import { evacuationService } from "../../services/evacuationService";
import DisasterMap from "../../components/map/DisasterMap";
import Modal from "../../components/ui/Modal";

const ZONE_COLORS = {
  danger: "bg-red-500/20 text-red-400 border-red-500/30",
  warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  safe: "bg-green-500/20 text-green-400 border-green-500/30",
  shelter: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function EvacuationManager() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    zone_name: "",
    zone_type: "danger",
    disaster_id: "",
    population_affected: 0,
    shelter_capacity: 0,
    evacuation_route: "",
    shelter_location: "",
    boundary_coordinates: "[[23.8,90.4],[23.9,90.5],[23.85,90.55]]",
  });

  const fetchZones = async () => {
    try {
      const data = await evacuationService.getAll();
      setZones(data);
    } catch {
      setZones([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchZones(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        disaster_id: form.disaster_id ? Number(form.disaster_id) : null,
        population_affected: Number(form.population_affected),
        shelter_capacity: Number(form.shelter_capacity),
        boundary_coordinates: JSON.parse(form.boundary_coordinates),
      };
      await evacuationService.create(payload);
      setModalOpen(false);
      fetchZones();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create zone. Check JSON coordinates format.");
    }
  };

  return (
    <main className="page">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Evacuation Manager
        </h2>
        <button onClick={() => setModalOpen(true)} className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-500 hover:to-orange-500 transition-all">
          + Add Zone
        </button>
      </div>

      <div className="mb-6">
        <DisasterMap />
      </div>

      {loading ? (
        <div className="text-white/40 text-center py-12">Loading zones...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {zones.map((zone) => (
            <div key={zone.id} className={`bg-white/5 backdrop-blur-md border rounded-xl p-4 ${ZONE_COLORS[zone.zone_type]?.replace("text-", "border-") || "border-white/10"}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold">{zone.zone_name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ZONE_COLORS[zone.zone_type] || "bg-white/10 text-white/60"}`}>
                  {zone.zone_type}
                </span>
              </div>
              <div className="space-y-1 text-sm text-white/50">
                <p>Population: {zone.population_affected?.toLocaleString() || 0}</p>
                <p>Shelter Capacity: {zone.shelter_capacity?.toLocaleString() || 0}</p>
                {zone.shelter_location && <p>Shelter: {zone.shelter_location}</p>}
                {zone.evacuation_route && <p>Route: {zone.evacuation_route}</p>}
                <p>Status: <span className={zone.status === "active" ? "text-green-400" : "text-white/30"}>{zone.status}</span></p>
              </div>
            </div>
          ))}
          {zones.length === 0 && (
            <div className="col-span-full text-white/30 text-center py-12">No evacuation zones defined yet</div>
          )}
        </div>
      )}

      <Modal open={modalOpen} title="Add Evacuation Zone" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <input value={form.zone_name} onChange={(e) => setForm((p) => ({ ...p, zone_name: e.target.value }))} placeholder="Zone Name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.zone_type} onChange={(e) => setForm((p) => ({ ...p, zone_type: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
              <option value="danger" className="bg-gray-900">Danger</option>
              <option value="warning" className="bg-gray-900">Warning</option>
              <option value="safe" className="bg-gray-900">Safe</option>
              <option value="shelter" className="bg-gray-900">Shelter</option>
            </select>
            <input value={form.disaster_id} onChange={(e) => setForm((p) => ({ ...p, disaster_id: e.target.value }))} placeholder="Disaster ID" type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.population_affected} onChange={(e) => setForm((p) => ({ ...p, population_affected: e.target.value }))} placeholder="Population Affected" type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
            <input value={form.shelter_capacity} onChange={(e) => setForm((p) => ({ ...p, shelter_capacity: e.target.value }))} placeholder="Shelter Capacity" type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>
          <input value={form.shelter_location} onChange={(e) => setForm((p) => ({ ...p, shelter_location: e.target.value }))} placeholder="Shelter Location" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          <input value={form.evacuation_route} onChange={(e) => setForm((p) => ({ ...p, evacuation_route: e.target.value }))} placeholder="Evacuation Route Instructions" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          <textarea value={form.boundary_coordinates} onChange={(e) => setForm((p) => ({ ...p, boundary_coordinates: e.target.value }))} placeholder='Boundary Coordinates (JSON array: [[lat,lng],...])' rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 resize-none font-mono text-xs" />
          <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all">
            Create Zone
          </button>
        </form>
      </Modal>
    </main>
  );
}
