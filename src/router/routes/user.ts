import { RouteNames } from '@/consts';
import type { RouteRecordRaw } from 'vue-router';
import User from '@/views/user/index.vue';

export default (<RouteRecordRaw>{
  path: '/user',
  component: User,
  meta: { requiresAuth: true },
  children: [
    {
      name: RouteNames.USER,
      path: '',
      component: () => import('@/views/user/Profile.vue'),
    },
    {
      name: RouteNames.USER_AVATAR,
      path: 'avatar',
      component: () => import('@/views/user/Avatar.vue'),
    },
  ],
});
