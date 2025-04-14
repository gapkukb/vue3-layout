<script setup lang="ts">
import Card from './PromoCard.vue';
</script>

<template>
    <div>
        <h1>Recommended</h1>
        <ul>
            <Card v-for="i in 10">
            </Card>
        </ul>
        <ul class="grid cols-2 gap-8">
            <Card v-for="i in 10">
            </Card>
        </ul>
    </div>
</template>

<style lang="scss" scoped></style>