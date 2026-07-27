import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    assetsDir: "assets/site",
    chunkSizeWarningLimit: 750,
    rollupOptions: {
      input: resolve(__dirname, "app.html"),
    },
  },
});
