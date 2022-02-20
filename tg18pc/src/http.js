import axios from 'axios';
import store from '@/store/store';
import jwt from 'jwt-simple';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';

let isLogined = false;
let Finger = '';
function uuid() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  const uuid = s.join('');
  return uuid;
}
if (window.localStorage.UUID) {
  Finger = window.localStorage.UUID;
} else {
  Finger = uuid();
}

function cReateNewToken() {
  return new Promise((resolve, reject) => {
    window.localStorage.removeItem('JWT_TOKEN');
    const secret = '84j5dcduprz7';
    const palyload = Finger;
    const token = jwt.encode(palyload, secret);
    axios.post(`${process.env.VUE_APP_APIHOST}/verification/GetServerJwt/`, palyload, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      window.localStorage.setItem('JWT_TOKEN', res.data.data.jwt_token);
      window.localStorage.setItem('UUID', Finger);
      resolve(res);
    })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

function tokenIllegal() {
  // 設定JWT_TOKEN 登录方式不合法

  window.localStorage.setItem('JWT_TOKEN_Overdue', '登录方式不合法 请重新登录');
  // store.dispatch('member/JWT_INIT', '')
  //   .then(() => {
  //     window.location.reload();
  //   });
}

function tokenOverdue(token) {
  // 設定JWT_TOKEN 逾期
  window.localStorage.setItem('JWT_TOKEN_Overdue', '登录时间逾期 请重新登录');
  // store.dispatch('member/JWT_INIT', '')
  //   .then(() => {
  //     window.location.reload();
  //   });
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
    if (errorInfo) {
      const errorStatus = errorInfo.status;
      router.push({
        path: `/error${errorStatus}`,
      });
    }
    return Promise.reject(err);
  },
);
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
// http request 拦截器
axios.interceptors.request.use(
  async (config) => {
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


async function redoRequest(response) {
  // 重新請求 axios
  const config = response.config;
  console.log(response.data);
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
axios.interceptors.response.use(async (response) => {
  if (Number(response.data.error_code) >= 10001 && Number(response.data.error_code) <= 10999) {
    console.log('發生錯誤');
    // 取得新的Token
    await cReateNewToken();
    // 重新請求 axios
    return redoRequest(response);
  } else if (!response.data.error_code) {
    // window.localStorage.setItem('JWT_TOKEN', response.data.data.jwt_token);
    try {
      if (response.data.data.jwt_token) {
        window.localStorage.setItem('JWT_TOKEN', response.data.data.jwt_token);
        const apiReturnToken = jwtDecode(response.data.data.jwt_token);
        if (apiReturnToken.login_status === 'login') {
          isLogined = true;
        } else if (apiReturnToken.login_status === 'logout') {
          // 判斷前次登入狀態
          if (isLogined) {
            isLogined = false;
            window.location.reload();
          }
        } else if (apiReturnToken.login_status === 'loginfail') {
          // 判斷是否登入錯誤
        } else if (apiReturnToken.login_status === 'expired') {
          // 判斷是否逾期
          tokenOverdue();
        }
      }
    } catch (e) {
      // 取得新的Token
      isLogined = false;
      await cReateNewToken();
    }
  }
  return response;
}, (err) => {
  if (err.response.status === 504 || err.response.status === 404) {
    console.log('系統錯誤');
  }
  return Promise.resolve(err.response.data);
});

export default axios;
