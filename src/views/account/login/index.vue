<script setup lang="ts">
import { RouteNames } from "@/consts";
import type { Form, FieldRule } from "vant";
import AccountInput from "@/components/AccountInput/index.vue";
import OAuth from "./OAuth.vue";
import Terms from "./Terms.vue";
import login, { Channels } from "./channels";
import { noop } from "lodash";

defineOptions({
  name: RouteNames.LOGIN,
});

const form = useTemplateRef<InstanceType<typeof Form>>("form");
const showTerms = ref(false);
const sms = ref(true);
const agreement = ref(false);
const username = ref("");
const password = ref("");
const eyeoff = ref(true);
const passwordRules: FieldRule[] = [
  { pattern: /\S{8,16}/, message: "At least 8 characters" },
];

const channelText = computed(() =>
  sms.value ? "Login With Password" : "Register Or Login With Verification Code"
);

let abort = noop;
function agree() {
  return new Promise((resolve) => {
    if (agreement.value) return resolve(true);
    showTerms.value = true;
    abort = watchOnce(agreement, resolve);
  });
}

function doAgree() {
  agreement.value = true;
  showTerms.value = false;
  form.value!.submit();
}

async function submit(form) {
  await agree();
  login(sms.value ? Channels.SMS : Channels.Account, form);
}

async function oauth(channel: Channels) {
  await agree();
  login(channel);
}
</script>

<template>
  <div
    class="login"
    :style="{
      '--bg': `url(./img.jpg)`,
    }"
  >
    <van-form
      ref="form"
      class="grid gap-16"
      @submit="submit"
      @failed="console.error"
    >
      <AccountInput v-model="username" placeholder="Begin with 9xx xxx xxxx" />

      <van-field
        v-if="!sms"
        :autofocus="false"
        v-model="password"
        validate-trigger="onBlur"
        clearable
        :type="eyeoff ? 'password' : 'text'"
        :right-icon="eyeoff ? 'closed-eye' : 'eye-o'"
        placeholder="Password"
        maxlength="16"
        :rules="passwordRules"
        @click-right-icon="eyeoff = !eyeoff"
      />

      <button class="text-12 text-right block text-blue">Forgot?</button>

      <van-button native-type="submit" type="primary" block>
        Register / Login
      </van-button>

      <van-button type="primary" block @click="oauth(Channels.Guest)">
        I'm a visitor
      </van-button>

      <button class="text-center block text-#ff5800" @click="sms = !sms">
        {{ channelText }}
      </button>
    </van-form>

    <OAuth @login="oauth" />

    <van-checkbox v-model="agreement" checked-color="#ff5800" class="mt-16">
      <span>I agree to the</span>
      <span class="text-blue" @click="$router.push(RouteNames.TERMS)">
        Terms of use and Privacy Policy
      </span>
    </van-checkbox>

    <Terms />

    <img src="./parter.png" class="w-full block mt-16" />

    <div class="text-center text-12 text-#999 py-32">
      Keep online gaming private. Refrain from playing online games in open and
      public places.
    </div>
  </div>

  <van-popup
    position="bottom"
    v-model:show="showTerms"
    class="p-16 grid gap-16"
    @closed="abort"
  >
    <div class="text-center">
      <van-icon name="info-o" color="#ff5267" class="!text-64" />
    </div>
    <div>
      <span>You need to agree to the</span>
      <span class="text-#06f" @click="$router.push(RouteNames.TERMS)">
        Terms of use and Privacy Policy
      </span>
    </div>
    <van-button type="primary" block @click="doAgree"> Agree </van-button>
    <van-button type="primary" plain block @click="showTerms = false">
      Cancel
    </van-button>
  </van-popup>
</template>

<style lang="scss">
.login {
  @apply px-16 pt-300;
  // background: var(--bg) no-repeat 0 0/100% auto;
  background: var(--bg) no-repeat center 0 / auto 300px,
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 200px,
      rgba(255, 255, 255, 1) 300px
    );
  background-blend-mode: overlay; /* 设置混合模式 */
}
.van-checkbox__icon--round .van-icon {
  border-radius: 4px;
}
</style>
