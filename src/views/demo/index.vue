<script setup lang="ts">
const phone = ref("");

const regexp = /^(9\d{2})\s?(\d{1,3})\s?(\d{1,4})?$/g;
function replacer(_: string, v1: string, v2: string, v3: string) {
  return [v1, v2, v3].filter(Boolean).join(' ')
}
function formatter(value: string) {
  return value.replace(regexp, replacer);
}

function change(e: KeyboardEvent) {
  const el = e.target as HTMLInputElement;

  if (e.key === 'Backspace') {
    const cursorPosition = el.selectionStart!;
    const cursorChar = el.value.substring(cursorPosition - 1, cursorPosition);
    if (cursorChar === ' ') {
      el.value = el.value.substring(0, cursorPosition - 2) + el.value.substring(cursorPosition);
    }
  }
}
</script>

<template>
  <van-field v-model="phone" label="文本" placeholder="请输入文本" :formatter="formatter" type="digit" autocomplete="off"
    @keypress="change" @keydown="change" />
</template>

<style lang="scss"></style>
