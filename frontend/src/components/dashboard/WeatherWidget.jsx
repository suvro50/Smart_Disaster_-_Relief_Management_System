import { useWeather } from "../../hooks/useWeather";

const RISK_COLORS = {
  low: "text-green-400",
  moderate: "text-yellow-400",
  high: "text-orange-400",
  extreme: "text-red-400",
};

export default function WeatherWidget({ district = "Dhaka" }) {
  const weather = useWeather(district);
  const weatherInfo = weather?.weather;
  const risk = weather?.riskIndicator;

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
      <p className="text-white/50 text-sm">Weather: {district}</p>
      <h4 className="text-white font-semibold text-lg mt-1">{weatherInfo?.weather?.[0]?.main || "Loading..."}</h4>
      <div className="flex items-center gap-3 mt-2">
        <span className="text-2xl">
          {weatherInfo?.weather?.[0]?.main === "Rain" ? "🌧️" :
           weatherInfo?.weather?.[0]?.main === "Clouds" ? "☁️" :
           weatherInfo?.weather?.[0]?.main === "Clear" ? "☀️" :
           weatherInfo?.weather?.[0]?.main === "Thunderstorm" ? "⛈️" : "🌤️"}
        </span>
        <div>
          <p className="text-white text-sm">{weatherInfo?.main?.temp ? `${Math.round(weatherInfo.main.temp)}°C` : "—"}</p>
          {weatherInfo?.main?.humidity && <p className="text-white/40 text-xs">Humidity: {weatherInfo.main.humidity}%</p>}
        </div>
      </div>
      {risk && (
        <div className="mt-2 pt-2 border-t border-white/5">
          <p className={`text-xs font-medium ${RISK_COLORS[risk.level] || "text-white/50"}`}>
            Risk: {risk.level.toUpperCase()} ({risk.score})
          </p>
        </div>
      )}
    </div>
  );
}
