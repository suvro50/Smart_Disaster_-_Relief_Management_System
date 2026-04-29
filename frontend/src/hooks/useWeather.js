import { useEffect, useState } from "react";
import { weatherService } from "../services/weatherService";

export const useWeather = (district) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    if (!district) return;
    weatherService.byDistrict(district).then(setWeather).catch(() => setWeather(null));
  }, [district]);
  return weather;
};
