import { getWeatherByDistrictName, getWeatherRiskIndicator } from "../services/weatherService.js";
import { sendError, sendSuccess } from "../utils/response.js";

export const getWeatherByDistrict = async (req, res) => {
  try {
    const weather = await getWeatherByDistrictName(req.params.district);
    const riskIndicator = getWeatherRiskIndicator(weather);
    return sendSuccess(
      res,
      {
        weather,
        riskIndicator
      },
      "Weather fetched successfully."
    );
  } catch (error) {
    return sendError(res, error.message || "Failed to fetch weather.", 400);
  }
};
