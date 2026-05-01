import { useEffect, useState } from "react";
import { alertService } from "../../services/alertService";
import SeverityBadge from "../../components/alerts/SeverityBadge";
import Modal from "../../components/ui/Modal";

export default function AlertManager() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    message: "",
    alert_type: "warning",
    severity: "warning",
    target_district: "",
    is_broadcast: false,
    disaster_id: "",
  });

  const fetchAlerts = async () => {
    try {
      const data = await alertService.getAll();
      setAlerts(data);
    } catch {
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAlerts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (payload.disaster_id) payload.disaster_id = Number(payload.disaster_id);
      else delete payload.disaster_id;
      await alertService.create(payload);
      setModalOpen(false);
      setForm({ title: "", message: "", alert_type: "warning", severity: "warning", target_district: "", is_broadcast: false, disaster_id: "" });
      fetchAlerts();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create alert");
    }
  };

  const deactivateAlert = async (id) => {
    try {
      await alertService.deactivate(id);
      fetchAlerts();
    } catch {}
  };

  const ALERT_TYPE_COLORS = {
    warning: "bg-yellow-500/20 text-yellow-400",
    evacuation: "bg-red-500/20 text-red-400",
    shelter: "bg-blue-500/20 text-blue-400",
    all_clear: "bg-green-500/20 text-green-400",
    update: "bg-purple-500/20 text-purple-400",
    critical: "bg-red-600/20 text-red-500 animate-pulse",
  };

  return (
    <main className="page">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Alert Manager
        </h2>
        <button onClick={() => setModalOpen(true)} className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-red-500 hover:to-orange-500 transition-all">
          + Send Alert
        </button>
      </div>

      {loading ? (
        <div className="text-white/40 text-center py-12">Loading alerts...</div>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-start justify-between gap-4 ${!alert.is_active ? "opacity-50" : ""}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ALERT_TYPE_COLORS[alert.alert_type] || "bg-white/10 text-white/60"}`}>
                    {alert.alert_type}
                  </span>
                  <SeverityBadge severity={alert.severity} />
                  {alert.is_broadcast && (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-orange-500/20 text-orange-400">BROADCAST</span>
                  )}
                </div>
                <h3 className="text-white font-semibold">{alert.title}</h3>
                <p className="text-white/50 text-sm mt-1">{alert.message}</p>
                {alert.target_district && (
                  <p className="text-white/30 text-xs mt-1">District: {alert.target_district}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {alert.is_active && (
                  <button onClick={() => deactivateAlert(alert.id)} className="text-xs bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors">
                    Deactivate
                  </button>
                )}
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="text-white/30 text-center py-12">No alerts yet</div>
          )}
        </div>
      )}

      <Modal open={modalOpen} title="Send New Alert" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Alert Title" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          <textarea value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder="Alert message..." required rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 resize-none" />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.alert_type} onChange={(e) => setForm((p) => ({ ...p, alert_type: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
              <option value="warning" className="bg-gray-900">Warning</option>
              <option value="evacuation" className="bg-gray-900">Evacuation</option>
              <option value="shelter" className="bg-gray-900">Shelter</option>
              <option value="all_clear" className="bg-gray-900">All Clear</option>
              <option value="update" className="bg-gray-900">Update</option>
              <option value="critical" className="bg-gray-900">Critical</option>
            </select>
            <select value={form.severity} onChange={(e) => setForm((p) => ({ ...p, severity: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
              <option value="info" className="bg-gray-900">Info</option>
              <option value="warning" className="bg-gray-900">Warning</option>
              <option value="danger" className="bg-gray-900">Danger</option>
              <option value="critical" className="bg-gray-900">Critical</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input value={form.target_district} onChange={(e) => setForm((p) => ({ ...p, target_district: e.target.value }))} placeholder="Target District (optional)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
            <input value={form.disaster_id} onChange={(e) => setForm((p) => ({ ...p, disaster_id: e.target.value }))} placeholder="Disaster ID (optional)" type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>
          <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
            <input type="checkbox" checked={form.is_broadcast} onChange={(e) => setForm((p) => ({ ...p, is_broadcast: e.target.checked }))} className="rounded" />
            Broadcast to all users
          </label>
          <button type="submit" className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all">
            Send Alert
          </button>
        </form>
      </Modal>
    </main>
  );
}
