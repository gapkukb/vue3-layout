<script setup lang="ts">
import FAQsItem from './FAQsItem.vue';
const article = ref()
</script>

<template>
    <div>
        <van-nav-bar title="Conversation(s)">
            <template #left>
                <icon-hugeicons:menu-square class="text-24" />
                <Icon-bxs-conversation />
            </template>
            <template #title>
                <ArenaPlus FAQs />
            </template>
            <template #right>
                <van-icon name="search" size="18" />
            </template>
        </van-nav-bar>
        <!-- 
        <van-cell v-for="item in 10" clickable is-link title="General" label="11 Articles" center>
            <template #icon>
                <div class="bg-#ccc rd-full p-8 text-white mr-16"><icon-hugeicons:menu-square class="text-24" /></div>
            </template>
        </van-cell>
 -->
        <!-- <van-collapse>
            <van-collapse-item title="aaaaaaaa">123</van-collapse-item>
        </van-collapse> -->

        <FAQsItem :like-id="1" :liked="123" :view-id="1232" :views="123123" />
    </div>
</template>

<style lang="scss" scoped></style>