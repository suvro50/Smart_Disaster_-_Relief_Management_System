import { useEffect, useState } from "react";
import ResourceForm from "../../components/forms/ResourceForm";
import { disasterService } from "../../services/disasterService";
import { resourceService } from "../../services/resourceService";

const STATUS_COLORS = {
  available: "bg-green-500/20 text-green-400",
  low_stock: "bg-yellow-500/20 text-yellow-400",
  depleted: "bg-red-500/20 text-red-400",
  allocated: "bg-blue-500/20 text-blue-400",
};

export default function ResourceManager() {
  const [resources, setResources] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [resourceId, setResourceId] = useState("");
  const [disasterId, setDisasterId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [showForm, setShowForm] = useState(false);

  const loadData = async () => {
    try {
      const [resourceData, disasterData, allocationData] = await Promise.all([
        resourceService.getAll(), disasterService.getAll(), resourceService.getAllocations()
      ]);
      setResources(resourceData || []);
      setDisasters(disasterData || []);
      setAllocations(allocationData || []);
      if (!resourceId && resourceData?.length) setResourceId(String(resourceData[0].id));
      if (!disasterId && disasterData?.length) setDisasterId(String(disasterData[0].id));
    } catch {}
  };

  useEffect(() => { loadData(); }, []);

  const handleAllocate = async () => {
    if (!resourceId || !disasterId) return;
    try {
      await resourceService.allocateToDisaster(resourceId, disasterId, { quantity_allocated: Number(quantity) });
      await loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Allocation failed");
    }
  };

  return (
    <main className="page">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          Resource Manager
        </h2>
        <button onClick={() => setShowForm(!showForm)} className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
          {showForm ? "Close" : "+ Add Resource"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 mb-6">
          <ResourceForm onSuccess={() => { setShowForm(false); loadData(); }} />
        </div>
      )}

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 mb-6">
        <h4 className="text-white font-semibold mb-3">Allocate Resource to Disaster</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select value={resourceId} onChange={(e) => setResourceId(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
            {resources.map((r) => (<option key={r.id} value={r.id} className="bg-gray-900">{r.name} (Qty: {r.quantity})</option>))}
          </select>
          <select value={disasterId} onChange={(e) => setDisasterId(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50">
            {disasters.map((d) => (<option key={d.id} value={d.id} className="bg-gray-900">{d.title}</option>))}
          </select>
          <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" min="1" placeholder="Qty" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500/50" />
          <button onClick={handleAllocate} className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold py-2.5 rounded-lg hover:from-red-500 hover:to-orange-500 transition-all">Allocate</button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 mb-6">
        <h4 className="text-white font-semibold mb-3">Inventory</h4>
        <div className="space-y-2">
          {resources.map((r) => (
            <div key={r.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
              <div>
                <p className="text-white text-sm">{r.name}</p>
                <p className="text-white/40 text-xs">{r.category} • {r.district}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/60 text-sm">{r.quantity} {r.unit}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLORS[r.status] || STATUS_COLORS.available}`}>{r.status?.replace("_", " ")}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
        <h4 className="text-white font-semibold mb-3">Allocation History</h4>
        {allocations.length === 0 ? (
          <p className="text-white/30 text-sm">No allocations yet</p>
        ) : (
          <div className="space-y-2">
            {allocations.map((a) => (
              <div key={a.id} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                <span className="text-white text-sm">{a.resource?.name} → {a.disaster?.title}</span>
                <span className="text-white/60 text-sm">{a.quantity_allocated}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
