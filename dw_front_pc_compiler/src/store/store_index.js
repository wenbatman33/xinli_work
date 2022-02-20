import axios from 'axios';

export default {
  namespaced: true,
  state: {
    indexInit: false,
    indexJsonData: '',
    indexBanner: [],
    loginVideoBanner: '',
    indexNews: [], 
    globalLoading: false,
  },
  getters: {},
  mutations: {
    setIndexInit(state, payload) {
      state.indexInit = true;
      state.indexJsonData = payload;
    },
    setIndexBanner(state, payload) {
      state.indexBanner = payload;
    },
    setLoginVideoBanner(state, payload) {
      state.loginVideoBanner = payload;
    },
    setIndexNews(state, payload) {
      state.indexNews = payload;
    },
    openGlobalLoading(state) {
      state.globalLoading = true;
    },
    closeGlobalLoading(state) {
      state.globalLoading = false;
    },
  },
  actions: {
    API_IndexInit({ commit }) {
      const vm = this;
      return axios.get('/api/Home/web')
        .then((res) => {
          commit('index/setIndexInit', res.data.data, { root: true });
          vm.dispatch('index/API_IndexBanner');
          vm.dispatch('news/API_IndexNews');
          vm.dispatch('game/getGameTypeData');
          vm.dispatch('game/getGameRecommendData');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_IndexBanner({ commit, rootState }, payload) {
      return new Promise((resolve, reject) => {
        const res = rootState.index.indexJsonData['/api/FrontendBanner'];
        commit('index/setIndexBanner', res.data, { root: true });
        resolve(res);
      });
    },
    API_LoginVideoBanner({ commit }, payload) {
      return axios.get(`/api/FrontendBanner?banner_group_id=${payload.banner_group_id}&banner_type=${payload.banner_type}&device=${payload.device}&page=1&per_page=20`, payload)
        .then((res) => {
          commit('index/setLoginVideoBanner', res.data.data[0].bannerVideoPc, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setInitData({ commit }, payload) {
      // console.log(payload);
    },
  },
};
