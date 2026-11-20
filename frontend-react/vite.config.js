import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    dedupe: ["react", "react-dom"],
  },

  server: {
    port: 5173, //where is my react app running
    proxy: {
      //All urls without me typing api
      "/api": {
        target: "http://localhost:5001", //any request to api send ir to this target
        changeOrigin: true, //
      },
    },
  },

  test: {
    css: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.js",
    globals: true,
  },
});
