import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CATEGORY_COLORS = {
  food: "#4caf50",
  water: "#2196f3",
  medicine: "#9c27b0",
  shelter: "#ff9800",
  equipment: "#607d8b",
  vehicle: "#795548",
  clothing: "#e91e63",
  other: "#9e9e9e",
};

export default function ResourceBarChart({ resources = [] }) {
  const grouped = {};
  resources.forEach((r) => {
    const cat = r.category || "other";
    if (!grouped[cat]) grouped[cat] = { category: cat, total: 0, available: 0 };
    grouped[cat].total += Number(r.quantity) || 0;
    if (r.status === "available") grouped[cat].available += Number(r.quantity) || 0;
  });

  const data = Object.values(grouped);

  if (data.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
        <h4 className="text-white/60 text-sm mb-2">Resource Inventory</h4>
        <p className="text-white/30 text-xs">No resource data yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
      <h4 className="text-white/60 text-sm mb-2">Resource Inventory</h4>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="category" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
          <Tooltip
            contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
            itemStyle={{ color: "#fff" }}
            labelStyle={{ color: "rgba(255,255,255,0.6)" }}
          />
          <Bar dataKey="total" fill="#ff8c42" radius={[4, 4, 0, 0]} name="Total" />
          <Bar dataKey="available" fill="#4caf50" radius={[4, 4, 0, 0]} name="Available" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
