import axios from 'axios';
import store from '../store/store';
import router from '../router/router';
import jwtDecode from 'jwt-decode';
// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (window.localStorage.JWT_TOKEN) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${window.localStorage.JWT_TOKEN}`;
    }
    return config;
  },
  (err) => {
    const errorInfo = err.response;
    return Promise.reject(err);
  },
);
axios.interceptors.response.use(
  (response) => {
    if (response.data.error_code === '10010') {
      window.localStorage.removeItem('JWT_TOKEN');
      store.dispatch('member/MemberErrorLogout');
    }
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
  try {
    const token = jwtDecode(window.localStorage.JWT_TOKEN);
    if (token.login_status === 'login') {
      store.dispatch('member/MemberLoginStatus');
      next();
    } else if (token.login_status === 'logout') {
      store.dispatch('member/MemberLoginStatus'); 
      next();
    }
  } catch (e) {
    store.dispatch('member/MemberLoginStatus');
    // eslint-disable-next-line semi
    store.dispatch('member/JWT_INIT', '')
  }
});
// http response 拦截器
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default axios;
