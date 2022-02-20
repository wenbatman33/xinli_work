import router from '@/router';
import store from '@/store';
import axios from 'axios';
import { Loading, Message } from 'element-ui';
import Vue from 'vue';
import i18n from '../lang';
import socket from './socket';

const serverError = {
  400() {
    Message.error(i18n.t('server.error400'));
  },
  401() {
    Message.error(i18n.t('server.error401'));
    socket.disconnect();
    store.dispatch('admin/memberLogout');
    router.replace({ name: 'dashboard' });
  },
  403() {
    Message.error(i18n.t('server.error403'));
  },
  404() {
    Message.error(i18n.t('server.error404'));
  },
  405() {
    Message.error(i18n.t('server.error405'));
  },
  500() {
    Message.error(i18n.t('server.error500'));
  },
  502() {
    router.push({ name: 'down' });
    Message.error(i18n.t('server.error502'));
  },
  503() {
    router.push({ name: 'down' });
    Message.error(i18n.t('server.error503'));
  },
};

let loadingInstance;
axios.interceptors.request.use((config) => {
  const newConfig = config;
  newConfig.headers.UUID = window.localStorage.getItem('uuid');
  if (window.localStorage.getItem('token')) {
    newConfig.headers.token = window.localStorage.getItem('token');
  }
  loadingInstance = Loading.service({
    fullscreen: true,
    background: 'rgba(0, 0, 0, 0)',
  });
  return config;
}, (err) => {
  console.log(err);
  loadingInstance.close();
  Promise.reject(err);
});

axios.interceptors.response.use((response) => {
  if (response.data.status !== 0) {
    Message.error(response.data.message);
    loadingInstance.close();
    return Promise.reject(response);
  }
  loadingInstance.close();
  return response;
}, (err) => {
  console.log(err.response);
  loadingInstance.close();
  serverError[err.response.status](err);
  return Promise.reject(err);
});

axios.defaults.baseURL = process.env.VUE_APP_APIHOST;
Vue.prototype.$http = axios;

export default axios;
