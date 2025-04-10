import { useApp } from '@/pinia/index.js';
import hello from './hello/hello.js';

export default async function boot() {
  const app = useApp();

  console.log('222222222');

  await hello();
  console.log('3333333333');
  await app.updateConfiguration();

  return 1;
}
