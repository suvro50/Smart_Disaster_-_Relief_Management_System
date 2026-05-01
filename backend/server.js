import http from "node:http";
import app from "./src/app.js";
import { env } from "./src/config/env.js";
import { connectDatabase, sequelize } from "./src/config/database.js";
import { initializeSocket } from "./src/config/socket.js";

const server = http.createServer(app);
initializeSocket(server);

const startServer = async () => {
  try {
    await connectDatabase();
    await sequelize.sync({ force: false });

    server.listen(env.port, "0.0.0.0", () => {
      console.log(`✅ API server running on http://localhost:${env.port}`);
      console.log(`✅ Frontend: https://kiln-riches-scoff.ngrok-free.dev`);
      console.log(`✅ System ready - users can now register with their real emails!`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
