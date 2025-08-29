# `astro-variables`

This is an [Astro integration](https://docs.astro.build/en/guides/integrations-guide/) that manages variables between server and client in Astro projects.

## Usage

### Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add astro-variables
```

```bash
npx astro add astro-variables
```

```bash
yarn astro add astro-variables
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add astro-variables
```

```bash
npm install astro-variables
```

```bash
yarn add astro-variables
```

2. Add the integration to your astro config

```diff
+import variables from "astro-variables";

export default defineConfig({
  integrations: [
+    variables(),
  ],
});
```

3. Add middleware

```ts
import { defineVariables } from "astro-variables";
import { sequence } from "astro:middleware";

const variables = defineVariables(async () => {
  return {
    hello: "Hello World",
    count: 1,
  };
});

export const onRequest = sequence(variables /** ...other middlewares */);
```

4. Use the variables in your components

```tsx
---
import variables from 'astro:variables';

// Access the variables in your server-side code:

console.log(variables.hello, variables.count); // Get value by property
console.log(variables()); // Execute the function to get all variables
---

<p>Hello: {variables.hello}</p>
<p>Count: {variables.count}</p>
<p>All: {JSON.stringify(variables())}</p>

<script>
  // Access the variables in your client-side code:
  import variables from 'astro:variables';

  console.log(variables.hello, variables.count); // Get value by property
  console.log(variables()); // Execute the function to get all variables
</script>

## Contributing

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `package` contains the actual package

Install dependencies using pnpm:

```bash
pnpm i --frozen-lockfile
```

Start the playground and package watcher:

```bash
pnpm dev
```

You can now edit files in `package`. Please note that making changes to those files may require restarting the playground dev server.

## Licensing

[MIT Licensed](https://github.com/varharrie/astro-variables/blob/main/LICENSE). Made with ❤️ by [varHarrie](https://github.com/varharrie).

## Acknowledgements

- Created using [astro-integration-template](https://github.com/florian-lefebvre/astro-integration-template).
- Inspired by the [astro-global](https://github.com/lilnasy/gratelets/tree/main/packages/global).
