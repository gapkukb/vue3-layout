<script setup lang="ts">
import Promotions from './Promotions.vue';
</script>

<template>
    <van-navBar>

        <template #left>
            <van-button class="uppercase">promo</van-button>
            <van-button class="uppercase">my bonus</van-button>
        </template>
        <template #right>
            <van-button size="small" icon="chat-o" round></van-button>
            <van-button size="small" icon="chat-o" round></van-button>
        </template>
    </van-navBar>
    <Promotions />
</template>

<style lang="scss"></style>