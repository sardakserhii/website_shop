import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
    base: "./", // важна относительная база
    vite: {
        plugins: [tailwind()],
    },
    server: {
        port: 4321,
    },
});
