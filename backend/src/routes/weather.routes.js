import { Router } from "express";
import { getWeatherByDistrict } from "../controllers/weatherController.js";

const router = Router();

router.get("/:district", getWeatherByDistrict);

export default router;
