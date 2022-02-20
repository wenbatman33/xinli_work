import axios from 'axios'
import store from '@/store'

import {
  Loading
} from 'element-ui';
let request_num = 0
let timeSwitch = false
let interV;

//開始偵測response  
function start() {
  interV = setInterval(() => {
    if (request_num == 0) {
      Loading.service().close()
      clearInterval(interV);
      timeSwitch = false
    }
  }, 500);
}

// http request 拦截器
axios.interceptors.request.use(
  config => {
    request_num++
    if (timeSwitch === false) {
      start()
      timeSwitch = true
      Loading.service({
        fullscreen: true,
        text: 'loading',
      })
    }

    if (window.localStorage.JWT_TOKEN) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `Bearer ${window.localStorage.JWT_TOKEN}`
    }
    return config

  },
  error => {
    return Promise.reject(error)
  }
)
// http response 拦截器
axios.interceptors.response.use(
  async response => {
      request_num--
      if (response.data.data && response.data.data.jwt_token) {
        window.localStorage.setItem('JWT_TOKEN', response.data.data.jwt_token)
        await store.dispatch('member/CheckLoginStatus')
      }
      return response
    },
    error => {
      setTimeout(() => {
        Loading.service().close()
      }, 600);
      return Promise.reject(error)
    }
)
export default axios