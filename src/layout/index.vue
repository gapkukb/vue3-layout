<script setup lang="ts">
import LayoutHeader from "./LayoutHeader.vue";
import LayoutFooter from "./LayoutFooter.vue";
import LayoutDrawer from "./LayoutDrawer.vue";

defineOptions({
  name: "Layout",
});
const showDrawer = ref(false);
const route = useRoute();
const cls = computed(() => {
  return route.matched.reduce((acc, i) => {
    if (!i.name) return acc;
    acc += acc + (i.name as string).toLowerCase();
    return acc;
  }, "");
});

provide("showDrawer", showDrawer);
</script>

<template>
  <div class="layout">
    <RouterView name="header">
      <LayoutHeader />
    </RouterView>
    <main :class="cls">
      <RouterView />
    </main>
    <RouterView name="footer">
      <LayoutFooter />
    </RouterView>
    <LayoutDrawer />
  </div>
</template>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;

  @supports (-webkit-touch-callout: none) {
    min-height: -webkit-fill-available;
  }
}
</style>
