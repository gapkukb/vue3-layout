<script setup lang="ts">
import { isVNode } from "vue";
import use from "./gasp"
import _mock from './mock.json';
import TestTabs from "./MatchTabs";
import BetTabs from "./BetTabs";

const match = shallowRef(_mock)
const activeTab = ref('0')
const activeTab2 = ref(-1)
const matchTabs = new TestTabs()
const gameMaps = computed(() => [...new Set(match.value.markets?.map(item => item.gameMap))].sort())
const betTabs = new BetTabs(gameMaps.value, match.value.playerBetMark)
const tabs = computed(() => matchTabs.compute(match.value))
const tabs2 = computed(() => betTabs.compute(gameMaps.value, match.value.playerBetMark))
const betTab = computed(() => betTabs.getTab(activeTab2.value))

const canvas = templateRef<HTMLCanvasElement>('canvas')
// console.log(mock);

// onMounted(() => {
//     use(canvas.value)
// })



// setTimeout(() => {
//     mock.value = { ...mock.value, markets: [] }
// }, 1000);

function onChange(id: any) {
    matchTabs.monitor(id, match.value)
}

</script>

<template>
    <!-- <canvas ref="canvas" class="block size-full aspect-square"></canvas> -->
    <van-tabs v-model:active="activeTab" @change="onChange">
        <van-tab v-for="tab in tabs" :key="tab.id" :name="tab.id" :title="tab.name"
            title-class="flex items-center gap-40">
            <template v-if="tab.icon" #title>
                <component v-if="isVNode(tab.icon)" :is="tab.icon" />
                <img v-else :src="tab.icon">
                <span>{{ tab.name }}</span>
            </template>
        </van-tab>
    </van-tabs>

    <van-tabs v-model:active="activeTab2">
        <van-tab v-for="tab in tabs2" :key="tab.id" :name="tab.id" :title="tab.name"
            title-class="flex items-center gap-40">
            <template v-if="tab.icon" #title>
                <component v-if="isVNode(tab.icon)" :is="tab.icon" />
                <img v-else :src="tab.icon">
                <span>{{ tab.name }}</span>
            </template>
        </van-tab>
    </van-tabs>
    <div v-if="activeTab2 === 10086" class="flex flex-col gap-40">
        <div>
            <span>1</span>
            <span>2</span>
            <span>3</span>
        </div>
    </div>
</template>

<style lang="scss">
.van-tab__text {
    display: contents;
}
</style>