import { useState } from "react";
import { aidService } from "../../services/aidService";

export default function AidRequestForm({ onSuccess }) {
  const [form, setForm] = useState({
    request_type: "food",
    urgency: "medium",
    description: "",
    people_count: 1,
    address: "",
    disaster_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await aidService.create({
        ...form,
        people_count: Number(form.people_count),
        disaster_id: form.disaster_id ? Number(form.disaster_id) : null,
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-2 rounded-lg text-sm">{error}</div>}
      <div className="grid grid-cols-2 gap-3">
        <select value={form.request_type} onChange={(e) => setForm((p) => ({ ...p, request_type: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
          <option value="food" className="bg-gray-900">Food</option>
          <option value="water" className="bg-gray-900">Water</option>
          <option value="medicine" className="bg-gray-900">Medicine</option>
          <option value="shelter" className="bg-gray-900">Shelter</option>
          <option value="rescue" className="bg-gray-900">Rescue</option>
          <option value="clothing" className="bg-gray-900">Clothing</option>
          <option value="other" className="bg-gray-900">Other</option>
        </select>
        <select value={form.urgency} onChange={(e) => setForm((p) => ({ ...p, urgency: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
          <option value="low" className="bg-gray-900">Low</option>
          <option value="medium" className="bg-gray-900">Medium</option>
          <option value="high" className="bg-gray-900">High</option>
          <option value="critical" className="bg-gray-900">Critical</option>
        </select>
      </div>
      <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} placeholder="Describe your need..." rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 resize-none" />
      <div className="grid grid-cols-2 gap-3">
        <input value={form.people_count} onChange={(e) => setForm((p) => ({ ...p, people_count: e.target.value }))} type="number" min="1" placeholder="People count" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
        <input value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} placeholder="Address" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
      </div>
      <input value={form.disaster_id} onChange={(e) => setForm((p) => ({ ...p, disaster_id: e.target.value }))} placeholder="Disaster ID (optional)" type="number" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
      <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50">
        {loading ? "Sending..." : "Send Aid Request"}
      </button>
    </form>
  );
}
