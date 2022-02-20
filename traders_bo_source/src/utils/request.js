import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.headers['jwt-token']) {
      setToken(response.headers['jwt-token'])
    }
    return response.data
  },
  error => {
    console.log('response ' + error) // for debug
    if (error.response.status === 401) {
      // JWT_TOKEN 過期
      Message({ message: error.response.data.message, type: 'error' })
      store.dispatch('user/resetToken').then(() => {
        location.reload()
      })
    } else {
      Message({ message: error.response.data.message, type: 'error' })
    }
    return Promise.reject(error.response.data)
  }
)

export default service
