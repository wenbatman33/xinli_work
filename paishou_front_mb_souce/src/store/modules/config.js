import { getconfig, classList, levelList, guessRecommend, slideList } from '@/api';

// State
const state = {
	hideSlide: false,					// 是否隱藏蓋板廣告
	hideFloatSlide: false,				// 是否隱藏廣告懸浮按鈕
	hideFloatLimitTask: false,			// 是否隱藏限時任務懸浮按鈕
	hideFloatGuessRecommend: false,		// 是否隱藏競猜推薦懸浮按鈕
	config: null,						// 設定資訊
	errorImg: null,						// 直撥間預設縮圖 base64 data
	classList: [],						// 分類列表
	levelList: [],						// 用戶等級列表
	slideList: [],						// 蓋板廣告列表
	levelanchor: [],					// 主播等級列表
	allGiftList: [],					// 禮物列表
	floatChatList: [],					// 懸浮客服列表
	floatSlideList: [],					// 懸浮廣告列表
	floatGuessRecommendList: [],		// 競猜推薦列表
};

// Mutations
const mutations = {
	// 設置隱藏蓋板廣告
	SET_HIDE_SLIDE: (state, payload) => {
		state.hideSlide = payload;
	},

	// 設置隱藏廣告懸浮按鈕
	SET_HIDE_FLOAT_SLIDE: (state, payload) => {
		state.hideFloatSlide = payload;
	},

	// 設置隱藏限時任務懸浮按鈕
	SET_HIDE_FLOAT_LIMIT_TASK: (state, payload) => {
		state.hideFloatLimitTask = payload;
	},

	// 設置隱藏競猜推薦懸浮按鈕
	SET_HIDE_FLOAT_GUESS_RECOMMEND: (state, payload) => {
		state.hideFloatGuessRecommend = payload;
	},

	// 設置設定資訊
	SET_CONFIG: (state, payload) => {
		state.config = payload;
		window.localStorage.setItem('CONFIG', JSON.stringify(payload));
	},

	// 設置直撥間預設縮圖 base64 data
	SET_ERROR_IMG: (state, payload) => {
		state.errorImg = payload;
	},

	// 設置分類列表
	SET_CLASS_LIST: (state, payload) => {
		state.classList = payload;
	},

	// 設置用戶等級列表
	SET_LEVEL_LIST: (state, payload) => {
		state.levelList = payload;
	},

	// 設置蓋板廣告列表
	SET_SLIDE_LIST: (state, payload) => {
		state.slideList = payload;
	},

	// 設置主播等級列表
	SET_LEVEL_ANCHOR_LIST: (state, payload) => {
		state.levelanchor = payload;
	},

	// 設置禮物列表
	SET_ALL_GIFT_LIST: (state, payload) => {
		state.allGiftList = payload;
	},

	// 設置懸浮客服列表
	SET_FLOAT_CHAT_LIST: (state, payload) => {
		state.floatChatList = payload;
	},

	// 設置懸浮廣告列表
	SET_FLOAT_SLIDE_LIST: (state, payload) => {
		state.floatSlideList = payload;
	},

	// 設置競猜推薦列表
	SET_FLOAT_GUESS_RECOMMEND_LIST: (state, payload) => {
		state.floatGuessRecommendList = payload;
	},
};

// Getters
const getters = {
	// 是否維護中
	IS_MAINTAIN: (state) => {
		if (!state.config) {
			return false;
		} else if (state.config.maintain_switch === 1) {
			return true;
		} else if (state.config.maintain_switch === '1') {
			return true;
		} else {
			return false;
		}
	},
};

