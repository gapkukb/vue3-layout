import { RouteNames } from '@/consts';
import type { RouteRecordRaw, RouteRecordSingleView } from 'vue-router';

export const home: RouteRecordSingleView = {
  name: RouteNames.HOME,
  path: '',
  component: () => import('@/views/home/index.vue'),
};

export default (<RouteRecordRaw[]>[
  {
    name: RouteNames.HOME,
    path: '/',
    component: () => import('@/views/home/index.vue'),
  },
  {
    name: RouteNames.TERMS,
    path: '/terms',
    component: () => import('@/views/terms/index.vue'),
    meta: {
      title: 'Terms of use and Privacy Policy',
    },
    beforeEnter: (to, from, next) => {
      from.meta.keepAlive = from.name === RouteNames.LOGIN;

      next();
    },
  },
  {
    name: RouteNames.FORGOT_PASSWORD,
    path: RouteNames.FORGOT_PASSWORD,
    component: () => import('@/views/account/forgot/index.vue'),
    meta: {
      title: 'Forgot Password',
    },
  },
  {
    name: RouteNames.PROMOTIONS,
    path: '/promo',
    components: {
      default: () => import('@/views/promotions/index.vue'),
    },

    meta: {
      title: 'promotions',
    },
  },
]);
