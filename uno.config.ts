import { defineConfig, presetWind4, transformerDirectives, presetAttributify } from 'unocss';
import presetRemToVw from '@any-u/unocss-preset-rem-to-vw';

const remRE = /(-?[.\d]+)rem/g;
export default defineConfig({
  theme: {
    spacing: {
      ...Array.from({ length: 100 }, (_, i) => `calc(var(--size)*${i}rem)`),
    },
  },
  presets: [
    presetAttributify({}),
    presetWind4({ reset: false }),
    presetRemToVw({
      baseFontSize: 4,
      // viewportWidth: 37.5,
      unitPrecision: 5,
    }),
  ],
  transformers: [transformerDirectives()],
  rules: [
    ['bg-cover', { 'background-size': 'cover' }],
    ['bg-contain', { 'background-size': 'contain' }],
    ['bg-full', { 'background-size': '100% 100%' }],

    ['bg-center', { 'background-position': 'center' }],
    [
      'bg-no-repeat',
      {
        'background-repeat': 'no-repeat',
      },
    ],
  ],
});
