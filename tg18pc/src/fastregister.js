import Vue from 'vue';
import App from '@/AppFastregister.vue';
import VueAxios from 'vue-axios';
import axios from '@/httpFastregister';
import store from '@/store/store';
import router from '@/router/routerForFastRegister';
import ElementUI from 'element-ui';

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

