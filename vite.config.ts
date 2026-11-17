import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [preact(), tailwindcss()],
  server: {
    host: true,
  },
  preview: {
    host: true,
  },
});
