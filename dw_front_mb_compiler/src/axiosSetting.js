import axios from 'axios';
import Fingerprint2 from 'fingerprintjs2';
import { Message } from 'element-ui';
import router from './router';
import store from '@/store/store';

let Finger = '';
let onError = false;

// 在.env.production 動態切分網域期望值為 cookie www.dw310.com => .dw310.com 以供跨網域cookie使用
const hostname = window.location.hostname.split(".").splice(1, 2);
let productionHostName;
if(process.env.VUE_APP_COOKIEDOMAIN!==''){
  productionHostName = process.env.VUE_APP_COOKIEDOMAIN;
} else {
  productionHostName = "."+hostname.toString().replace(",", ".");
}

function setCookieJWTTOKEN(token) {
  const expireDays = 1; // 過期日期(天)
  const d = new Date();
  d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toGMTString()}`;
  window.document.cookie = `JWT_TOKEN=${token};${expires};domain=${productionHostName};path=/`;
}
function setCookieFinger(finger) {
  const expireDays = 1; // 過期日期(天)
  const d = new Date();
  d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toGMTString()}`;
  window.document.cookie = `Finger=${finger};${expires};domain=${productionHostName};path=/`;
}

function getUrlParam(name) {
  // 取得網址上的參數
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const result = window.location.search.substr(1).match(reg);
  if (result != null) return unescape(result[2]); return null;
}

function checkToken() {
  if (getUrlParam('token') && getUrlParam('finger')) {
    console.log('ok');
    window.localStorage.setItem('JWT_TOKEN', getUrlParam('token'));
    window.localStorage.setItem('Finger', getUrlParam('finger'));
  } else if (window.localStorage.Finger) {
    [Finger] = window.localStorage.Finger;
  } else {
    Fingerprint2.get((components) => {
      Finger = Fingerprint2.x64hash128(components.map(pair => pair.value).join(), 31);
      window.localStorage.setItem('Finger', Finger);
    });
  }
}
checkToken();

/* eslint no-param-reassign: "error" */

// http request 拦截器
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

let request = 0;
let errorDisplay = false;

axios.interceptors.request.use(
  async (config) => {
    config.headers.Accept = 'application/json, text/plain, text/html, */*';
    if (window.localStorage.JWT_TOKEN) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${window.localStorage.JWT_TOKEN}`;
      setCookieJWTTOKEN(window.localStorage.JWT_TOKEN);
    }
    if (window.localStorage.Finger) {
      // 判断是否存在Finger，如果存在的话，则每个http header都加上Finger
      config.headers.Finger = window.localStorage.Finger;
      setCookieFinger(window.localStorage.Finger);
    } else {
      Fingerprint2.get((components) => {
        Finger = Fingerprint2.x64hash128(components.map(pair => pair.value).join(), 31);
        window.localStorage.setItem('Finger', Finger);
      });
    }
    request += 1;
    if (request > 0) {
      store.commit('index/setLoading', true);
    }
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  },
);

// http response 拦截器
axios.interceptors.response.use(
  async (response) => {
    if (response.headers['jwt-token']) {
      window.localStorage.setItem('JWT_TOKEN', response.headers['jwt-token']);
    }
    request -= 1;
    if (request <= 0) {
      store.commit('index/setLoading', false);
      request = 0;
    }
    return response;
  },
  (err) => {
    console.log(err.response);
    if (err.response.status === 401) {
      request = 0;
      if (window.navigator.userAgent.indexOf('Android') > 0) {
        try {
          if (!onError) {
            onError = true;
            window.android.token_expired();
            setTimeout(() => {
              onError = false;
            }, 2000);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          if (!onError) {
            onError = true;
            window.webkit.messageHandlers.token_expired.postMessage('token_expired');
            setTimeout(() => {
              onError = false;
            }, 2000);
          }
        } catch (error) {
          console.log(error);
        }
      }
      if (!errorDisplay) {
        errorDisplay = true;
        Message({ message: '请重新登入', type: 'error' });
        setTimeout(() => {
          errorDisplay = false;
        }, 3000);
      }
      window.localStorage.removeItem('JWT_TOKEN');
      window.localStorage.removeItem('LC_API_ID');
      window.localStorage.removeItem('LC_API_EMAIL');
      window.localStorage.removeItem('agency');
      window.LC_API.set_visitor_name('GUEST');
      window.LC_API.set_visitor_email('');
      store.commit('index/setLogin', false);
      store.dispatch('index/setCardOpen', false);
      router.push({ path: '/' }).catch((err) => {});
    } else if (err.response.status === 503) {
      window.localStorage.removeItem('JWT_TOKEN');
      window.localStorage.removeItem('LC_API_ID');
      window.localStorage.removeItem('LC_API_EMAIL');
      window.localStorage.removeItem('agency');
      if (err.response.data.code === 9100) {
        window.localStorage.setItem('maintain', err.response.data.message);
        router.push({ path: '/maintain' }).catch((err) => {});
      } else {
        store.dispatch('index/setCardOpen', false);
        Message({ message: err.response.data.message, type: 'error' });
      }
      store.commit('index/setLoading', false);
      request = 0;
    } else {
      request -= 1;
    }
    if (request <= 0) {
      store.commit('index/setLoading', false);
      request = 0;
    }
    return Promise.reject(err);
  },
);

export default axios;
