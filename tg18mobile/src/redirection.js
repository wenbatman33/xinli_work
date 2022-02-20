import Vue from 'vue';
import App from '@/AppRedirection.vue';
import router from '@/router/routerForRedirection';
import ElementUI from 'element-ui';

Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
