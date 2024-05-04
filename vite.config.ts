import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
// https://vitejs.dev/config/
// export default defineConfig({ plugins: [react()]},);
export default defineConfig(({ mode }): any => {
  // if (mode === "production") {
  //   dotenv.config({ path: ".env.production" });
  // }
  return {
    plugins: [react()],
  };
});
