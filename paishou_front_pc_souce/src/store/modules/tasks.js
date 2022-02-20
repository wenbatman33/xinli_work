import Vue from 'vue';
import { taskBasic, taskDay, taskLimit, taskPayment, bonusList } from '@/api';

const state = {
	showTask: false,
	showTaskType: null,
	basicTaskList: [],
	dailyTaskList: [],
	dayTaskList: [],
	limitTaskList: [],
	paymentTaskList: [],
};
const mutations = {
	SHOW_TASK_MODAL: (state, payload) => {
		state.showTask = payload.showTask;
		state.showTaskType = payload.showTaskType;
	},
	SET_BASIC_TASK_LIST: (state, payload) => {
		state.basicTaskList = payload;
	},
	SET_DAILY_TASK_LIST: (state, payload) => {
		state.dailyTaskList = payload;
	},
	SET_DAY_TASK_LIST: (state, payload) => {
		state.dayTaskList = payload;
	},
	SET_LIMIT_TASK_LIST: (state, payload) => {
		state.limitTaskList = payload;
	},
	SET_PAYMENT_TASK_LIST: (state, payload) => {
		state.paymentTaskList = payload;
	},
};

const actions = {
	GET_BASIC_TASK_LIST({ commit }) {
		taskBasic().then((res) => {
			commit('tasks/SET_BASIC_TASK_LIST', res.data.list, { root: true });
		});
	},
	GET_DAILY_TASK_LIST({ commit }, id) {
		return new Promise((resolve, reject) => {
			bonusList({ uid: id })
				.then((res) => {
					commit('tasks/SET_DAILY_TASK_LIST', res.data.list, { root: true });
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	GET_DAY_TASK_LIST({ commit }, id) {
		taskDay({ uid: id }).then((res) => {
			commit('tasks/SET_DAY_TASK_LIST', res.data.list, { root: true });
		});
	},
	GET_LIMIT_TASK_LIST({ commit }) {
		return new Promise((resolve, reject) => {
			taskLimit()
				.then((res) => {
					commit('tasks/SET_LIMIT_TASK_LIST', res.data.list, { root: true });
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				});
		});
	},
	GET_PAYMENT_TASK_LIST({ commit }, id) {
		taskPayment().then((res) => {
			commit('tasks/SET_PAYMENT_TASK_LIST', res.data.list, { root: true });
		});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
