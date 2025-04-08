import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';
import { default as common } from './common';
import { default as user } from './user';
import { default as wallet } from './wallet';
import { default as landpage } from './landpage';
import { default as demo } from './demo';

const routes = <RouteRecordRaw[]>[
  {
    path: '/',
    component: Layout,
    children: [...common, user, ...wallet],
  },
  ...landpage,
];

if (process.env.NODE_ENV === 'development') {
  routes.push(demo);
}

export default routes;
