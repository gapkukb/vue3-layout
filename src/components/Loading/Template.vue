<script setup lang="ts">
const show = ref(false);

defineExpose({
  toggle(value: boolean) {
    show.value = value;
  },
});
</script>

<template>
  <van-overlay v-model:show="show">
    <img src="/loading.svg" class="size-80" alt="Loading..." />
  </van-overlay>
</template>
<style lang="scss">
.global-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
  img {
  }
}
</style>
