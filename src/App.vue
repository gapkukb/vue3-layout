<script setup lang="ts">
import { access, access2, login, refresh, setAuthorization } from "@/apis";

let refreshToken: string;
async function _login() {
  const a = await login();
  refreshToken = a.data.refreshToken;
  setAuthorization(a.data.token);
}
async function _access() {
  const resp = await access();
  console.log(resp.data);

  setAuthorization(a.data.token);
}
async function _access2() {
  const resp = await access2();
  console.log(resp.data);
}
</script>
<template>
  <div class="content">
    <h1>Start building amazing things with Rsbuild</h1>
    <van-button @click="_login">登录</van-button>
    <van-button @click="_access">受保护的接口</van-button>
    <van-button @click="_access2">受保护的接口2</van-button>
  </div>
</template>
