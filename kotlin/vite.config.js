import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: [
      /^@rescui\//,
      "@jetbrains/kotlin-web-site-ui",
    ],
    external: [
      "react-outside-click-handler",
      "body-scroll-lock",
      "algoliasearch"
    ]
  },
  optimizeDeps: {
    holdUntilCrawlEnd: true,
    include: [
      '@rescui/button',
      '@rescui/ui-contexts',
      '@rescui/focus-manager',
      '@rescui/switcher',
      '@jetbrains/kotlin-web-site-ui/out/components/header',
      '@jetbrains/kotlin-web-site-ui/out/components/footer',
      'algoliasearch',
      'react-scrollbar-size'
    ],
  },
  define: {
    global: "globalThis"
  },
});