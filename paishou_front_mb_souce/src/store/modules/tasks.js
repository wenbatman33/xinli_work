import { bonusList, taskBasic, taskDay, taskLimit, taskPayment } from '@/api';

// State
const state = {
	isGettingBonusList: false,			// 是否正在取得簽到列表
	isGettingBasicTaskList: false,		// 是否正在取得新手任務列表
	isGettingDayTaskList: false,		// 是否正在取得每日任務列表
	isGettingLimitTaskList: false,		// 是否正在取得限時任務列表
	isGettingPaymentTaskList: false,	// 是否正在取得充值任務列表
	bonusList: [],						// 簽到列表
	basicTaskList: [],					// 新手任務列表
	dayTaskList: [],					// 每日任務列表
	limitTaskList: [],					// 限時任務列表
	paymentTaskList: [],				// 充值任務列表
};

// Mutations
const mutations = {
	// 設置正在取得簽到列表
	SET_GETTING_BONUS_LIST: (state, payload) => {
		state.isGettingBonusList = payload;
	},

	// 設置正在取得新手任務列表
	SET_GETTING_BASIC_TASK_LIST: (state, payload) => {
		state.isGettingBasicTaskList = payload;
	},

	// 設置正在取得每日任務列表
	SET_GETTING_DAY_TASK_LIST: (state, payload) => {
		state.isGettingDayTaskList = payload;
	},

	// 設置正在取得限時任務列表
	SET_GETTING_LIMIT_TASK_LIST: (state, payload) => {
		state.isGettingLimitTaskList = payload;
	},

	// 設置正在取得充值任務列表
	SET_GETTING_PAYMENT_TASK_LIST: (state, payload) => {
		state.isGettingPaymentTaskList = payload;
	},

	// 設置簽到列表
	SET_BONUS_LIST: (state, payload) => {
		state.bonusList = payload;
	},

	// 設置新手任務列表
	SET_BASIC_TASK_LIST: (state, payload) => {
		state.basicTaskList = payload;
	},

	// 設置每日任務列表
	SET_DAY_TASK_LIST: (state, payload) => {
		state.dayTaskList = payload;
	},

	// 設置限時任務列表
	SET_LIMIT_TASK_LIST: (state, payload) => {
		state.limitTaskList = payload;
	},

	// 設置充值任務列表
	SET_PAYMENT_TASK_LIST: (state, payload) => {
		state.paymentTaskList = payload;
	},
};

// Actions
const actions = {
	// 取得簽到列表
	GET_BONUS_LIST({ commit }) {
		commit('tasks/SET_GETTING_BONUS_LIST', true, { root: true });
		bonusList().then(
			(res) => {
				commit('tasks/SET_BONUS_LIST', res.data.list, { root: true });
				commit('tasks/SET_GETTING_BONUS_LIST', false, { root: true });
			},
			() => {
				commit('tasks/SET_GETTING_BONUS_LIST', false, { root: true });
			}
		);
	},

	// 取得新手任務列表
	GET_BASIC_TASK_LIST({ commit }) {
		commit('tasks/SET_GETTING_BASIC_TASK_LIST', true, { root: true });
		taskBasic().then(
			(res) => {
				commit('tasks/SET_BASIC_TASK_LIST', res.data.list, { root: true });
				commit('tasks/SET_GETTING_BASIC_TASK_LIST', false, { root: true });
			},
			() => {
				commit('tasks/SET_GETTING_BASIC_TASK_LIST', false, { root: true });
			}
		);
	},

	// 取得每日任務列表
	GET_DAY_TASK_LIST({ commit }) {
		commit('tasks/SET_GETTING_DAY_TASK_LIST', true, { root: true });
		taskDay().then(
			(res) => {
				commit('tasks/SET_DAY_TASK_LIST', res.data.list, { root: true });
				commit('tasks/SET_GETTING_DAY_TASK_LIST', false, { root: true });
			},
			() => {
				commit('tasks/SET_GETTING_DAY_TASK_LIST', false, { root: true });
			}
		);
	},

	// 取得限時任務列表
	GET_LIMIT_TASK_LIST({ commit }) {
		commit('tasks/SET_GETTING_LIMIT_TASK_LIST', true, { root: true });
		return new Promise((resolve, reject) => {
			taskLimit()
				.then((res) => {
					commit('tasks/SET_LIMIT_TASK_LIST', res.data.list, { root: true });
					commit('tasks/SET_GETTING_LIMIT_TASK_LIST', false, { root: true });
					resolve(res);
				})
				.catch((err) => {
					commit('tasks/SET_GETTING_LIMIT_TASK_LIST', false, { root: true });
					reject(err);
				});
		});
	},

	// 取得充值任務列表
	GET_PAYMENT_TASK_LIST({ commit }) {
		commit('tasks/SET_GETTING_PAYMENT_TASK_LIST', true, { root: true });
		taskPayment().then(
			(res) => {
				commit('tasks/SET_PAYMENT_TASK_LIST', res.data.list, { root: true });
				commit('tasks/SET_GETTING_PAYMENT_TASK_LIST', false, { root: true });
			},
			() => {
				commit('tasks/SET_GETTING_PAYMENT_TASK_LIST', false, { root: true });
			}
		);
	},
};

