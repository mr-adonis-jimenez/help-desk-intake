/**
 * Type stubs for Replit-specific Vite plugins.
 * These are only used in the Replit development environment.
 */
declare module "@replit/vite-plugin-runtime-error-modal" {
  import { Plugin } from "vite";
  export default function runtimeErrorOverlay(): Plugin;
}

declare module "@replit/vite-plugin-cartographer" {
  import { Plugin } from "vite";
  export function cartographer(options: { root: string }): Plugin;
}

declare module "@replit/vite-plugin-dev-banner" {
  import { Plugin } from "vite";
  export function devBanner(): Plugin;
}
