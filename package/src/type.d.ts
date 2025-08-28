declare module "astro:variables" {
  export * from "astro-variables/virtual-module";
  export { default } from "astro-variables/virtual-module";
}

declare module "astro-variables/component" {
  export default function Component(props: any): JSX.Element;
}
