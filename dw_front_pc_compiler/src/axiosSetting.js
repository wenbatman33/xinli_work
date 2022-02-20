import axios from 'axios';
import Fingerprint2 from 'fingerprintjs2';
import router from '@/router';
import store from '@/store/store';
import { Message } from 'element-ui';

let Finger = '';
let errorVisible = false;


// 在.env.production 動態切分網域期望值為 cookie www.dw310.com => .dw310.com 以供跨網域cookie使用
const hostname = window.location.hostname.split('.').splice(1, 2);
let productionHostName;
if (process.env.VUE_APP_COOKIEDOMAIN !== '') {
  productionHostName = process.env.VUE_APP_COOKIEDOMAIN;
} else {
  productionHostName = `.${hostname.toString().replace(',', '.')}`;
}

function loadingShow() {
  store.commit('index/openGlobalLoading');
}
function loadingClose() {
  setTimeout(() => {
    store.commit('index/closeGlobalLoading');
  }, 200);
}
function getCookieValue(name) {
  // 取得 Cookie 參數
  const value = `; ${window.document.cookie}`;
  const parts = value.split(`; ${name}=`);
  let result = '';
  if (parts.length === 2) result = parts.pop().split(';').shift();
  return result;
}
function setCookie_JWT_TOKEN(token) {
  const expire_days = 1; // 過期日期(天)
  const d = new Date();
  d.setTime(d.getTime() + (expire_days * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toGMTString()}`;
  window.document.cookie = `JWT_TOKEN=${token};${expires};domain=${productionHostName};path=/`;
}
function setCookie_Finger(finger) {
  const expire_days = 1; // 過期日期(天)
  const d = new Date();
  d.setTime(d.getTime() + (expire_days * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toGMTString()}`;
  window.document.cookie = `Finger=${finger};${expires};domain=${productionHostName};path=/`;
}
// let isLogined = false;
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
  store.commit('member/MemberIsLogOut', '', { root: true });
  window.localStorage.removeItem('JWT_TOKEN');
  window.localStorage.removeItem('LC_API_ID');
  window.localStorage.removeItem('LC_API_EMAIL');
  window.localStorage.removeItem('agency');
  router.push({ path: '/' });
  if (!errorVisible) {
    errorVisible = true;
    window.LC_API.set_visitor_name('GUEST');
    window.LC_API.set_visitor_email('');
    Message({ message: '請重新登入', type: 'error' });
    setTimeout(() => {
      errorVisible = false;
    }, 3000);
  }
}
function error503(err) {
  window.localStorage.removeItem('JWT_TOKEN');
  window.localStorage.removeItem('LC_API_ID');
  window.localStorage.removeItem('LC_API_EMAIL');
  window.localStorage.removeItem('agency');
  if (err.response.data.code === 9100) {
    router.push({ path: '/maintain' }).catch((err) => {});
    window.localStorage.setItem('maintainMessage', err.response.data.message);
  } else if (err.response.data.code === 9200) {
    Message({ message: err.response.data.message, type: 'error' });
  }
}
// 比對API request 避免同時重複發送API
const APIQueue = [];
const { CancelToken } = axios;
const apiDebounce = (APIPath, cancelFn) => {
  if (APIQueue.indexOf(APIPath) > -1) {
    if (cancelFn) {
      cancelFn();
    } else {
      APIQueue.splice(APIQueue.indexOf(APIPath), 1);
    }
  } else if (cancelFn) {
    APIQueue.push(APIPath);
  }
};

// http request 拦截器
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
axios.interceptors.request.use(
  async (config) => {
    config.headers.Accept = 'application/json, text/plain, text/html, */*';
    
    if (window.localStorage.JWT_TOKEN) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${window.localStorage.JWT_TOKEN}`;
      setCookie_JWT_TOKEN(window.localStorage.JWT_TOKEN);
    }
    if (window.localStorage.Finger) {
      // 判断是否存在Finger，如果存在的话，则每个http header都加上Finger
      config.headers.Finger = window.localStorage.Finger;
      setCookie_Finger(window.localStorage.Finger);
    }
    loadingShow();
    // /////////////////////////////////////////////////////////////////////////
    // 目前暫停使用
    // config.cancelToken = new CancelToken((cancelFn) => {
    //   apiDebounce(`${config.baseURL + config.url}&${config.method}`, cancelFn);
    // });
    // /////////////////////////////////////////////////////////////////////////
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
    if (response.headers['jwt-token']) {
      window.localStorage.setItem('JWT_TOKEN', response.headers['jwt-token']);
      setCookie_JWT_TOKEN(response.headers['jwt-token']);
      if (window.localStorage.maintainMessage) window.localStorage.removeItem('maintainMessage');
    }
    loadingClose();
    // /////////////////////////////////////////////////////////////
    // 目前暫停使用
    // apiDebounce(`${response.config.url}&${response.config.method}`);
    // /////////////////////////////////////////////////////////////
    return response;
  },
  (err) => {
    console.log(err);
    if (err.response.status === 401) {
      error401(err);
    } else if (err.response.status === 503) {
      error503(err);
    } else {
      Message({ message: err.response.data.message, type: 'error' });
    }
    loadingClose();
    // /////////////////////////////////////////////////////////////
    // 目前暫停使用
    // APIQueue =[];
    // /////////////////////////////////////////////////////////////
    return Promise.reject(err.response);
  },
);

export default axios;
