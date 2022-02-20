import axios from 'axios';
import { Loading, Message } from 'element-ui';

axios.interceptors.request.use(
  async (config) => {
    if (window.localStorage.JWT_TOKEN) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${window.localStorage.JWT_TOKEN}`;
      // setCookie_JWT_TOKEN(window.localStorage.JWT_TOKEN);
    }
    if (window.localStorage.Finger) {
      // 判断是否存在Finger，如果存在的话，则每个http header都加上Finger
      config.headers.Finger = window.localStorage.Finger;
    }
    return config;
  },
  (err) => {
    const errorInfo = err.response;
    if (errorInfo) {
      const errorStatus = errorInfo.status;
    }
    return Promise.reject(err);
  },
);

// http response 拦截器
axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (err) => {
    Message({ message: err.response.data.message, type: 'error' });
    return Promise.reject(err.response);
  },
);
export default axios;
