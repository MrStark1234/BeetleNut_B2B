import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://beetlenut-b2b.onrender.com/api" || "http://localhost:80", // server port
        changeOrigin: true,
      },
    },
  },
});
