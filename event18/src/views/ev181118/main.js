import Vue from 'vue';
import App from '@/views/ev181118/App.vue';
import VueAxios from 'vue-axios';
import axios from '@/views/ev181118/http/http';
import router from '@/views/ev181118/router/router';
import ElementUI from 'element-ui';
import store from '@/views/ev181118/store/store';


Vue.config.productionTip = false;

Vue.use(VueAxios, axios, ElementUI);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
