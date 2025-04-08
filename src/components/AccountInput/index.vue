<script setup lang="ts">
import { type FieldRule, fieldProps } from "vant";

const model = defineModel<string>();

defineProps(fieldProps);

const avaliable = ref(false);
const rules: FieldRule[] = [
  { required: true, message: "Please enter your email" },
  { pattern: /^(0?9\d{9})|(\S+@\S+\.\S+)$/, message: "Invalid email format" },
];
function validate(result: { status: string; message: string }) {
  avaliable.value = result.status === "passed";
}
</script>

<template>
  <van-field
    v-model="model"
    name="account"
    :error="false"
    placeholder="Phone/Email"
    autocomplete="off"
    clearable
    :rules="rules"
    @end-validate="validate"
    v-bind="$attrs"
    v-on="$attrs"
  />
</template>

<style lang="scss"></style>
