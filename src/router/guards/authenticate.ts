import type { Router } from 'vue-router';
import { RouteNames } from '@/consts';
import { url } from '@/helpers';
import { useUser } from '@/pinia';

export default function authenticate(router: Router) {
  router.beforeEach((to, from, next) => {
    const { authenticated } = useUser();
    console.log(to.matched);

    for (const route of to.matched) {
      if (route.meta.requiresAuth && !authenticated) {
        next({ name: RouteNames.LOGIN, query: { redirect: url.encode(to.fullPath) } });
      } else {
        next();
      }
    }
  });
}
