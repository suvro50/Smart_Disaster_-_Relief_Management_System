import { useState } from "react";
import { resourceService } from "../../services/resourceService";

export default function ResourceRequest() {
  const [form, setForm] = useState({
    name: "",
    category: "food",
    quantity: 1,
    unit: "pieces",
    location: "",
    district: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await resourceService.create({ ...form, quantity: Number(form.quantity) });
      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="page">
        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-white mb-2">Request Submitted</h2>
          <p className="text-white/50 text-sm mb-6">Your resource request has been sent to the admin team.</p>
          <button onClick={() => { setSubmitted(false); setForm({ name: "", category: "food", quantity: 1, unit: "pieces", location: "", district: "" }); }} className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-lg text-sm font-semibold">
            Submit Another
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-6">
          Request Resources
        </h2>
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-white/60 text-sm mb-1">Resource Name</label>
            <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. Bottled Water" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white/60 text-sm mb-1">Category</label>
              <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
                <option value="food" className="bg-gray-900">Food</option>
                <option value="water" className="bg-gray-900">Water</option>
                <option value="medicine" className="bg-gray-900">Medicine</option>
                <option value="shelter" className="bg-gray-900">Shelter</option>
                <option value="equipment" className="bg-gray-900">Equipment</option>
                <option value="vehicle" className="bg-gray-900">Vehicle</option>
                <option value="clothing" className="bg-gray-900">Clothing</option>
              </select>
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-1">Quantity</label>
              <div className="flex gap-2">
                <input value={form.quantity} onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))} type="number" min="1" required className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50" />
                <input value={form.unit} onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value }))} placeholder="Unit" className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50 text-sm" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-1">Location</label>
            <input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} placeholder="Where is the resource needed?" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-1">District</label>
            <input value={form.district} onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))} placeholder="District" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-red-500/50" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-3 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all disabled:opacity-50">
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </main>
  );
}
