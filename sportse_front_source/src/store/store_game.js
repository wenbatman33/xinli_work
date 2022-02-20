/*eslint-disable*/
import store from '@/store/store';
import { 
  getHotMatchAPI,
  getMatchForTimeAPI,
  getMatchForNameAPI,
  getMatchDataAPI,
} from '@/api';

export default {
  namespaced: true,
  state: {
    GamesByTime: null,
    GamesByName: null,
    HotGameList: null,
    CurrentGame: null,
    BetSuccessData: null,
    BetLogDetail: null,
  },
  mutations: {
    setGamesByName(state, payload) {
      state.GamesByName = payload;
    },
    setGameByTime(state, payload) {
      state.GamesByTime = payload;
    },
    setHotGameList(state, payload) {
      state.HotGameList = payload;
    },
    setCurrentGame(state, payload) {
      state.CurrentGame = payload;
    },
    setBetSuccessData(state, payload) {
      state.BetSuccessData = payload;
    },
    setBetLogDetail(state, payload) {
      state.BetLogDetail = payload;
    },
  },
  actions: {
    getHotMatch({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getHotMatchAPI().then((res) => {
          commit('game/setHotGameList', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getMatchForName({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getMatchForNameAPI().then((res) => {
          console.log(res);
          commit('game/setGamesByName', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getMatchForTime({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getMatchForTimeAPI(payload).then((res) => {
          commit('game/setGameByTime', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getMatchByID({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getMatchDataAPI(payload).then((res) => {
          commit('game/setCurrentGame', res.data.data[0], { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};
