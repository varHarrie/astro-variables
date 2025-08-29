import { defineConfig } from "tsup";
import pkg from "./package.json";

export default defineConfig((options) => {
  const dev = !!options.watch;
  return {
    entry: ["src/**/*.(ts|js)"],
    format: ["esm"],
    target: "node18",
    bundle: false,
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false,
    minify: !dev,
    external: [...Object.keys(pkg.peerDependencies)],
    tsconfig: "tsconfig.json",
  };
});
