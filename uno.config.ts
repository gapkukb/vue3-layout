import { defineConfig, presetMini, transformerDirectives } from 'unocss';

import presetRemToVw from '@any-u/unocss-preset-rem-to-vw';

export default defineConfig({
  presets: [
    presetMini({}),
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
