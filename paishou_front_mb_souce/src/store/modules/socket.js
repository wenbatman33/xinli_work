import { toRaw } from 'vue';
import { chatRecord, giftlist, liveInfo, roomAppointment, roomLike, enterRoom, newLive, setattent, setadmin, shutup, shutupip, kicking, kickingip, sendbarrage, giftSend, event011Get } from '@/api';
import { selectedMsgColor } from '@/utils';
import router from '@/router';
import io from 'socket.io-client';
import dayjs from 'dayjs';

// Default state
const defaultState = () => {
	return {
		uid: 0, 					// 主播UID
		isattent: 0, 				// 是否關注主播
		currentBarrageNum: 0, 		// 當前彈幕編號
		notice: null,				// 聊天室公告
		socket: null, 				// Socket.io
		chatServer: null, 			// 聊天伺服器
		onLive: true, 				// 是否直播中
		showBanner: false,			// 是否顯示營運看板
		hasShowBanner: false,		// 是否已自動顯示營運看板
		autoScroll: true,			// 是否自動捲動聊天室
		svgaVisabled: true,			// 是否顯示禮物動畫
		adminLoading: false, 		// 是否正在設置/取消房管
		attentLoading: false, 		// 是否正在關注/取消關注主播
		shutupLoading: false, 		// 是否正在禁言用戶
		kickingLoading: false, 		// 是否正在踢出用戶
		barrageVisabled: true, 		// 是否顯示彈幕
		sendGiftLoading: false, 	// 是否正在發送禮物
		likeListVisibled: true,		// 是否顯示關聯主播列表
		sendBarrageLoading: false, 	// 是否正在送出彈幕
		rankInfo: {}, 				// 排行榜資訊
		roomInfo: {}, 				// 直播間資訊
		liveInfo: {}, 				// 串流資訊
		heatInfo: {}, 				// 熱度資訊
		anchorInfo: {}, 			// 主播資訊
		jigsawInfo: {},				// Event 011 拼圖資訊
		msgList: [], 				// 訊息列表
		giftList: [], 				// 禮物列表
		svgaList: [], 				// 打賞禮物動畫列表
		likeList: [],				// 相同賽事直撥列表
		comboList: [],				// 連續送禮列表
		bannerList: [], 			// 營運看板列表
		noticeList: [], 			// 公告列表
		barrageList: [], 			// 彈幕列表
		resourceList: [],			// 播源列表
		offLiveVideos: [], 			// 主播關播時，推薦的直播列表
		roomMemberList: [], 		// 聊天室使用者名單
		appointmentList: [], 		// 主播預約賽事
	};
}

