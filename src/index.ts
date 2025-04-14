import './styles';
import 'iconify-icon';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import pinia from './pinia';
import boot from './boot';
import directives from './directives';

const app = createApp(App).use(pinia).use(router).use(directives);

boot(app).then(() => {
  app.mount('#app');
});
