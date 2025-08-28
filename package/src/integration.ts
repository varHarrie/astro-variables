import { defineIntegration } from "astro-integration-kit";
import "./type.d.ts";

export const integration = defineIntegration({
  name: "astro-variables",
  setup() {
    return {
      hooks: {
        "astro:config:setup"({ updateConfig }) {
          updateConfig({
            vite: {
              plugins: [
                {
                  name: "astro-variables",
                  resolveId(source) {
                    return source === "astro:variables"
                      ? this.resolve("astro-variables/virtual-module")
                      : undefined;
                  },
                },
              ],
            },
          });
        },
      },
    };
  },
});
