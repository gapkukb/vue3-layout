<script setup lang="ts">
import Chat from './Chat.vue';
import FAQs from './FAQs.vue';
</script>

<template>
    <div>

        <Chat />
        <FAQs />
        <van-tabbar :fixed="false">

            <van-tabbar-item>Conversation
                <template #icon>
                    <icon-bi-chat-right-text />
                </template>
            </van-tabbar-item>
            <van-tabbar-item>ArenaPlus FAQs
                <template #icon>
                    <icon-wpf:faq />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang="scss"></style>