<script setup lang="ts">
import Slider from "./CaptchaSlider.vue";
const show = ref(true);
const slide = ref(0);

function onEnd(value: number) {
  console.log("onEnd", value);
}
</script>

<template>
  <van-popup v-model:show="show" position="bottom" :closeable="false">
    <div class="p-32">
      <div class="relative">
        <img
          class="w-full aspect-ratio-16/8"
          src="https://c66hk.s3.ap-east-1.amazonaws.com/80efd2bb-9908-4b2c-a8a7-6d769efe5bd7"
        />
        <img
          class="h-full absolute z-1 left-0 top-0"
          :style="{ left: `${slide}px` }"
          src="https://c66hk.s3.ap-east-1.amazonaws.com/a78e6c23-48a8-42fa-8bd3-eae5bf99d4a7"
        />
      </div>

      <Slider v-model:value="slide" @slider-end="onEnd" class="mt-16" />
    </div>
  </van-popup>
</template>
