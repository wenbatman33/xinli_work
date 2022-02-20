import io from 'socket.io-client';
import store from '@/store';
import router from '@/router';
import { taskBasic, taskDay, newLive } from '@/api';
import { toRaw } from 'vue';
import { message, Modal } from 'ant-design-vue';
import { giftSend, sendGiftBackpack, sendbarrage, sendred, sendKnapGift, getUserinfo, chatRecord } from '@/api';

export default {
	namespaced: true,
	state: {
		SOCKET: null,
		param: null,
		roomnum: '',
		stream: '',
		currentBarrageNum: 0,
		barrageList: [],
		msgList: [],
		roomMemberList: [],
		roomData: { donate_total: 0, room_heat: 0 },
		taskList: [],
		comboList: [],
		onLive: true,
		offLiveVideos: null,
		autoScroll: true,
		firstMsg: false,
	},
	mutations: {
		ONLIVE: (state) => {
			state.onLive = true;
		},
		OFFLIVE: (state, payload) => {
			state.onLive = false;
			state.offLiveVideos = payload;
		},
		SET_ROOM_DATA: (state, payload) => {
			state.roomData.room_heat = payload.room_heat;
			state.roomData.donate_total = payload.donate_total;
		},
		SWITCH_AUTO_SCROLL: (state) => {
			state.autoScroll = !state.autoScroll;
		},
		RESET_ROOM_DATA: (state) => {
			state.roomData = { donate_total: 0, room_heat: 0 };
		},
		ADD_GIFT: (state, model) => {
			if (model.url.length > 0) {
				state.taskList.push(model);
			}
		},
		DELETE_GIFT: (state) => {
			state.taskList.shift();
		},
		DISCONNECT: (state, user) => {
			// state.SOCKET.emit('disconnect', () => {});
			if (state.SOCKET) {
				state.SOCKET.disconnect();
				state.SOCKET.destroy();
				state.SOCKET = null;
			}
		},
		ADD_COMBO_ITEM: (state, comboItem) => {
			console.log(comboItem);
			state.comboList = comboItem;
		},
		SET_SOCKET_ROOM: (state, param) => {
			state.SOCKET = new io(param.chatServer, param);
			state.SOCKET.on('connect', () => {});
			// SOCKET 全域設定房間
			state.param = param;
			state.roomnum = Number(param.roomnum);
			state.stream = param.stream;
			state.SOCKET.emit('conn', param);
			state.SOCKET.on('conn', (data) => {});
			state.SOCKET.on('disconnect', function () {
				state.SOCKET.emit('conn', state.param);
			});
			// 偵聽 broadcastingListen 訊息
			state.SOCKET.on('broadcastingListen', function (resMsg) {
				const resMessage = resMsg.map((item) => JSON.parse(item))[0] || {};
				const MSG = resMessage.msg[0];
				store.commit('socket/CHECK_ROOMMEMBER', MSG);
				const GET_USER_INFO = window.localStorage.USERINFO ? JSON.parse(window.localStorage.USERINFO) : null;
				// 更新熱度資訊--------------
				if (MSG.ct.is_bot === true) {
					if (MSG.ct.donate_total && MSG.ct.room_heat) {
						const roomPayload = {
							donate_total: MSG.ct.donate_total,
							room_heat: MSG.ct.room_heat,
						};
						store.commit('socket/SET_ROOM_DATA', roomPayload);
					}
				}
				// 更新熱度資訊--------------
				if (MSG['_method_'] == 'SystemNot') {
					// console.log('SystemNot');
				} else if (MSG['_method_'] == 'SendBarrage') {
					state.currentBarrageNum += 1;
					state.barrageList.push({
						id: state.currentBarrageNum,
						msg: MSG.ct.content,
						time: 5,
						type: '',
					});
				} else if (MSG['_method_'] == 'setAttent') {
					state.currentBarrageNum += 1;
					state.barrageList.push({
						id: state.currentBarrageNum,
						msg: MSG.ct,
						time: 5,
						type: '',
					});
				} else if (MSG['_method_'] == 'SendGift') {
					MSG.ct.content = MSG.uname + ' 打赏给主播' + MSG.ct.giftcount + '个' + MSG.ct.giftname;
					state.currentBarrageNum += 1;
					state.barrageList.push({
						id: state.currentBarrageNum,
						msg: MSG.ct.content,
						time: 5,
						type: '',
					});

					// ----------------------------------------
					if (MSG.ct.is_combo === true) {
						store.commit('socket/ADD_COMBO_ITEM', MSG.ct.combo_rank);
					}
					// ----------------------------------------
					store.commit('socket/ADD_GIFT', {
						url: MSG.ct.swf.replace(/(^\s*)|(\s*$)/g, ''),
						time: MSG.ct.swftime,
						type: MSG.ct.swftype,
					});
				} else if (MSG['_method_'] == 'setAdmin') {
					if (Number(GET_USER_INFO.id) === Number(MSG.touid)) {
						store.dispatch('user/HOTRELOAD_USER_INFO');
					}
				} else if (MSG['_method_'] == 'KickUser') {
					if (Number(GET_USER_INFO.id) === Number(MSG.touid)) {
						message.error('您已被禁入直播间！');
						router.push('/');
					}
				} else if (MSG['_method_'] == 'LiveRoomNotify') {
					if (MSG.ct.room_status === false) {
						message.error(MSG.ct.title);
						store.dispatch('socket/SET_OFF_LIVE');
					} else {
						Modal.confirm({
							title: MSG.ct.title,
							content: '页面重新整理后,即可以观看賽事',
							okText: '确认',
							cancelText: '取消',
							onOk() {
								window.location.reload();
							},
							onCancel() {},
						});
					}
				}
				// 發送至聊天室--------------------------------------------------------
				if (MSG['_method_'] === 'SystemNot' && state.firstMsg === false) {
					state.firstMsg = true;
					state.msgList.unshift(MSG);
				} else if (MSG['_method_'] === 'SystemNot' && state.firstMsg === true) {
					state.firstMsg = true;
				} else {
					state.msgList.push(MSG);
				}
				// 發送至聊天室--------------------------------------------------------
			});
		},
		CLEAR_MSG_LIST: (state) => {
			state.msgList = [];
		},
		SET_CHAT_RECORD: (state, DATA) => {
			const array = DATA;
			array?.forEach((element) => {
				const resMessage = JSON.parse(element);
				const MSG = resMessage.msg[0];
				if (MSG['_method_'] == 'SendGift') {
					MSG.ct.content = MSG.uname + ' 打赏给主播' + MSG.ct.giftcount + '个' + MSG.ct.giftname;
				}
				MSG.isHistory = true;
				state.currentBarrageNum += 1;
				// 發送至歷史訊息--------------------------------------------------------
				// console.log(MSG);
				state.msgList.push(toRaw(MSG));
				store.commit('socket/CHECK_ROOMMEMBER', MSG);
				// 發送至歷史訊息--------------------------------------------------------
			});
		},
		CHECK_ROOMMEMBER: (state, MSG) => {
			if (MSG.usertype) {
				const isRoomMember = state.roomMemberList.filter((item) => {
					return item.uid === MSG.uid;
				});
				if (isRoomMember.length > 0) {
					// 發話者資料更新
					if (MSG.uid == isRoomMember[0].uid) {
						const index = state.roomMemberList.findIndex((item) => item.uid == MSG.uid);
						state.roomMemberList.splice(index, 1, MSG);
					}
				} else {
					// 新增聊天室新成員
					state.roomMemberList.push(MSG);
				}
			}
		},
		SEND_BARRAGE: (state, msg) => {
			state.SOCKET.emit('broadcast', msg);
		},
		SET_ADMIN: (state, adminUser) => {
			const userData = getUserData();
			// ------------------
			const defaultMsg = {
				_method_: 'setAdmin',
				action: 0,
				msgtype: 1,
				ct: Number(adminUser.usertype) === 3 ? adminUser.toname + ' 已被设为管理员' : adminUser.toname + ' 已被取消管理员',
				uid: String(adminUser.touid),
				touid: String(adminUser.touid),
				toname: String(adminUser.toname),
				usertype: adminUser.usertype,
				roomnum: String(store.state.socket.roomnum),
			};
			// 合併訊息物件--------------
			const msgObj = { ...defaultMsg, ...getUserData };
			// 合併訊息物件--------------
			let message = {
				msg: [msgObj],
				retcode: '000000',
				retmsg: 'OK',
			};
			state.SOCKET.emit('broadcast', message);
		},
		SET_ATTENT: (state, attentnUser) => {
			const userData = getUserData();
			// ------------------
			const defaultMsg = {
				_method_: 'setAttent',
				action: 0,
				msgtype: 1,
				ct: attentnUser.toname + ' 关注了主播',
				roomnum: String(store.state.socket.roomnum),
			};
			// 合併訊息物件--------------
			const msgObj = { ...defaultMsg, ...userData };
			// 合併訊息物件--------------
			let message = {
				msg: [msgObj],
				retcode: '000000',
				retmsg: 'OK',
			};
			state.SOCKET.emit('broadcast', message);
		},
		SET_SHUTUP_USER: (state, shutUpUser) => {
			const userData = getUserData();
			// ------------------
			const defaultMsg = {
				_method_: 'ShutUpUser',
				action: 1,
				ct: shutUpUser.toname + ' 已被房管禁言',
				msgtype: 2,
				touid: String(shutUpUser.touid),
				toname: String(shutUpUser.toname),
				usertype: shutUpUser.usertype,
			};
			// 合併訊息物件--------------
			const msgObj = { ...defaultMsg, ...userData };
			// 合併訊息物件--------------
			let message = {
				msg: [msgObj],
				retcode: '000000',
				retmsg: 'OK',
			};
			state.SOCKET.emit('broadcast', message);
		},
		SET_KICK_USER: (state, kickUser) => {
			const userData = getUserData();
			// ------------------
			const defaultMsg = {
				_method_: 'KickUser',
				action: 1,
				ct: kickUser.toname + ' 已被禁入直播间',
				msgtype: 2,
				touid: String(kickUser.touid),
				toname: String(kickUser.toname),
			};
			// 合併訊息物件--------------
			const msgObj = { ...defaultMsg, ...userData };
			// 合併訊息物件--------------
			let message = {
				msg: [msgObj],
				retcode: '000000',
				retmsg: 'OK',
			};
			state.SOCKET.emit('broadcast', message);
		},
		SEND_GIFT: (state, message) => {
			state.SOCKET.emit('broadcast', message);
		},
		SEND_BACKPACK_ITEM: (state, options = { number: 1 }) => {
			const userData = getUserData();
			if (!options.giftId && state.SOCKET) {
				message.error('缺少礼物id');
			}
			if (String(userData.uid) == String(store.state.socket.roomnum)) {
				message.error('无法给自己送礼物');
				return;
			}
			// ------------------
			let param = {
				uid: Number(userData.uid),
				liveuid: Number(store.state.socket.roomnum),
				stream: store.state.socket.stream,
				giftid: options.giftId,
				giftcount: options.number,
			};
			sendGiftBackpack(param).then((res) => {
				store.commit('user/EDIT_INFO', { coin: res.data.coin, level: res.data.level });
				const userData = getUserData();
				const defaultMsg = {
					_method_: 'SendGift',
					action: 0,
					msgtype: 1,
					ct: res.data.gifttoken,
					usertype: Number(getUserType()),
					roomnum: store.state.socket.stream,
					touid: 'String(user.uid)',
				};
				// 合併訊息物件--------------
				const msgObj = { ...defaultMsg, ...userData };
				// 合併訊息物件--------------
				let message = {
					msg: [msgObj],
					retcode: '000000',
					retmsg: 'OK',
				};
				state.SOCKET.emit('broadcast', message);
			});
		},
		SEND_KNAPSACK_GIFT: (state, options = { number: 1 }) => {
			const userData = getUserData();
			if (!options.giftId && state.SOCKET) {
				message.error('缺少礼物id');
			}
			if (String(userData.uid) == String(store.state.socket.roomnum)) {
				message.error('无法给自己送礼物');
				return;
			}
			// ------------------
			let param = {
				uid: Number(userData.uid),
				liveuid: Number(store.state.socket.roomnum),
				stream: store.state.socket.stream,
				giftid: options.giftId,
				giftcount: options.number,
			};
			sendKnapGift(param).then((res) => {
				store.commit('user/EDIT_INFO', { coin: res.data.coin, level: res.data.level });
				const userData = getUserData();
				const defaultMsg = {
					_method_: 'SendGift',
					action: 0,
					msgtype: 1,
					ct: res.data.gifttoken,
					usertype: Number(getUserType()),
					roomnum: store.state.socket.stream,
					touid: 'String(user.uid)',
				};
				// 合併訊息物件--------------
				const msgObj = { ...defaultMsg, ...userData };
				// 合併訊息物件--------------
				let message = {
					msg: [msgObj],
					retcode: '000000',
					retmsg: 'OK',
				};
				state.SOCKET.emit('broadcast', message);
			});
		},
		SEND_STICKER: (state, ID) => {
			// 目前使用者 可以從localStorage 取資料--------------
			const USREINFO = JSON.parse(window.localStorage.USERINFO);
			const IDENTITY_LIST = USREINFO.identities;
			const ADMIN = IDENTITY_LIST.filter((item) => Number(item.identity) === 3);
			const ROOMS = ADMIN.length > 0 ? ADMIN[0].rooms : [];
			const userData = getUserData();
			// 目前使用者 可以從localStorage 取資料--------------
			const defaultMsg = {
				_method_: 'SendSticker',
				action: 7,
				msgtype: 1,
				ct: { code: ID },
				usertype: Number(getUserType()),
				adminRooms: JSON.stringify(ROOMS),
				roomnum: String(store.state.socket.roomnum),
				touid: '',
				userTypeColor: getColor(),
				msgColor: getMsgColor(),
			};
			// 合併訊息物件--------------
			const msgObj = { ...defaultMsg, ...userData };
			// 合併訊息物件--------------
			let message = {
				msg: [msgObj],
				retcode: '000000',
				retmsg: 'OK',
			};
			state.SOCKET.emit('broadcast', message);
		},
	},
	actions: {
		// 設定連線
		CONNECT_SCOKET({ commit, rootState }, payload) {
			// -------------------------------------------------------------------------------------------
			if (window.localStorage.UID) payload.uid = window.localStorage.UID;
			if (window.localStorage.TOKEN) payload.token = window.localStorage.TOKEN;
			// -------------------------------------------------------------------------------------------
			commit('SET_SOCKET_ROOM', payload);
		},
		GET_CHAT_RECORD({ commit, rootState }, param) {
			return new Promise((resolve, reject) => {
				chatRecord({
					uid: param.liveuid,
					pagesize: 30,
				})
					.then((res) => {
						commit('SET_CHAT_RECORD', res.data.message);
						resolve(res.data.message);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},

		SEND_MSG({ commit, rootState }, msg) {
			if (!msg) {
				message.error('消息内容不能为空');
				return;
			} else {
				const payload = {
					uid: Number(window.localStorage.UID) || 0,
					liveuid: Number(store.state.socket.roomnum),
					stream: store.state.socket.stream,
					content: msg,
				};
				sendbarrage(payload).then(({ data }) => {
					// 目前使用者 可以從localStorage 取資料--------------
					const USREINFO = JSON.parse(window.localStorage.USERINFO);
					const IDENTITY_LIST = USREINFO.identities;
					const ADMIN = IDENTITY_LIST.filter((item) => Number(item.identity) === 3);
					const ROOMS = ADMIN.length > 0 ? ADMIN[0].rooms : [];
					const userData = getUserData();
					// 目前使用者 可以從localStorage 取資料--------------
					const defaultMsg = {
						_method_: 'SendBarrage',
						action: 7,
						msgtype: 1,
						ct: data.barragetoken,
						usertype: Number(getUserType()),
						adminRooms: JSON.stringify(ROOMS),
						roomnum: String(store.state.socket.roomnum),
						touid: '',
						userTypeColor: getColor(),
						msgColor: getMsgColor(),
					};
					// 合併訊息物件--------------
					const msgObj = { ...defaultMsg, ...userData };
					// 合併訊息物件--------------
					let message = {
						msg: [msgObj],
						retcode: '000000',
						retmsg: 'OK',
					};
					store.commit('socket/SEND_BARRAGE', message);
					// 更新熱度資訊--------------
					const roomPayload = {
						donate_total: data.donate_total,
						room_heat: data.room_heat,
					};
					store.commit('socket/SET_ROOM_DATA', roomPayload);
					// 更新熱度資訊--------------
				});
			}
		},
		SET_OFF_LIVE({ commit, rootState }) {
			newLive().then((res) => {
				const offLiveVideos = res.data.list.filter((item, index) => index < 6);
				store.commit('socket/OFFLIVE', offLiveVideos);
			});
		},
	},
};

function getMsgColor() {
	let msgColor = '';
	if (window.localStorage.MSG_COLOR) {
		msgColor = window.localStorage.MSG_COLOR;
	} else {
		msgColor = '#191919';
		window.localStorage.setItem('MSG_COLOR', msgColor);
	}
	return msgColor;
}
function getColor() {
	const USREINFO = JSON.parse(window.localStorage.USERINFO);
	const IDENTITY_LIST = USREINFO.identities;
	const ADMIN_COLOR = IDENTITY_LIST.filter((item) => Number(item.identity) === 3);
	const HOST_COLOR = IDENTITY_LIST.filter((item) => Number(item.identity) === 4);
	const USER_COLOR = IDENTITY_LIST.filter((item) => Number(item.identity) === 1);
	if (HOST_COLOR.length > 0) {
		return '#E1AF62';
	} else if (ADMIN_COLOR.length > 0) {
		return '#6FCF37';
	} else {
		return '#70BBFF';
	}
}
function getUserType() {
	let USER_TYPE;
	const USREINFO = JSON.parse(window.localStorage.USERINFO);
	const IDENTITY_LIST = USREINFO.identities;
	const ADMIN = IDENTITY_LIST.filter((item) => Number(item.identity) === 3);
	const HOST = IDENTITY_LIST.filter((item) => Number(item.identity) === 4);
	const USER = IDENTITY_LIST.filter((item) => Number(item.identity) === 1);
	if (ADMIN.length > 0) {
		return 3;
	} else if (HOST.length > 0) {
		return 4;
	} else {
		return 1;
	}
}
function getUserData() {
	const USREINFO = JSON.parse(window.localStorage.USERINFO);
	const userData = {
		uid: String(window.localStorage.UID) || 0,
		uname: String(USREINFO.user_nicename) || '',
		uhead: String(USREINFO.avatar),
		level: String(USREINFO.level),
		equipment: 'pc',
	};
	return userData;
}
