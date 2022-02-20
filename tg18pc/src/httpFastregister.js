import axios from 'axios';
import store from '@/store/store';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
// http request 拦截器

axios.interceptors.request.use(
  (config) => {
    if (window.localStorage.JWT_TOKEN) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${window.localStorage.JWT_TOKEN}`;
    }
    return config;
  },
  err => Promise.reject(err),
);
// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    try {
      if (response.data.data.jwt_token) {
        window.localStorage.setItem('JWT_TOKEN', response.data.data.jwt_token);
        store.dispatch('member/MemberLoginStatus');
        window.location.reload();
      }
    } catch (e) {
      store.dispatch('member/MemberLoginStatus');
    }
    return response;
  },
  error =>
    // store.dispatch('member/JWT_INIT', '')
    Promise.reject(error.response.data),

);
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
});
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default axios;
