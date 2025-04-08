import { RouteNames } from '@/consts';
import type { RouteRecordRaw } from 'vue-router';

export default (<RouteRecordRaw>{
  path: '/demo',
  name: 'demo',
  component: () => import('@/views/demo/index.vue'),
  children: [
    {
      path: '/login',
      name: RouteNames.LOGIN,
      component: () => import('@/views/account/login/index.vue'),
    },
  ],
});
