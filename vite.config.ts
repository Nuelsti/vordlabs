import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
