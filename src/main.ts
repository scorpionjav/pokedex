import './assets/styles/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import registerGlobalComponents from './plugins/components';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
registerGlobalComponents(app);

app.mount('#app');