// Mutations
const mutations = {
	// 設置主播UID
	SET_UID: (state, payload) => {
		state.uid = payload;
	},

	// 設置是否關注主播
	SET_ISATTENT: (state, payload) => {
		state.isattent = payload;
	},

	// 設置聊天室公告
	SET_NOTICE: (state, payload) => {
		state.notice = payload;
	},

	// 設置 socket.io 物件
	SET_SOCKET: (state, payload) => {
		state.socket = payload;
	},

	// 設置聊天伺服器
	SET_CHAT_SERVER: (state, payload) => {
		state.chatServer = payload;
	},

	// 設置是否直播中
	SET_ONLIVE: (state, payload) => {
		state.onLive = payload;
	},

	// 設置是否顯示營運看板
	SET_SHOW_BANNER: (state, payload) => {
		state.showBanner = payload;
	},

	// 是否已自動顯示營運看板
	SET_HAS_SHOW_BANNER: (state, payload) => {
		state.hasShowBanner = payload;
	},

	// 設置是否自動捲動聊天室
	SET_AUTO_SCROLL: (state, payload) => {
		state.autoScroll = payload;
	},

	// 設置是否顯示禮物動畫
	SET_SVGA_VISABLED: (state, payload) => {
		state.svgaVisabled = payload;
	},

	// 設置是否正在設置/取消房管
	SET_ADMIN_LOADING: (state, payload) => {
		state.adminLoading = payload;
	},

	// 設置是否正在關注/取消關注主播
	SET_ATTENT_LOADING: (state, payload) => {
		state.attentLoading = payload;
	},

	// 設置是否正在禁言用戶
	SET_SHUTUP_LOADING: (state, payload) => {
		state.shutupLoading = payload;
	},

	// 設置是否正在踢出用戶
	SET_KICKING_LOADING: (state, payload) => {
		state.kickingLoading = payload;
	},

	// 設置是否顯示彈幕
	SET_BARRAGE_VISABLED: (state, payload) => {
		state.barrageVisabled = payload;
	},

	// 設置是否正在發送禮物
	SET_SEND_GIFT_LOADING: (state, payload) => {
		state.sendGiftLoading = payload;
	},

	// 設置是否顯示關聯主播列表
	SET_LIKE_LIST_VISIBLED: (state, payload) => {
		state.likeListVisibled = payload;
	},

	// 設置是否正在送出彈幕
	SET_SEND_BARRAGE_LOADING: (state, payload) => {
		state.sendBarrageLoading = payload;
	},

	// 設置排行榜資訊
	SET_RANK_INFO: (state, payload) => {
		state.rankInfo = payload;
	},

	// 設置直播間資訊
	SET_ROOM_INFO: (state, payload) => {
		state.roomInfo = payload;
	},

	// 設置串流資訊
	SET_LIVE_INFO: (state, payload) => {
		state.liveInfo = payload;
	},

	// 設置熱度資訊
	SET_HEAT_INFO: (state, payload) => {
		state.heatInfo.room_heat = payload.room_heat;
		state.heatInfo.donate_total = payload.donate_total;
	},

	// 設置主播資訊
	SET_ANCHOR_INFO: (state, payload) => {
		state.anchorInfo = payload;
	},

	// 設置 event 011 拼圖資訊
	SET_JIGSAW_INFO: (state, payload) => {
		state.jigsawInfo = payload;
	},

	// 加入聊天訊息
	ADD_MSG: (state, payload) => {
		state.msgList.push(payload);
	},

	// 加入歷史聊天訊息
	ADD_HISTORY_MSG: (state, payload) => {
		state.currentBarrageNum += 1;
		state.msgList.push(payload);
	},

	// 清除聊天訊息
	CLEAR_MSG: (state) => {
		state.currentBarrageNum = 0;
		state.msgList.splice(0, state.msgList.length);
	},

	// 設置禮物列表
	SET_GIFT_LIST: (state, payload) => {
		state.giftList = payload;
	},

	// 加入打賞禮物動畫
	ADD_SVGA: (state, model) => {
		if (model.url.length > 0) {
			state.svgaList.push(model);
		}
	},

	// 移除第一個打賞禮物動畫
	SHIFT_SVGA_LIST: (state) => {
		state.svgaList.shift();
	},

	// 設置相同賽事直撥列表
	SET_LIKE_LIST: (state, payload) => {
		state.likeList = payload;
	},

	// 設置連續送禮列表
	SET_COMBO_LIST: (state, payload) => {
		const oldComboList = state.comboList || [];
		const sortComboList = payload.sort((a, b) => {
			const aCount = a.Count || 0;
			const bCount = b.Count || 0;
			return bCount - aCount;
		});
		const sliceComboList = sortComboList.slice(0, 3);
		const mapComboList = sliceComboList.map((newElement) => {
			const oldElement = oldComboList.find((element) => element.Uid == newElement.Uid);
			const oldCount = oldElement?.Count || 0;
			const newCount = newElement?.Count || 0;
			var timeout = oldElement?.Timeout || dayjs().add(6, 'second');
			if (oldCount === 0 || oldCount !== newCount) {
				timeout = dayjs().add(6, 'second');
			}
			return {
				...newElement,
				Timeout: timeout,
			}
		});
		state.comboList = mapComboList;
	},

	// 刷新連續送禮列表，移除過期的連續送禮
	REFRESH_COMBO_LIST: (state) => {
		const oldComboList = state.comboList || [];
		const filterComboList = oldComboList.filter((oldElement) => {
			const now = dayjs()
			var timeout = oldElement?.Timeout || now;
			return now.isBefore(timeout);
		});
		state.comboList = filterComboList;
	},

	// 設置營運看板別表
	SET_BANNER_LIST: (state, payload) => {
		state.bannerList = payload;
	},

	// 設置公告列表
	SET_NOTICE_LIST: (state, payload) => {
		state.noticeList = payload;
	},

	// 加入彈幕
	ADD_BARRAGE: (state, payload) => {
		state.currentBarrageNum += 1;
		state.barrageList.push({
			id: state.currentBarrageNum,
			...payload,
		});
	},

	// 設置播源列表
	SET_RESOURCE_LIST: (state, payload) => {
		state.resourceList = payload;
	},

	// 設置主播關播時，推薦的直播列表
	SET_OFFLIVE_VIDEOS: (state, payload) => {
		state.offLiveVideos = payload;
	},

	// 新增或更新聊天室使用者
	ADD_ROOM_MEMBER: (state, msg) => {
		if (msg.usertype) {
			const isRoomMember = state.roomMemberList.filter((item) => {
				return item.uid === msg.uid;
			});
			if (isRoomMember.length > 0) {
				// 發話者資料更新
				if (msg.uid == isRoomMember[0].uid) {
					const index = state.roomMemberList.findIndex((item) => item.uid == msg.uid);
					state.roomMemberList.splice(index, 1, msg);
				}
			} else {
				// 新增聊天室新成員
				state.roomMemberList.push(msg);
			}
		}
	},

	// 設置主播預約賽事
	SET_APPOINTMENT_LIST: (state, payload) => {
		state.appointmentList = payload;
	},

	// 重置資料
	RESET: (state) => {
		Object.assign(state, defaultState())
	},
};

