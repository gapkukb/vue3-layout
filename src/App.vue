<script setup lang="ts">
import { useApp } from "./pinia";
import Modal from "./modal/Modal.vue";
const app = useApp();

function handle(current: MutationRecord) {
  console.log(current);
}
</script>

<template>
  <div v-for="i in 100" v-mutation="handle" class="border-10 p-20">123</div>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="app.keepAliveViews">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>

  <Modal />
</template>

<style lang="scss"></style>
