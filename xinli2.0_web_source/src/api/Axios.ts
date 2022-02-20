import axios from 'axios';
import i18n from '@/i18n';
import type { AxiosResponse } from 'axios';
import { message } from 'ant-design-vue';
import { UserStore } from '@/store/userStore';
import { SystemStore } from '@/store/systemStore';
import { getToken } from '@/utils';
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
// message 全局方法
message.config({ duration: 2, maxCount: 2 });

let ENV = import.meta.env;

let Axios = axios.create({
	timeout: 10000,
	headers: {
		get: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
		post: { 'Content-Type': 'application/json;charset=utf-8' },
	},
});

Axios.interceptors.request.use(
	(config) => {
		if (ENV.MODE === 'production') debugger;
		(document.getElementById('globalLoading') as HTMLElement).classList.remove('hidden');
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
	// 排除登入註冊的錯誤訊息
	// console.log('checkResponseException');
	// console.log(response);
	if (response.config.url !== '/member/authorize/sso_login' && response.config.url !== '/member/authorize/sso_register' && response.config.url !== '/payment/promotion/apply') {
		message.error(response.data.msg);
	}
};
Axios.interceptors.response.use(
	(response: AxiosResponse) => {
		if (ENV.MODE === 'production') debugger;
		(document.getElementById('globalLoading') as HTMLElement).classList.add('hidden');
		// 响应拦截处理
		if (response.status < 200 || response.status >= 300) {
			const erroeMsg = checkStatus(response.status);
			message.error(erroeMsg);
		} else if (response.status == 200) {
			if (response.data.statusCode != 1 && response.data.status != 'ok') {
				// 判斷例外
				checkResponseException(response);
				// 判斷例外
			} else if (response?.data?.code === 1014) {
				const userStore = UserStore();
				userStore.clearUserInfo();
				message.warning('您的登陆状态失效');
			}
		}
		return response;
	},
	(error) => {
		(document.getElementById('globalLoading') as HTMLElement).classList.add('hidden');
		const erroeMsg = checkStatus(error.response.status);
		message.error(erroeMsg);
		if (!error.response) {
			router.push('/network');
		} else if (error.response.status == 401) {
			// 清除 token
			const userStore = UserStore();
			userStore.clearUserInfo();
		} else if (error.response.status >= 501) {
			router.push('/forbidden');
		} else if (axios.isCancel(error)) {
			console.log('repeated request: ' + error.message);
		} else {
		}

		return Promise.reject(error);
	}
);

export default Axios;
