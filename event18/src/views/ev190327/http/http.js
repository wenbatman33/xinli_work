import axios from 'axios';
import store from '../store/store';
import router from '../router/router';
import jwtDecode from 'jwt-decode';

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
  (err) => {
    const errorInfo = err.response;
    return Promise.reject(err);
  },
);
// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    if (Number(response.data.error_code) >= 10001 && Number(response.data.error_code) <= 10999) {
      store.dispatch('member/MemberErrorLogout');
    }
    try {
      if (response.data.data.jwt_token) {
        window.localStorage.setItem('JWT_TOKEN', response.data.data.jwt_token);
        const apiReturnToken = jwtDecode(response.data.data.jwt_token);
        if (apiReturnToken.login_status === 'login') {
          // alert('loginloginlogin');
          window.location.reload();
        } else if (apiReturnToken.login_status === 'logout') {
          // 判斷是否逾期
          if (!axiosReloaded) {
            axiosReloaded = true;
            window.location.reload();
          }
        } else if (apiReturnToken.login_status === 'loginfail') {
          // 判斷是否逾期
        } else if (apiReturnToken.login_status === 'expired') {
          // 初次使用者導回首頁
          window.localStorage.setItem('JWT_TOKEN_Overdue', '登录时间逾期 请重新登录');
          store.dispatch('member/JWT_INIT', '')
            .then(() => {
              window.location.reload();
            });
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
router.beforeEach((to, from, next) => {
  try {
    if (window.localStorage.JWT_TOKEN) {
      const token = jwtDecode(window.localStorage.JWT_TOKEN);
      if (token.login_status === 'login') {
        // 這裡會重新檢查token
        store.dispatch('member/MemberLoginStatus');
        next();
      } else if (token.login_status === 'logout') {
        // 這裡會重新檢查token
        store.dispatch('member/MemberLoginStatus'); 
        next();
      }
    } else {
      store.dispatch('member/MemberLoginStatus');
      store.dispatch('member/JWT_INIT', '');
    }
  } catch (e) {
    window.localStorage.setItem('JWT_TOKEN_Overdue', '登录方式不合法 请重新登录');
  }
  try {
    if (window.localStorage.JWT_TOKEN) {
      const token = jwtDecode(window.localStorage.JWT_TOKEN);
      if (token.login_status === 'login') {
        // 這裡會重新檢查token
        store.dispatch('member/MemberLoginStatus');
        next();
      } else if (token.login_status === 'logout' || token.login_status === 'loginfail') {
        // 這裡會重新檢查token
        store.dispatch('member/MemberLoginStatus'); 
        next();
      } else if (token.login_status === 'expired') {
        // 判斷是否逾期
        tokenOverdue();
      }
    } else {
      store.dispatch('member/JWT_INIT', '');
    }
  } catch (e) {
    tokenIllegal();
  }
});
// http response 拦截器
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

export default axios;
