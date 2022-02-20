import axios from 'axios';
import Fingerprint2 from 'fingerprintjs2';
import router from '@/router';
import store from '@/store/store';
import { Loading, Message } from 'element-ui';

let Finger = '';
let errorVisible = false;
const loadingIsShow = false;
// 在.env.production 動態切分網域期望值為 cookie www.dw310.com => .dw310.com 以供跨網域cookie使用
const hostname = window.location.hostname.split(".").splice(1, 2);
const production_MAINDOMAIN = "https://www."+hostname.toString().replace(",", ".");

let productionHostName;
if(process.env.VUE_APP_COOKIEDOMAIN!==''){
  productionHostName = process.env.VUE_APP_COOKIEDOMAIN;
} else {
  productionHostName = "*."+hostname.toString().replace(",", ".");
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
  window.document.cookie = `JWT_TOKEN=${token};${expires};domain=${productionHostName}; path=/`;
}
function setCookie_Finger(finger) {
  const expire_days = 1; // 過期日期(天)
  const d = new Date();
  d.setTime(d.getTime() + (expire_days * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toGMTString()}`;
  window.document.cookie = `Finger=${finger};${expires};domain=${productionHostName}; path=/`;
}
function delete_cookie_localStorage() {
  //  刪除所有暫存檔
  window.localStorage.removeItem('JWT_TOKEN');
  window.localStorage.removeItem(`CART_${window.localStorage.LC_API_ID}`);
  window.localStorage.removeItem('CARTTIME');
  window.localStorage.removeItem('LC_API_ID');
  window.localStorage.removeItem('LC_API_EMAIL');
  window.LC_API.set_visitor_name('GUEST');
  window.LC_API.set_visitor_email('');
  window.document.cookie = 'JWT_TOKEN=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.document.cookie = 'Finger=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getUrlParam(name) {
  // 取得網址上的參數
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const result = window.location.search.substr(1).match(reg);
  if (result != null) return unescape(result[2]); return null;
}

function checkToken() {
  if (getUrlParam('token') && getUrlParam('finger')) {
    window.localStorage.setItem('JWT_TOKEN', getUrlParam('token'));
    window.localStorage.setItem('Finger', getUrlParam('finger'));
  } else if (getCookieValue('JWT_TOKEN') && getCookieValue('Finger')) {
    const token = getCookieValue('JWT_TOKEN');
    const finger = getCookieValue('Finger');
    window.localStorage.setItem('JWT_TOKEN', token);
    window.localStorage.setItem('Finger', finger);
  } else if (window.localStorage.Finger) {
    Finger = window.localStorage.Finger;
  } else {
    const redirctUrl = (process.env.VUE_APP_MAINDOMAIN) ? `${process.env.VUE_APP_MAINDOMAIN}` : `${production_MAINDOMAIN}`;
    window.location.href =  redirctUrl;
  }
}
function error401(err) {
  // JWT_TOKEN 過期
  window.localStorage.removeItem('JWT_TOKEN');
  window.localStorage.removeItem('LC_API_ID');
  window.localStorage.removeItem('LC_API_EMAIL');
  store.commit('member/MemberIsLogOut', '', { root: true });
  delete_cookie_localStorage();
  const redirctUrl = (process.env.VUE_APP_MAINDOMAIN) ? `${process.env.VUE_APP_MAINDOMAIN}/?card=bl_Login&type=account` : `${production_MAINDOMAIN}/?card=bl_Login&type=account`;
  window.location.href = redirctUrl;
  if (!errorVisible) {
    errorVisible = true;
    Message({ message: err.response.data.message, type: 'error' });
    setTimeout(() => {
      errorVisible = false;
    }, 3000);
  }
}
function error503(err) {
  window.localStorage.removeItem('JWT_TOKEN');
  window.localStorage.removeItem('LC_API_ID');
  window.localStorage.removeItem('LC_API_EMAIL');
  const redirctUrl = (process.env.VUE_APP_MAINDOMAIN) ? `${process.env.VUE_APP_MAINDOMAIN}/maintain` : `${production_MAINDOMAIN}/maintain`;
  window.location.href =  redirctUrl;

  window.localStorage.setItem('maintainMessage', err.response.data.message);
  if (err.response.data.code === 9100) {
    // router.push({ path: '/maintain' }).catch((err) => {});
  } else if (err.response.data.code === 9200) {
    Message({ message: err.response.data.message, type: 'error' });
  }
}

checkToken();

// http request 拦截器
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
// 比對API request 避免同時重複發送API
let APIQueue = [];
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
      // setCookie_Finger(window.localStorage.Finger);
    }
    loadingShow();
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

async function redoRequest(response) {
  // 重新請求 axios
  const config = response.config;
  config.__retryCount += 1;
  if (!config || !config.retry) return Promise.reject(response);
  config.__retryCount = config.__retryCount || 0;
  if (config.__retryCount >= config.retry) {
    return Promise.reject(response);
  }
  const backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1);
  });
  await backoff;
  return axios(config);
}
// http response 拦截器
axios.interceptors.response.use(
  async (response) => {
    if (response.headers['jwt-token']) {
      window.localStorage.setItem('JWT_TOKEN', response.headers['jwt-token']);
      setCookie_JWT_TOKEN(response.headers['jwt-token']);
      if (window.localStorage.maintainMessage) window.localStorage.removeItem('maintainMessage');
    }
    loadingClose();
    return response;
  },
  (err) => {
    if (err.response.status === 401) {
      error401(err);
    } else if (err.response.status === 503) {
      error503(err);
    } else {
      Message({ message: err.response.data.message, type: 'error' });
    }
    loadingClose();
    return Promise.reject(err.response);
  },
);
export default axios;
