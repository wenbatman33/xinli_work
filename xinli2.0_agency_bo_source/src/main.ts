import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import Vant from 'vant';
import { ElTable } from 'element-plus';
import router from '@/router';
import 'vant/lib/index.css';
import '@/assets/scss/main.scss';
import { createPinia } from 'pinia';
import i18n from '@/i18n';

/////////////////////////
window.staticPath = '';
/////////////////////////

// 全局引入样式
const app = createApp(App); // 创建实例

app.use(Vant);
app.use(ElTable);
app.use(i18n);
app.use(router);
app.use(createPinia());
app.mount('#app');
