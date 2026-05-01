import { useState } from "react";
import { disasterService } from "../../services/disasterService";

const DISASTER_TYPES = [
  { value: "flood", label: "Flood", icon: "🌊" },
  { value: "earthquake", label: "Earthquake", icon: "🌍" },
  { value: "cyclone", label: "Cyclone", icon: "🌀" },
  { value: "fire", label: "Fire", icon: "🔥" },
  { value: "landslide", label: "Landslide", icon: "⛰️" },
  { value: "drought", label: "Drought", icon: "🏜️" },
  { value: "tsunami", label: "Tsunami", icon: "🌊" },
  { value: "other", label: "Other", icon: "⚠️" },
];

export default function ReportDisaster() {
  const [form, setForm] = useState({
    title: "",
    type: "flood",
    severity: "medium",
    description: "",
    location_lat: "",
    location_lng: "",
    affected_area: "",
    district: "",
    affected_population: 0,
    casualties: 0,
    injuries: 0,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await disasterService.create({
        ...form,
        location_lat: Number(form.location_lat),
        location_lng: Number(form.location_lng),
        affected_population: Number(form.affected_population),
        casualties: Number(form.casualties),
        injuries: Number(form.injuries),
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to report disaster");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="page">
        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">📢</div>
          <h2 className="text-xl font-bold text-white mb-2">Disaster Reported!</h2>
          <p className="text-white/50 text-sm mb-6">Thank you for reporting. Authorities have been notified and will verify the report shortly.</p>
          <button onClick={() => { setSubmitted(false); setForm({ title: "", type: "flood", severity: "medium", description: "", location_lat: "", location_lng: "", affected_area: "", district: "", affected_population: 0, casualties: 0, injuries: 0 }); }} className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-lg text-sm font-semibold">
            Report Another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
          📢 Report a Disaster
        </h2>
        <p className="text-white/40 text-sm mb-6">No login required. Help save lives by reporting disasters in your area.</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-white/60 text-sm mb-1">Disaster Title</label>
            <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. Flash Flood in Sylhet" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-2">Disaster Type</label>
            <div className="grid grid-cols-4 gap-2">
              {DISASTER_TYPES.map((t) => (
                <button key={t.value} type="button" onClick={() => setForm((p) => ({ ...p, type: t.value }))} className={`py-2 px-1 rounded-lg text-center text-xs transition-all ${form.type === t.value ? "bg-red-500/30 border border-red-500/50 text-white" : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"}`}>
                  <div className="text-lg">{t.icon}</div>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-1">Severity</label>
            <div className="grid grid-cols-4 gap-2">
              {["low", "medium", "high", "critical"].map((s) => (
                <button key={s} type="button" onClick={() => setForm((p) => ({ ...p, severity: s }))} className={`py-2 rounded-lg text-xs capitalize transition-all ${form.severity === s ? "bg-red-500/30 border border-red-500/50 text-white" : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Describe the situation..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input value={form.location_lat} onChange={(e) => setForm((p) => ({ ...p, location_lat: e.target.value }))} placeholder="Latitude" type="number" step="any" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
            <input value={form.location_lng} onChange={(e) => setForm((p) => ({ ...p, location_lng: e.target.value }))} placeholder="Longitude" type="number" step="any" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input value={form.district} onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))} placeholder="District" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
            <input value={form.affected_area} onChange={(e) => setForm((p) => ({ ...p, affected_area: e.target.value }))} placeholder="Affected Area" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-white/60 text-xs mb-1">Population</label>
              <input value={form.affected_population} onChange={(e) => setForm((p) => ({ ...p, affected_population: e.target.value }))} type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50" />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">Casualties</label>
              <input value={form.casualties} onChange={(e) => setForm((p) => ({ ...p, casualties: e.target.value }))} type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50" />
            </div>
            <div>
              <label className="block text-white/60 text-xs mb-1">Injuries</label>
              <input value={form.injuries} onChange={(e) => setForm((p) => ({ ...p, injuries: e.target.value }))} type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-red-500/50" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50">
            {loading ? "Submitting..." : "📢 Report Disaster"}
          </button>
        </form>
      </div>
    </main>
  );
}
