<script setup lang="ts">
import { RouteNames } from "@/consts";

defineOptions({
  name: RouteNames.HOME,
});

function onInOutView(visible: boolean, entry: IntersectionObserverEntry) {
  console.log("visible:", visible);
}

function onSizeChange(size: DOMRectReadOnly) {
  console.log("size:", size);
}

const len = ref(0);
</script>

<template>
  <div>Home</div>
  <van-button @click="len = len ? 0 : 10">切换</van-button>
  <div v-for="i in len" v-intersect:1="{ handler: onInOutView, rootMargin: '0' }" class="h-300"></div>
  <Swiper :autoplay="true" :loop="true" :pagination="{ clickable: false }">
    <SwiperSlide>11111111111111111</SwiperSlide>
    <SwiperSlide>11111111111111111</SwiperSlide>
    <SwiperSlide>11111111111111111</SwiperSlide>
    <SwiperSlide>11111111111111111</SwiperSlide>
    <SwiperSlide>11111111111111111</SwiperSlide>
  </Swiper>

</template>

<style lang="scss"></style>
