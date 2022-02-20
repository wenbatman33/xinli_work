import axios from 'axios';
import router from '@/router';
import store from '@/store/store';
import { Message } from 'element-ui';

let showErrorMessage = false;
axios.defaults.baseURL = process.env.VUE_APP_APIHOST;

function removeJWTTOKEN(err) {
  // JWT_TOKEN 過期
  store.commit('member/memberLogout', '', { root: true });
  window.localStorage.removeItem('JWT_TOKEN');
  if (showErrorMessage === false) {
    showErrorMessage = true;
    router.push({ path: '/login' });
    Message({ message: '請重新登入', type: 'error' });
    setTimeout(() => {
      showErrorMessage = false;
    }, 1000);
  }
}

// http request 拦截器
axios.interceptors.request.use(
  async (config) => {
    config.headers.Accept = 'application/json, text/plain, text/html, */*';
    if (window.localStorage.JWT_TOKEN) {
      config.headers.Authorization = `Bearer ${window.localStorage.JWT_TOKEN}`;
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
    }
    return response;
  },
  (err) => {
    console.log('err.data.data');
    console.log(err.response.data.code);
    if (err.response.data.code === 10006) {
      removeJWTTOKEN(err);
    } else if (err.response.data.code === 10003) {
      removeJWTTOKEN(err);
    } else if (err.response.data.code === 10009) {
      removeJWTTOKEN(err);
    } else {
      Message({ message: err.response.data.message, type: 'error' });
    }
    return Promise.reject(err.response);
  },
);

export default axios;
