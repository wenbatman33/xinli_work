import router from '@/router';
import { deepLink } from '@/utils';
import { login, getUserinfo, inboxDataList, backpack, guessHistory } from '@/api';

// State
const state = {
	isLogging: false,							// 是否登入中
	isGettingUserInfo: false,					// 是否正在取得使用者資訊
	isGettingInboxList: false,					// 是否正在取得站內信列表
	isGettingGuessHistory: false,				// 是否正在取得競猜紀錄
	isGettingBackpackGiftList: false,			// 是否正在取得背包禮物列表
	isGettingBackpackItemList: false,			// 是否正在取得背包道具列表
	uid: window.localStorage.UID || '',			// User id
	token: window.localStorage.TOKEN || '',		// Login token
	userInfo: {},								// 使用者資訊
	inboxList: [],								// 站內信列表
	guessHistory: [],							// 競猜紀錄
	backpackGiftList: [],						// 背包禮物列表
	backpackItemList: [],						// 背包道具列表
};

// Mutations
const mutations = {
	// 設置登入中
	SET_LOGGING: (state, payload) => {
		state.isLogging = payload;
	},

	// 設置正在取得使用者資訊
	SET_GETTING_USER_INFO: (state, payload) => {
		state.isGettingUserInfo = payload;
	},

	// 設置正在取得站內信列表
	SET_GETTING_INBOX_LIST: (state, payload) => {
		state.isGettingInboxList = payload;
	},

	// 設置正在取得競猜紀錄
	SET_GETTING_GUESS_HISTORY: (state, payload) => {
		state.isGettingGuessHistory = payload;
	},

	// 設置正在取得背包禮物列表
	SET_GETTING_BACKPACK_GIFT_LIST: (state, payload) => {
		state.isGettingBackpackGiftList = payload;
	},

	// 設置正在取得背包道具列表
	SET_GETTING_BACKPACK_ITEM_LIST: (state, payload) => {
		state.isGettingBackpackItemList = payload;
	},

	// 設置 user id
	SET_UID: (state, uid) => {
		uid ? window.localStorage.setItem('UID', uid) : window.localStorage.removeItem('UID');
		state.uid = uid;
	},

	// 設置 login token
	SET_TOKEN: (state, token) => {
		token ? window.localStorage.setItem('TOKEN', token) : window.localStorage.removeItem('TOKEN');
		state.token = token;
	},

	// 設置使用者資訊
	SET_USER_INFO: (state, model) => {
		state.userInfo = model;
		window.localStorage.setItem('USERINFO', JSON.stringify(model));
	},

	// 修改使用者資訊
	EDIT_INFO: (state, data) => {
		for (let key in data) {
			state.userInfo[key] = data[key];
		}
		window.localStorage.setItem('USERINFO', JSON.stringify(state.userInfo));
	},

	// 設置站內信列表
	SET_INBOX_LIST: (state, payload) => {
		state.inboxList = payload;
	},

	// 設置競猜紀錄
	SET_GUESS_HISTORY: (state, payload) => {
		state.guessHistory = payload;
	},

	// 設置背包禮物列表
	SET_BACKPACK_GIFT_LIST: (state, payload) => {
		state.backpackGiftList = payload;
	},

	// 設置背包道具列表
	SET_BACKPACK_ITEM_LIST: (state, payload) => {
		state.backpackItemList = payload;
	},
};

