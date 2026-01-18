import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  base: "/cosmic-ui/",
  plugins: [react()],
  resolve: {
    alias: {
      "@stargazers-stella/cosmic-ui": path.resolve(__dirname, "../../src"),
    },
  },
  server: {
    port: 4173,
  },
});
