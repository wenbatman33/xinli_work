import axios from 'axios';
import router from '@/router';
import store from '@/store';
import { API_HOST } from '@/config/server';
import { Message } from 'element-ui';

import {
  Loading
} from 'element-ui';

let need_request_count = 0;
let timeSwitch = false;
let redirectLoginSwitch = true;

const handleError = {
  400(error) {
    const dontShowMessageList = [
      1010,
      3003,
      4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009,
    ];

    if (! dontShowMessageList.includes(error.response.data && error.response.data.code)) {
      Message.error(error.response.data.message);
    }
  },

  401() {
    if (redirectLoginSwitch) {
      redirectLoginSwitch = false;

      Message.error('登入逾时，请重新登入！');
      store.dispatch('auth/logout');
      store.dispatch('menu/removeAllTab');
      router.push(`/login?redirect=${encodeURIComponent(router.currentRoute.fullPath)}`)

      setTimeout(() => {
        redirectLoginSwitch = true;
      }, 2000);
    }
  },

  422(error) {
    let errorMessageString = '';

    Object.keys(error.response.data.errors).map(key => {
      error.response.data.errors[key].map(errorMessage => {
        errorMessageString += `${errorMessage}<br>`;
      })
    });

    Message({
      dangerouslyUseHTMLString: true,
      type: 'error',
      offset: 144,
      message: errorMessageString,
    });
  },

  500() {
    Message.error('很抱歉，系统出错，请联络相关人员协助!');
  },
}

axios.defaults.baseURL = API_HOST;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    need_request_count++
    if (timeSwitch === false) {
      timeSwitch = true
      let loadingInterval = setInterval(() => {
        if (need_request_count === 0) {
          Loading.service().close()
          clearInterval(loadingInterval);
          timeSwitch = false
        }
      }, 200);

      Loading.service({
        fullscreen: true,
        text: 'loading',
        background: 'rgba(0, 0, 0, 0.7)',
        customClass: 'loading-class'
      })
    }

    if (window.localStorage.JWT_TOKEN) {
      config.headers.Authorization = `Bearer ${window.localStorage.JWT_TOKEN}`
    }

    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

// response 攔截器
axios.interceptors.response.use(
  response => {
    if (response.headers['jwt-token']) {
      window.localStorage.setItem('JWT_TOKEN', response.headers['jwt-token']);
    }

    need_request_count--

    return response
  },
  error => {
    /**
     * 原 API 會將 token 回傳於 header
     * 目前只會在登入時回傳 但還是先寫在這
     */
    if (error.response.headers['jwt-token']) {
      window.localStorage.setItem('JWT_TOKEN', error.response.headers['jwt-token']);
    }

    need_request_count--;

    handleError[error.response.status](error);

    return Promise.reject(error)
  }
)
export default axios;
