import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";
import icon from "astro-icon";
const simpleIcons = (
    await import("@iconify-json/simple-icons/icons.json", {
        assert: { type: "json" },
    })
).default;
const lucide = (
    await import("@iconify-json/lucide/icons.json", {
        assert: { type: "json" },
    })
).default;

export default defineConfig({
    base: "./", // важна относительная база
    site: "https://example.com",
    integrations: [
        icon({ collections: { "simple-icons": simpleIcons, lucide } }),
    ],
    vite: { plugins: [tailwind()] },
});
