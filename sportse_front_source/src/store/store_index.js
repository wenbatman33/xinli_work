import { 
  getBannerAPI,
  getBannerByIdAPI,
  getNewsAPI,
  getNewsByIdAPI,
  getNewsTypeAPI,
} from '@/api';

export default {
  namespaced: true,
  state: {
    BannerList: [],
    CurrentBanner: '',
    NewsList: [],
    NewsTypeList: [],
    CurrentNews: '',
  },
  mutations: {
    setBannerList(state, payload) {
      state.BannerList = payload;
    },
    setCurrentBanner(state, payload) {
      state.CurrentBanner = payload;
    },
    setNewsList(state, payload) {
      state.NewsList = payload;
    },
    setNewsTypeList(state, payload) {
      state.NewsTypeList = payload;
    },
    setCurrentNews(state, payload) {
      state.CurrentNews = payload;
    },
  },
  actions: {
    getBannerList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getBannerAPI().then((res) => {
          commit('index/setBannerList', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getCurrentBanner({ commit }, id) {
      return new Promise((resolve, reject) => {
        getBannerByIdAPI(id).then((res) => {
          commit('index/setCurrentBanner', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getNewsList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getNewsAPI().then((res) => {
          commit('index/setNewsList', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getNewsTypeList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getNewsTypeAPI().then((res) => {
          commit('index/setNewsTypeList', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    getCurrentNews({ commit }, id) {
      return new Promise((resolve, reject) => {
        getNewsByIdAPI(id).then((res) => {
          commit('index/setCurrentNews', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};
