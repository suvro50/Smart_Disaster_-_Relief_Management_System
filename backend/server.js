import http from "node:http";
import app from "./src/app.js";
import { env } from "./src/config/env.js";
import { connectDatabase } from "./src/config/database.js";
import { initializeSocket } from "./src/config/socket.js";

const server = http.createServer(app);
initializeSocket(server);

const startServer = async () => {
  try {
    await connectDatabase();

    server.listen(env.port, () => {
      console.log(`API server running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
  
  
};

startServer();
