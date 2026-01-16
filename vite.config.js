import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/vaquita/",
  build: {
    outDir: "docs",
  },
  plugins: [react()],
});
