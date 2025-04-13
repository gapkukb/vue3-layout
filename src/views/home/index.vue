<script setup lang="ts">
import { RouteNames } from "@/consts";

defineOptions({
  name: RouteNames.HOME,
});

function onInOutView(visible: boolean) {
  console.log('visible:', visible);

}

const len = ref(0)

</script>

<template>
  <div>Home</div>
  <van-button @click="len = len ? 0 : 10">切换</van-button>
  <div v-for="i in len" v-intersect:1="{ handler: onInOutView, margin: '0' }" class="h-300"></div>
</template>

<style lang="scss"></style>
