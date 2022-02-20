import Vue from 'vue';
import store from '@/store';
import { levelList, login, getUserinfo, inboxDataList, backpack, giftlist, checkLive, bonusList } from '@/api';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import router from '@/router';
import io from 'socket.io-client';
import { matomo_my_wallet_recharge } from '@/matomoEvent';

export default {
	namespaced: true,
	state: {
		isApp: false,
		token: window.localStorage.TOKEN || '',
		uid: window.localStorage.UID || '',
		userInfo: null,
		showLoginModal: false,
		showLoginModalType: 1,
		showRechargeModal: false,
		currentBackpackItem: null,
		showBackpackModal: false,
		inboxList: [],
		unreadInbox: false,
		PSSocket: null,
		myBackpack: null,
		showLiveSwitch: 0,
		giftList: [],
		banana: 0,
		onLive: false,
		userSticker: null,
	},
	getters: {
		// GET_STICKERS_GROUP(state, getters, rootState, rootGetters) {
		// 	console.log('groupgroup');
		// 	return rootState.config.stickersGroup;
		// },
	},
	mutations: {
		SET_IS_APP: (state, payload) => {
			state.isApp = payload;
		},
		SHOW_LOGIN_MODEL: (state, type) => {
			state.showLoginModal = true;
			state.showLoginModalType = type;
		},
		CHANGE_LOGIN_MODEL_TYPE: (state, type) => {
			state.showLoginModalType = type;
		},
		CLOSE_LOGIN_MODEL: (state) => {
			state.showLoginModal = false;
			if (window.localStorage.tempUrl) window.localStorage.removeItem('tempUrl');
		},
		SHOW_RECHARGE_MODEL: (state) => {
			matomo_my_wallet_recharge();
			state.showRechargeModal = true;
		},
		CLOSE_RECHARGE_MODEL: (state) => {
			state.showRechargeModal = false;
		},
		SET_CURRENT_BACKPACK_ITEM: (state, payload) => {
			state.currentBackpackItem = payload;
		},
		SHOW_BACKPACK_MODEL: (state, type) => {
			state.showBackpackModal = type;
		},
		SET_TOKEN: (state, token) => {
			token ? window.localStorage.setItem('TOKEN', token) : window.localStorage.removeItem('TOKEN');
			state.token = token;
		},
		SET_UID: (state, uid) => {
			uid ? window.localStorage.setItem('UID', uid) : window.localStorage.removeItem('UID');
			state.uid = uid;
		},
		SET_USER_INFO: (state, model) => {
			state.userInfo = model;
			window.localStorage.setItem('USERINFO', JSON.stringify(model));
			window.localStorage.setItem('LC_API_ID', model.user_nicename);
		},
		EDIT_INFO: (state, data) => {
			for (let key in data) {
				state.userInfo[key] = data[key];
			}
			window.localStorage.setItem('USERINFO', JSON.stringify(state.userInfo));
		},
		SET_INBOX_LIST: (state, payload) => {
			state.inboxList = payload;
			state.unreadInbox = payload.some((element) => (element.status === 0 ? true : false));
		},
		RESET_INBOX_LIST: (state, payload) => {
			state.inboxList = [];
		},
		SET_MT_BACKPACK: (state, payload) => {
			state.myBackpack = payload;
		},
		CLICK_LIVE_SWITCH: (state) => {
			state.showLiveSwitch += 1;
		},
		SET_GIFT_LIST: (state, payload) => {
			state.giftList = payload.giftlist;
			state.banana = payload.banana;
		},
		SET_ON_LIVE: (state, payload) => {
			state.onLive = payload;
		},
		SET_USER_STICKERS: async (state, payload) => {
			try {
				const group = await store.getters['config/GET_STICKERS_GROUP'];
				const userSticker = payload.userSticker;
				userSticker.map((item) => {
					let s = group.filter((g) => g.id === item.id);
					s[0] = Object.assign(s[0], item);
				});
				state.userSticker = group;
			} catch (error) {
				// console.log(error);
			}
		},
	},
	actions: {
		USER_LOGIN({ commit, dispatch }, payload) {
			login(payload)
				.then((res) => {
					commit('SET_TOKEN', res.data.token);
					commit('SET_UID', res.data.id);
					commit('SET_USER_INFO', res.data);
					dispatch('UPDATE_USER_INFO');
					if (window.localStorage.tempUrl) {
						setTimeout(() => {
							router.push(window.localStorage.tempUrl);
							commit('CLOSE_LOGIN_MODEL');
						}, 500);
					} else if (router.currentRoute._value.name === 'room') {
						// 如果登入前是直播頁面的話 重新整理頁面
						router.go(router.currentRoute);
						commit('CLOSE_LOGIN_MODEL');
					} else {
						router.push('/');
						commit('CLOSE_LOGIN_MODEL');
					}
				})
				.catch((error) => {
					console.log(error);
					message.error(error.message);
				});
		},
		UPDATE_USER_INFO({ state, commit, dispatch }) {
			if (state.uid) {
				window._paq.push(['setUserId', state.uid]);
				const key = 'DailyLogin' + state.uid;
				const isDailyLogin = window.localStorage[key];
				const today = dayjs().format('YYYY-MM-DD');

				dispatch('GET_INBOX_LIST');
				getUserinfo({ uid: state.uid }).then((res) => {
					if (res.data) {
						commit('SET_USER_INFO', res.data);
						const payload = { userSticker: res.data.stickers };
						commit('SET_USER_STICKERS', payload);
					} else {
						dispatch('RESET_TOKEN');
					}
				});
				checkLive().then((res) => {
					res?.data?.stream !== '' ? store.commit('user/SET_ON_LIVE', true) : store.commit('user/SET_ON_LIVE', false);
				});
				// 檢查每日登入
				store.dispatch('tasks/GET_DAILY_TASK_LIST', state.uid).then((res) => {
					const showTask = res?.data?.list.filter((task) => task.received === 0 && task.can === 1);
					if (showTask.length > 0) store.commit('tasks/SHOW_TASK_MODAL', { showTask: true, showTaskType: 2 });
				});
			} else {
				window._paq.push(['setUserId', '']);
			}
		},
		HOTRELOAD_USER_INFO({ state, commit, dispatch }) {
			if (state.uid) {
				window._paq.push(['setUserId', state.uid]);
				getUserinfo({ uid: state.uid }).then((res) => {
					if (res) {
						commit('SET_USER_INFO', res.data);
					}
				});
			} else {
				window._paq.push(['setUserId', '']);
			}
		},
		RESET_TOKEN({ commit }) {
			window.localStorage.removeItem('UID');
			window.localStorage.removeItem('TOKEN');
			window.localStorage.removeItem('CONFIG');
			window.localStorage.removeItem('USERINFO');
			window.localStorage.removeItem('ERROR_IMG');
			window.localStorage.removeItem('LC_API_ID');
			commit('SET_TOKEN', '');
			commit('SET_UID', '');
			window._paq.push(['setUserId', '']);
			// commit('SET_USER_INFO', '');
			router.replace('/');
		},
		GET_INBOX_LIST({ state, commit }) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					if (state.uid) {
						inboxDataList({
							uid: state.uid,
							page: 0,
							pagesize: 999999,
						}).then((res) => {
							if (res.code === 0 && res.data) {
								commit('SET_INBOX_LIST', res.data.list);
								resolve(res);
							}
						});
					} else {
						reject();
					}
				}, 1000);
			});
		},
		GET_MT_BACKPACK({ state, commit }, payload) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					if (state.uid) {
						backpack({
							sid: 2,
							page: payload.page,
							pagesize: payload.pagesize,
						})
							.then((res) => {
								commit('SET_MT_BACKPACK', res);
								resolve(res);
							})
							.catch((error) => {
								reject(error);
							});
					} else {
						reject();
					}
				}, 1000);
			});
		},
		GET_GIFT_LIST({ state, commit }) {
			const payload = state.uid ? { uid: state.uid } : {};
			giftlist(payload).then((res) => {
				// ---------------------------------
				// 為了購買禮物表單上先填上購買數量
				res.data.giftlist.map((data) => {
					data.giftcount = 1;
				});
				// ---------------------------------
				commit('SET_GIFT_LIST', res.data);
			});
		},
	},
};
