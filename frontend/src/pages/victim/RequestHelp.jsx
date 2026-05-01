import { useState } from "react";
import { aidService } from "../../services/aidService";

const URGENCY_COLORS = {
  low: "bg-green-500/20 text-green-400 border-green-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  critical: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function RequestHelp() {
  const [form, setForm] = useState({
    request_type: "food",
    urgency: "medium",
    description: "",
    people_count: 1,
    location_lat: "",
    location_lng: "",
    address: "",
    disaster_id: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        people_count: Number(form.people_count),
        disaster_id: form.disaster_id ? Number(form.disaster_id) : null,
        location_lat: form.location_lat ? Number(form.location_lat) : null,
        location_lng: form.location_lng ? Number(form.location_lng) : null,
      };
      await aidService.create(payload);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="page">
        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">🆘</div>
          <h2 className="text-xl font-bold text-white mb-2">Help Request Sent!</h2>
          <p className="text-white/50 text-sm mb-2">Your aid request has been received. A rescue team will be assigned shortly.</p>
          <p className="text-white/30 text-xs mb-6">You can track your request status on the Track Request page.</p>
          <div className="flex gap-3 justify-center">
            <a href="/victim/track-request" className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-lg text-sm font-semibold">
              Track Request
            </a>
            <button onClick={() => { setSubmitted(false); setForm({ request_type: "food", urgency: "medium", description: "", people_count: 1, location_lat: "", location_lng: "", address: "", disaster_id: "" }); }} className="bg-white/10 text-white px-6 py-2 rounded-lg text-sm">
              Submit Another
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
          🆘 Request Help
        </h2>
        <p className="text-white/40 text-sm mb-6">No login required. Submit your aid request and we will respond ASAP.</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg mb-4 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white/60 text-sm mb-1">What do you need?</label>
              <select value={form.request_type} onChange={(e) => setForm((p) => ({ ...p, request_type: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
                <option value="food" className="bg-gray-900">Food</option>
                <option value="water" className="bg-gray-900">Water</option>
                <option value="medicine" className="bg-gray-900">Medicine</option>
                <option value="shelter" className="bg-gray-900">Shelter</option>
                <option value="rescue" className="bg-gray-900">Rescue</option>
                <option value="clothing" className="bg-gray-900">Clothing</option>
                <option value="other" className="bg-gray-900">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-1">Urgency</label>
              <select value={form.urgency} onChange={(e) => setForm((p) => ({ ...p, urgency: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
                <option value="low" className="bg-gray-900">Low</option>
                <option value="medium" className="bg-gray-900">Medium</option>
                <option value="high" className="bg-gray-900">High</option>
                <option value="critical" className="bg-gray-900">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-1">How many people?</label>
            <input value={form.people_count} onChange={(e) => setForm((p) => ({ ...p, people_count: e.target.value }))} type="number" min="1" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50" />
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-1">Describe your situation</label>
            <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Tell us what happened and what you need..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 resize-none" />
          </div>

          <div>
            <label className="block text-white/60 text-sm mb-1">Address / Location</label>
            <input value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} placeholder="Village, road, landmark..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input value={form.location_lat} onChange={(e) => setForm((p) => ({ ...p, location_lat: e.target.value }))} placeholder="Latitude (optional)" type="number" step="any" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
            <input value={form.location_lng} onChange={(e) => setForm((p) => ({ ...p, location_lng: e.target.value }))} placeholder="Longitude (optional)" type="number" step="any" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>

          <input value={form.disaster_id} onChange={(e) => setForm((p) => ({ ...p, disaster_id: e.target.value }))} placeholder="Disaster ID (if known)" type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />

          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50 text-lg">
            {loading ? "Sending..." : "🆘 Send Help Request"}
          </button>
        </form>
      </div>
    </main>
  );
}
