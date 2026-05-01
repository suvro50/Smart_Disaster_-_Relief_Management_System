import { useState } from "react";
import { resourceService } from "../../services/resourceService";

const CATEGORIES = ["food", "water", "medicine", "shelter", "equipment", "vehicle", "clothing", "other"];

export default function ResourceForm({ onSuccess, initial }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    category: initial?.category || "food",
    quantity: initial?.quantity || 1,
    unit: initial?.unit || "pieces",
    location: initial?.location || "",
    district: initial?.district || "",
    status: initial?.status || "available",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = { ...form, quantity: Number(form.quantity) };
      if (initial?.id) {
        await resourceService.update(initial.id, payload);
      } else {
        await resourceService.create(payload);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save resource");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-2 rounded-lg text-sm">{error}</div>}
      <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Resource Name" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
      <div className="grid grid-cols-2 gap-3">
        <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
          {CATEGORIES.map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
        </select>
        <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
          <option value="available" className="bg-gray-900">Available</option>
          <option value="low_stock" className="bg-gray-900">Low Stock</option>
          <option value="depleted" className="bg-gray-900">Depleted</option>
          <option value="allocated" className="bg-gray-900">Allocated</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <input value={form.quantity} onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))} type="number" min="0" placeholder="Quantity" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
        <input value={form.unit} onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value }))} placeholder="Unit (kg, pcs)" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
        <input value={form.district} onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))} placeholder="District" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
      </div>
      <input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} placeholder="Storage Location" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
      <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50">
        {loading ? "Saving..." : initial ? "Update Resource" : "Add Resource"}
      </button>
    </form>
  );
}
