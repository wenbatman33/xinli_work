/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import router from '../router';

let newWindow;
export default {
  namespaced: true,
  state: {
    // default = 0, search =1, filter = 2
    GamePageType: 0,
    IndexGameTypeData: [],
    IndexGameTagList: [],
    IndexNewGameList: [],
    IndexHotGameList: [],
    IndexHavePlayGameList: [],
    IndexLikeGameList: [],
    // 遊戲類別
    GameType: {
      gameGroups: {
        data: [],
      },
    },
  },
  mutations: {
    setGamePageType(state, payload) {
      state.GamePageType = payload;
    },
    setIndexGameTypeData(state, payload) {
      state.IndexGameTypeData = payload;
    },
    setIndexGameTagList(state, payload) {
      state.IndexGameTagList = payload;
    },
    setIndexNewGameList(state, payload) {
      state.IndexNewGameList = payload;
    },
    setIndexHotGameList(state, payload) {
      state.IndexHotGameList = payload;
    },
    setIndexHavePlayGameList(state, payload) {
      state.IndexHavePlayGameList = payload;
    },
    setIndexLikeGameList(state, payload) {
      state.IndexLikeGameList = payload;
    },
    setGameType(state, payload) {
      state.GameType = payload;
    },
  },
  getters: {
    GameGroup(state) {
      return state.GameType.gameGroups.data;
    },
  },
  actions: {
    GameLogin({ commit, rootState }, payload) {
      // 廠商是否維護
      if (payload.gameInfo.gameGroupStatus === 2) {
        Message({ message: '游戏维护中，请稍后再进入', type: 'error' });
      // 是否可以進入遊戲列表大廳
      } else if (payload.gameInfo.gamePlayMode === 2) {
        router.push({
          name: 'games',
          query: {
            group: payload.gameType.id,
            groupid: payload.gameInfo.id,
          },
        });
      // 是否登入
      } else if (!window.localStorage.JWT_TOKEN || !window.localStorage.Finger) {
        const gameData = JSON.stringify(payload);
        window.localStorage.setItem('tempGameData', gameData);
        Message({ message: '請先登入', type: 'error' });
        router.push('/login');
      // 錢包內錢是否足夠
      } else if (
        rootState.payment.IndexWallet.cash <= 0
        && rootState.payment.IndexWallet.gameCash <= 0
      ) {
        this.dispatch('games/GameLoginConfirm', payload);
      } else {
      // 進入遊戲
        this.dispatch('games/GameLoginAndPlay', payload);
        window._paq.push(['trackEvent', '进入游戏', '点击', payload.gameName]);
      }
    },
    GameLoginConfirm({ commit }, payload) {
      MessageBox.confirm('是否要先进行存款再进入游戏，记得存款入帐后请重新进入游戏唷', '贴心小提醒', {
        distinguishCancelAndClose: true,
        confirmButtonText: '进游戏',
        cancelButtonText: '先存款',
        center: true,
      }).then(() => {
        // 进游戏 => 強制登入
        payload.loginForm.params.force_login = 1;
        this.dispatch('games/GameLoginAndPlay', payload);
      }).catch((action) => {
        // 先存款 => 前往存款卡片
        if (action === 'cancel') {
          router.push({
            path: router.history.current.fullPath,
            query: {
              card: 'bl_Transaction',
              type: 'deposit',
            },
          });
        }
      });
    },
    GameLoginAndPlay({ commit }, payload) {
      // 需要針對 UCBrowser 360HD QQBrowserHD做例外排除
      if (payload.gameInfo.gameOpenMode === 2
        && this.state.userSetting.UserBrowser !== 'UCBrowser'
        && this.state.userSetting.UserBrowser !== '360HD'
        && this.state.userSetting.UserBrowser !== 'QQBrowserHD'
        && this.state.userSetting.UserBrowser !== 'IE') {
        newWindow = window.open('/loading.html', payload.gameInfo.gameCompanyTag);
      }
      const api = `${window.GAMEAPIHOST}/api/Game/login`;
      axios.get(api, payload.loginForm).then((res) => {
        // 需要跳出確認視窗
        if (res.data.data[0].openConfirm === 1) {
          this.dispatch('games/GameLoginConfirm', payload);
          // 需要針對 UCBrowser 360HD QQBrowserHD做例外排除
          if (this.state.userSetting.UserBrowser !== 'UCBrowser'
            && this.state.userSetting.UserBrowser !== '360HD'
            && this.state.userSetting.UserBrowser !== 'QQBrowserHD'
            && this.state.userSetting.UserBrowser !== 'IE') {
            newWindow.close();
          }
        } else if (res.data.data[0].gameOpenMode === 1) {
          router.push({ name: 'bet', query: { path: res.data.data[0].launchGameUrl } });
        } else if (res.data.data[0].gameOpenMode === 2) {
          // 需要針對 UCBrowser 360HD QQBrowserHD做例外排除
          if (this.state.userSetting.UserBrowser === 'UCBrowser'
            || this.state.userSetting.UserBrowser === '360HD'
            || this.state.userSetting.UserBrowser === 'QQBrowserHD'
            || this.state.userSetting.UserBrowser === 'IE') {
            window.location.href = res.data.data[0].launchGameUrl;
          } else {
            newWindow.location.href = res.data.data[0].launchGameUrl;
          }
        }
      }).catch((err) => {
        if (this.state.userSetting.UserBrowser !== 'UCBrowser' 
            && this.state.userSetting.UserBrowser !== 'IE') {
          newWindow.close();
        }
        Message({ message: err.response.data.message, type: 'error' });
      });
    },
    // 回收錢包錢
    API_RecyclingAllWallet({ commit }) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/GameWallet/RecyclingAllWallet`;
        axios.get(api).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 遊戲類別與廠商入口
    API_IndexGameTypeData({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        const res = rootState.index.indexJsonData['/api/GameType/GetGameTypeData'];
        commit('games/setIndexGameTypeData', res.data, { root: true });
        resolve(res);
      });
    },
    // API_IndexGameTypeData({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     const api = `${window.APIHOST}/api/GameType/GetGameTypeData`;
    //     axios.get(api).then((res) => {
    //       commit('games/setIndexGameTypeData', res.data.data, { root: true });
    //       resolve(res);
    //     }).catch((err) => {
    //       reject(err);
    //     });
    //   });
    // },
    // 遊戲標籤
    API_IndexGameTagList({ commit }) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/GameTagList/GetGameTagList`;
        axios.get(api).then((res) => {
          commit('games/setIndexGameTagList', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 最新遊戲
    API_IndexNewGameList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/GameList/GetNewGameList`;
        axios.get(api, payload).then((res) => {
          commit('games/setIndexNewGameList', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 熱門推薦遊戲
    API_IndexHotGameList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/GameList/GetHotGameList`;
        axios.get(api, payload).then((res) => {
          commit('games/setIndexHotGameList', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 曾經玩過的遊戲
    API_IndexHavePlayGameList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/GameList/GetHavePlayGameList`;
        axios.get(api, payload).then((res) => {
          commit('games/setIndexHavePlayGameList', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 我的最愛
    API_IndexLikeGameList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/GameList/GetLikeGameList`;
        axios.get(api, payload).then((res) => {
          commit('games/setIndexLikeGameList', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    API_AddGameLikeRecord({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/GameLikeRecord`;
        axios.post(api, payload).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    API_DeleteGameLikeRecord({ commit }, gameId) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/GameLikeRecord/${gameId}`;
        axios.delete(api).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};
