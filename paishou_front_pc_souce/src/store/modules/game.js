import Vue from 'vue';
import store from '@/store';
import { levelList, login, getUserinfo, inboxDataList, backpack, giftlist, checkLive } from '@/api';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';
import router from '@/router';
import io from 'socket.io-client';

export default {
	namespaced: true,
	state: {
		showGameModal: false,
		currentGame: null,
	},
	mutations: {
		SHOW_GAME_MODAL: (state, payload) => {
			state.showGameModal = true;
		},
		CLOSE_GAME_MODAL: (state, payload) => {
			state.showGameModal = false;
		},
		SET_CURRENT_GAME: (state, payload) => {
			state.currentGame = payload;
		},
	},
	actions: {},
};
