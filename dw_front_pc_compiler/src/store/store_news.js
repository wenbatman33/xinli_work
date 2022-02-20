import axios from 'axios';

export default {
  namespaced: true,
  state: {
    newsDialogActive: -1,
    indexNews: [],
  },
  mutations: {
    setNewsDialogActive(state, payload) {
      state.newsDialogActive = payload;
    },
    setIndexNews(state, payload) {
      state.indexNews = payload;
    },
  },
  actions: {
    // API_IndexNews({ commit }, payload) {
    // return axios.get(`/api/FrontendNews/Marquee?platform=${payload.platform}&device=${payload.device}&page=1&per_page=9999`)
    //   .then((res) => {
    //     commit('news/setIndexNews', res.data.data, { root: true });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // },
    API_IndexNews({ commit, rootState }, payload) {
      return new Promise((resolve, reject) => {
        const res = rootState.index.indexJsonData['/api/FrontendNews/Marquee'];
        commit('news/setIndexNews', res.data, { root: true });
        resolve(res);
      });
    },
  },
};
