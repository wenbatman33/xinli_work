import axios from 'axios';
import router from '@/router';
import { MessageBox, Message } from 'element-ui';

let newWindow;
export default {
  namespaced: true,
  state: {
    gameTypeData: [],
    gameRecommendData: [],
    gameList: [],
    gameListFilter: [],
    gameTagList: [],
    gameBanner: [],
  },
  mutations: {
    setGameTypeData(state, payload) {
      state.gameTypeData = payload;
    },
    setGameRecommendData(state, payload) {
      state.gameRecommendData = payload;
    },
    setGameList(state, payload) {
      state.gameList = payload;
    },
    setGameTagList(state, payload) {
      state.gameTagList = payload;
    },
    setGameBanner(state, payload) {
      state.gameBanner = payload;
    },
  },
  actions: {
    getGameTypeData({ commit, rootState }, payload) {
      return new Promise((resolve, reject) => {
        const res = rootState.index.indexJsonData['/api/GameType/GetGameTypeData'];
        commit('game/setGameTypeData', res.data, { root: true });
        resolve(res);
      });
    },
    // /api/GameType/GetGameRecommendData
    getGameRecommendData({ commit, rootState }) {
      return new Promise((resolve, reject) => {
        const res = rootState.index.indexJsonData['/api/GameType/GetGameRecommendData'];
        commit('game/setGameRecommendData', res.data, { root: true });
        resolve(res);
      });
    },
    // getGameTypeData({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     axios.get('/api/GameType/GetGameTypeData')
    //       .then((res) => {
    //         // console.log(res.data.data);
    //         commit('game/setGameTypeData', res.data.data, { root: true });
    //         resolve(res);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // },
    // getGameRecommendData({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     axios.get('/api/GameType/GetGameRecommendData')
    //       .then((res) => {
    //         // console.log(res.data.data);
    //         commit('game/setGameRecommendData', res.data.data, { root: true });
    //         resolve(res);
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // },
    getGameTagList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get('/api/GameTagList/GetGameTagList')
          .then((res) => {
            commit('game/setGameTagList', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getGameList({ commit }, payload) {
      commit('game/setGameList', [], { root: true });
      return new Promise((resolve, reject) => {
        axios.get(`/api/GameList/GetNewGameList?device=1&game_group_id=${payload.id}&keyword=${(payload.keyword) ? payload.keyword : ''}`)
          .then((res) => {
            commit('game/setGameList', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getHotGameList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/GameList/GetHotGameList?device=1&game_group_id=${payload.id}`)
          .then((res) => {
            commit('game/setGameList', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getHavePlayGameList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/GameList/GetHavePlayGameList?device=1&game_group_id=${payload.id}`)
          .then((res) => {
            commit('game/setGameList', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getLikeGameList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/GameList/GetLikeGameList?device=1&game_group_id=${payload.id}`)
          .then((res) => {
            commit('game/setGameList', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    gameLogin({ commit, rootState }, payload) {
      const vm = this;
      // matomo  
      window._paq.push(['trackEvent', 'Game', payload.subItem.id, payload.subItem.gameGroupName]);
      // 檢查廠商維護狀態的處理
      if (payload.subItem.gameGroupStatus === 2) {
        Message({ message: '游戏正在维护中', type: 'error' });
      } else if (payload.subItem.gamePlayMode === 2) {
        // 進入遊戲列表
        router.push({ path: `/games?group=${payload.item.id}&groupid=${payload.subItem.id}` });
      } else if (rootState.member.memberLogined === false) {
        // 如果未登入時 跳出登入燈箱
        
        vm.dispatch('dialog/openCommandDialog', { component: 'bl_Login' });
      } else if (rootState.wallet.memberWallet.cash <= 0 && rootState.wallet.memberWallet.gameCash <= 0) {
        // 如果中心錢包及遊戲錢包沒有錢時 
        vm.dispatch('game/userNoCash', payload);
      } else {
        payload.force_login |= 0;
        vm.dispatch('game/gotoAndPlay', payload);
      }
    },
    gotoAndPlay({ commit, rootState }, payload) {
      const vm = this;
      payload.game_id |= 0;
      // device 裝置(1:web,2:手機)
      // game_group_id 遊戲廠商流水號 由 subItem.id 帶過來
      // game_id 遊戲流水號
      // force_login 強制登入
      if (payload.subItem.gameOpenMode === 2 && 
        this.state.userSetting.UserBrowser !== 'UCBrowser' && 
        this.state.userSetting.UserBrowser !== 'IE') {
        newWindow = window.open('/loading.html', payload.subItem.id);
      }
      axios({
        method: 'get',
        url: `${window.GAMEAPIHOST}/api/Game/login?device=1&game_group_id=${payload.subItem.id}&game_id=${payload.game_id}&force_login=${payload.force_login}`,
        baseURL: '',
      })
        .then((res) => {
          if (res.data.data[0].openConfirm === 1) {
            // 如果中心錢包及遊戲錢包沒有錢時 
            vm.dispatch('game/userNoCash', payload);
            if (this.state.userSetting.UserBrowser !== 'UCBrowser' && 
                this.state.userSetting.UserBrowser !== 'IE') {
              newWindow.close();
            }
          } else if (res.data.data[0].gameOpenMode === 1) {
            // 開啟iFrame 模式
            router.push({ name: 'bet', query: { path: res.data.data[0].launchGameUrl } });
          } else if (res.data.data[0].gameOpenMode === 2) {
            // 判斷瀏覽器們
            if (this.state.userSetting.UserBrowser === 'UCBrowser' || this.state.userSetting.UserBrowser === 'IE') {
              window.location.href = res.data.data[0].launchGameUrl;
            } else {
              newWindow.location.href = res.data.data[0].launchGameUrl;
            }
          }
        })
        .catch((error) => {
          if (this.state.userSetting.UserBrowser !== 'UCBrowser' && 
              this.state.userSetting.UserBrowser !== 'IE') {
            if (newWindow) newWindow.close();
          }
          console.log(error);
        });
    },
    userNoCash({ commit }, payload) {
      const vm = this;
      // 如果中心錢包及遊戲錢包沒有錢時 
      MessageBox.confirm('是否要先进行存款再进入游戏，记得存款入帐后请重新进入游戏唷', '贴心小提醒', {
        distinguishCancelAndClose: true,
        confirmButtonText: '进游戏',
        cancelButtonText: '先存款',
        center: true,
      }).then(() => {
        // 进游戏 => 強制登入
        payload.force_login = 1;
        vm.dispatch('game/gotoAndPlay', payload);
      }).catch((action) => {
        // 先存款 => 前往存款卡片
        if (action === 'cancel') {
          router.push({ path: router.history.current.fullPath, query: { card: 'bl_Transaction', type: 'deposit' } });
        }
      });
    },
    API_GameBanner({ commit }, payload) {
      return axios.get(`/api/FrontendBanner?banner_group_id=${payload.banner_group_id}&device=${payload.device}`, payload)
        .then((res) => {
          commit('game/setGameBanner', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
