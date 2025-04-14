import { useApp } from '@/pinia/index.js';
import hello from './hello/hello.js';
import polyfill from './polyfill';
import components from './components';
import type { App } from 'vue';

export default async function boot(app: App) {
  const appStore = useApp();

  await Promise.all([hello(), polyfill, components(app)]);
  // await app.updateConfiguration();

  return 1;
}
