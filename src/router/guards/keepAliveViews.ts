import { useApp } from '@/pinia';
import type { Router } from 'vue-router';

export default function keepAliveViews(router: Router) {
  router.afterEach((to, from) => {
    from.meta.keepAlive = false;
  });

  router.beforeResolve((to, from, next) => {
    const app = useApp();

    app.updateKeepAliveViews(from.name as string, from.meta.keepAlive);
    app.updateKeepAliveViews(to.name as string, to.meta.keepAlive);

    next();
  });
}
