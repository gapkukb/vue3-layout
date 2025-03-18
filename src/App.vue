<script setup lang="ts">
import { access, login, refresh, setAuthorization } from '@/apis';

let refreshToken: string
async function _login() {
  const a = await login();
  refreshToken = a.data.refreshToken

  setAuthorization(a.data.token);

}
async function _access() {
  access()
}
async function _refresh() {
  const a = await refresh();
  setAuthorization(a.data.token);

}
</script>
<template>
  <div class="content">
    <h1>Start building amazing things with Rsbuild</h1>
    <van-button @click="_login">登录</van-button>
    <van-button @click="_access">受保护的接口</van-button>
    <van-button @click="_refresh">刷新token</van-button>
  </div>
</template>
