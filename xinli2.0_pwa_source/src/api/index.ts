import qs from 'qs';
import axios from 'axios';
import i18n from '@/i18n';
import router from '@/router';
import { Dialog, Notify } from 'vant';
import { getBearerToken, clearLoginData } from '@/utils';
import { LocalStorageKeys, DEFAULT_LNAG } from '@/utils/constants';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Environment
 */
const ENV = import.meta.env;

/**
 * Pending request map
 */
const PENDING = new Map();

/**
 * Create axios instance
 */
const api = axios.create({
  baseURL: ENV.VITE_API_URL,
  timeout: 30000,
  headers: {
    get: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    post: { 'Content-Type': 'application/json;charset=utf-8' },
  },
});

/**
 * Add pending request
 * @param config Request configuration
 */
const addPending = (config?: AxiosRequestConfig) => {
  if (config) {
    const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&');
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!PENDING.has(url)) {
          PENDING.set(url, cancel);
        }
      });
  }
};

/**
 * Remove pending request
 * @param config Request configuration
 */
const removePending = (config?: AxiosRequestConfig) => {
  if (config) {
    const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&');
    if (PENDING.has(url)) {
      const cancel = PENDING.get(url);
      cancel(url);
      PENDING.delete(url);
    }
  }
};

/**
 * Clear all pending request
 */
export const clearPending = () => {
  for (const [url, cancel] of PENDING) {
    cancel(url);
  }
  PENDING.clear();
};

/**
 * Check status code
 * @param status Status code
 * @returns Error message
 */
export const checkStatus = (status: number): string => {
  switch (status) {
    case 400:
      return i18n.global.t('api_status400');
    case 401:
      return i18n.global.t('api_status401');
    case 403:
      return i18n.global.t('api_status403');
    case 404:
      return i18n.global.t('api_status404');
    case 405:
      return i18n.global.t('api_status405');
    case 408:
      return i18n.global.t('api_status408');
    case 500:
      return i18n.global.t('api_status500');
    case 501:
      return i18n.global.t('api_status501');
    case 502:
      return i18n.global.t('api_status502');
    case 503:
      return i18n.global.t('api_status503');
    case 504:
      return i18n.global.t('api_status504');
    case 505:
      return i18n.global.t('api_status505');
    default:
      if (status < 200 && status >= 300) {
        return i18n.global.t('api_statusError', { code: status });
      } else {
        return '';
      }
  }
};

/**
 * Add request interceptor
 */
api.interceptors.request.use(
  (config?: AxiosRequestConfig) => {
    // Remove pending request with the same url
    removePending(config);

    // Add pending request
    addPending(config);

    // Add language
    const lang = localStorage.getItem(LocalStorageKeys.LANG) || DEFAULT_LNAG;
    if (config) {
      config.headers.Language = lang;
    }

    // Add authorization token
    const token = localStorage.getItem(LocalStorageKeys.TOKEN);
    if (config && token) {
      config.headers.Authorization = getBearerToken(token);
    }

    // Return updated config
    return config;
  },
  (error) => {
    // Print error message
    Notify({ type: 'danger', message: i18n.global.t('api_requestError') });

    // Reject promise
    return Promise.resolve(error);
  }
);

/**
 * Add response interceptor
 */
api.interceptors.response.use(
  (response?: AxiosResponse) => {
    // Remove pending request
    removePending(response?.config);

    // Verify api response status code
    const data = response?.data || {};
    if (data.statusCode != 0) {
      // Compute error message
      let errorMsg;
      const t = i18n.global.t(String(data.msgCode), data.data || {});
      if (data.msgCode && t && t != data.msgCode) {
        errorMsg = i18n.global.t(String(data.msgCode), data.data || {});
      } else if (data.msg) {
        errorMsg = data.msg;
      } else {
        errorMsg = i18n.global.t('api_apiStatusError', { code: data.statusCode });
      }

      // Invoke custom error handler
      let errorHandled = false;
      const errorHandler = response?.config?.data;
      if (typeof errorHandler == typeof Function) {
        errorHandled = errorHandler(data.statusCode, errorMsg);
      }

      // Display error message
      if (!errorHandled) {
        Dialog({
          theme: 'round-button',
          teleport: '#dialog-container',
          title: errorMsg,
          confirmButtonText: i18n.global.t('common_confirm'),
          showConfirmButton: true,
          showCancelButton: false,
        }).then(() => {});
      }
      return Promise.reject(Error(errorMsg));
    }

    // Return axios response
    return response;
  },
  (error) => {
    // Print error message
    if (axios.isCancel(error)) {
      // Log cancelled
      console.log(`request cancelled: ${error.message}`);
    } else {
      // Log error message
      console.error(`request error: ${error.message}`);

      // Notify http status error
      const status = error?.response?.status || 0;
      var errorMsg = i18n.global.t('api_responseError');
      if (status) {
        errorMsg = checkStatus(status);
      }

      // Handle http status
      if (status == 401) {
        // 401: Unauthorized
        // Clear login data
        clearLoginData();

        // Display error message
        Dialog({
          theme: 'round-button',
          teleport: '#dialog-container',
          title: errorMsg,
          confirmButtonText: i18n.global.t('common_confirm'),
          showConfirmButton: true,
          showCancelButton: false,
          closeOnClickOverlay: false,
        }).then(() => {
          // Navigate to login page
          router
            .replace({
              path: '/',
            })
            .then(() => {
              window.location.href = ENV.VITE_LOGIN_URL || '';
            });
        });
      } else {
        // Notify error message
        Notify({
          type: 'danger',
          message: errorMsg,
        });
      }
    }

    // Reject promise
    return Promise.reject(error);
  }
);

export default api;
