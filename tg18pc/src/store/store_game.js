import axios from 'axios';
import _ from 'lodash';

export default {
  namespaced: true,
  state: {
    currentGroupId: '',
    currentGroupName: '',
    currentGameType: '',
    currentGameTypeName: '',
    Searching: false,
    brandBannerList: [],
    loginDialogShow: false,
    gameGroup: [],
    gameList: [],
    gameSearchList: [],
    gameTagGroup: [],
    gameTagList: [],
    gamesCollection: [],
    gamesRecently: [],
    gameFilterResult: [],
    gameFilterArray: [],
    gamePopularGameList: [],
    PTJackpot: [],
    PPJackpot: [],
    PGJackpot: [],
    VRGameViewed: false,
  },
  mutations: {
    setCurrentGroupId(state, payload) {
      if (payload.data.data.length > 0) {
        state.currentGroupId = payload.data.data[0].GroupId;
      } else {
        state.currentGroupId = '';
      }
    },
    setCurrentGroupName(state, payload) {
      state.currentGroupName = payload;
    },
    setCurrentGameTypeName(state, payload) {
      state.currentGameTypeName = payload;
    },
    setCurrentGameType(state, payload) {
      state.currentGameType = payload;
    },
    setBrandBannerList(state, payload) {
      state.brandBannerList = payload;
    },
    setloginDialogShow(state) {
      state.loginDialogShow = !state.loginDialogShow;
    },
    setloginDialogHide(state) {
      state.loginDialogShow = false;
    },
    setPopularGameList(state, payload) {
      state.gamePopularGameList = payload;
    },
    setGameListEmpty(state, payload) {
      state.gameList = [];
      this.commit('game/setFilterArray');
    },
    setGameList(state, payload) {
      state.gameList = [];
      if (payload.data.data) {
        state.gameList = payload.data.data;
        this.commit('game/setFilterArray');
      } else {
        state.gameList = [];
        this.commit('game/setFilterArray');
      }
    },
    setGameGroup(state, payload) {
      state.gameGroup = payload;
    },
    setGameSearchList(state, payload) {
      state.gameSearchList = [];
      state.gameSearchList = payload;
      state.Searching = true;
    },
    setCloseSearching(state) {
      state.Searching = false;
    },
    setGameTagGroup(state, payload) {
      state.gameTagGroup = payload;
    },
    setGameTagList(state, payload) {
      state.gameTagList = payload;
    },
    setFilterArray(state) {
      const GameList = _.cloneDeep(state.gameList);
      const FilterConditionArray = _.cloneDeep(state.gameFilterArray);
      if (FilterConditionArray.length < 0 || _.every(_.map(FilterConditionArray, 'FilterCondition'), ['length', 0])) {
        state.gameFilterResult = GameList;
      } else {
        let tempGameList = GameList;
        _.forEach(FilterConditionArray, (value, index) => {
          if (FilterConditionArray[index].FilterCondition.length > 0) {
            tempGameList = _.filter(tempGameList, (obj) => { 
              let intersection = [];
              const tempArray = obj.GameTag.split(',');
              intersection = _.filter(FilterConditionArray[index].FilterCondition, obj => _.indexOf(tempArray, obj) > -1);
              return intersection.length > 0;
            });
          }
        });
        state.gameFilterResult = tempGameList;
      }
    },
    setFilteredTags(state, arr) {
      state.gameFilterArray = arr;
      this.commit('game/setFilterArray');
    },
    setGamesCollection(state, payload) {
      state.gamesCollection = payload;
    },
    setGamesRecently(state, payload) {
      state.gamesRecently = payload;
    },
    setPTJackpot(state, payload) {
      state.PTJackpot = payload;
    },
    setPPJackpot(state, payload) {
      state.PPJackpot = payload;
    },
    setPGJackpot(state, payload) {
      state.PGJackpot = payload;
    },
    setVRGameViewed(state, payload) {
      state.VRGameViewed = payload;
    },
  },
  actions: {
    API_getCurrentGroupId({ commit }, payload) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('game/setCurrentGroupId', res, { root: true });
          return res;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    API_BrandBannerList({ commit }, payload) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/BannerList`, payload)
        .then((res) => {
          commit('game/setBrandBannerList', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_PopularGameList({ commit, rootState }, payload) {
      if (rootState.member.UserId) payload.UserId = rootState.member.UserId;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/PopularGame/`, payload)
        .then((res) => {
          commit('game/setPopularGameList', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_GamesCollectionList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Web/QueryGameRecord/`, payload)
          .then((res) => {
            commit('game/setGamesCollection', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    API_GamesRecentlyList({ commit }, payload) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web/QueryGameRecord/`, payload)
        .then((res) => {
          commit('game/setGamesRecently', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_GameList({ commit, rootState }, payload) {
      if (rootState.member.UserId) payload.UserId = rootState.member.UserId;
      commit('game/setGameListEmpty', '', { root: true });
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameList`, payload)
        .then((res) => {
          commit('game/setGameList', res, { root: true });
          return res;
          // commit('game/setGameList', res.data, {root: true})
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_GameTagGroup({ commit }, payload) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameTagGroup`, payload)
        .then((res) => {
          commit('game/setGameTagGroup', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_GameTagList({ commit }, payload) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameTagList`, payload)
        .then((res) => {
          commit('game/setGameTagList', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GamesJackpot({ commit }) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/Jackpot/Group`)
        .then((res) => {
          const result = res.data.data;
          const PT = result.filter(result => result.GroupName === 'PT');
          const PG = result.filter(result => result.GroupName === 'PG');
          const PP = result.filter(result => result.GroupName === 'PP');
          commit('game/setPTJackpot', PT[0].SumBonus, { root: true });
          commit('game/setPGJackpot', PG[0].SumBonus, { root: true });
          commit('game/setPPJackpot', PP[0].SumBonus, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_GameSearch({ commit, rootState }, payload) {
      if (rootState.member.UserId) payload.UserId = rootState.member.UserId;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameList`, payload)
        .then((res) => {
          commit('game/setGameSearchList', res.data.data, { root: true });
          // commit('game/setGameList', res.data, {root: true})
        })
        .catch((error) => {
          console.log(error);
        });
    },
    CloseSearching({ commit }) {
      commit('game/setCloseSearching', '', { root: true });
    },
    API_GameGroup({ commit }, payload) {
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('game/setGameGroup', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
