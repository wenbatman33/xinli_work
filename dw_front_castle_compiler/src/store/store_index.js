import axios from 'axios';

// 在.env.production 動態切分夢之城網域
const hostname = window.location.hostname.split(".").splice(1, 2);
const production_MAINDOMAIN = "https://www."+hostname.toString().replace(",", ".");
const production_CDNSITE = "https://static."+hostname.toString().replace(",", ".");

export default {
  namespaced: true,
  state: {
    indexBanner: [],
    loginVideoBanner: '',
    indexNews: [], 
    globalLoading: false,
    MAINDOMAIN: (process.env.VUE_APP_MAINDOMAIN) ? process.env.VUE_APP_MAINDOMAIN: production_MAINDOMAIN,
    CDNSITE: (process.env.VUE_APP_CDNSITE) ? process.env.VUE_APP_CDNSITE: production_CDNSITE,
  },
  getters: {},
  mutations: {
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
    API_IndexBanner({ commit }, payload) {
      return axios.get(`/api/FrontendBanner?banner_group_id=${payload.banner_group_id}&device=${payload.device}&platform=${payload.platform}&page=1&per_page=20`, payload)
        .then((res) => {
          commit('index/setIndexBanner', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_LoginVideoBanner({ commit }, payload) {
      return axios.get(`/api/FrontendBanner?banner_group_id=${payload.banner_group_id}&banner_type=${payload.banner_type}&device=${payload.device}&page=1&per_page=20`, payload)
        .then((res) => {
          commit('index/setLoginVideoBanner', res.data.data[0].bannerLinkPc, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
