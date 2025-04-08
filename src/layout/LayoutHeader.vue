<script setup lang="ts">
const showDrawer = inject<boolean>("showDrawer");
</script>

<template>
  <div class="layout-header">
    <button @click="showDrawer = true"><icon-material-symbols-menu /></button>
    <van-nav-bar
      :title="$route.meta.title"
      left-arrow
      @click-left="$router.back"
    />
  </div>
</template>

<style lang="scss"></style>
