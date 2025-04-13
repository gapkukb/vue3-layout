import { useApp } from '@/pinia/index.js';
import hello from './hello/hello.js';
import polyfill from './polyfill';

export default async function boot() {
  const app = useApp();

  await Promise.all([hello(), polyfill]);
  // await app.updateConfiguration();

  return 1;
}
