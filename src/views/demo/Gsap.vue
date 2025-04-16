<script setup lang="ts">
import use from "./gasp"
const canvas = templateRef<HTMLCanvasElement>('canvas')

onMounted(() => {
    use(canvas.value)
})
</script>

<template>
    <canvas ref="canvas" class="block size-full aspect-square"></canvas>
</template>

<style lang="scss" scoped></style>