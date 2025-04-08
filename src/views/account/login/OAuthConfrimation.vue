<script setup lang="ts">
const show = defineModel<boolean>()
const agree = defineModel<boolean>('agree')
</script>

<template>
    <van-popup v-model:show="show" position="bottom" closeable class="p-16 grid gap-16">
        <div class="text-center"><icon-devicon-google class="text-48" /></div>
        <div>This authorization will register a new account in ArenaPlusPro.</div>
        <van-button block type="primary" @click="agree = true, show = false">YES</van-button>
        <van-button block type="primary" plain @click="show = false">Cancel</van-button>
    </van-popup>
</template>

<style lang="scss" scoped></style>