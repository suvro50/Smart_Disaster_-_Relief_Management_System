import axios from "axios";
import { env } from "../config/env.js";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const getWeatherByDistrictName = async (district) => {
  if (!env.openWeatherApiKey) {
    throw new Error("OPENWEATHER_API_KEY is missing in environment variables.");
  }

  const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      q: district,
      appid: env.openWeatherApiKey,
      units: "metric"
    }
  });

  return response.data;
};

export const getWeatherRiskIndicator = (weatherData) => {
  const windSpeed = Number(weatherData?.wind?.speed || 0);
  const rain1h = Number(weatherData?.rain?.["1h"] || 0);
  const rain3h = Number(weatherData?.rain?.["3h"] || 0);
  const clouds = Number(weatherData?.clouds?.all || 0);
  const thunderstorm = weatherData?.weather?.some((item) => item.main === "Thunderstorm") ? 18 : 0;

  const score = clamp(
    windSpeed * 3 + rain1h * 8 + rain3h * 3 + clouds * 0.25 + thunderstorm,
    0,
    100
  );

  let level = "low";
  if (score >= 75) level = "critical";
  else if (score >= 55) level = "high";
  else if (score >= 30) level = "medium";

  return {
    score: Math.round(score),
    level,
    triggers: {
      windSpeed,
      rain1h,
      rain3h,
      clouds
    }
  };
};
