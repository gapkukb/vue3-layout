import './styles';
import 'iconify-icon';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './pinia';
import boot from './boot';

const app = createApp(App).use(pinia).use(router);

boot().then(() => {
  app.mount('#app');
});
