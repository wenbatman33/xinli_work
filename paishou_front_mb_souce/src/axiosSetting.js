import axios from 'axios';
import store from '@/store';
import { Notify } from 'vant';

// Request domain
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;

// Request interceptor
axios.interceptors.request.use(
	(config) => {
		// Add user id and token header
		if (window.localStorage.TOKEN && window.localStorage.UID) {
			config.headers.token = window.localStorage.TOKEN;
			config.headers.uid = window.localStorage.UID;
		}

		// Add pwa header
		const query = '(display-mode: standalone)';
		config.headers.pwa = navigator.standalone || window.matchMedia(query).matches;

		// Return intercepted request config
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor
axios.interceptors.response.use(
	(response) => {
		// Response data
		const res = response.data;

		// Request url
		const url = response.request?.responseURL || '';

		// Success code
		if (res.code == 0) {
			return Promise.resolve(res);
		} 
		
		// Success error code
		else if (res.errcode == 0) {
			return Promise.resolve(res);
		} 
		
		// Token expired
		else if (res.code == 1014) {
			store.dispatch('user/RESET_TOKEN');
		} 
		
		// Event 011 hide received message in live room 10 minutes interval
		else if (url.indexOf('/event/011/get') >= 0) {
			return Promise.reject(res);
		} 
		
		// Notify error message and reject promise
		else {
			Notify({ type: 'danger', message: res.message });
			return Promise.reject(res);
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axios;
