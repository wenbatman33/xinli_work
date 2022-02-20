import { RuleObject } from 'ant-design-vue/es/form/interface';
import router from '@/router';

const ENV = import.meta.env;
const errorImgPath = `${window?.staticPath || ''}/static/img/oop.png`;

export function commaFormat(value: string | number | undefined) {
	return value?.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
}
export function commaFormatDecimal(value: string | number | undefined) {
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
	// return value?.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
}

export const apiImgPath = (path: string | undefined): string => (path ? window.apiImg + path : '');

export const playGame = (gameUrl?: string, openWay?: number, gameTypeID?: number | undefined) => {
	if (gameTypeID === 5) {
		router.push({ path: '/chess/play', query: { path: gameUrl } });
	} else if (gameTypeID === 6) {
		router.push({ path: '/fish/play', query: { path: gameUrl } });
	} else if (gameTypeID === 7) {
		router.push({ path: '/slot/play', query: { path: gameUrl } });
	} else {
		router.push({ path: '/gamePage', query: { path: gameUrl } });
	}
};

export function openLiveChat() {
	console.log('openLiveChat');
}
export function errorImg(e: Event) {
	(e.target as HTMLImageElement).src = errorImgPath;
}
export const checkPhone = (rule: RuleObject, value: string) => {
	if (value === '') {
		return Promise.reject(String('t(registerForm_phone)'));
	} else if (!/^(1)\d{10}$/.test(value)) {
		return Promise.reject(String('t(registerForm_phoneErrorMsg)'));
	} else {
		return Promise.resolve();
	}
};

export const checkEmail = async (rule: RuleObject, value: string) => {
	if (value === '') {
		return Promise.reject(new Error('$t("registerForm_email")'));
	} else if (!/^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
		return Promise.reject(new Error('$t("registerForm_emailErrorMsg")'));
	} else {
		return Promise.resolve();
	}
};
// 卡號空格格式
export const creditCardFormat = (val: string | undefined) => val?.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ') || '';
export const stringRemoveSpace = (val: string | undefined) => val?.replace(/ /g, '');

export function gotoCommonLogin(path?: string) {
	const commonLoginUrl = String(window.memberUrl);
	window.location.replace(commonLoginUrl + (path ? path : ''));
}

export const openOutSideLink = (url: string) => window.open(url, new Date().toString());

export function shraeToQQ(url: string, title: string, pic: string) {
	// localhost 會顯示不出來是正常的
	const link = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&pics=${pic}&summary=${title}`;
	setTimeout(() => {
		window.open(link, new Date().toString(), 'height=300,width=400,top=100,left=100');
	}, 1000);
}

export function shraeToWeibo(url: string, title: string, pic: string) {
	const link = `http://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${pic}`;
	setTimeout(() => {
		window.open(link, new Date().toString(), 'height=300,width=400,top=100,left=100');
	}, 1000);
}

export function deepLink(link?: string) {
	if (link && link !== '') {
		const url = new URL(link);
		const protocol = url.protocol.slice(0, -1);
		const host = (/^\w+:\/?\/?([^#?:\/\s]+)\/?/ as any).exec(link)[1] || null;
		if (protocol === 'xinli' && host === '') {
			insideJumplink('/');
		} else if (protocol === 'xinli' && host === 'home') {
			insideJumplink('/');
		} else if (protocol === 'xinli://promo/') {
			insideJumplink('/promotion');
		} else if (protocol === 'xinli' && link.indexOf('xinli://promo/?id=') >= 0) {
			const splitArray = link.split('xinli://promo/?id=');
			insideJumplink(`/promotion/${splitArray[1]}`);
		} else if (protocol === 'xinli' && link.indexOf('xinli://outapp/?id=') >= 0) {
			const splitArray = link.split('xinli://outapp/?id=');
			outsideJumpLink(splitArray[1]);
		} else if (link.indexOf('http://') >= 0 || link.indexOf('https://') >= 0) {
			window.open(link, String(new Date()));
		}
	}
}
function insideJumplink(link: any) {
	router.push(link);
}
function outsideJumpLink(link: any) {
	window.open(link, String(new Date()));
}

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
	window.localStorage.removeItem('USER_INFO');
}
