<script setup lang="ts">
import { formatter } from "@/helpers/number";
import { icons } from "@iconify/json/json/garden.json";
const show = ref(false);
const user = ref({} as any);

const menus = [
  {
    icon: icons["security-26"],
    title: "Fund Accounts",
    isLink: true,
    value: user.value.nickname,
  },
  {
    icon: "menu",
    title: "Transactions",
    isLink: true,
    value: user.value.phone,
  },
  {
    icon: "menu",
    title: "Bonus",
    isLink: true,
    value: user.value.email,
  },
  {
    icon: "menu",
    title: "Security Center",
    isLink: true,
    value: user.value.address,
  },
  {
    icon: "menu",
    title: "Settings",
    isLink: true,
    value: user.value.address,
  },
  {
    icon: "menu",
    title: "FAQ",
    isLink: true,
    value: user.value.address,
  },
  {
    icon: "menu",
    title: "More",
    isLink: true,
    value: user.value.address,
  },
];
</script>

<template>
  <div class="drawer">
    <van-nav-bar
      left-arrow
      @click-left="show = false"
      :fixed="false"
      :z-index="100"
      :border="false"
    />

    <div
      class="card"
      :style="{
        '--bg': `url('/img.jpg')`,
      }"
    >
      <h2 class="">{{ formatter.currencyfy(0) }}</h2>
      <button><icon-devicon-facebook /></button>
      <button><icon-devicon-facebook /></button>
    </div>

    <van-cell center value-class="!flex-none ml-auto">
      <template #icon>
        <img src="/img.jpg" alt="User Avatar" class="w-40 h-40 rounded-full" />
      </template>
      <div class="flex">
        <span>Name: </span>
        <span class="truncate">aaaaaaaaaaaaaa</span>
        <button><icon-devicon-facebook /></button>
      </div>
      <div class="flex">
        <span>Name: </span>
        <span class="truncate">aaaaaaaaaaaaaa</span>
        <button><icon-devicon-facebook /></button>
      </div>
    </van-cell>
    <van-cell-group>
      <van-cell
        v-for="(item, index) in menus"
        :key="item.title"
        icon="menu"
        title="Fund Accounts"
        is-link
        :value="user.nickname"
      >
        <template #icon>
          <component :is="item.icon" />
        </template>
        <template #value v-if="item.title === 'More'">
          <button><icon-devicon-facebook /></button>
          <button><icon-devicon-facebook /></button>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style lang="scss">
.card {
  background-image: cross-fade(var(--transparent), var(--bg), 40%);
  background-image: -webkit-cross-fade(var(--transparent), var(--bg), 40%);

  @apply w-256 h-154 mx-auto rd-8 bg-cover;
  /* 如使用自定义属性，-webkit-语句需要放在没有私有前缀语句的下面 */
  // background-image: -webkit-cross-fade(var(--transparent), url(2.jpg), 40%);
}
</style>
