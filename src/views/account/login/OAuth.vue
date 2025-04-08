<script setup lang="ts">
import { Channels } from "./channels";
import OAuthConfrimation from './OAuthConfrimation.vue';

const show = ref(true)
const agree = ref(false)

const emit = defineEmits<{
  login: [channel: Channels];
}>();

function useGoogle() {
  emit("login", Channels.Google);
}

function useFacebook() {
  emit("login", Channels.Facebook);
}
</script>

<template>
  <van-divider>Or Sign in with</van-divider>
  <div class="flex gap-16">
    <van-button class="flex-1" @click="useGoogle">
      Google
      <template #icon>
        <icon-devicon-google />
      </template>
    </van-button>
    <van-button class="flex-1" @click="useFacebook">
      <template #icon>
        <icon-devicon-facebook />
      </template>
      Facebook
    </van-button>
  </div>
  <OAuthConfrimation v-model="show" v-model:agree="agree" />
</template>

<style lang="scss"></style>
