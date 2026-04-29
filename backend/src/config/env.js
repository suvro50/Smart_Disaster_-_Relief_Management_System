import dotenv from "dotenv";

dotenv.config();

const parseBoolean = (value, fallback = false) => {
  if (value === undefined) return fallback;
  return value === "true";
};

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT || 5000),
  apiVersion: process.env.API_VERSION || "v1",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET || "development_secret_change_me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY || "",
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    name: process.env.DB_NAME || "smart_disaster_db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    dialect: process.env.DB_DIALECT || "mysql",
    logging: parseBoolean(process.env.DB_LOGGING, false)
  }
};
