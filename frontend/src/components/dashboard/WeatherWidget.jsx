import { useWeather } from "../../hooks/useWeather";

export default function WeatherWidget({ district = "Dhaka" }) {
  const weather = useWeather(district);
  const weatherInfo = weather?.weather;
  const risk = weather?.riskIndicator;

  return (
    <div className="card">
      <p>Weather: {district}</p>
      <h4>{weatherInfo?.weather?.[0]?.main || "Loading..."}</h4>
      <small>{weatherInfo?.main?.temp ? `${Math.round(weatherInfo.main.temp)}°C` : ""}</small>
      {risk ? (
        <small>
          Risk: {risk.level.toUpperCase()} ({risk.score})
        </small>
      ) : null}
    </div>
  );
}
