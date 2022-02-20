import { getconfig, classList, levelList } from '@/api';

function getImageBase64(url, callback, outputFormat) {
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

export default {
	namespaced: true,
	state: {
		config: null,
		currentclassList: [],
		classList: [],
		levelList: [],
		levelanchor: [],
		allGiftList: [],
		errorImg: null,
		allStickers: [],
		stickersGroup: [],
		logo_navigation: null,
		logo_living: null,
	},
	mutations: {
		SET_CURRENT_CLASS_LIST: (state, payload) => {
			state.currentclassList = payload;
		},
		SET_CLASS_LIST: (state, payload) => {
			state.classList = payload;
		},
		SET_LEVEL_LIST: (state, payload) => {
			state.levelList = payload;
		},
		SET_LEVEL_ANCHOR_LIST: (state, payload) => {
			state.levelanchor = payload;
		},
		SET_ALL_GIFT_LIST: (state, payload) => {
			state.allGiftList = payload;
		},
		SET_CONFIG: (state, payload) => {
			state.config = payload;
		},
		SET_ERROR_IMG: (state, payload) => {
			state.errorImg = payload;
		},
		SET_STICKER_GROUP: (state, payload) => {
			state.stickersGroup = payload;
			let allStickerArray = [];
			payload.map((item) => {
				allStickerArray = [...allStickerArray, ...item.stickers];
			});
			state.allStickers = allStickerArray;
		},
		SET_LOGO_NAVIGATION: (state, payload) => {
			state.logo_navigation = payload;
		},
		SET_LOGO_LIVING: (state, payload) => {
			state.logo_living = payload;
		},
	},
	getters: {
		GET_LEVEL_PERCENT: (state) => (level, percent) => {
			try {
				const levleItem = state.levelList.filter((item) => item.levelid === level);
				return levleItem[0].level_up ? (percent / levleItem[0].level_up) * 100 : 0;
			} catch (e) {
				return 0;
			}
		},
		GET_STICKERS_GROUP: async (state) => await state.stickersGroup,
	},
	actions: {
		GET_CURRENT_CLASS_LIST({ commit }) {
			classList({ filter: 1 }).then((res) => {
				commit('SET_CURRENT_CLASS_LIST', res.data.list);
			});
		},
		GET_LEVEL_LIST({ commit }) {
			levelList().then((res) => {
				commit('SET_LEVEL_LIST', res.data.list);
			});
		},
		GET_CONFIG({ commit }) {
			return new Promise((resolve, reject) => {
				getconfig().then((res) => {
					commit('SET_CONFIG', res.data);
					commit('SET_CLASS_LIST', res.data.liveclass);
					commit('SET_LEVEL_LIST', res.data.level);
					commit('SET_LEVEL_ANCHOR_LIST', res.data.levelanchor);
					commit('SET_ALL_GIFT_LIST', res.data.gifts);
					commit('SET_STICKER_GROUP', res.data.sticker_group);
					commit('SET_LOGO_NAVIGATION', res.data.logo_navigation);
					commit('SET_LOGO_LIVING', res.data.logo_living);
					resolve(res);
				});
				if (window.localStorage.ERROR_IMG) {
					commit('SET_ERROR_IMG', window.localStorage.ERROR_IMG);
				} else {
					getImageBase64('/publicAssets/img/v3/imgSoccer2@3x.jpg').then((res) => {
						window.localStorage.setItem('ERROR_IMG', res);
						commit('SET_ERROR_IMG', res);
					});
				}
			});
		},
	},
};
