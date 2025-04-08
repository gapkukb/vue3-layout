import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import keepAliveViews from './guards/keepAliveViews';
import authenticate from './guards/authenticate';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

authenticate(router);
keepAliveViews(router);

console.log('router', router);

export default router;
