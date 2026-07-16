import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { githubPagesSpa } from "@sctg/vite-plugin-github-pages-spa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    githubPagesSpa(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
