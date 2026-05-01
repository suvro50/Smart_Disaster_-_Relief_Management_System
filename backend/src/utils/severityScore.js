export function calculateSeverity({ type, affected_population = 0, casualties = 0, injuries = 0 }) {
  let score = 0;

  // Type base weight
  const typeWeights = {
    tsunami: 40,
    cyclone: 35,
    earthquake: 35,
    flood: 25,
    landslide: 20,
    fire: 20,
    drought: 15,
    other: 10,
  };
  score += typeWeights[type] || 10;

  // Population impact
  if (affected_population > 100000) score += 30;
  else if (affected_population > 50000) score += 25;
  else if (affected_population > 10000) score += 20;
  else if (affected_population > 1000) score += 15;
  else if (affected_population > 100) score += 10;
  else score += 5;

  // Casualties
  if (casualties > 50) score += 25;
  else if (casualties > 10) score += 20;
  else if (casualties > 0) score += 10;

  // Injuries
  if (injuries > 100) score += 15;
  else if (injuries > 20) score += 10;
  else if (injuries > 0) score += 5;

  // Cap at 100
  score = Math.min(100, score);

  const severity = score >= 75 ? "critical" : score >= 50 ? "high" : score >= 25 ? "medium" : "low";

  return { score, severity };
}

export function getRiskLevel(score) {
  if (score >= 75) return { level: "extreme", color: "#ff1744" };
  if (score >= 50) return { level: "high", color: "#ff7043" };
  if (score >= 25) return { level: "moderate", color: "#ffb300" };
  return { level: "low", color: "#4caf50" };
}
