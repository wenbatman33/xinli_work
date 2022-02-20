import axios from 'axios';
import i18n from '@/i18n';
import type { AxiosResponse } from 'axios';
import { getToken, cleanLocalStorage } from '@/utils';
import { UserStore } from '@/store/userStore';
import { Notify } from 'vant';

import router from '@/router';

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

const ENV = import.meta.env;
const Axios = axios.create({
	baseURL: ENV.VITE_API_URL,
	timeout: 30000,
	headers: {
		get: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
		post: { 'Content-Type': 'application/json;charset=utf-8' },
	},
});

Axios.interceptors.request.use(
	(config) => {
		// 请求拦截处理
		config.headers.common.Language = window.localStorage.LANG || 'cn';
		if (getToken()) {
			config.headers.common.Authorization = `Bearer ${getToken()}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
const checkResponseException = (response: any) => {
	// 排除某些api的錯誤訊息 目前先遮蔽
	// if (
	// 	response.config.url !== '/member/authorize/sso_login' &&
	// 	response.config.url !== '/member/authorize/sso_register'
	// ) {
	// 	Notify({ type: 'danger', message: response.data.msg });
	// }
	Notify({ type: 'danger', message: response.data.msg });
};
Axios.interceptors.response.use(
	(response: AxiosResponse) => {
		// 响应拦截处理
		if (response.status < 200 || response.status >= 300) {
			const erroeMsg = checkStatus(response.status);
			Notify({ type: 'danger', message: erroeMsg });
		} else if (response.status == 200) {
			if (response.data.statusCode != 1 && response.data.status != 'ok') {
				// 判斷某些api例外
				checkResponseException(response);
				// 判斷某些api例外
			} else if (response?.data?.code === 1014) {
				// token過期
				Notify({ type: 'danger', message: '您的登陆状态失效' });
			}
		}
		return response;
	},
	(error) => {
		// const erroeMsg = checkStatus(error.response.status);
		if (!error.response) {
			router.push('/network');
		} else if (error.response.status == 401) {
			// 清除 token
			const userStore = UserStore();
			userStore.clearUserInfo();
		} else if (error.response.status >= 501) {
			// router.push('/forbidden');
		} else if (axios.isCancel(error)) {
			console.log('repeated request: ' + error.message);
		}
		return Promise.reject(error);
	}
);

export default Axios;
