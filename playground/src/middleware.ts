import { defineVariables } from "astro-variables/middleware";
import { sequence } from "astro:middleware";

const variables = defineVariables(async (_ctx) => {
  return {
    a: 1,
    b: 2,
  };
});

export const onRequest = sequence(variables);
