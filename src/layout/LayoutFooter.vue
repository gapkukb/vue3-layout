<script setup lang="ts">
import { RouteNames } from "@/consts";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<template>
  <van-tabbar route>
    <van-tabbar-item icon="home-o" :name="RouteNames.HOME" to="/">
      首页
    </van-tabbar-item>
    <van-tabbar-item icon="search" name="search">搜索 </van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="friends" to="/activity">
      活动
    </van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="friends" to="/user">
      我的
    </van-tabbar-item>
  </van-tabbar>
</template>

<style lang="scss"></style>
