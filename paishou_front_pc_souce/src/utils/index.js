import router from '@/router';
import store from '@/store';
import dayjs from 'dayjs';

export function getToken() {
	return window.localStorage.TOKEN;
}
export function getUid() {
	return window.localStorage.UID;
}
export function getDailyLogin(uid) {
	const key = 'DailyLogin' + uid;
	return window.localStorage[key];
}
export function setDailyLogin(date, uid) {
	return window.localStorage.setItem('DailyLogin' + uid, date);
}
export function setToken(token) {
	return window.localStorage.setItem('TOKEN', token);
}
export function setUid(uid) {
	return window.localStorage.setItem('UID', uid);
}
export function removeToken() {
	return window.localStorage.removeItem('TOKEN');
}
export function removeUid() {
	return window.localStorage.removeItem('UID');
}

export function browserType() {
	const sUserAgent = navigator.userAgent.toLowerCase();
	const bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
	const bIsIphoneOs = sUserAgent.match(/iphone/i) == 'iphone';
	const bIsMidp = sUserAgent.match(/midp/i) == 'midp';
	const bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
	const bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
	const bIsAndroid = sUserAgent.match(/android/i) == 'android';
	const bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
	const bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
	//document.writeln("您的浏览设备为：");
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		//这是移动端
		return false;
	} else {
		//这是pc端
		return true;
	}
}

export function myBrowser() {
	const userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	const isOpera = userAgent.indexOf('Opera') > -1; //判断是否Opera浏览器
	const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera; //判断是否IE浏览器
	const isEdge = userAgent.indexOf('Edge') > -1; //判断是否IE的Edge浏览器
	const isFF = userAgent.indexOf('Firefox') > -1; //判断是否Firefox浏览器
	const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') == -1; //判断是否Safari浏览器
	const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1; //判断Chrome浏览器

	if (isIE) {
		const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
		reIE.test(userAgent);
		const fIEVersion = parseFloat(RegExp['$1']);
		let ver = '';
		if (fIEVersion == 7) {
			ver = 'IE7';
		} else if (fIEVersion == 8) {
			ver = 'IE8';
		} else if (fIEVersion == 9) {
			ver = 'IE9';
		} else if (fIEVersion == 10) {
			ver = 'IE10';
		} else if (fIEVersion == 11) {
			ver = 'IE11';
		} else {
			ver = '0';
		}
		//IE版本过低
		return ver;
	}
	if (isOpera) {
		return 'Opera';
	}
	if (isEdge) {
		return 'Edge';
	}
	if (isFF) {
		return 'FF';
	}
	if (isSafari) {
		return 'Safari';
	}
	if (isChrome) {
		return 'Chrome';
	}
}

export function deepLink(link) {
	// 外部網址
	const currentHostName = location.hostname;
	const url = new URL(link);
	const protocol = url.protocol.slice(0, -1);
	const host = /^\w+:\/?\/?([^#?:\/\s]+)\/?/.exec(link)[1];

	if (protocol === 'paishou' && host === '') {
		router.push('/').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'home') {
		router.push('/').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'login') {
		router.push('/login').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'register') {
		router.push('/register').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'recharge') {
		router.push('/recharge').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'rank_list') {
		router.push('/rank').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'classify') {
		router.push('/classify').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'chedule') {
		router.push('/schedule').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'campaign') {
		router.push('/campaign').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'personal') {
		router.push('/personal/information').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'backpack') {
		router.push('/personal/backpack').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'notice') {
		router.replace('/notice/list').catch((err) => {});
	} else if (protocol === 'paishou' && host === 'livechat') {
		// 開啟livechat
		window.LC_API.open_chat_window();
	} else if (link.indexOf('paishou://noticedetail/?id=') >= 0) {
		const splitArray = link.split('paishou://noticedetail/?id=');
		router.push(`/notice/details?&id=${splitArray[1]}`).catch((err) => {});
	} else if (protocol === 'paishou' && host === 'outapp' && link.indexOf('paishou://outapp/?id=') >= 0) {
		const splitArray = link.split('paishou://outapp/?id=');
		window.open(splitArray[1], new Date());
	} else if (protocol === 'paishou' && host === 'room' && link.indexOf('paishou://room/?id=') >= 0) {
		const splitRoom = link.split('paishou://room/?id=');
		router
			.replace(`/room/${splitRoom[1]}`)
			.then(() => {
				if (router.currentRoute._value.name === 'room') window.location.reload();
			})
			.catch((err) => {});
	} else if (protocol === 'paishou' && host === 'loginapp' && link.indexOf('paishou://loginapp/?id=') >= 0) {
		const splitArray = link.split('paishou://loginapp/?id=');
		// -替換 m.paishou88-------------------------------------------------------------
		if (splitArray[1].indexOf('m.paishou88') >= 0) {
			const pcLink = splitArray[1].replace('m.paishou88', 'paishou88');
			window.open(pcLink, new Date());
		} else {
			window.open(splitArray[1], new Date());
		}
		// -------------------------------------------------------------------------
	} else if (link.indexOf('http://') >= 0 || link.indexOf('https://') >= 0) {
		if (host === 'paishou88.com' || host === 'www.paishou88.com') {
			// 判斷paishou88.com 置換成當前網域的host 因為有可能會是paishou666.com 等網域開啟
			const currentHostName = window.location.hostname;
			let newUrl = new URL(link);
			newUrl.hostname = currentHostName;
			window.open(newUrl, new Date());
		} else {
			// 外部網址
			window.open(link, new Date());
		}
	}
}

export function isIOS() {
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		return true;
	} else {
		return false;
	}
}

export function commaFormat(value) {
	return value?.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
}

// 取得會員等級圖片
export function userLevelThumb(level) {
	try {
		return store.state.config.levelList[level - 1].thumb;
	} catch (e) {
		return '';
	}
}

export function errorPersonImg(e) {
	e.target.src = '/publicAssets/img/v3/default.png';
}
export function errorTeamImg(e) {
	e.target.src = '/publicAssets/img/logo/iconSoccerGray.png';
}
export function formatDate(date) {
	return dayjs(date).format('YYYY-MM-DD');
}

export function shraeToQQ(url, title, pic) {
	// localhost 會顯示不出來是正常的
	const link = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&pics=${pic}&summary=${title}`;
	setTimeout(() => {
		window.open(link, new Date(), 'height=300,width=400,top=100,left=100');
	}, 1000);
}

export function shraeToWeibo(url, title, pic) {
	const link = `http://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${pic}`;
	setTimeout(() => {
		window.open(link, new Date(), 'height=300,width=400,top=100,left=100');
	}, 1000);
}
