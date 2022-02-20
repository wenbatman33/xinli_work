import Vue from 'vue';
import App from '@/App.vue';
import VueAxios from 'vue-axios';
import axios from '@/http';
import store from '@/store/store';
import router from '@/router/router';
import ElementUI from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueAnalytics from 'vue-analytics';
import '@/filter';
import GAMixin from '@/GAMixn';

Vue.use(ElementUI);
Vue.use(VueAxios, axios, VueAwesomeSwiper);
Vue.config.productionTip = false;
Vue.config.ignoredElements = [
  'a-scene', 
  'a-entity', 
  'a-assets', 
  'a-camera', 
  'a-cylinder', 
  'a-plane', 
  'a-sky', 
  'a-box',
  'a-cursor',
  'a-circle',
  'a-asset-item',
  'a-light'];
Vue.use(VueAnalytics, {
  id: 'UA-124274863-1',
  router,
  autoTracking: {
    pageviewOnLoad: false,
  },
});
Vue.mixin(GAMixin);
// Vue.prototype.axios = axios
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