// Actions
const actions = {
	// 更新主播 UID
	UPDATE_UID({ commit, dispatch }, payload) {
		commit('RESET');
		commit('SET_UID', payload);
		dispatch('GET_CHAT_RECORD');
		dispatch('GET_GIFT_LIST');
		dispatch('GET_RANK_INFO');
		dispatch('GET_ROOM_INFO');
		dispatch('GET_APPOINTMENT_LIST');
		dispatch('GET_LIKE_LIST');
	},

	// 設置為開播中
	TURN_LIVE_ON({ commit }) {
		commit('SET_ONLIVE', true);
	},

	// 設置為關播中
	TURN_LIVE_OFF({ commit }) {
		commit('SET_ONLIVE', false);
		newLive().then((res) => {
			commit('SET_OFFLIVE_VIDEOS', res?.data?.list || []);
		});
	},

	// 顯示彈幕
	SHOW_BARRAGE({ commit }) {
		commit('SET_BARRAGE_VISABLED', true);
	},

	// 隱藏彈幕
	HIDE_BARRAGE({ commit }) {
		commit('SET_BARRAGE_VISABLED', false);
	},

	// 顯示送禮動畫
	SHOW_SVGA({ commit }) {
		commit('SET_SVGA_VISABLED', true);
	},

	// 隱藏送禮動畫
	HIDE_SVGA({ commit }) {
		commit('SET_SVGA_VISABLED', false);
	},

	// 取得聊天記錄
	GET_CHAT_RECORD({ state, commit }) {
		const query = {
			uid: state?.uid,
			pagesize: 30,
		};
		chatRecord(query).then((res) => {
			const chatRecordList = res?.data?.message || [];
			chatRecordList.forEach((element) => {
				const broadcastObject = JSON.parse(element) || {};
				const msgList = broadcastObject.msg || [];
				const msg = msgList[0] || {};
				msg.isHistory = true;
				commit('ADD_HISTORY_MSG', toRaw(msg));
				commit('ADD_ROOM_MEMBER', msg);
			});
		});
	},

	// 取得禮物列表及香蕉數量
	GET_GIFT_LIST({ commit }) {
		giftlist().then((res) => {
			commit('user/EDIT_INFO', { banana:  res?.data?.banana || 0 }, { root: true });
			commit('SET_GIFT_LIST', res?.data?.list || []);
		});
	},

	// 取得排行榜資訊
	GET_RANK_INFO({ state, commit }) {
		const query = {
			liveuid: state?.uid,
		};
		liveInfo(query).then((res) => {
			commit('SET_RANK_INFO', res?.data || {});
		});
	},

	// 取得直播間資訊
	GET_ROOM_INFO({ state, commit, dispatch }) {
		const query = {
			liveuid: state?.uid,
		};
		enterRoom(query)
			.then((res) => {
				// 更新直播間資訊
				// 任務 #5695 移除推廣看板
				// commit('SET_BANNER_LIST', res?.data?.banner || []);
				commit('SET_ISATTENT', res?.data?.isattent || 0);
				commit('SET_CHAT_SERVER', res?.data?.chat_server || '');
				commit('SET_ROOM_INFO', res?.data || {});
				commit('SET_LIVE_INFO', res?.data?.live || {});
				commit('SET_ANCHOR_INFO', res?.data?.anchor || {});
				commit('SET_NOTICE_LIST', res?.data?.live_notice || []);
				commit('SET_RESOURCE_LIST', res?.data?.resource || []);
				commit('SET_HEAT_INFO', {
					donate_total: res?.data?.live?.donate_total || 0,
					room_heat: res?.data?.live.room_heat || 0,
				});

				// 更新營運看板顯示
				if (!state.hasShowBanner && state.bannerList && state.bannerList.length > 0) {
					commit('SET_SHOW_BANNER', true);
					commit('SET_HAS_SHOW_BANNER', true);
				}

				// Connect socket.io chat server
				dispatch('CONNECT_SOCKET');

				// 更新開播狀態
				if (res.data.live.room_code === 1041) {
					dispatch('TURN_LIVE_OFF');
				} else {
					dispatch('TURN_LIVE_ON');
				}

				// 更新瀏覽器標題
				document.title = `${state.liveInfo.title} - 拍手直播|欧洲杯直播|NBA直播|中超直播|西甲直播|英超直播|足球直播`;
			})
			.catch((err) => {
				// 主播離線
				if (err.code === 1041) {
					dispatch('TURN_LIVE_OFF');
				}

				// 账号不存在
				else if (err.code === 1001) {
					router.push({
						path: '/',
					});
				}

				// 被踢出房間後 導回首頁
				else if (err.code === 1039 || err.code === 1040) {
					router.push({
						path: '/',
					});
				}
			});
	},

	// 取得主播預約賽事
	GET_APPOINTMENT_LIST({ commit, state }) {
		const query = {
			uid: state.uid,
		};
		roomAppointment(query).then((res) => {
			commit('SET_APPOINTMENT_LIST', res?.data?.list || []);
		});
	},

	// 取得相同賽事直播
	GET_LIKE_LIST({ commit, state }) {
		const query = {
			uid: state.uid,
		};
		roomLike(query).then((res) => {
			commit('SET_LIKE_LIST', res?.data?.list || []);
		});
	},

	// 取得 Event 011 拼圖資訊
	GET_JIGSAW_INFO({ state, rootState, commit }) {
		// Get query
		const uid = rootState?.user?.uid || '';
		const token = rootState?.user?.token || '';
		const query = {
			uid: uid,
			token: token,
		};

		// Get jigsaw info
		event011Get(query)
			.then((res) => {
				commit('SET_JIGSAW_INFO', res?.data || {});
			})
			.catch(() => {
				commit('SET_JIGSAW_INFO', {});
			});
	},

	// Connect socket.io chat server
	CONNECT_SOCKET({ state, rootState, commit, dispatch }) {
		// Connection parameters
		const params = {
			roomnum: state?.uid,
			chatServer: state?.chatServer,
			stream: state?.liveInfo?.stream,
		};
		
		const uid = rootState?.user?.uid || '';
		const token = rootState?.user?.token || '';
		if (uid && token) {
			params.uid = String(uid);
			params.token = String(token);
		}

		// Construct socket.io
		const socket = new io(state?.chatServer, params);

		// On socket disconnect
		socket.on('disconnect', () => {
			socket.emit('conn', params);
		});

		// On socket broadcast received
		socket.on('broadcastingListen', (broadcastMessage) => {
			// Parse broadcast message
			const broadcastObject = broadcastMessage.map((item) => JSON.parse(item))[0] || {};
			const msgList = broadcastObject.msg || [];
			const msg = msgList[0] || {};

			// 新增或更新聊天室使用者
			commit('ADD_ROOM_MEMBER', msg);

			// 更新熱度資訊
			const donateTotal = msg?.ct?.donate_total || undefined;
			const roomHeat = msg?.ct?.room_heat || undefined;
			if (donateTotal !== undefined && roomHeat !== undefined) {
				commit('SET_HEAT_INFO', {
					donate_total: donateTotal,
					room_heat: roomHeat,
				});
			}

			// 依據 method 處理資訊
			const method = msg?._method_ || '';
			const toUid = msg?.touid || 0;
			const ct = msg?.ct || '';
			const loginUid = rootState?.user?.uid || -1;
			switch (method) {
				// 彈幕訊息
				case 'SendBarrage':
					commit('ADD_BARRAGE', {
						msg: msg?.ct?.content || '',
						time: 5,
						type: '',
					});
					break;
				
				// 關注主播
				case 'setAttent':
					commit('ADD_BARRAGE', {
						msg: ct,
						time: 5,
						type: '',
					});
					break;

				// 打賞禮物
				case 'SendGift':
					// Add barrage
					const uname = msg?.uname || '';
					const giftCount = msg?.ct?.giftcount || 0;
					const giftName = msg?.ct?.giftname || '';
					commit('ADD_BARRAGE', {
						msg: `${uname} 打赏给主播 ${giftCount} 个 ${giftName}`,
						time: 5,
						type: '',
					});
					
					// Add svga if not combo mode
					// const isCombo = msg?.ct?.is_combo === true;
					// if (!isCombo) {
						const swf = msg?.ct?.swf || '';
						const swfUrl = swf.replace(/(^\s*)|(\s*$)/g, '');
						const swfTime = msg?.ct?.swftime || 0;
						const swfType = msg?.ct?.swftype || 0;
						commit('ADD_SVGA', {
							url: swfUrl,
							time: swfTime,
							type: swfType,
						});
					// }
	
					// Update combo list
					// const comboList = msg?.ct?.combo_rank || [];
					// commit('SET_COMBO_LIST', comboList);
					break;

				// 設置房管
				case 'setAdmin':
					if (Number(loginUid) === Number(toUid)) {
						dispatch('user/HOTRELOAD_USER_INFO', {}, { root: true });
					}
					break;

				// 設置黑名單
				case 'KickUser':
					if (Number(loginUid) === Number(toUid)) {
						router.push('/');
					}
					break;

				// 主播關播
				case 'LiveRoomNotify':
					const isOffLive = msg?.ct?.room_status === false;
					if (isOffLive) {
						dispatch('TURN_LIVE_OFF');
					}
					break;

				// 系統訊息
				case 'SystemNot':
					commit('SET_NOTICE', ct);
					return;
			}

			// 加入聊天訊息
			commit('ADD_MSG', msg);
		});

		// Emit connection
		socket.emit('conn', params);

		// Commit socket.io object
		commit('SET_SOCKET', socket);
	},

	// Disconnect socket.io chat server
	DISCONNECT_SOCKET({ state, commit }) {
		if (state.socket) {
			state.socket.on('disconnect', () => {});
			state.socket.disconnect();
			commit('SET_SOCKET', null);
		}
	},

	// 關注/取消關注主播
	SET_ATTENT({ state, rootState, getters, commit }) {
		// Update loading state
		commit('SET_ATTENT_LOADING', true);

		// Post body
		const body = {
			uid: Number(rootState?.user?.uid || 0),
			touid: Number(state?.uid || 0),
		};

		// Set attent
		setattent(body)
			.then((res) => {
				// Update attent state
				commit('SET_ISATTENT', res?.data?.isattent || -1);

				// Revert loading state on finished
				commit('SET_ATTENT_LOADING', false);

				// Emit set attent broadcast
				if (res?.data?.isattent === 1) {
					const userData = getters['USER_DATA'];
					const setAttentMsg = {
						_method_: 'setAttent',
						action: 0,
						msgtype: 1,
						ct: `${rootState?.user?.userInfo?.user_nicename} 关注了主播`,
						roomnum: String(state?.uid || 0),
					};
					const msgObj = { ...setAttentMsg, ...userData };
					const message = {
						msg: [msgObj],
						retcode: '000000',
						retmsg: 'OK',
					};
					state.socket.emit('broadcast', message);
				}
			})
			.catch(() => {
				// Revert loading state on error
				commit('SET_ATTENT_LOADING', false);
			});
	},

	// 設置指定 UID 為房管
	SET_ADMIN({ state, rootState, getters, commit }, touid) {
		return new Promise((resolve, reject) => {
			// Update loading state
			commit('SET_ADMIN_LOADING', true);

			// Post body
			const body = {
				uid: Number(rootState?.user?.uid || 0),
				liveuid: Number(state?.uid || 0),
				touid: Number(touid || 0),
			};

			setadmin(body)
				.then((res) => {
					// Revert loading state on finished
					commit('SET_ADMIN_LOADING', false);

					// Emit set admin broadcast
					if (res?.code === 0) {
						const userData = getters['USER_DATA'];
						const uname = getters['UID_UNAME'](touid);
						const setAdminMsg = {
							_method_: 'setAdmin',
							action: 0,
							msgtype: 1,
							ct: res?.data?.isadmin === 1 ? `${uname} 已被设为管理员` : `${uname} 已被取消管理员`,
							uid: String(rootState?.user?.uid),
							touid: String(touid),
							toname: String(uname),
							usertype: res?.data?.isadmin === 1 ? 3 : 1,
							roomnum: String(state?.uid || 0),
						};
						const msgObj = { ...setAdminMsg, ...userData };
						let message = {
							msg: [msgObj],
							retcode: '000000',
							retmsg: 'OK',
						};
						state.socket.emit('broadcast', message);
					}

					// Resolve promise
					resolve();
				})
				.catch(() => {
					// Revert loading state on error
					commit('SET_ADMIN_LOADING', false);

					// Reject promise
					reject();
				});
		});
	},

	// 禁言指定 UID
	SET_SHUTUP({ state, rootState, getters, commit }, { touid, time, type }) {
		return new Promise((resolve, reject) => {
			// Update loading state
			commit('SET_SHUTUP_LOADING', true);

			// Post body
			const body = {
				uid: Number(rootState?.user?.uid || 0),
				liveuid: Number(state?.uid || 0),
				touid: Number(touid || 0),
				time: Number(time),
			};

			// Api
			var api = new Promise((resolve, reject) => resolve());
			if (type === 'user') {
				api = shutup;
			} else {
				api = shutupip;
			}

			// Shutup
			api(body)
				.then((res) => {
					// Revert loading state on finished
					commit('SET_SHUTUP_LOADING', false);

					// Emit shutup broadcast
					if (res?.code === 0) {
						const userData = getters['USER_DATA'];
						const uname = getters['UID_UNAME'](touid);
						const userType = getters['UID_USER_TYPE'](touid);
						const shutupMsg = {
							_method_: 'ShutUpUser',
							action: 1,
							ct: `${uname} 已被房管禁言`,
							msgtype: 2,
							touid: String(touid),
							toname: String(uname),
							usertype: userType,
						};
						const msgObj = { ...shutupMsg, ...userData };
						let message = {
							msg: [msgObj],
							retcode: '000000',
							retmsg: 'OK',
						};
						state.socket.emit('broadcast', message);
					}

					// Resolve promise
					resolve();
				})
				.catch(() => {
					// Revert loading state on error
					commit('SET_SHUTUP_LOADING', false);

					// Resolve promise
					resolve();
				});
		});
	},

	// 踢出指定 UID
	SET_KICKING({ state, rootState, getters, commit }, { touid, time, type }) {
		return new Promise((resolve, reject) => {
			// Update loading state
			commit('SET_KICKING_LOADING', true);

			// Post body
			const body = {
				uid: Number(rootState?.user?.uid || 0),
				liveuid: Number(state?.uid || 0),
				touid: Number(touid || 0),
				time: Number(time),
			};

			// Api
			var api = new Promise((resolve, reject) => resolve());
			if (type === 'user') {
				api = kicking;
			} else {
				api = kickingip;
			}

			// Kicking
			api(body)
				.then((res) => {
					// Revert loading state on finished
					commit('SET_KICKING_LOADING', false);

					// Emit kick broadcast
					if (res?.code === 0) {
						const userData = getters['USER_DATA'];
						const uname = getters['UID_UNAME'](touid);
						const kickMsg = {
							_method_: 'KickUser',
							action: 1,
							ct: `${uname} 已被禁入直播间`,
							msgtype: 2,
							touid: String(touid),
							toname: String(uname),
						};
						const msgObj = { ...kickMsg, ...userData };
						let message = {
							msg: [msgObj],
							retcode: '000000',
							retmsg: 'OK',
						};
						state.socket.emit('broadcast', message);
					}

					// Resolve promise
					resolve();
				})
				.catch(() => {
					// Revert loading state on error
					commit('SET_KICKING_LOADING', false);

					// Resolve promise
					resolve();
				});
		});
	},

	// 發送彈幕
	SEND_BARRAGE({ state, rootState, getters, commit }, msg) {
		// Update loading state
		commit('SET_SEND_BARRAGE_LOADING', true);

		// Post body
		const body = {
			uid: Number(rootState?.user?.uid || 0),
			liveuid: Number(state?.uid || 0),
			stream: state?.liveInfo?.stream || '',
			content: msg,
		};
		sendbarrage(body)
			.then((res) => {
				// Revert loading state on finish
				commit('SET_SEND_BARRAGE_LOADING', false);

				// Emit barrage broadcast
				if (res?.code === 0) {
					const userData = getters['USER_DATA'];
					const userType = getters['USER_TYPE'];
					const userColor = getters['USER_COLOR'];
					const adminRooms = getters['ADMIN_ROOMS'];
					const msgColor = selectedMsgColor();
					const barrageMsg = {
						_method_: 'SendBarrage',
						action: 7,
						msgtype: 1,
						ct: res?.data?.barragetoken,
						usertype: userType,
						adminRooms: adminRooms,
						roomnum: String(state?.uid || 0),
						touid: '',
						userTypeColor: userColor,
						msgColor: msgColor,
					};
					const msgObj = { ...barrageMsg, ...userData };
					let message = {
						msg: [msgObj],
						retcode: '000000',
						retmsg: 'OK',
					};
					state.socket.emit('broadcast', message);
				}

				// 更新熱度資訊
				commit('SET_HEAT_INFO', {
					donate_total: res?.data?.donate_total,
					room_heat: res?.data?.room_heat,
				});
			})
			.catch(() => {
				// Revert loading state on error
				commit('SET_SEND_BARRAGE_LOADING', false);
			});
	},

	// 發送禮物
	SEND_GIFT({ state, rootState, getters, commit }, { id, count }) {
		return new Promise((resolve, reject) => {
			// Update loading state
			commit('SET_SEND_GIFT_LOADING', true);

			// Post body
			const body = {
				uid: Number(state?.uid || 0),
				gift_id: Number(id || 0),
				count: Number(count || 0),
			};

			// Send gift
			giftSend(body)
				.then((res) => {
					// Revert loading state on finish
					commit('SET_SEND_GIFT_LOADING', false);

					// Validate response code
					if (res?.code === 0) {
						// Update user level, coin and banana
						commit(
							'user/EDIT_INFO',
							{
								level: res?.data?.level || 0,
								coin: res?.data?.gift_list?.coin || 0,
								banana: res?.data?.gift_list?.banana || 0,
							},
							{
								root: true,
							}
						);

						// Update heat info
						commit('SET_HEAT_INFO', {
							donate_total: res?.data?.donate_total || 0,
							room_heat: res?.data?.heat || 0,
						});

						// Update gift list
						commit('SET_GIFT_LIST', res?.data?.gift_list?.list || []);

						// Emit send gift broadcast
						const userData = getters['USER_DATA'];
						const userType = getters['USER_TYPE'];
						const defaultMsg = {
							_method_: 'SendGift',
							action: 0,
							msgtype: 1,
							ct: res?.data?.token,
							usertype: userType,
							roomnum: state?.uid || 0,
							touid: String(state?.uid),
						};
						const msgObj = { ...defaultMsg, ...userData };
						let message = {
							msg: [msgObj],
							retcode: '000000',
							retmsg: 'OK',
						};
						state.socket.emit('broadcast', message);
					}

					// Resolve promise
					resolve();
				})
				.catch(() => {
					// Revert loading state on error
					commit('SET_SEND_GIFT_LOADING', false);

					// Resolve promise
					resolve();
				});
		});
	},

	// 發送貼圖
	SEND_STICKER({ state, rootState, getters, commit }, { code }) {
		// Emit send gift broadcast
		const userData = getters['USER_DATA'];
		const userType = getters['USER_TYPE'];
		const userColor = getters['USER_COLOR'];
		const adminRooms = getters['ADMIN_ROOMS'];
		const msgColor = selectedMsgColor();
		const ct = {
			code: code,
		};
		const barrageMsg = {
			_method_: 'SendSticker',
			action: 7,
			msgtype: 1,
			ct: ct,
			usertype: userType,
			adminRooms: adminRooms,
			roomnum: String(state?.uid || 0),
			touid: '',
			userTypeColor: userColor,
			msgColor: msgColor,
		};
		const msgObj = { ...barrageMsg, ...userData };
		let message = {
			msg: [msgObj],
			retcode: '000000',
			retmsg: 'OK',
		};
		state.socket.emit('broadcast', message);
	}
};

