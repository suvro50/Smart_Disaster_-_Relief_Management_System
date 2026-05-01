import { useEffect, useState } from "react";
import { disasterService } from "../../services/disasterService";
import DisasterMap from "../../components/map/DisasterMap";
import Modal from "../../components/ui/Modal";

const SEVERITY_COLORS = {
  low: "bg-green-500/20 text-green-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-orange-500/20 text-orange-400",
  critical: "bg-red-500/20 text-red-400 animate-pulse",
};

const STATUS_COLORS = {
  active: "bg-red-600/20 text-red-400",
  monitoring: "bg-yellow-500/20 text-yellow-400",
  resolved: "bg-green-500/20 text-green-400",
  false_alarm: "bg-white/10 text-white/40",
};

const DISASTER_TYPES = ["flood", "earthquake", "cyclone", "fire", "landslide", "drought", "tsunami", "other"];

export default function DisasterManager() {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filters, setFilters] = useState({ type: "", severity: "", status: "" });
  const [form, setForm] = useState({
    title: "", type: "flood", severity: "medium", description: "",
    location_lat: "", location_lng: "", affected_area: "", district: "",
    affected_population: 0, casualties: 0, injuries: 0,
  });

  const fetchDisasters = async () => {
    try {
      const data = await disasterService.getAll(filters);
      setDisasters(data);
    } catch {
      setDisasters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDisasters(); }, [filters]);

  const openCreate = () => {
    setEditItem(null);
    setForm({ title: "", type: "flood", severity: "medium", description: "", location_lat: "", location_lng: "", affected_area: "", district: "", affected_population: 0, casualties: 0, injuries: 0 });
    setModalOpen(true);
  };

  const openEdit = (d) => {
    setEditItem(d);
    setForm({
      title: d.title, type: d.type, severity: d.severity, description: d.description || "",
      location_lat: d.location_lat, location_lng: d.location_lng,
      affected_area: d.affected_area || "", district: d.district || "",
      affected_population: d.affected_population || 0, casualties: d.casualties || 0, injuries: d.injuries || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        location_lat: Number(form.location_lat),
        location_lng: Number(form.location_lng),
        affected_population: Number(form.affected_population),
        casualties: Number(form.casualties),
        injuries: Number(form.injuries),
      };
      if (editItem) {
        await disasterService.update(editItem.id, payload);
      } else {
        await disasterService.create(payload);
      }
      setModalOpen(false);
      fetchDisasters();
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed");
    }
  };

  const deleteDisaster = async (id) => {
    if (!confirm("Delete this disaster record?")) return;
    try {
      await disasterService.delete(id);
      fetchDisasters();
    } catch {}
  };

  return (
    <main className="page">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Disaster Manager
        </h2>
        <button onClick={openCreate} className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-500 hover:to-orange-500 transition-all">
          + Report Disaster
        </button>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <select value={filters.type} onChange={(e) => setFilters((p) => ({ ...p, type: e.target.value }))} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500/50">
          <option value="" className="bg-gray-900">All Types</option>
          {DISASTER_TYPES.map((t) => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
        </select>
        <select value={filters.severity} onChange={(e) => setFilters((p) => ({ ...p, severity: e.target.value }))} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500/50">
          <option value="" className="bg-gray-900">All Severities</option>
          <option value="low" className="bg-gray-900">Low</option>
          <option value="medium" className="bg-gray-900">Medium</option>
          <option value="high" className="bg-gray-900">High</option>
          <option value="critical" className="bg-gray-900">Critical</option>
        </select>
        <select value={filters.status} onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))} className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500/50">
          <option value="" className="bg-gray-900">All Status</option>
          <option value="active" className="bg-gray-900">Active</option>
          <option value="monitoring" className="bg-gray-900">Monitoring</option>
          <option value="resolved" className="bg-gray-900">Resolved</option>
          <option value="false_alarm" className="bg-gray-900">False Alarm</option>
        </select>
      </div>

      <div className="mb-6">
        <DisasterMap />
      </div>

      {loading ? (
        <div className="text-white/40 text-center py-12">Loading disasters...</div>
      ) : (
        <div className="space-y-3">
          {disasters.map((d) => (
            <div key={d.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-white font-semibold">{d.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${SEVERITY_COLORS[d.severity] || ""}`}>{d.severity}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[d.status] || ""}`}>{d.status}</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-white/10 text-white/60">{d.type}</span>
                  </div>
                  {d.description && <p className="text-white/50 text-sm mt-1">{d.description}</p>}
                  <div className="flex gap-4 mt-2 text-xs text-white/40">
                    <span>District: {d.district || "—"}</span>
                    <span>Population: {d.affected_population?.toLocaleString() || 0}</span>
                    <span>Casualties: {d.casualties || 0}</span>
                    <span>Injuries: {d.injuries || 0}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(d)} className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-500/30 transition-colors">Edit</button>
                  <button onClick={() => deleteDisaster(d.id)} className="text-xs bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {disasters.length === 0 && (
            <div className="text-white/30 text-center py-12">No disasters found</div>
          )}
        </div>
      )}

      <Modal open={modalOpen} title={editItem ? "Edit Disaster" : "Report Disaster"} onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Disaster Title" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
              {DISASTER_TYPES.map((t) => <option key={t} value={t} className="bg-gray-900">{t}</option>)}
            </select>
            <select value={form.severity} onChange={(e) => setForm((p) => ({ ...p, severity: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
              <option value="low" className="bg-gray-900">Low</option>
              <option value="medium" className="bg-gray-900">Medium</option>
              <option value="high" className="bg-gray-900">High</option>
              <option value="critical" className="bg-gray-900">Critical</option>
            </select>
          </div>
          <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Description" rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 resize-none" />
          <div className="grid grid-cols-2 gap-3">
            <input value={form.location_lat} onChange={(e) => setForm((p) => ({ ...p, location_lat: e.target.value }))} placeholder="Latitude" type="number" step="any" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
            <input value={form.location_lng} onChange={(e) => setForm((p) => ({ ...p, location_lng: e.target.value }))} placeholder="Longitude" type="number" step="any" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.district} onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))} placeholder="District" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
            <input value={form.affected_area} onChange={(e) => setForm((p) => ({ ...p, affected_area: e.target.value }))} placeholder="Affected Area" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <input value={form.affected_population} onChange={(e) => setForm((p) => ({ ...p, affected_population: e.target.value }))} placeholder="Population" type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
            <input value={form.casualties} onChange={(e) => setForm((p) => ({ ...p, casualties: e.target.value }))} placeholder="Casualties" type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
            <input value={form.injuries} onChange={(e) => setForm((p) => ({ ...p, injuries: e.target.value }))} placeholder="Injuries" type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all">
            {editItem ? "Update Disaster" : "Report Disaster"}
          </button>
        </form>
      </Modal>
    </main>
  );
}
