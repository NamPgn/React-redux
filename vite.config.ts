import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginRewriteAll from "vite-plugin-rewrite-all";
// https://vitejs.dev/config/
// export default defineConfig({ plugins: [react()]},);
export default defineConfig(({ mode }): any => {
  return {
    plugins: [react(), pluginRewriteAll()],
    build: {
      minify: "esbuild", // hoặc 'terser'
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
  };
});