// Getters
const getters = {
	// 是否正在取得任務列表
	isGettingTaskList: (state) => {
		if (state.isGettingBonusList === true) {
			return true;
		} else if (state.isGettingBasicTaskList === true) {
			return true;
		}else if (state.isGettingDayTaskList === true) {
			return true;
		}else if (state.isGettingPaymentTaskList === true) {
			return true;
		} else {
			return false;
		}
	},

	// 簽到列表
	bonusList: (state) => {
		return state.bonusList || [];
	},

	// 簽到列表是否有值
	containsBonus: (state, getters) => {
		return getters.bonusList.length > 0;
	},

	// 是否包含可簽到日
	containsAvailableBonus: (state, getters) => {
		return getters.bonusList.filter((element) => element.can === 1 && element.received === 0).length > 0;
	},

	// 總簽到日
	bonusDay: (state, getters) => {
		return getters.bonusList.filter((element) => element.received === 1).length;
	},

	// 最後一個可簽到日
	indexOfTheLastBonusCan: (state, getters) => {
		for (var i = getters.bonusList.length - 1; i >= 0; i--) {
			if (getters.bonusList[i]?.can === 1) {
				return i;
			}
		}
		return -1;
	},

	// 新手任務列表
	basicTaskList: (state) => {
		return state.basicTaskList || [];
	},

	// 未完成的新手任務列表
	unfinishedBasicTaskList: (state, getters) => {
		return getters.basicTaskList.filter((element) => element.status === 0 || element.status === 1);
	},

	// 是否有未完成的新手任務
	containsUnfinishedBasicTask: (state, getters) => {
		return getters.unfinishedBasicTaskList.length > 0
	},

	// 每日任務列表
	dayTaskList: (state) => {
		return state.dayTaskList || [];
	},

	// 未完成的每日任務列表
	unfinishedDayTaskList: (state, getters) => {
		return getters.dayTaskList.filter((element) => element.status === 0 || element.status === 1);
	},

	// 是否有未完成的每日任務
	containsUnfinishedDayTask: (state, getter) => {
		return getters.unfinishedDayTaskList.length > 0;
	},

	// 充值任務列表
	paymentTaskList: (state) => {
		return state.paymentTaskList || [];
	},

	// 未完成的充值任務列表
	unfinishedPaymentTaskList: (state, getters) => {
		return getters.paymentTaskList.filter((element) => element.status === 0 || element.status === 1);
	},

	// 是否有未完成的充值任務
	containsUnfinishedPaymentTask: (state, getters) => {
		return getters.unfinishedPaymentTaskList.length > 0;
	},

	// 限時任務列表
	limitTaskList: (state) => {
		return state.limitTaskList || [];
	},

	// 未完成的限時任務列表
	unfinishedLimitTaskList: (state, getters) => {
		return getters.limitTaskList.filter((element) => element.status === 0 || element.status === 1);
	},

	// 是否有未完成的限時任務
	containsUnfinishedLimitTask: (state, getters) => {
		return getters.unfinishedLimitTaskList.length > 0;
	},
};

// Tasks model
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
