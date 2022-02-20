import axios from 'axios';
import store from '@/store';
import { message } from 'ant-design-vue';
//
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
// request拦截器
axios.interceptors.request.use(
	(config) => {
		if (window.localStorage.TOKEN && window.localStorage.UID) {
			config.headers.token = window.localStorage.TOKEN;
			config.headers.uid = window.localStorage.UID;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
// response 拦截器
axios.interceptors.response.use(
	(response) => {
		const res = response.data;
		if (res.code == 0) {
			return Promise.resolve(res);
		} else if (res.errcode == 0) {
			return Promise.resolve(res);
		} else if (res.code == 1014) {
			store.dispatch('user/RESET_TOKEN');
			store.commit('user/SHOW_LOGIN_MODEL', 1);
		} else if (res.code == 2146 || res.code == 2147) {
			// 檢查拼圖是否有領過 略過顯示錯誤訊息
			return Promise.reject(res);
		} else {
			message.error(res.message);
			return Promise.reject(res);
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axios;
