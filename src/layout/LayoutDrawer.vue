<script setup lang="ts">
import { useUser } from "@/pinia";
import UserDrawer from "@/views/user/UserDrawer.vue";
const user = useUser();
const showDrawer = inject<boolean>("showDrawer");
</script>

<template>
  <van-popup v-model:show="showDrawer" position="left" class="w-300 h-full">
    <UserDrawer />
  </van-popup>
</template>

<style lang="scss"></style>
