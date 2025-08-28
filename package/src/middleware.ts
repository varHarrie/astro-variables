import { AsyncLocalStorage } from "node:async_hooks";
import type { APIContext, MiddlewareNext } from "astro";
import { setStorage } from "./storage.ts";

const storage = new AsyncLocalStorage<Record<string, any>>();
setStorage(storage);

export function defineVariables(
  getter: (ctx: APIContext) => Promise<Record<string, any>>
) {
  return async (ctx: APIContext, next: MiddlewareNext) => {
    const variables = await getter(ctx);
    return storage.run(variables, next);
  };
}
