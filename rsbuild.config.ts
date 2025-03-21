import path from "node:path";
import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginVueJsx } from "@rsbuild/plugin-vue-jsx";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginStylus } from "@rsbuild/plugin-stylus";
import AutoImport from "unplugin-auto-import/rspack";
import Components from "unplugin-vue-components/rspack";
import { VantResolver } from "unplugin-vue-components/resolvers";
import proxy from "./build/proxy";

const { publicVars: definitions } = loadEnv({ prefixes: ["VUE_APP_"] });
const distAssets = "assets";
const dtsDir = "typing";

export default defineConfig({
  html: {
    template: "public/index.html",
  },
  plugins: [pluginVue(), pluginVueJsx(), pluginSass(), pluginStylus()],

  output: {
    injectStyles: true,
    distPath: {
      js: `${distAssets}/js`,
      css: `${distAssets}/css`,
      media: `${distAssets}/media`,
      assets: `${distAssets}/assets`,
      svg: `${distAssets}/svg`,
      image: `${distAssets}/image`,
      wasm: `${distAssets}/wasm`,
      font: `${distAssets}/font`,
      jsAsync: `${distAssets}/js/asnyc`,
      cssAsync: `${distAssets}/css/asnyc`,
    },
  },
  source: {
    define: definitions,
    entry: {
      index: path.resolve(__dirname, "./src/index.ts"),
    },
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  tools: {
    rspack: {
      plugins: [
        AutoImport({
          dts: `${dtsDir}/auto-imports.d.ts`,
          resolvers: [VantResolver()],
        }),
        Components({
          dts: `${dtsDir}/components.d.ts`,
          resolvers: [VantResolver()],
        }),
      ],
    },
  },
  server: { proxy },
});
