import Vue from 'vue';
import App from '@/App.vue';
import VueAxios from 'vue-axios';
import axios from '@/axiosSetting';
import store from '@/store/store';
import router from '@/router';
import ElementUI from 'element-ui';
import dayjs from 'dayjs';
import VueClipboard from 'vue-clipboard2';
import VueAnime from 'vue-animejs';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import '@/filter';
import '../theme/index.css';


Vue.use(VueAxios, axios, ElementUI, dayjs);
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
Vue.use(VueAwesomeSwiper);
Vue.use(VueAnime);
Vue.config.productionTip = false;
Vue.config.ignoredElements = ['lineargradient', 'stop'];
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$axios = axios;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

