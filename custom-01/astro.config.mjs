// astro.config.mjs
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// Iconify collections (TLA ok in Astro)
const simpleIcons = (
  await import("@iconify-json/simple-icons/icons.json", {
    assert: { type: "json" },
  })
).default;
const lucide = (
  await import("@iconify-json/lucide/icons.json", { assert: { type: "json" } })
).default;

export default defineConfig({
  base: "./", // важна относительная база
  site: "https://example.com", // ← change to your domain
  output: "static", // or 'hybrid'/'server' if using an adapter
  // adapter: vercel(), // uncomment when you deploy to Vercel
  integrations: [
    icon({
      collections: {
        "simple-icons": simpleIcons,
        lucide: lucide,
      },
    }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        assets: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
    },
  },
});
