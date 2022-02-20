import router from '@/router';
import store from '@/store';
import dayjs from 'dayjs';

var isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

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
	// 任務 #5017
	// 判斷目前網域將paishou88.com 更換
	link = link.replace('www.paishou88.com', window.location.host);
	link = link.replace('paishou88.com', window.location.host);

	// Parse deep link
	// https://www.dropbox.com/scl/fi/cps6v6ww6n1ubtq01qng6/Deeplink.paper?dl=0&rlkey=b46hogvclczr4gif0k78jlknc
	const scheme = /^(\w+):\/?\/?/.exec(link)[1];
	const host = /^\w+:\/?\/?([^#?:\/\s]+)\/?/.exec(link)[1];
	const query = link.matchAll(/[\?|\&]([^=]+)\=([^&#]+)/g);
	const params = {};
	let next, done, value;
	do {
		next = query.next();
		done = next?.done;
		value = next?.value;
		if (value && value.length >= 3) {
			params[value[1]] = value[2];
		}
	} while (done === false && value);

	// 直播間
	// paishou://room/?id＝主播uid
	if (scheme === 'paishou' && host === 'room') {
		router.push(`/room/${params.id}`).catch((err) => {});
	}

	// 首頁
	// paishou://home
	else if (scheme === 'paishou' && host === 'home') {
		router
			.replace('/')
			.then(() => router.go())
			.catch((err) => {});
	}

	// 我的/個人
	// paishou://personal
	else if (scheme === 'paishou' && host === 'personal') {
		router.push('/personal').catch((err) => {});
	}

	// 全部直播
	// paishou://classify
	else if (scheme === 'paishou' && host === 'classify') {
		router
			.replace({ path: '/', query: { tab: 'recommand' } })
			.then(() => router.go())
			.catch((err) => {});
	}

	// 公告
	// paishou://notice
	else if (scheme === 'paishou' && host === 'notice') {
		router.push('/notice/list').catch((err) => {});
	}

	// 公告內頁
	// paishou://noticedetail/?id=公告id
	else if (scheme === 'paishou' && host === 'noticedetail') {
		router.push(`/notice/details/${params.id}`).catch((err) => {});
	}

	// 充值頁
	// paishou://recharge
	else if (scheme === 'paishou' && host === 'recharge') {
		router.push('/recharge').catch((err) => {});
	}

	// 排行榜
	// paishou://rank_list
	else if (scheme === 'paishou' && host === 'rank_list') {
		router.push('/contribution').catch((err) => {});
	}

	// 產品內開網頁(不需登入)
	// paishou://inapp/?id=要開的網址
	else if (scheme === 'paishou' && host === 'inapp') {
		window.open(params.id, '_blank');
	}

	// 產品內開網頁(需登入)
	// paishou://loginapp/?id=要開的網址
	else if (scheme === 'paishou' && host === 'loginapp') {
		const openUrl = params.id;
		const uid = store?.state?.user?.uid || '';
		const token = store?.state?.user?.token || '';
		if (uid.length === 0 || token.length === 0) {
			window.localStorage.setItem('tempDeepLink', link);
			router.push('/login');
		} else {
			window.open(openUrl, '_blank');
		}
	}

	// 外部網頁
	// paishou://outapp/?id=要開的網址
	else if (scheme === 'paishou' && host === 'outapp') {
		window.open(params.id, '_blank');
	}

	// 賽程
	// paishou://schedule
	else if (scheme === 'paishou' && host === 'schedule') {
		router.push('/schedule').catch((err) => {});
	}

	// 賽程(我的預約)
	// paishou://schedule_appointment
	else if (scheme === 'paishou' && host === 'schedule_appointment') {
		router.push({ path: '/schedule', query: { tab: 'appointment' } }).catch((err) => {});
	}

	// 活動
	// paishou://campaign
	else if (scheme === 'paishou' && host === 'campaign') {
		router
			.replace({ path: '/', query: { tab: 'campaign' } })
			.then(() => router.go())
			.catch((err) => {});
	}

	// 我的/背包
	// paishou://backpack
	else if (scheme === 'paishou' && host === 'backpack') {
		router.push('/backpack').catch((err) => {});
	}

	// 任務
	// paishou://task
	else if (scheme === 'paishou' && host === 'task') {
		router.push('/tasks').catch((err) => {});
	}

	// 熱門直播
	// paishou://hotlive
	else if (scheme === 'paishou' && host === 'hotlive') {
		router.push('/hotlive').catch((err) => {});
	}

	// 註冊登入
	// paishou://login
	else if (scheme === 'paishou' && host === 'login') {
		router.push('/login').catch((err) => {});
	}

	// 推薦主播
	// paishou://hotanchor
	else if (scheme === 'paishou' && host === 'hotanchor') {
		router.push('/hotanchor').catch((err) => {});
	}

	// 我的推薦碼
	// paishou://mycode
	else if (scheme === 'paishou' && host === 'mycode') {
		router.push('/invite').catch((err) => {});
	}

	// 客服
	// paishou://livechat
	else if (scheme === 'paishou' && host === 'livechat') {
		window.LiveChatWidget.call('maximize');
	}

	// 其他
	else {
		window.open(link, '_blank');
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
	return value.toString().replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, (all, pre, groupOf3Digital) => pre + groupOf3Digital.replace(/\d{3}/g, ',$&'));
}

/**
 * 判斷賽程狀態是否為直播中
 * @param {*} item 賽程物件
 * @returns 是否為直播中
 */
export function isLive(item) {
	const gameDate = dayjs(`${item.begin_date || item.date} ${item.begin1 || item.time}`);
	const isEqualsNow = gameDate.isSame(dayjs());
	const isBeforeNow = gameDate.isBefore(dayjs());
	return isEqualsNow || isBeforeNow;
}

/**
 * 判斷賽程狀態是否為即將開賽
 * @param {*} item 賽程物件
 * @returns 是否為即將開賽
 */
export function isUpcoming(item) {
	const gameDate = dayjs(`${item.begin_date || item.date} ${item.begin1 || item.time}`);
	const isAfterNow = gameDate.isAfter(dayjs());
	const in10Minute = gameDate.add(-11, 'minute').isBefore(dayjs());
	return isAfterNow && in10Minute;
}

/**
 * 判斷賽程狀態是否為未開賽
 * @param {*} item 賽程物件
 * @returns 是否為未開賽
 */
export function isPrepare(item) {
	return !isLive(item) && !isUpcoming(item);
}

/**
 * 判斷賽程是否顯示 Live icon
 * @param {*} item 賽程物件
 * @returns 是否為未開賽
 */
export function showLiveIcon(item) {
	const liveAnchorInfo = item?.live_anchor_info || [];
	return liveAnchorInfo.length > 0;
}

/**
 * 取得競猜剩餘時間
 * @param {*} item 競猜物件
 * @param {*} now 現在時間
 * @returns 競猜剩餘時間(毫秒)
 */
export function guessRemainingMilliseconds(item, now) {
	if (item?.status !== 1) {
		return 0;
	}
	try {
		const endTime = dayjs(item?.end_time || item?.endtime, 'YYYY-MM-DD HH:mm:ss', 'zh-cn');
		return endTime.diff(now);
	} catch (e) {
		return 0;
	}
}

/**
 * 判斷競猜是否過期
 * @param {*} item 競猜物件
 * @param {*} now 現在時間
 * @returns 競猜是否過期
 */
export function guessExpired(item, now) {
	const remainingMilliseconds = guessRemainingMilliseconds(item, now);
	return remainingMilliseconds < 1000;
}

/**
 * 取得格式化的競猜剩餘時間
 * @param {*} item 競猜物件
 * @param {*} now 現在時間
 * @returns 格式化的競猜剩餘時間
 */
export function guessRemaining(item, now) {
	const remainingMilliseconds = guessRemainingMilliseconds(item, now);
	if (remainingMilliseconds < 1000) {
		return '-';
	}

	const remainingDuration = dayjs.duration(remainingMilliseconds);
	if (remainingDuration.asDays() > 0) {
		const hours = Math.floor(remainingDuration.asHours());
		return remainingDuration.format(`${hours}:mm:ss`);
	} else {
		return remainingDuration.format('HH:mm:ss');
	}
}

/**
 * 判斷 store 中的身份，是否可以對指定 uid 進行直播主管理
 * @param {*} targetUid Target user id
 * @param {*} liveUid Live room user id
 * @returns 是可否對指定 uid 進行直播主管理
 */
export function hostManage(targetUid, liveUid) {
	try {
		// User id
		const uid = store?.state?.user?.uid || -1;

		// User identities
		const identities = store?.state?.user?.userInfo?.identities || [];

		// 判斷是否為直播主身份
		const hostIdentities = identities.filter((item) => item.identity === 4) || [];
		if (hostIdentities.length === 0) {
			return false;
		}

		// 需要與直播間主播相同UID
		if (Number(uid) !== Number(liveUid)) {
			return false;
		}

		// 與指定UID不同
		return Number(uid) !== Number(targetUid);
	} catch (e) {
		console.log(e);
		return false;
	}
}

/**
 *  判斷 store 中的身份，是否可以對指定 uid 進行房間管理
 * @param {*} targetUid Target user id
 * @param {*} liveUid Live room user id
 * @returns 是可否對指定 uid 進行房間管理
 */
export function adminManage(targetUid, liveUid) {
	try {
		// User id
		const uid = store?.state?.user?.uid || -1;

		// User identities
		const identities = store?.state?.user?.userInfo?.identities || {};

		// 判斷是否為當前直播間房管身份
		const adminIdentities = identities.filter((item) => item.identity === 3 && item.rooms.indexOf(Number(liveUid)) >= 0) || [];
		if (adminIdentities.length === 0) {
			return false;
		}

		// 需要與直播間主播不同UID
		if (Number(uid) === Number(liveUid)) {
			return false;
		}

		// 與指定UID不同
		return Number(uid) !== Number(targetUid);
	} catch (e) {
		return false;
	}
};

/**
 * 判斷指定 uid 是否為房管
 * @param {*} targetUid Target user id
 * @param {*} liveUid Live room user id
 * @param {*} roomMemberList 房間用戶列表
 */
export function isRoomAdmin(targetUid, liveUid, roomMemberList) {
	return roomMemberList.filter((item) => {
		if (Number(item.uid) == Number(targetUid)) {
			if (item.usertype == 3) {
				if (item.adminRooms.indexOf(Number(liveUid)) >= 0) {
					return true;
				}
			}	
		}
		return false;
	}).length > 0;
}

/**
 * 格式化直播間熱度
 * @param {*} heat 直播間熱度
 */
export function heatFormat(heat) {
	if (heat === undefined || heat === null) {
		return '0';
	} else if (heat.toString().length === 0) {
		return '0';
	} else if (/^\d{1,4}$/.test(heat.toString())) {
		return commaFormat(heat);
	} else if (/^\d{5,}$/.test(heat.toString())) {
		const heatNum = Number(heat);
		const tenThousandNum = Math.floor(heatNum / 10000);
		const tenThousandStr = tenThousandNum > 0 ? commaFormat(tenThousandNum) : '0';
		const thousandNum = Math.floor(heatNum % 10000 / 1000);
		const thousandStr = thousandNum > 0 ? `.${thousandNum}` : '';
		return `${tenThousandStr}${thousandStr}万`;
	} else {
		return heat;
	}
}

/**
 * 可選擇的聊天訊息顏色
 */
export const acceptedMsgColor = [
	'#191919', 
	'#a62337', 
	'#e18900', 
	'#031cac', 
	'#ff4d00', 
	'#590090', 
	'#2e8e00'
];

/**
 * 已選擇的聊天訊息顏色
 */
export function selectedMsgColor() {
	const storagedColor = window.localStorage.MSG_COLOR || '';
	if (acceptedMsgColor.indexOf(storagedColor) >= 0) {
		return storagedColor;
	} else {
		return acceptedMsgColor[0];
	}
} 