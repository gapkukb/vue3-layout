import { yamiLoader } from 'yami-loader';

export default Promise.all([scrollTimeLine(), smoothscroll(), scrollend()]);

async function scrollTimeLine() {
  if ('ScrollTimeline' in window) return;
  return yamiLoader.loadScript('/3rd/scroll-timeline.min.js');
}

async function smoothscroll() {
  if ('scrollBehavior' in document.documentElement.style) return;
  const polyfill = await import(/** webpackChunkName:"smoothscroll-polyfill"**/ 'smoothscroll-polyfill');
  polyfill.polyfill();
}

async function scrollend() {
  if ('onscrollend' in window) return;
  const polyfill = await import(/** webpackChunkName:"scrollend-polyfill"**/ '@af-utils/scrollend-polyfill');
  console.log(polyfill);
}
