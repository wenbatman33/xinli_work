import { defineStore } from 'pinia';
import { gotoCommonLogin } from '@/utils';
import { PAYMENTAJAX_GetDepositDetailResponse } from '@/api/model';

const ENV = import.meta.env;
interface ISetting {
	RWD_MODE: boolean;
	NO_NAV: boolean;
	NO_FOOTER: boolean;
	loginVisabled: boolean;
	registerVisabled: boolean;
	appDownloadVisabled: boolean;
	myWalletVisabled: boolean;
	editUserNameVisabled: boolean;
	editUserPhoneVisabled: boolean;
	editUserPasswordVisabled: boolean;
	editUserEmailVisabled: boolean;
	AddBankCardVisabled: boolean;
	AddOtherBankCardVisabled: boolean;
	Add_USDT_Visabled: boolean;
	// 偵聽使用
	editUserNameSuccess: boolean;
	editUserPhoneSuccess: boolean;
	AddBankCardSuccess: boolean;
	Add_USDT_Success: boolean;
	// 充值相關
	walletVisabled: boolean;
	depositDeatilVisabled: boolean;
	depositDeatil: PAYMENTAJAX_GetDepositDetailResponse;
	// 遊戲廳列表
	gamerRoomListModelVisabled: boolean;
	tempSecret: string;
}

export const SystemStore = defineStore({
	id: 'system',

	state: (): ISetting => ({
		RWD_MODE: false,
		NO_NAV: false,
		NO_FOOTER: false,
		loginVisabled: false,
		registerVisabled: false,
		appDownloadVisabled: false,
		myWalletVisabled: false,
		editUserNameVisabled: false,
		editUserPhoneVisabled: false,
		editUserPasswordVisabled: false,
		editUserEmailVisabled: false,
		AddBankCardVisabled: false,
		AddOtherBankCardVisabled: false,
		Add_USDT_Visabled: false,
		// 偵聽使用
		editUserNameSuccess: false,
		editUserPhoneSuccess: false,
		AddBankCardSuccess: false,
		Add_USDT_Success: false,
		// 充值相關
		walletVisabled: false,
		depositDeatilVisabled: false,
		depositDeatil: {},
		// depositDeatil: {
		// 	amount: 134,
		// 	bankName: '',
		// 	bankcard: '',
		// 	bankcardOwner: '',
		// 	cashierType: 3,
		// 	effectiveTime: 1644836938,
		// 	id: 'MD2022021418585845398017',
		// 	payAmount: 0,
		// 	payChannelName: '汇宝',
		// 	prompt: '',
		// 	targetWallet: '中心錢包',
		// },
		// 遊戲廳列表
		gamerRoomListModelVisabled: false,
		tempSecret: '',
	}),

	getters: {},

	actions: {
		setRWD(bool: boolean) {
			this.RWD_MODE = bool;
		},
		setNav(bool: boolean) {
			this.NO_NAV = bool;
		},
		setFooter(bool: boolean) {
			this.NO_FOOTER = bool;
		},
		loginModalHidden() {
			this.loginVisabled = false;
		},
		loginModalShow() {
			this.loginVisabled = true;
			this.registerVisabled = false;
		},
		registerModalHidden() {
			this.registerVisabled = false;
		},
		registerModalShow() {
			this.registerVisabled = true;
			this.loginVisabled = false;
		},
		commonLogin() {
			gotoCommonLogin();
		},
		commonRegiste() {
			gotoCommonLogin('register.html');
		},
		toggleMyWallet() {
			this.myWalletVisabled = !this.myWalletVisabled;
		},
		hiddenMyWallet() {
			this.myWalletVisabled = false;
		},
		walletToggle(show: boolean) {
			this.walletVisabled = show;
		},
		appDownloadToggle(show: boolean) {
			this.appDownloadVisabled = show;
		},
		editUserNameSuccessHandle() {
			this.editUserNameSuccess = true;
			setTimeout(() => {
				this.editUserNameSuccess = false;
			}, 1000);
		},
		editUserPhoneSuccessHandle() {
			this.editUserPhoneSuccess = true;
			setTimeout(() => {
				this.editUserPhoneSuccess = false;
			}, 1000);
		},
		AddBankCardSuccessHandle() {
			this.AddBankCardSuccess = true;
			setTimeout(() => {
				this.AddBankCardSuccess = false;
			}, 1000);
		},
		Add_USDT_SuccessHandle() {
			this.Add_USDT_Success = true;
			setTimeout(() => {
				this.Add_USDT_Success = false;
			}, 1000);
		},
	},
});
