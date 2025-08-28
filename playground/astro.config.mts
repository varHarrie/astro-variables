import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { createResolver } from "astro-integration-kit";
import { hmrIntegration } from "astro-integration-kit/dev";

const { default: variables } = await import("astro-variables");

// https://astro.build/config
export default defineConfig({
  integrations: [
    variables(),
    hmrIntegration({
      directory: createResolver(import.meta.url).resolve("../package/dist"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
