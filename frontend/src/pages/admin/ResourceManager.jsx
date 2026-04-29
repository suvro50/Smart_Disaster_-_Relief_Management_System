import { useEffect, useState } from "react";
import ResourceForm from "../../components/forms/ResourceForm";
import { disasterService } from "../../services/disasterService";
import { resourceService } from "../../services/resourceService";

export default function ResourceManager() {
  const [resources, setResources] = useState([]);
  const [disasters, setDisasters] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [resourceId, setResourceId] = useState("");
  const [disasterId, setDisasterId] = useState("");
  const [quantity, setQuantity] = useState("1");

  const loadData = async () => {
    const [resourceData, disasterData, allocationData] = await Promise.all([
      resourceService.getAll(),
      disasterService.getAll(),
      resourceService.getAllocations()
    ]);
    setResources(resourceData || []);
    setDisasters(disasterData || []);
    setAllocations(allocationData || []);
    if (!resourceId && resourceData?.length) setResourceId(String(resourceData[0].id));
    if (!disasterId && disasterData?.length) setDisasterId(String(disasterData[0].id));
  };

  useEffect(() => {
    loadData().catch(() => undefined);
  }, []);

  const handleAllocate = async () => {
    if (!resourceId || !disasterId) return;
    await resourceService.allocateToDisaster(resourceId, disasterId, {
      quantity_allocated: Number(quantity)
    });
    await loadData();
  };

  return (
    <main className="page">
      <h2>Resource Manager</h2>
      <ResourceForm />
      <div className="card">
        <h4>Allocate Resource to Disaster</h4>
        <div className="form">
          <select value={resourceId} onChange={(e) => setResourceId(e.target.value)}>
            {resources.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} (Qty: {item.quantity})
              </option>
            ))}
          </select>
          <select value={disasterId} onChange={(e) => setDisasterId(e.target.value)}>
            {disasters.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
          <input value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
          <button type="button" onClick={handleAllocate}>
            Allocate
          </button>
        </div>
      </div>
      <div className="card">
        <h4>Allocation History</h4>
        {allocations.length ? (
          allocations.map((item) => (
            <p key={item.id}>
              {item.resource?.name} → {item.disaster?.title} : {item.quantity_allocated}
            </p>
          ))
        ) : (
          <p>No allocations yet.</p>
        )}
      </div>
    </main>
  );
}
