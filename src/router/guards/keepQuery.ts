import type { Router } from 'vue-router';

export default function keepQuery(router: Router) {
  router.beforeEach((to, from, next) => {
    const { rec } = from.query;
    if (rec) {
      Object.assign(to.query, { rec });
    }
    next(to);
  });
}
