import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = {
  low: "#4caf50",
  medium: "#ffb300",
  high: "#ff7043",
  critical: "#ff1744",
};

export default function SeverityDonut({ disasters = [] }) {
  const counts = { low: 0, medium: 0, high: 0, critical: 0 };
  disasters.forEach((d) => {
    if (counts[d.severity] !== undefined) counts[d.severity]++;
  });

  const data = Object.entries(counts)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
        <h4 className="text-white/60 text-sm mb-2">Severity Distribution</h4>
        <p className="text-white/30 text-xs">No disaster data yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
      <h4 className="text-white/60 text-sm mb-2">Severity Distribution</h4>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "#607d8b"} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend
            formatter={(value) => <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
