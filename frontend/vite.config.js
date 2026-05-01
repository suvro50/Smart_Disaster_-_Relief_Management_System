import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:5002",
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-leaflet") || id.includes("leaflet")) return "map-vendor";
            if (id.includes("recharts") || id.includes("d3-")) return "charts-vendor";
            if (id.includes("framer-motion") || id.includes("gsap")) return "animation-vendor";
            if (id.includes("react-router-dom")) return "router-vendor";
            if (id.includes("socket.io-client")) return "socket-vendor";
            return "vendor";
          }
        }
      }
    }
  }
});
