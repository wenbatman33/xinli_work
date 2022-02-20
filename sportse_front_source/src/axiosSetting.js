import axios from 'axios';
import Fingerprint2 from 'fingerprintjs2';
import router from '@/router';
import store from '@/store/store';
import { Message } from 'element-ui';

let Finger = '';
let showErrorMessage = false;
axios.defaults.baseURL = process.env.VUE_APP_APIHOST;

if (window.localStorage.Finger) {
  Finger = window.localStorage.Finger;
} else {
  Fingerprint2.get((components) => {
    Finger = Fingerprint2.x64hash128(components.map(pair => pair.value).join(), 31);
    window.localStorage.setItem('Finger', Finger);
  });
}
function error401(err) {
  // JWT_TOKEN 過期
  store.commit('member/setMemberLogout', '', { root: true });
  store.dispatch('dialog/closeToastDialog');
  window.localStorage.removeItem('JWT_TOKEN');
  if (showErrorMessage === false) {
    showErrorMessage = true;
    Message({ message: '請重新登入', type: 'error', showClose: true });
    router.push({ path: '/' });
    setTimeout(() => {
      showErrorMessage = false;
    }, 1000);
  }
}
function error503(err) {
  router.push({ path: '/' });
  Message({ message: err.response.data.message, type: 'error', showClose: true });
}

// http request 拦截器
axios.interceptors.request.use(
  async (config) => {
    config.headers.Accept = 'application/json, text/plain, text/html, */*';
    if (window.localStorage.JWT_TOKEN) {
      config.headers.Authorization = `Bearer ${window.localStorage.JWT_TOKEN}`;
    }
    if (window.localStorage.Finger) {
      config.headers.Finger = window.localStorage.Finger;
    }
    return config;
  },
  (err) => {
    const errorInfo = err.response;
    return Promise.reject(err);
  },
);

// http response 拦截器
axios.interceptors.response.use(
  async (response) => {
    if (response.headers['jwt-token']) {
      window.localStorage.setItem('JWT_TOKEN', response.headers['jwt-token']);
      if (window.localStorage.maintainMessage) window.localStorage.removeItem('maintainMessage');
    }
    return response;
  },
  (err) => {
    console.log(err);
    if (err.response.status === 401) {
      error401(err);
    } else if (err.response.status === 503) {
      error503(err);
    } else {
      Message({ message: err.response.data.message, type: 'error', showClose: true });
    }
    return Promise.reject(err.response);
  },
);

export default axios;
