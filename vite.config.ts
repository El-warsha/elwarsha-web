import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  if (mode === "production" && !env.VITE_API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is required for production builds");
  }

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
        "@core": fileURLToPath(new URL("./src/core", import.meta.url)),
        "@entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
        "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
        "@ui": fileURLToPath(new URL("./src/ui", import.meta.url)),
        "@test": fileURLToPath(new URL("./src/test", import.meta.url)),
      },
    },
  };
});
