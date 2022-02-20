import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'swiper/swiper-bundle.css';
import '@/assets/scss/main.scss';
import './registerServiceWorker';

const app = createApp(App).use(store).use(router).use(Vant).mount('#app');
