import type { Directives } from '@/directives';
import type { Swiper, SwiperSlide } from 'swiper/vue';
declare module 'vue' {
  interface ComponentCustomProperties extends Directives {
    $http: typeof axios;
    $translate: (key: string) => string;
  }

  export interface GlobalComponents {
    Swiper: typeof Swiper;
    SwiperSlide: typeof SwiperSlide;
  }
}
