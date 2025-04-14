import 'swiper/css/bundle';

function load(module: 'Swiper' | 'SwiperSlide') {
  return defineAsyncComponent(async () => {
    const [{ Swiper: SwiperCore }, { Swiper, SwiperSlide }, { Navigation, Pagination, Autoplay, A11y }] = await Promise.all([
      import(/** webpackChunkName:"swiper"**/ 'swiper/core'),
      import(/** webpackChunkName:"swiper"**/ 'swiper/vue'),
      import(/** webpackChunkName:"swiper"**/ 'swiper/modules'),
    ]);

    SwiperCore.use([A11y, Navigation, Pagination, Autoplay]);

    return module === 'Swiper' ? Swiper : SwiperSlide;
  });
}

export const Swiper = load('Swiper');
export const SwiperSlide = load('SwiperSlide');
