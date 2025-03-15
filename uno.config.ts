import { defineConfig, presetMini } from "unocss";
import presetRemToVw from "@any-u/unocss-preset-rem-to-vw";

export default defineConfig({
  presets: [
    presetMini({}),
    presetRemToVw({
      baseFontSize: 4,
      // viewportWidth: 37.5,
      unitPrecision: 5,
    }),
  ],
});
