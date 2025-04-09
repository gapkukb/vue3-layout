<script setup lang="ts">
import json from './terms.json';
const show = defineModel<boolean>({ default: true })
</script>

<template>
    <van-popup v-model:show="show" position="bottom" class="p-16">
        <img src="/img.jpg" class="size-48 rd-full block mx-auto">
        <div class="mt-16">
            <h2 class="text-#111 text-14 font-600">Please read our guidelines carefully:</h2>
            <ol class="list-disc marker:text-red pl-16 text-12 font-300 grid gap-8">
                <li>{{ json.term1 }}</li>
                <li>{{ json.term2 }}</li>
                <li>{{ json.term3 }}</li>
                <li>{{ json.term4 }}</li>
                <li>{{ json.term5 }} <RouterLink to="terms" class="text-#ff5800 underline">{{
                    json.term6 }}
                    </RouterLink>
                </li>
            </ol>
            <h3 class=" text-12 font-600">{{ json.term7 }}</h3>
        </div>
        <div class="flex gap-16 py-16">
            <van-button tag="a" href="https://www.google.com/" block type="primary" plain>Exit</van-button>
            <van-button @click="show = false" block type="primary">Proceed</van-button>
        </div>
        <img src="./footer.png" class="w-auto">
        <div class="text-#999 text-12 text-center mt-16">{{ json.term8 }}</div>
    </van-popup>
</template>

<style lang="scss"></style>