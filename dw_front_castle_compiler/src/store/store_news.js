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
    API_IndexNews({ commit }, payload) {
      return axios.get('/api/FrontendNews/Marquee', payload)
        .then((res) => {
          commit('news/setIndexNews', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