// Actions
const actions = {
	// 隱藏廣告懸浮按鈕
	HIDE_FLOAT_SLIDE({ commit }) {
		commit('SET_HIDE_FLOAT_SLIDE', true);
	},

	// 隱藏限時任務懸浮按鈕
	HIDE_FLOAT_LIMIT_TASK({ commit }) {
		commit('SET_HIDE_FLOAT_LIMIT_TASK', true);
	},

	// 隱藏競猜推薦懸浮按鈕
	HIDE_FLOAT_GUESS_RECOMMEND({ commit }) {
		commit('SET_HIDE_FLOAT_GUESS_RECOMMEND', true);
	},

	// 顯示廣告懸浮按鈕
	SHOW_FLOAT_SLIDE({ commit }) {
		commit('SET_HIDE_FLOAT_SLIDE', false);
	},

	// 顯示限時任務懸浮按鈕
	SHOW_FLOAT_LIMIT_TASK({ commit }) {
		commit('SET_HIDE_FLOAT_LIMIT_TASK', false);
	},

	// 顯示競猜推薦懸浮按鈕
	SHOW_FLOAT_GUESS_RECOMMEND({ commit }) {
		commit('SET_HIDE_FLOAT_GUESS_RECOMMEND', false);
	},

	// 取得分類列表
	GET_CLASS_LIST({ commit }) {
		classList().then((res) => {
			commit('SET_CLASS_LIST', res.data.list);
		});
	},

	// 取得用戶等級列表
	GET_LEVEL_LIST({ commit }) {
		levelList().then((res) => {
			commit('SET_LEVEL_LIST', res.data.list);
		});
	},

	// 取得設置資訊
	GET_CONFIG({ commit }) {
		return new Promise((resolve, reject) => {
			getconfig().then((res) => {
				commit('SET_CONFIG', res.data);
				commit('SET_CLASS_LIST', res.data.liveclass);
				commit('SET_LEVEL_LIST', res.data.level);
				commit('SET_LEVEL_ANCHOR_LIST', res.data.levelanchor);
				commit('SET_ALL_GIFT_LIST', res.data.gifts);
				resolve(res);
			});
			if (window.localStorage.ERROR_IMG) {
				commit('SET_ERROR_IMG', window.localStorage.ERROR_IMG);
			} else {
				getImageBase64('/publicAssets/img/default-room@3x.jpg').then((res) => {
					window.localStorage.setItem('ERROR_IMG', res);
					commit('SET_ERROR_IMG', res);
				});
			}
		});
	},

	// 取得蓋板廣告列表
	GET_SLIDE_LIST({ commit }) {
		slideList({ slide_cid: 8 }).then((res) => {
			commit('SET_SLIDE_LIST', res?.data?.list || []);
		});
	},
	
	// 取得懸浮客服列表
	GET_FLOAT_CHAT_LIST({ commit }) {
		slideList({ slide_cid: 26 }).then((res) => {
			commit('SET_FLOAT_CHAT_LIST', res?.data?.list || []);
		});
	},

	// 取得懸浮廣告列表
	GET_FLOAT_SLIDE_LIST({ commit }) {
		slideList({ slide_cid: 23 }).then((res) => {
			commit('SET_FLOAT_SLIDE_LIST', res?.data?.list || []);
		});
	},

	// 取得競猜推薦列表
	GET_FLOAT_GUESS_RECOMMEND_LIST({ commit }) {
		guessRecommend().then((res) => {
			commit('SET_FLOAT_GUESS_RECOMMEND_LIST', res?.data?.list || []);
		});
	},
};

/**
 * 轉換網址圖片為 base64 data
 * @param {*} url Image url
 * @param {*} outputFormat Data format
 * @returns Base64 image data
 */
function getImageBase64(url, outputFormat) {
	return new Promise((resolve, reject) => {
		let canvas = document.createElement('CANVAS');
		const ctx = canvas.getContext('2d');
		const img = new Image();
		img.crossOrigin = 'Anonymous';
		img.onload = function () {
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img, 0, 0);
			const dataURL = canvas.toDataURL(outputFormat || 'image/png');
			canvas = null;
			resolve(dataURL);
		};
		img.src = url;
	});
}

// Config model
export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
};
