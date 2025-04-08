<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
const el = useTemplateRef("toast");

onMounted(() => {
  const dialog = document.querySelector("dialog");
  if (dialog) {
    dialog.showPopover();
    setTimeout(() => {
      dialog.close();
    }, 30000);
  }
});
</script>

<template>
  <div ref="toast" class="toast" popover>这里是一段消息</div>
</template>

<style lang="scss">
.toast {
  right: 20px;
  bottom: 20px;
  margin: auto;
  padding: 10px 20px;
  color: #fff;
  background-color: #333;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeInOut 3s ease-in-out;

  &::backdrop {
    // display: none;
    opacity: 0;
  }
}

@keyframes fadeInOut {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  10%,
  90% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(20px);
    opacity: 0;
  }
}
</style>
