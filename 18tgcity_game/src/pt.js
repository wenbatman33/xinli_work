import Vue from 'vue';
import App from '@/App.vue';
import VueAxios from 'vue-axios';
import axios from '@/http';
import store from '@/store/store';
import router from '@/router/router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import '@/filter';

Vue.use(VueI18n);
const i18n = new VueI18n({ locale: 'zh' });
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
// Vue.prototype.axios = axios
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>',
});

