<script setup lang="ts">
import { useApp } from "./pinia";
import Modal from "./modal/Modal.vue";
const app = useApp();
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="app.keepAliveViews">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>

  <Modal />
</template>

<style lang="scss"></style>
