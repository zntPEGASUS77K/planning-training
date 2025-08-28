import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig, type PluginOption } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
    plugins: [
        react(),
        mode === "development" && (screenGraphPlugin() as PluginOption)
    ].filter(Boolean),
    publicDir: "./static",
    base: "./",
    css: {
        postcss: {
            plugins: [tailwind()],
        },
    },
}));