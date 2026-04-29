import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

export default function ResourceGauge({ label = "Resource Stock", value = 65 }) {
  const gaugeValue = Math.max(0, Math.min(100, Number(value) || 0));
  const data = [{ name: label, value: gaugeValue, fill: "#ff8c42" }];

  return (
    <div className="card">
      <p>{label}</p>
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
      <h4>{gaugeValue}%</h4>
    </div>
  );
}
