import Badge from "../ui/Badge";

export default function SeverityBadge({ severity = "info" }) {
  const toneMap = { info: "neutral", warning: "warning", danger: "danger", critical: "danger" };
  return <Badge label={severity.toUpperCase()} tone={toneMap[severity] || "neutral"} />;
}
