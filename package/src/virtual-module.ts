import { getStorage } from "./storage.js";

declare global {
  interface Window {
    __astro_variables__?: Record<string, any>;
  }

  namespace AstroVariables {
    interface Variables {}
  }
}

interface VariablesProxy extends AstroVariables.Variables {
  (): AstroVariables.Variables;
}

export const variables: VariablesProxy = new Proxy(
  () => {
    const store = getStorage()?.getStore();
    if (store) return store;

    const variables = window?.__astro_variables__;
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
