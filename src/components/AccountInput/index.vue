<script setup lang="ts">
import { type FieldRule, fieldProps } from "vant";

const model = defineModel<string>();

const props = defineProps(fieldProps);

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
    class="field"
    name="account"
    :error="false"
    placeholder="Phone/Email"
    autocomplete="off"
    clearable
    :rules="rules"
    @end-validate="validate"
    v-bind="$attrs"
    v-on="$attrs"
  >
    <template #right-icon>
      <span class="a">Begin with 9xx xxx xxxx</span>
      <span class="b">Phone</span>
    </template>
  </van-field>
</template>

<style lang="scss">
.field {
  position: relative;
  height: 56px;
  overflow: visible;
  border: 1px solid red;
  .van-field__right-icon {
    position: absolute;
    top: var(--y, 0);
    left: 0;
    z-index: 2;
    color: red;
    font-size: 12px;
    transition: top 0.3s ease;
    pointer-events: none;
  }
  .b {
    display: none;
  }

  .van-field__control:not(:placeholder-shown) ~ .van-field__right-icon,
  .van-field__control:focus ~ .van-field__right-icon {
    --y: -30px;
    .a {
      display: none;
    }
    .b {
      display: block;
    }
  }
}
</style>
