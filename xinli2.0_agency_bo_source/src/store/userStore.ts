import { defineStore } from 'pinia';
import { Notify } from 'vant';
import { postLogin, AgencyInfo } from '@/api';
import { setLoginData, getLoginData } from '@/utils';
import type { AGENCYAJAX_AgencyLoginRequest, AGENCYAJAX_AgencyLoginResponse, AGENCYAJAX_AgencyFrontPageResponse } from '@/api/model';
import router from '@/router';
interface IUser {
	loginInfo: AGENCYAJAX_AgencyLoginResponse;
	agencyInfo: AGENCYAJAX_AgencyFrontPageResponse;
}
export const UserStore = defineStore({
	id: 'user',
	state: () =>
		({
			loginInfo: {},
			agencyInfo: {},
		} as IUser),
	actions: {
		checkUserInfo() {
			if (getLoginData()) {
				this.loginInfo = getLoginData();
				this.getAgencyInfo();
			}
		},
		login(payload: AGENCYAJAX_AgencyLoginRequest) {
			return new Promise<void>((resolve, reject) => {
				postLogin({
					account: payload.account,
					password: payload.password,
				})
					.then((res) => {
						setLoginData(res.data.data);
						router.replace({ path: '/home' });
						this.checkUserInfo();
						resolve();
					})
					.catch((error) => {
						reject(error);
					});
			});

			// postLogin({
			// 	account: payload.account,
			// 	password: payload.password,
			// }).then((res) => {
			// 	setLoginData(res.data.data);
			// 	router.replace({ path: '/home' });
			// 	this.checkUserInfo();
			// });
		},
		getAgencyInfo() {
			AgencyInfo().then((res) => {
				this.agencyInfo = res?.data?.data || {};
			});
		},
		clearUserInfo() {
			window.localStorage.removeItem('LOGIN_INFO');
			window.localStorage.clear();
			Notify({ type: 'success', message: '登出成功' });
			router.push({ path: '/' });
		},
	},
});
