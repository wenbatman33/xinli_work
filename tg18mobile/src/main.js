import Vue from 'vue';
import App from '@/App.vue';
import VueAxios from 'vue-axios';
import axios from '@/http';
import store from '@/store/store';
import router from '@/router/router';
import ElementUI from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueI18n from 'vue-i18n';
import VeeValidate, { Validator } from 'vee-validate';
import VueClipboard from 'vue-clipboard2';
import zh from 'vee-validate/dist/locale/zh_CN';
import VueAnalytics from 'vue-analytics';
import GAMixin from '@/GAMixn';
import '@/filter';

Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.use(VueI18n);
const i18n = new VueI18n({ locale: 'zh' });
Vue.use(VeeValidate, { i18n, dictionary: { zh }, fieldsBagName: 'vee-fields' });
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
const dictionary = {
  zh: {
    messages: {
      confirmed: () => '两次输入密码不一致!',
      required: field => `${field}`,
    },
  },
};
Validator.localize(dictionary);
Vue.mixin(GAMixin);
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

Validator.extend('PhoneV', {
  // getMessage: field => `${field} 请输入正确的手机号`,
  getMessage: '请输入正确的手机号',
  validate: value => /^((13|14|15|16|18|19)\d{9}){1}$/.test(value),
});
Validator.extend('Money', {
  getMessage: '请填写正确金额',
  validate: (value) => { /^[0-9]+(\.[0-9]{1,2})?$/.test(value); },
});
Validator.extend('AccountV', {
  getMessage: '请输入5～15字符（A-Z ,a-z,0-9）',
  validate: value => /^[a-zA-Z0-9_]{5,16}$/.test(value),
});
Validator.extend('AccountR', {
  getMessage: '请输入正确的用户名',
  validate: value => /^[a-zA-Z0-9_]{5,16}$/.test(value),
});
Validator.extend('Accounts', {
  getMessage: '请确认手机或信箱',
  validate: value => (/^((13|14|15|16|18|19)\d{9}){1}$/.test(value) || /^[a-z0-9\.\-_]+@[a-z0-9\-]+(\.[a-z0-9\-]+)+$/i.test(value)),
});
Validator.extend('EmailV', {
  getMessage: '请输入正确的邮箱',
  validate: value => /^[a-z0-9\.\-_]+@[a-z0-9\-]+(\.[a-z0-9\-]+)+$/i.test(value),
});
Validator.extend('Psw18R', {
  getMessage: '请输入正确的密码',
  validate: (value) => { 
    if (value.length >= 8 && value.length <= 20) {
      return true;
    } 
    return false;
  },
});
Validator.extend('Psw18', {
  getMessage: '请输入8～20字母和数字或下划线的组合、不含特殊符号',
  validate: (value) => { 
    if (value.length >= 8 && value.length <= 20) {
      return true;
    } 
    return false;
  },
});
Validator.extend('Psw18Check', {
  getMessage: '请输入新密码',
  validate: (value) => { 
    if (value.length >= 8 && value.length <= 20) {
      return true;
    } 
    return false;
  },
});
Validator.extend('18Y', {
  getMessage: '对不起,本网站只对年满18周岁服务',
  validate: (value) => {
    const today = new Date();
    const Y = today.getFullYear() - 18;
    const M = today.getMonth();
    const D = today.getDate();
    const targerDate = Date.parse(new Date(Y, M, D));
    const sourceDate = Date.parse(new Date(value).toDateString());
    return sourceDate <= targerDate;
  },
});

