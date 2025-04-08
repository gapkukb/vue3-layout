import type { App } from 'vue';
export { default as useApp } from './app';
export { default as useUser } from './user';

const pinia = createPinia();

export default function (app: App) {
  app.use(pinia);
  //   app.config.globalProperties.$pinia = pinia;
  //   app.provide("$pinia", pinia);
}
