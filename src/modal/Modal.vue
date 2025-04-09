<script setup lang="ts">
import modals from './modals';
import { opens, close } from './_controller';

</script>

<template>
    <van-popup v-for="(view, name) in modals" v-bind="view" :key="name" :show="opens.has(name)" @close="close(name)">
        <component :is="view.component" />
    </van-popup>
</template>

<style lang="scss"></style>