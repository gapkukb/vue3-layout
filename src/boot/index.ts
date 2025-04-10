import { useApp } from '@/pinia/index.js';
import hello from './hello/hello.js';

const aa = window.XMLHttpRequest;
console.log(window.XMLHttpRequest);
export default async function boot() {
  const app = useApp();

  await hello();
  console.log('after boot');
  console.log(window.XMLHttpRequest);

  setTimeout(() => {
    console.log(aa);
  }, 3000);

  await app.updateConfiguration();
  console.log(22222222);

  return 1;
}
