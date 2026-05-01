import { useState } from "react";
import { disasterService } from "../../services/disasterService";

const DISASTER_TYPES = ["flood", "earthquake", "cyclone", "fire", "landslide", "drought", "tsunami", "other"];

export default function DisasterReportForm({ onSuccess }) {
  const [form, setForm] = useState({
    title: "", type: "flood", severity: "medium", description: "",
    location_lat: "", location_lng: "", affected_area: "", district: "",
    affected_population: 0, casualties: 0, injuries: 0,
  });
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
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-2 rounded-lg text-sm">{error}</div>}
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
      <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50">
        {loading ? "Submitting..." : "Submit Report"}
      </button>
    </form>
  );
}
