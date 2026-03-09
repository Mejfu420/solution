import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: [/^@rescui\//],
  },
  optimizeDeps: {
    holdUntilCrawlEnd: true,
    include: ['@rescui/button', '@rescui/ui-contexts'],
  },
});