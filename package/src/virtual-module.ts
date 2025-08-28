import { getStorage } from "./storage.ts";

declare global {
  interface Window {
    __astro_variables?: Record<string, any>;
  }
}

interface Variables {
  (): Record<string, any>;
  [key: string]: any;
}

export const variables: Variables = new Proxy(
  () => {
    const store = getStorage()?.getStore();
    if (store) return store;

    const variables = window?.__astro_variables;
    if (variables) return variables;

    return {};
  },
  {
    get(target, prop) {
      return target()[prop as string];
    },
    set(target, prop, value) {
      const data = target();
      data[prop as string] = value;
      return true;
    },
  }
);

export default variables;
