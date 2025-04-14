import type { App } from 'vue';
import { Lazyload } from 'vant';
import { Swiper, SwiperSlide } from './swiper';

export default function registerGlobalComponents(app: App) {
  app.use(Lazyload);
  app.component('Swiper', Swiper);
  app.component('SwiperSlide', SwiperSlide);
}
