import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

export default function ResourceGauge({ label = "Resource Stock", value = 65 }) {
  const gaugeValue = Math.max(0, Math.min(100, Number(value) || 0));
  const data = [{ name: label, value: gaugeValue, fill: gaugeValue > 50 ? "#4caf50" : gaugeValue > 25 ? "#ffb300" : "#ff1744" }];

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
      <p className="text-white/60 text-sm mb-1">{label}</p>
      <RadialBarChart
        width={220}
        height={140}
        cx="50%"
        cy="90%"
        innerRadius="50%"
        outerRadius="100%"
        barSize={14}
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar background clockWise dataKey="value" cornerRadius={8} />
      </RadialBarChart>
      <h4 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-center">{gaugeValue}%</h4>
    </div>
  );
}
