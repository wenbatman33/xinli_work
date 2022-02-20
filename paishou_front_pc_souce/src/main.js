import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
// -------------------------------------------
import '@/assets/scss/main.scss';
import 'swiper/swiper-bundle.css';
import './registerServiceWorker';
//
const app = createApp(App).use(store).use(router).use(Antd).mount('#app');
