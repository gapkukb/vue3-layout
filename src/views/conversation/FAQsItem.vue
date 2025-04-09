<script setup lang="ts">
const props = defineProps<{
    viewId: number,
    views: number,
    likeId: number
    liked: number
}>()

const emit = defineEmits<{
    like: [id: number]
}>()

</script>

<template>
    <van-cell title="How do I refer a friend with ArenaPlus?" center>
        <template #icon>
            <icon-streamline:task-list class="mr-16" />
        </template>

        <template #label>
            <span>
                <span>{{ views }}</span>
                <span class="ml-4">views</span>
            </span>
            <button class="ml-16 items-center" @click="emit('like', likeId)">
                <icon-mdi:like />
                <span class="ml-4">{{ liked }}</span>
            </button>
        </template>
    </van-cell>
</template>

<style lang="scss"></style>