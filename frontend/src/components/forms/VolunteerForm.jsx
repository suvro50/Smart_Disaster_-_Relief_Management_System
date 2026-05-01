import { useState } from "react";
import { volunteerService } from "../../services/volunteerService";

export default function VolunteerForm({ onSuccess }) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    skills: "",
    availability: "weekdays",
    district: "",
    emergency_contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await volunteerService.register(form);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-2 rounded-lg text-sm">{error}</div>}
      <input value={form.full_name} onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))} placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
      <div className="grid grid-cols-2 gap-3">
        <input value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone (+880...)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
        <input value={form.district} onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))} placeholder="District" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
      </div>
      <input value={form.skills} onChange={(e) => setForm((p) => ({ ...p, skills: e.target.value }))} placeholder="Skills (e.g. first aid, swimming, driving)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
      <div className="grid grid-cols-2 gap-3">
        <select value={form.availability} onChange={(e) => setForm((p) => ({ ...p, availability: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
          <option value="weekdays" className="bg-gray-900">Weekdays</option>
          <option value="weekends" className="bg-gray-900">Weekends</option>
          <option value="fulltime" className="bg-gray-900">Full Time</option>
          <option value="oncall" className="bg-gray-900">On Call</option>
        </select>
        <input value={form.emergency_contact} onChange={(e) => setForm((p) => ({ ...p, emergency_contact: e.target.value }))} placeholder="Emergency Contact" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50">
        {loading ? "Registering..." : "Register as Volunteer"}
      </button>
    </form>
  );
}
