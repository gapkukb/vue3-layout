import { RouteNames } from '@/consts';
import { ModalNames } from '@/consts/ModalNames';
import type { RouteRecordRaw } from 'vue-router';

export default (<RouteRecordRaw>{
  path: '/demo',
  name: 'demo',
  component: () => import('@/views/demo/index.vue'),
  children: [
    {
      path: '/login',
      name: RouteNames.LOGIN,
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/conversation',
      name: ModalNames.CONVERSATION,
      component: () => import('@/views/conversation/index.vue'),
    },
  ],
});
