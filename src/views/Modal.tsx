import { useApp } from '@/pinia';
import type { SetupContext } from 'vue';

export default function (props: any, ctx: SetupContext) {
  const app = useApp();
  const AccountView = defineAsyncComponent(() => import('@/views/account/login/index.vue'));
  const UserDrawer = defineAsyncComponent(() => import('@/views/user/UserDrawer.vue'));
  const Captcha = defineAsyncComponent(() => import('@/views/captcha/index.vue'));
  const Welcome = defineAsyncComponent(() => import('@/views/welcome/index.vue'));

  return (
    <>
      {/* <AccountView /> */}
      {/* <UserDrawer /> */}
      {/* <Captcha /> */}
      <Welcome />
    </>
  );
}
