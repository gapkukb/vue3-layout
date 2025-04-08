<script setup lang="ts">
import type { FieldRule } from "vant";
const avaliable = ref(false);
const account = ref("");
const rules: FieldRule[] = [
  { required: true, message: "Please enter your email" },
  { pattern: /^(0?9\d{9})|(\S+@\S+\.\S+)$/, message: "Invalid email format" },
];

function submit(values) {
  console.log("submit", values);
}

function validate(result: { status: string; message: string }) {
  avaliable.value = result.status === "passed";
}
</script>

<template>
  <van-form @submit="submit" @failed="submit" validate-trigger="onChange">
    <van-field
      v-model="account"
      name="account"
      :error="false"
      label="Email"
      placeholder="Phone/Email"
      autocomplete="off"
      clearable
      :rules="rules"
      @end-validate="validate"
    />
    <van-button
      :disabled="!avaliable"
      native-type="submit"
      type="primary"
      block
    >
      Next
    </van-button>
  </van-form>
</template>

<style lang="scss" scoped></style>
