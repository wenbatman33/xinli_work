import Vue from 'vue';
import App from '@/App.vue';
import VueAxios from 'vue-axios';
import axios from '@/axiosSetting';
import store from '@/store/store';
import router from '@/router';
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload';
import dayjs from 'dayjs';
import VueClipboard from 'vue-clipboard2';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueAnime from 'vue-animejs';
import VueMatomo from 'vue-matomo';
import matomoTrackEvent from '@/matomoTrackEvent';

import 'dayjs/locale/zh-cn';
import 'swiper/dist/css/swiper.css';
import '@/filter';
import '../theme/index.css';

dayjs.locale('zh-cn');
Vue.use(VueAxios, axios, ElementUI, VueLazyload, VueAwesomeSwiper);
Vue.use(VueAwesomeSwiper);
Vue.use(VueAnime);
Vue.use(matomoTrackEvent);
Vue.use(dayjs);
Vue.use(VueClipboard);
Vue.config.productionTip = false;
Vue.config.ignoredElements = ['lineargradient', 'stop'];
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$axios = axios;

let initJsonNum = 0;
let initAPINum = 0;
let currentJson = null;
const domainJsons = [
  'https://jl.tiger18.fyi:10443/dw.json',
  'https://jl.tiger18.info:10443/dw.json',
  'https://jl.tiger18.run:10443/dw.json',
  'https://jl.tiger18.cc:10443/dw.json',
];
// 站台初始化設定
function init(host, matomo) {
  if (host && matomo) {
    window.localStorage.setItem('MAIN_HOST', host);
    window.localStorage.setItem('MATOMO', matomo);
    window.APIHOST = `https://aa18ab918.${host}/a`;
    window.GAMEAPIHOST = `https://aa18ab918.${host}/g`;
    window.CDN_ASSETS = `https://castle.${host}`;
    window.CDN_STATIC = `https://static.${host}`;
    if (process.env.VUE_APP_MAINDOMAIN) {
      // 若有指定夢之城的網址 則使用該設定
      window.MAINDOMAIN = process.env.VUE_APP_MAINDOMAIN;
    } else {
      // 若未指定夢之城的網址 則動態切分夢工廠網域來當夢之城的 domain ///////////////////////////////
      const hostname = window.location.hostname.split('.').splice(1, 2);
      const productionHostName = `https://www.${hostname.toString().replace(',', '.')}`;
      window.MAINDOMAIN = productionHostName;
    }
  } else {
    window.APIHOST = process.env.VUE_APP_APIHOST;
    window.GAMEAPIHOST = process.env.VUE_APP_GAMEAPIHOST;
    window.CDN_ASSETS = process.env.VUE_APP_CDN_ASSETS;
    window.CDN_STATIC = process.env.VUE_APP_CDN_STATIC;
    // 夢之城的網址設定////////////////////////////////////////////////////////////////////////
    window.MAINDOMAIN = process.env.VUE_APP_MAINDOMAIN;
  }
  Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: `${window.CDN_ASSETS}/static/img/warning.png`,
    loading: `${window.CDN_ASSETS}/static/img/loading.gif`,
    attempt: 1,
  });
  // matomo 相關設定//////////////////////////////////////////////////////////
  Vue.use(VueMatomo, {
    host: `https://${matomo}`,
    siteId: process.env.VUE_APP_MATOMO,
    trackerFileName: 'matomo',
    router,
    enableLinkTracking: true,
    requireConsent: false,
    trackInitialView: true,
    disableCookies: false,
    enableHeartBeatTimer: false,
    heartBeatTimerInterval: 15,
    debug: false,
    userId: undefined,
    cookieDomain: undefined,
    domains: undefined,
    preInitActions: [],
  });
  
  

  // /////////////////////////////////////////////
  axios.defaults.baseURL = window.APIHOST;
  // /////////////////////////////////////////////
  APP_SETUP();
}

function APP_SETUP() {
  const LC_API_JS = document.createElement('script');
  LC_API_JS.src = `${window.CDN_ASSETS}/static/js/LC_API.js`;
  const elementUI = document.createElement('link');
  elementUI.href = `${window.CDN_ASSETS}/static/css/element-ui_2.10.1.css`;
  elementUI.rel = 'stylesheet';
  const fontAwesome = document.createElement('link');
  fontAwesome.href = `${window.CDN_ASSETS}/static/css/fontawesome.com_v5.8.2.css`;
  fontAwesome.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(LC_API_JS);
  document.getElementsByTagName('head')[0].appendChild(elementUI);
  document.getElementsByTagName('head')[0].appendChild(fontAwesome);
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  });
}

// 依序測試json內 domain位置
function checkJsonInsideHost(host, matomo) {
  return new Promise((resolve, reject) => {
    // 依照 json內的 main組合各站台內的ConnectionInfo 測試是否可以連線成功
    fetch(`https://aa18ab918.${host}/a/api/ConnectionInfo`, {
      method: 'get',
    }).then(response => response.json()).then((res) => {
      // 若成功 則初始化vue
      init(host, matomo);
      resolve(res);
    }).catch((error) => {
      if (initAPINum === (currentJson.length - 1)) {
        // 全失敗則 再次載入下一隻json測試
        initJsonNum += 1;
        initAPINum = 0;
        initDomainJson(initJsonNum);
      } else {
        // 若失敗 則依序再做測試
        initAPINum += 1;
        checkJsonInsideHost(currentJson[initAPINum].main);
      }
      reject(error);
    });
  });
}

// 依序測試 domainJsons 內的json
function initDomainJson(num) {
  fetch(domainJsons[num], {
    method: 'get',
  }).then(response => response.json()).then((res) => {
    currentJson = res;
    // 載入json成功時 依序測試json內四個 domain位置
    checkJsonInsideHost(currentJson[initAPINum].main, currentJson[initAPINum].matomo);
  }).catch((error) => {
    initJsonNum += 1;
    initDomainJson(initJsonNum);
  });
}

// 測試正式機的暫存檔內的站台連線狀況
function checkLocalStorageMainHost(host, matomo) {
  return new Promise((resolve, reject) => {
    fetch(`https://aa18ab918.${host}/a/api/ConnectionInfo`, {
      method: 'get',
    }).then(response => response.json()).then((res) => {
      init(host, matomo);
      resolve(res);
    }).catch((error) => {
      initDomainJson(initJsonNum);
    });
  });
}

// 測試機和 stage機 APIHOST以環境變數做設定
if (process.env.VUE_APP_APIHOST && process.env.VUE_APP_GAMEAPIHOST) {
  init(null, 'mtm.tgcity18.info');
} else if (window.localStorage.MAIN_HOST && window.localStorage.MATOMO) {
  // 正式機若有 window.localStorage.MAIN_HOST  window.localStorage.MATOMO 使用暫存站台進入
  checkLocalStorageMainHost(window.localStorage.MAIN_HOST, window.localStorage.MATOMO);
} else {
  // 正式機若沒有 window.localStorage.MAIN_HOST  window.localStorage.MATOMO 就去載入json
  // 進入載入Json循環迴圈
  initDomainJson(initJsonNum);
}
