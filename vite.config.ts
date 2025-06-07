import {defineConfig} from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [tailwindcss()],
    resolve: {
        alias: {
            "@": "/src",
        }
    },
    base: 'https://francoisjourden.github.io/caps-art/'
})