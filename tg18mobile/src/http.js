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

const checkEntryPage = (to) => {
  let Allow;
  if (to.name === 'login' ||
      to.name === 'index' ||
      to.name === 'register' ||
      to.name === 'forget' ||
      to.name === 'slot' ||
      to.name === 'fishing' ||
      to.name === 'board' ||
      to.name === 'postMsg' ||
      to.name === 'news' ||
      to.name === 'unsubscribe' ||
      to.name === 'faqs' ||
      to.name === 'faqs_mb' ||
      to.name === 'vip' ||
      to.name === 'vip_mb' ||
      to.name === 'promotion' ||
      to.name === 'promotionDetail' ||
      to.name === 'error403' ||
      to.name === 'error404' ||
      to.name === 'error505' ||
      to.matched[0].path === '/games'
  ) {
    Allow = true;
  } else {
    Allow = false;
  }
  return Allow;
};


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
    if (errorInfo) {
      const errorStatus = errorInfo.status;
      router.push({
        path: `/error${errorStatus}`,
      });
    }
    return Promise.reject(err);
  },
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    // JWT error_code 錯誤導回登入頁面
    if (Number(response.data.error_code) >= 10001 && Number(response.data.error_code) <= 10999) {
      store.dispatch('member/MemberErrorLogout');
    }
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
    Promise.reject(error.response.data),
);
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  store.state.index.routerFrom = from;
  try {
    if (window.localStorage.JWT_TOKEN) {
      const token = jwtDecode(window.localStorage.JWT_TOKEN);
      if (token.login_status === 'login') {
        // 這裡會重新檢查token
        // store.dispatch('member/MemberRefreshUserWalletInfo');
        store.dispatch('member/MemberLoginStatus');
        next();
      } else if (token.login_status === 'logout' || token.login_status === 'loginfail') {
        // 這裡會重新檢查token
        store.dispatch('member/MemberLoginStatus');
        if (checkEntryPage(to)) {
          next();
        } else {
          next({
            name: 'login',
          });
        }
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
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (window.ga) {
    window.ga('set', 'page', to.path);
    window.ga('send', 'pageview');
  }
});

export default axios;
