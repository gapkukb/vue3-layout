<script setup lang="ts">
import { RouteNames } from "@/consts";
</script>

<template>
  <div>
    <RouterLink to="/user">Profile</RouterLink>
    <RouterLink to="/user/avatar">Avatar</RouterLink>
    <RouterView />
  </div>
</template>

<style lang="scss" scoped></style>
