import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import { requestLogger } from "./middleware/logger.middleware.js";
import aidRoutes from "./routes/aid.routes.js";
import alertRoutes from "./routes/alert.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import disasterRoutes from "./routes/disaster.routes.js";
import evacuationRoutes from "./routes/evacuation.routes.js";
import reportRoutes from "./routes/report.routes.js";
import rescueRoutes from "./routes/rescue.routes.js";
import resourceRoutes from "./routes/resource.routes.js";
import volunteerRoutes from "./routes/volunteer.routes.js";
import weatherRoutes from "./routes/weather.routes.js";
import { sendSuccess } from "./utils/response.js";

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(helmet());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));
app.use(requestLogger);

app.get("/health", (_req, res) => {
  return sendSuccess(
    res,
    {
      status: "ok",
      service: "smart-disaster-relief-backend",
      env: env.nodeEnv
    },
    "Service healthy"
  );
});

app.get(`/api/${env.apiVersion}`, (_req, res) => {
  return sendSuccess(res, null, "Smart Disaster Relief API is running");
});

app.use(`/api/${env.apiVersion}/auth`, authRoutes);
app.use(`/api/${env.apiVersion}/disasters`, disasterRoutes);
app.use(`/api/${env.apiVersion}/aid-requests`, aidRoutes);
app.use(`/api/${env.apiVersion}/rescue-teams`, rescueRoutes);
app.use(`/api/${env.apiVersion}/resources`, resourceRoutes);
app.use(`/api/${env.apiVersion}/alerts`, alertRoutes);
app.use(`/api/${env.apiVersion}/evacuation-zones`, evacuationRoutes);
app.use(`/api/${env.apiVersion}/volunteers`, volunteerRoutes);
app.use(`/api/${env.apiVersion}/reports`, reportRoutes);
app.use(`/api/${env.apiVersion}/dashboard`, dashboardRoutes);
app.use(`/api/${env.apiVersion}/weather`, weatherRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