// Actions
const actions = {
	// 登入
	USER_LOGIN({ commit, dispatch }, payload) {
		commit('SET_LOGGING', true);
		login(payload)
			.then((res) => {
				window._paq.push(['setUserId', res.data.id]);
				commit('SET_LOGGING', false);
				commit('SET_TOKEN', res.data.token);
				commit('SET_UID', res.data.id);
				commit('SET_USER_INFO', res.data);
				dispatch('GET_USER_INFO');
				dispatch('GET_INBOX_LIST');
				dispatch('tasks/GET_BONUS_LIST', {}, { root: true });
				if (window.localStorage.tempUrl) {
					// 前往暫存的路徑
					router.replace({ path: window.localStorage.tempUrl });
					window.localStorage.removeItem('tempUrl');
				} else if (router.currentRoute._value.name === 'room') {
					// 如果登入前是直播頁面的話 重新整理頁面
					router.go(router.currentRoute);
				} else {
					// 前往首頁
					router.replace({ path: '/' });
				}
				if (window.localStorage.tempDeepLink) {
					// 開啟暫存的 deeplink
					deepLink(window.localStorage.tempDeepLink);
					window.localStorage.removeItem('tempDeepLink');
				}
			})
			.catch((error) => {
				commit('SET_LOGGING', false);
			});
	},

	// 取得使用者資訊
	GET_USER_INFO({ state, commit, dispatch }) {
		const query = {
			uid: state.uid,
		};
		commit('SET_GETTING_USER_INFO', true);
		getUserinfo(query)
			.then((res) => {
				commit('SET_GETTING_USER_INFO', false);
				if (res?.data) {
					window._paq.push(['setUserId', state.uid]);
					commit('SET_USER_INFO', res?.data);
				} else {
					dispatch('RESET_TOKEN');
				}
			})
			.catch(() => {
				commit('SET_GETTING_USER_INFO', false);
			});
	},

	// 直播間更新使用者資訊
	HOTRELOAD_USER_INFO({ state, commit }) {
		if (state.uid) {
			getUserinfo({ uid: state.uid }).then((res) => {
				if (res) {
					commit('SET_USER_INFO', res.data);
				}
			});
		}
	},

	// 清除登入資訊
	RESET_TOKEN({ commit }) {
		window._paq.push(['setUserId', '']);
		window.localStorage.removeItem('UID');
		window.localStorage.removeItem('TOKEN');
		window.localStorage.removeItem('CONFIG');
		window.localStorage.removeItem('USERINFO');
		window.localStorage.removeItem('ERROR_IMG');
		commit('SET_TOKEN', '');
		commit('SET_UID', '');
		commit('tasks/SET_BONUS_LIST', [], { root: true });
		router.replace('/login');
	},

	// 取得站內信列表
	GET_INBOX_LIST({ state, commit }) {
		const query = {
			uid: state.uid,
			page: 0,
			pagesize: 999999,
		};
		commit('SET_GETTING_INBOX_LIST', true);
		inboxDataList(query)
			.then((res) => {
				if (res?.code === 0 && res?.data) {
					commit('SET_INBOX_LIST', res.data.list);
				}
				commit('SET_GETTING_INBOX_LIST', false);
			})
			.catch(() => {
				commit('SET_GETTING_INBOX_LIST', false);
			});
	},

	// 取得競猜紀錄
	GET_GUESS_HISTORY({ commit }) {
		const query = {
			page: 1,
			pagesize: 9999,
		};
		commit('SET_GETTING_GUESS_HISTORY', true);
		guessHistory(query)
			.then((res) => {
				commit('SET_GUESS_HISTORY', res?.data?.list || []);
				commit('SET_GETTING_GUESS_HISTORY', false);
			})
			.catch(() => {
				commit('SET_GETTING_GUESS_HISTORY', false);
			});
	},

	// 取得背包禮物列表
	GET_BACKPACK_GIFT_LIST({ commit }) {
		const query = {
			sid: 1,
			page: 1,
			pagesize: 9999,
		};
		commit('SET_GETTING_BACKPACK_GIFT_LIST', true);
		backpack(query)
			.then((res) => {
				commit('SET_BACKPACK_GIFT_LIST', res?.data?.gift_list || []);
				commit('SET_GETTING_BACKPACK_GIFT_LIST', false);
			})
			.catch(() => {
				commit('SET_GETTING_BACKPACK_GIFT_LIST', false);
			});
	},

	// 取得背包道具列表
	GET_BACKPACK_ITEM_LIST({ commit }) {
		const query = {
			sid: 2,
			page: 1,
			pagesize: 9999,
		};
		commit('SET_GETTING_BACKPACK_ITEM_LIST', true);
		backpack(query)
			.then((res) => {
				commit('SET_BACKPACK_ITEM_LIST', res?.data?.gift_list || []);
				commit('SET_GETTING_BACKPACK_ITEM_LIST', false);
			})
			.catch(() => {
				commit('SET_GETTING_BACKPACK_ITEM_LIST', false);
			});
	},
};

// Getters
const getters = {
	// 是否為已登入狀態
	IS_LOGIN: (state) => {
		if (!state.uid) {
			return false;
		} else if (state.uid === '') {
			return false;
		} else if (state.uid === 0) {
			return false;
		} else if (!state.token) {
			return false;
		} else if (state.token === '') {
			return false;
		} else if (state.token === 0) {
			return false;
		} else {
			return true;
		}
	},
};

// User model
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