// Getters
const getters = {
	// 取得登入用戶的 socket user data object
	USER_DATA: (state, getters, rootState) => {
		return {
			uid: String(rootState?.user?.uid || 0),
			uname: String(rootState?.user?.userInfo?.user_nicename || ''),
			uhead: String(rootState?.user?.userInfo?.avatar || ''),
			level: String(rootState?.user?.userInfo?.level || ''),
			equipment: 'pc',
		};
	},

	// 取得登入用戶的 admin rooms array string
	ADMIN_ROOMS: (state, getters, rootState) => {
		const identities = rootState?.user?.userInfo?.identities || [];
		const adminIdentity = identities.filter((item) => Number(item.identity) === 3);
		const adminRooms = adminIdentity.length > 0 ? adminIdentity[0].rooms : [];
		return JSON.stringify(adminRooms);
	},

	// 取得登入用戶的 user type
	USER_TYPE: (state, getters, rootState) => {
		if (state?.uid === rootState?.user?.uid) {
			return 4;
		}
		const identities = rootState?.user?.userInfo?.identities || [];
		const adminIdentity = identities.filter((item) => Number(item.identity) === 3);
		const hostIdentity = identities.filter((item) => Number(item.identity) === 4);
		if (adminIdentity.length > 0) {
			return 3;
		} else if (hostIdentity.length > 0) {
			return 4;
		} else {
			return 1;
		}
	},

	// 取得登入用戶暱稱顏色
	USER_COLOR: (state, getters, rootState) => {
		const identities = rootState?.user?.userInfo?.identities || [];
		const adminIdentity = identities.filter((item) => Number(item.identity) === 3);
		const hostIdentity = identities.filter((item) => Number(item.identity) === 4);
		if (hostIdentity.length > 0) {
			return '#E1AF62';
		} else if (adminIdentity.length > 0) {
			return '#6FCF37';
		} else {
			return '#70BBFF';
		}
	},

	// 取得聊天室名單中的 UID 對應暱稱
	UID_UNAME: (state) => {
		return (uid) => {
			const roomMemberList = state?.roomMemberList || [];
			return roomMemberList.find((element) => Number(element.uid) === Number(uid))?.uname || '';
		};
	},

	// 取得聊天室名單中的 UID 對應身份
	UID_USER_TYPE: (state) => {
		return (uid) => {
			const roomMemberList = state?.roomMemberList || [];
			return roomMemberList.find((element) => Number(element.uid) === Number(uid))?.usertype || 0;
		};
	},

	// 取得播源列表
	SOURCE_LIST: (state) => {
		// 1. source:1 & webrtc
		const sourceList = [];
		const resourceList = state?.resourceList || [];
		const source1WebRtc = resourceList.find((element) => {
			const pull = element.pull?.pull || '';
			const p480 = element.p480?.pull || '';
			const p720 = element.p720?.pull || '';
			const containsSource = pull.length > 0 || p480.length > 0 || p720.length > 0;
			return element.source === 1 && containsSource;
		});
		if (source1WebRtc !== undefined) {
			sourceList.push({
				name: 'condition1, source1 with webrtc',
				pull: source1WebRtc.pull?.pull || '',
				p480: source1WebRtc.p480?.pull || '',
				p720: source1WebRtc.p720?.pull || '',
			});
		}

		// 2. source:2 & webrtc
		const source2WebRtc = resourceList.find((element) => {
			const pull = element.pull?.pull || '';
			const p480 = element.p480?.pull || '';
			const p720 = element.p720?.pull || '';
			return element.source === 2 && (pull.length > 0 || p480.length > 0 || p720.length > 0);
		});
		if (source2WebRtc !== undefined) {
			sourceList.push({
				name: 'condition2, source2 with webrtc',
				pull: source2WebRtc.pull?.pull || '',
				p480: source2WebRtc.p480?.pull || '',
				p720: source2WebRtc.p720?.pull || '',
			});
		}

		// 3. source:1 & m3u8
		const source1M3u8 = resourceList.find((element) => {
			const pull = element.pull?.m3u8 || '';
			const p480 = element.p480?.m3u8 || '';
			const p720 = element.p720?.m3u8 || '';
			return element.source === 1 && (pull.length > 0 || p480.length > 0 || p720.length > 0);
		});
		if (source1M3u8 !== undefined) {
			sourceList.push({
				name: 'condition3, source1 with m3u8',
				pull: source1M3u8.pull?.m3u8 || '',
				p480: source1M3u8.p480?.m3u8 || '',
				p720: source1M3u8.p720?.m3u8 || '',
			});
		}

		// 4. source:2 & m3u8
		const source2M3u8 = resourceList.find((element) => {
			const pull = element.pull?.m3u8 || '';
			const p480 = element.p480?.m3u8 || '';
			const p720 = element.p720?.m3u8 || '';
			return element.source === 2 && (pull.length > 0 || p480.length > 0 || p720.length > 0);
		});
		if (source2M3u8 !== undefined) {
			sourceList.push({
				name: 'condition4, source2 with m3u8',
				pull: source2M3u8.pull?.m3u8 || '',
				p480: source2M3u8.p480?.m3u8 || '',
				p720: source2M3u8.p720?.m3u8 || '',
			});
		}
		return sourceList;
	},
};

// Socket model
export default {
	namespaced: true,
	state: defaultState(),
	mutations,
	actions,
	getters,
};
