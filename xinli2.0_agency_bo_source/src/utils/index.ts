import { LocalStorageKeys } from '@/utils/constants';

const errorImgPath = `${window?.staticPath || ''}/static/img/icon-error-img.png`;

/**
 * 設置加載失敗的預設圖片
 * @param e Event
 */
export function errorImg(e: Event) {
	(e.target as HTMLImageElement).src = errorImgPath;
}

/**
 * 數字轉千分位字串
 * @param value 數字
 * @return 千分位字串
 */
export const commaFormat = (value: number): string => {
	return value?.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
};

/**
 * 小數點格式化有四捨五入
 * @param value 數字
 * @return 小數點字串
 */
export const commaDecimalFormat = (value: number): string => {
	const realVal = ((Number(value) * 100) / 100).toFixed(2);
	if (!Number.isNaN(value) && value !== undefined) {
		let realVal_str = realVal.toString();
		let rs = realVal_str.indexOf('.');
		if (rs < 0) {
			rs = realVal_str.length;
			realVal_str += '.';
		}
		while (realVal_str.length <= rs + 2) {
			realVal_str += '0';
		}
		return realVal_str.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
	}
	return realVal;
};

/**
 * 取得裝置代碼
 * @returns 裝置代碼
 */
export const getDeviceID = (): string => {
	return '1';
};

/**
 * 取得平台代碼
 * @returns 1=WebPC、2=MobileWeb、3=AndroidPWA、4=IOSPWA
 */
export const getPlatform = (): number => {
	const userAgent = navigator.userAgent.toLowerCase();
	const iOS = /ipad|iphone|ipod/i.test(userAgent);
	const android = /android/i.test(userAgent);
	const midp = /midp/i.test(userAgent);
	const uc7 = /rv:1.2.3.4/i.test(userAgent);
	const uc = /ucweb/i.test(userAgent);
	const ce = /windows ce/i.test(userAgent);
	const wm = /windows mobile/i.test(userAgent);
	const mobile = android || midp || uc7 || uc || ce || wm;
	const pwa = ('standalone' in window.navigator && window.navigator['standalone']) || window.matchMedia('(display-mode: standalone)').matches;
	if (iOS) {
		return 4;
	} else {
		return 3;
	}
};

/**
 * Validate phone format
 * @param phone Phone number
 * @returns Format valid or invalid
 */
export const validatePhone = (phone: string): boolean => {
	return /^(13|14|15|16|17|18|19)\d{9}$/.test(phone);
};

/**
 * Calculate middle color with ratio
 * @param color1 Start color when ratio 0.0
 * @param  color2 End color when ratio 1.0
 * @param ratio Ratio
 * @returns Middle color
 */
export const calculateMiddleColor = (color1 = 'FF0000', color2 = '00FF00', ratio: number) => {
	const hex = (color: number) => {
		const colorString = color.toString(16);
		return colorString.length === 1 ? `0${colorString}` : colorString;
	};

	const r = Math.ceil(parseInt(color2.substring(0, 2), 16) * ratio + parseInt(color1.substring(0, 2), 16) * (1 - ratio));
	const g = Math.ceil(parseInt(color2.substring(2, 4), 16) * ratio + parseInt(color1.substring(2, 4), 16) * (1 - ratio));
	const b = Math.ceil(parseInt(color2.substring(4, 6), 16) * ratio + parseInt(color1.substring(4, 6), 16) * (1 - ratio));

	return hex(r) + hex(g) + hex(b);
};

/**
 * Get login and authorized status
 */
export const authorized = (): boolean => {
	const token = window.localStorage.getItem(LocalStorageKeys.TOKEN);
	return token != undefined && token.length > 0;
};

export const setLoginData = (data: any) => window.localStorage.setItem('LOGIN_INFO', JSON.stringify(data));
export const getLoginData = () => (window?.localStorage?.LOGIN_INFO && JSON.parse(window?.localStorage?.LOGIN_INFO)) || undefined;
export function getToken() {
	const data = getLoginData();
	return data ? data.token : undefined;
}
export function setToken(token: string) {
	const data = getLoginData();
	const newToken = { token: String(token) };
	const newData = { ...data, ...newToken };
	window.localStorage.setItem('LOGIN_INFO', JSON.stringify(newData));
}
export function cleanLocalStorage() {
	window.localStorage.removeItem('LOGIN_INFO');
	window.localStorage.removeItem('LOGIN_INFO');
}
const ENV = import.meta.env;
export const apiImgPath = (path: string | undefined): string => (path ? ENV?.VITE_IMG_URL + path : '');