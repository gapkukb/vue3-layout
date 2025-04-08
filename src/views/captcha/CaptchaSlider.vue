<script setup lang="ts">
import { throttle } from "lodash";

const left = defineModel("value", {
  type: Number,
  default: 0,
});

const emit = defineEmits<{
  sliderEnd: [current: number];
}>();

// const left = ref(0);
let x = 0;
let isMoving = false;
let maxw = 0;
function _stop(e: PointerEvent) {
  e.preventDefault();
  e.stopPropagation();
}
function start(e: PointerEvent) {
  _stop(e);
  isMoving = true;
  const el = e.currentTarget as HTMLButtonElement;
  x = e.clientX;
  const w = el.getBoundingClientRect().width;
  maxw = el.parentElement!.getBoundingClientRect().width - w;
}

function end(e: PointerEvent) {
  if (!isMoving) return;
  _stop(e);
  isMoving = false;
  emit("sliderEnd", left.value / maxw);
}

const move = throttle(function move(e: PointerEvent) {
  if (!isMoving) return;
  _stop(e);
  const dx = e.clientX - x;
  left.value = Math.min(Math.max(dx, 0), maxw);
}, 1000 / 60);

const bind = document.addEventListener;
const unbind = document.removeEventListener;
bind("pointermove", move);
bind("pointerup", end);
bind("pointercancel", end);

onUnmounted(() => {
  unbind("pointermove", move);
  unbind("pointerup", end);
  unbind("pointercancel", end);
});
</script>

<template>
  <div class="captcha-slider" :style="{ '--left': left + 'px' }">
    <div class="tracker"></div>
    <button class="thumb" @pointerdown="start">
      <icon-ei-arrow-right class="scale-150" />
    </button>
  </div>
</template>

<style lang="scss">
.captcha-slider {
  position: relative;
  border: 1px solid #999;
  border-radius: 100px;
  touch-action: none;
  .tracker {
    width: 100%;
    height: 40px;
    background: url(./tracker.png) no-repeat 0/100% 100%;
    mask: linear-gradient(90deg, transparent calc(var(--left) + 26px), #000 0%);
    &::after {
      position: absolute;
      left: 50%;
      color: #999;
      color: transparent;
      line-height: 40px;
      white-space: nowrap;
      text-align: center;
      background-color: #999;
      background-image: linear-gradient(90deg, #999, #fff 20%, #fff 80%, #999);
      background-size: 20% 100%;
      background-clip: text;
      transform: translateX(-50%);
      animation: rainbow 2s linear infinite;
      content: "Slide to complete the puzzle";
    }
  }

  @keyframes rainbow {
    0% {
      background-position: -20% 0%;
    }
    100% {
      background-position: 120% 0%;
    }
  }
}
.thumb {
  @apply absolute -top-6 bg-white rd-full  text-#1dac44 text-52 z-1 overflow-hidden size-52 left-0;
  //   left: var(--left);
  transform: translate3d(var(--left), 0, 0);
  will-change: transform;
}
</style>
