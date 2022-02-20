import { defineStore } from 'pinia';
import { ssoLogin, ssoRegister, me, getMemberMoney, login, register } from '@/api';
import { getLoginConfig, getRegisterConfig, getMemberVipInfo, getMemberVipSetting, getMemberVipGift, gameGamegroupWallettype } from '@/api';
import type { MEMBERAJAX_LoginRequest, MEMBERAJAX_RegisterRequest } from '@/api/model';
import { EventStore } from '@/store/eventStore';
import { SystemStore } from '@/store/systemStore';
import { SocketStore } from '@/store/socketStore';
import { message, Modal } from 'ant-design-vue';
import { openLiveChat, gotoCommonLogin, cleanLocalStorage, getToken, setLoginData, getLoginData } from '@/utils';
import type {
	GAMEAJAX_GetWalletTypeGGroupDTO,
	MONEYAJAX_MemberMoneyResponse,
	MEMBERAJAX_GetVipInfoResponse,
	MEMBERAJAX_GetMemberResponse,
	MEMBERAJAX_GetVipGiftResponse,
	MEMBERAJAX_VIPLevelInfoResponseData,
} from '@/api/model';

import router from '@/router';
interface ILoginInfo {
	token?: string;
	memberID?: string;
	account?: string;
	status?: number;
	forceChangePassword?: number;
	forceTwoPhase?: number;
	password?: string;
	deviceID?: string;
	platform?: number;
	captcha?: string;
	secret?: string;
}
export const UserStore = defineStore({
	id: 'user',
	state: () => ({
		longinStep: '',
		// longinStep: 'forceTwoPhase',
		// longinStep: 'forceTwoPhaseSms',
		// longinStep: 'forceChangePasswordStep1',
		// longinStep: 'forceChangePasswordStep2',
		forceOldPassword: '',
		forceOldPasswordSecret: '',
		changePhoneTemSecret: '',
		userInfo: {} as MEMBERAJAX_GetMemberResponse,
		loginInfo: {} as ILoginInfo,
		vipInfo: {} as MEMBERAJAX_GetVipInfoResponse,
		vipSetting: [] as MEMBERAJAX_VIPLevelInfoResponseData[],
		vipGift: {} as MEMBERAJAX_GetVipGiftResponse,
		wallettypeInfo: [] as GAMEAJAX_GetWalletTypeGGroupDTO[],
		money: 0,
		lockMoney: 0,
	}),
	actions: {
		init() {
			const loginInfo = (window?.localStorage?.LOGIN_INFO && JSON.parse(window?.localStorage?.LOGIN_INFO)) || {};
			if (getToken()) {
				this.connectSocket();
			}
			if (loginInfo && loginInfo.forceTwoPhase == 1) {
				this.longinStep = 'forceTwoPhase';
				router.push('/login');
			} else if (loginInfo && loginInfo.forceTwoPhase == 3) {
				this.longinStep = 'forceTwoPhaseSms';
				router.push('/login');
			} else if (loginInfo && loginInfo.orceChangePassword == 1) {
				this.longinStep = 'forceChangePasswordStep1';
				router.push('/login');
			}
		},
		setUserInfo(data: any) {
			window.localStorage.setItem('USER_INFO', JSON.stringify(data));
			this.userInfo = { ...data };
		},
		setVipInfo(data: any) {
			this.vipInfo = { ...data };
		},
		setVipGift(data: any) {
			this.vipGift = { ...data };
		},
		setVipSetting(data: any) {
			this.vipSetting = data;
		},
		async checkUserInfo() {
			if (getLoginData()) {
				const meResult = await me();
				meResult && this.setUserInfo(meResult?.data?.data);
				// 遊戲錢包類型

				// 取得VIP訊息
				const VIP_Result = await getMemberVipInfo();
				VIP_Result && this.setVipInfo(VIP_Result?.data?.data);

				// 取得VIP訊息
				const VIP_SettingResult = await getMemberVipSetting();
				VIP_SettingResult && this.setVipSetting(VIP_SettingResult?.data?.data?.list);

				// 取得VIP Gift訊息
				// const VIP_GiftResult = await getMemberVipGift();
				// VIP_GiftResult && this.setVipGift(VIP_GiftResult?.data?.data);

				// 取得公告信
				const eventStore = EventStore();
				eventStore.getEventLetterListAction();
				// 取得錢包訊息
				this.getUerMoney();
			}
		},

		async getUerMoney() {
			this.wallettypeInfo = [];
			const gamegroupWallettypeResult = await gameGamegroupWallettype();
			this.wallettypeInfo = gamegroupWallettypeResult?.data?.data?.list || [];
			// 取得錢包訊息
			const moneyResult = await getMemberMoney();
			this.money = moneyResult?.data?.data?.money || 0;
			this.lockMoney = moneyResult?.data?.data?.lockMoney || 0;
		},
		clearUserInfo() {
			cleanLocalStorage();
			this.disconnectSocket();
			this.userInfo = {};
			this.loginInfo = {};
			// route在首頁時重新載入頁面
			if (router?.currentRoute?.value?.path === '/') {
				// 目前在站台首頁時 重新整理畫面
				window.location.reload();
			} else {
				// 重新返回站台首頁
				window.location.href = '/';
			}
		},

		async commonLogin(payload: MEMBERAJAX_LoginRequest) {
			const result = await ssoLogin(payload);
			if (result.data.statusCode != 1 && result.data.status != 'ok') {
				// 登入-錯誤提示
				this.accountLoginError();
			} else if (result?.data?.data?.status === 2) {
				// 帳號被停用
				this.accountLock();
			} else if (result?.data?.data?.status === 3) {
				// 帳號被鎖定
				this.accountDisabled();
			} else if (result?.data?.data?.status === 1) {
				// 	狀態：1: 啟用
				// 進入二階段認證檢查
				//////////////////////////////
				setLoginData(result?.data?.data);
				//////////////////////////////
				this.checkUserInfo();
				this.forceTwoPhaseCheck(result?.data?.data);
			}
		},

		async commonRegister(payload: MEMBERAJAX_RegisterRequest) {
			const result = await ssoRegister(payload);
			const data = result.data.data;
			if (data) {
				setLoginData(result.data.data);
				this.registerSuccess();
			}
		},

		forceTwoPhaseCheck(data: any) {
			// 進入二階段認證檢查
			// forceTwoPhase 進入二階段認證 1:進入 2:不用 3:進入，而且需要簡訊驗證
			this.loginInfo = { ...data };
			if (this.loginInfo.forceTwoPhase === 1) {
				this.forceTwoPhaseHandle();
			} else if (this.loginInfo.forceTwoPhase === 2) {
				// 強制更換密碼檢查
				this.forceChangePasswordCheck();
			} else if (this.loginInfo.forceTwoPhase === 3) {
				// 強制更換密碼檢查
				this.forceTwoPhaseSmsHandle();
			}
		},

		forceTwoPhaseHandle() {
			// 二階段認證檢查
			console.log('forceTwoPhaseHandle');
			this.longinStep = 'forceTwoPhase';
		},
		forceTwoPhaseSmsHandle() {
			// 二階段認證檢查 而且需要簡訊驗證
			console.log('forceTwoPhaseSmsHandle');
			this.longinStep = 'forceTwoPhaseSms';
		},
		forceChangePasswordCheck() {
			// 強制更換密碼檢查
			// console.log(this?.loginInfo?.forceChangePassword);
			if (this?.loginInfo?.forceChangePassword === 1) {
				this.forceChangePasswordHandle();
			} else if (this.loginInfo.forceChangePassword === 2) {
				this.loginSuccess();
			}
		},
		forceChangePasswordHandle() {
			this.longinStep = 'forceChangePasswordStep1';
			console.log('forceChangePasswordStep1');
		},
		loginSuccess() {
			setTimeout(() => {
				this.checkUserInfo();
				this.connectSocket();
			}, 500);
			// 登入成功後導向 Evnet
			this.loginSuccessRedirect();
		},
		loginSuccessRedirect() {
			if (window.localStorage.redirectUrl) {
				// localStorage 若有 redirectUrl 則轉址至活動網頁
				const redirectUrl = window.localStorage.redirectUrl;
				window.localStorage.removeItem('redirectUrl');
				window.location.replace(`${redirectUrl}?token=${this.loginInfo.token}`);
			} else {
				router.push('/').catch((err) => {});
			}
		},
		// 登入-錯誤提示
		accountLoginError() {
			Modal.confirm({
				class: 'SSO_ERROR_MODAL_noCancelBtn',
				title: () => '登录失败',
				content: () => '其他错误，请再试一次',
				centered: true,
				okText: '返回',
				okButtonProps: { block: true },
				onOk: () => gotoCommonLogin('?form=empty'),
			});
		},
		// 帳號是否被鎖定
		accountLock() {
			Modal.confirm({
				class: 'SSO_ERROR_MODAL',
				title: () => '登录失败',
				content: () => '账号被锁定，如有疑问请联系客服',
				centered: true,
				okText: '联系专员',
				cancelText: '返回',
				okButtonProps: { block: true },
				cancelButtonProps: { block: true },
				onCancel() {},
				onOk: () => openLiveChat(),
			});
		},
		//帳號是否遭管制
		accountDisabled() {
			Modal.confirm({
				class: 'SSO_ERROR_MODAL',
				title: () => '登录失败',
				content: () => `
				亲爱的用户您好，您的账号因以下原因无法使用：
				∙ 多账号或同 IP 违反活动规则
				请联系我方专员进行在线咨询，谢谢！`,
				centered: true,
				okText: '联系专员',
				cancelText: '返回',
				okButtonProps: { block: true },
				cancelButtonProps: { block: true },
				onCancel() {},
				onOk: () => openLiveChat(),
			});
		},
		// 舊版登入方式
		async login(payload: MEMBERAJAX_LoginRequest) {
			const result = await login(payload);
			const systemStore = SystemStore();
			systemStore.loginModalHidden();
			///////////////////////////
			setLoginData(result?.data?.data);
			///////////////////////////
			this.checkUserInfo();
			if (getToken()) {
				if (window.localStorage.tempUrl && window.localStorage.tempUrl === '/') {
					window.location.reload();
					window.localStorage.removeItem('tempUrl');
				} else if (window.localStorage.tempUrl && window.localStorage.tempUrl !== '/') {
					router.push(window.localStorage.tempUrl).catch((err) => {});
					window.localStorage.removeItem('tempUrl');
				} else {
					window.location.reload();
				}
				const socketStore = SocketStore();
				socketStore.connect(getToken());
			} else {
				cleanLocalStorage();
			}
		},
		// 舊版註冊方式
		async register(payload: MEMBERAJAX_RegisterRequest) {
			const result = await register(payload);
			const data = result.data.data;
			const systemStore = SystemStore();
			if (data) {
				systemStore.registerModalHidden();
				message.success('註冊成功');
			}
			// result?.data?.data?.token && ResSuccess();
		},

		registerSuccess() {
			setTimeout(() => {
				this.checkUserInfo();
				this.connectSocket();
			}, 500);
			message.success('註冊成功');
			router.push('/').catch((err) => {});
		},
		connectSocket() {
			const socketStore = SocketStore();
			socketStore.connect(getToken());
		},
		disconnectSocket() {
			const socketStore = SocketStore();
			socketStore?.close();
		},
		async getConfig() {
			const registerRes = await getRegisterConfig();
			const logingRes = await getLoginConfig();
		},
	},
});
