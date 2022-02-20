import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import { DatePicker, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Fingerprint2 from 'fingerprintjs2';
import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import VueSocketIOExt from 'vue-socket.io-extended';
import socket from './plugins/socket';
import i18n from './lang';
import '../public/scss/main.scss';
import App from './App.vue';
import * as filters from './filters'; // global filters
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(DatePicker);
Vue.use(VueClipboard);
// Vue.use(VueNativeSock, process.env.VUE_APP_WS_HOST, {
//   connectManually: true,
//   reconnection: true,
//   reconnectionAttempts: 5,
//   reconnectionDelay: 3000,
// });
Vue.use(VueSocketIOExt, socket);

Vue.prototype.$s = socket;

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.prototype.$message = Message;

Fingerprint2.get((components) => {
  const values = components.map((component, index) => {
    if (index === 0) {
      return component.value.replace(/\bNetType\/\w+\b/, '');
    }
    return component.value;
  });
  // 生成最终id murmur
  const uuid = Fingerprint2.x64hash128(values.join(''), 31);
  localStorage.uuid = uuid;
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
