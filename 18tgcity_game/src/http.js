import axios from 'axios';
import store from '@/store/store';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';

let axiosReloaded = false;
function tokenIllegal() {
  // 設定JWT_TOKEN 登录方式不合法
  window.localStorage.setItem('JWT_TOKEN_Overdue', '登录方式不合法 请重新登录');
  store.dispatch('member/JWT_INIT', '')
    .then(() => {
      window.location.reload();
    });
}

function tokenOverdue(token) {
  // 設定JWT_TOKEN 逾期
  window.localStorage.setItem('JWT_TOKEN_Overdue', '登录时间逾期 请重新登录');
  store.dispatch('member/JWT_INIT', '')
    .then(() => {
      window.location.reload();
    });
}
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
        const apiReturnToken = jwtDecode(response.data.data.jwt_token);
        if (apiReturnToken.login_status === 'login') {
          // alert('loginloginlogin');
        } else if (apiReturnToken.login_status === 'logout') {
          // 判斷是否逾期
          if (!axiosReloaded) {
            axiosReloaded = true;
            window.location.reload();
          }
        } else if (apiReturnToken.login_status === 'loginfail') {
          // 判斷是否登入錯誤
        } else if (apiReturnToken.login_status === 'expired') {
          // 判斷是否逾期
          tokenOverdue();
        }
      } else {
        axiosReloaded = false;
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
export default axios;
