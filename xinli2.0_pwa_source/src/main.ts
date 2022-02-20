import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import Vant from 'vant';
import i18n from './i18n';
import 'vant/lib/index.css';
import './assets/scss/main.scss';
import './service-worker.ts';

/**
 * Create a vue root instance
 */
const app = createApp(App);

/**
 * Install vue router
 */
app.use(router);

/**
 * Install pinia store
 */
app.use(createPinia());

/**
 * Install vant ui components
 */
app.use(Vant);

/**
 * Install i18n instance
 */
app.use(i18n);

/**
 * Mount app div
 */
app.mount('#app');

/**
 * Export vue root instance
 */
export default app;