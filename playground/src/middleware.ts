import { defineVariables } from "astro-variables";
import { sequence } from "astro:middleware";

const variables = defineVariables(async () => {
  return {
    hello: "Hello World",
    count: 1,
  };
});

export const onRequest = sequence(variables /** ...other middlewares */);
