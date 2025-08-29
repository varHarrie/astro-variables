import { AsyncLocalStorage } from "node:async_hooks";
import type { APIContext, MiddlewareNext } from "astro";
import { setStorage } from "./storage.js";

const storage = new AsyncLocalStorage<Record<string, any>>();
setStorage(storage);

export function defineVariables(
  getter: (ctx: APIContext) => Promise<AstroVariables.Variables>
) {
  return async (ctx: APIContext, next: MiddlewareNext) => {
    const variables = await getter(ctx);
    const response = await storage.run(variables, next);

    if (response.headers.get("content-type")?.includes("text/html")) {
      let html = await response.text();

      const script = `<script>window.__astro_variables__ = ${JSON.stringify(
        variables
      )};</script>`;

      const scriptRegex = /<script\b/i;
      if (scriptRegex.test(html)) {
        html = html.replace(scriptRegex, `${script}\n<script`);
      } else {
        html = html.replace("</head>", `${script}</head>`);
      }

      return new Response(html, {
        status: response.status,
        headers: response.headers,
      });
    }

    return response;
  };
}
