const TYPE_WEIGHT = {
  flood: 14,
  earthquake: 18,
  cyclone: 16,
  fire: 12,
  landslide: 13,
  drought: 10,
  tsunami: 20,
  other: 8
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const calculateDisasterRiskScore = (payload = {}) => {
  const {
    type = "other",
    affected_population = 0,
    casualties = 0,
    injuries = 0,
    weather_risk_score = 0
  } = payload;

  const populationFactor = clamp(Math.log10(Number(affected_population) + 1) * 12, 0, 30);
  const casualtyFactor = clamp(Number(casualties) * 2.3, 0, 22);
  const injuryFactor = clamp(Number(injuries) * 0.9, 0, 14);
  const weatherFactor = clamp(Number(weather_risk_score) * 0.2, 0, 20);
  const typeFactor = TYPE_WEIGHT[type] ?? TYPE_WEIGHT.other;

  const score = clamp(typeFactor + populationFactor + casualtyFactor + injuryFactor + weatherFactor, 0, 100);

  let severity = "low";
  if (score >= 80) severity = "critical";
  else if (score >= 60) severity = "high";
  else if (score >= 35) severity = "medium";

  return {
    score: Math.round(score),
    severity,
    factors: {
      typeFactor: Number(typeFactor.toFixed(2)),
      populationFactor: Number(populationFactor.toFixed(2)),
      casualtyFactor: Number(casualtyFactor.toFixed(2)),
      injuryFactor: Number(injuryFactor.toFixed(2)),
      weatherFactor: Number(weatherFactor.toFixed(2))
    }
  };
};
