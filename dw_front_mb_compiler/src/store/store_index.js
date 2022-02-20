/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';
import router from '../router';

// footer card banner news loading sidebar
export default {
  namespaced: true,
  state: {
    indexInit: false,
    indexJsonData: '',
    Login: false,
    DarkMode: true,
    FooterView: 'home',
    CardOpen: false,
    CardName: '',
    Loading: false,
    HomeBannerDisplay: true,
    IndexBanners: [],
    IndexMarquee: [],
    IndexNews: [],
    News: [],
    AllNews: false,
    ActiveTag: 0,
  },
  mutations: {
    setIndexInit(state, payload) {
      state.indexInit = true;
      state.indexJsonData = payload;
    },
    // login
    setLogin(state, status) {
      state.Login = status;
    },
    // dark_mode
    setDarkMode(state, status) {
      state.DarkMode = status;
    },
    // footer
    setFooterView(state, view) {
      state.FooterView = view;
    },
    // card
    setStateCardOpen(state, value) {
      state.CardOpen = value;
    },
    setStateCardName(state, payload) {
      state.CardName = payload;
    },
    setLoading(state, payload) {
      state.Loading = payload;
    },
    // banner
    setHomeBannerDisplay(state, value) {
      state.HomeBannerDisplay = value;
    },
    setIndexBanners(state, payload) {
      state.IndexBanners = payload;
    },
    // news
    setIndexMarquee(state, payload) {
      state.IndexMarquee = payload;
    },
    setIndexNews(state, payload) {
      state.IndexNews = payload;
    },
    setNews(state, payload) {
      state.News = payload;
    },
    setAllNews(state, payload) {
      state.AllNews = payload;
    },
    // sidebar
    setActiveTag(state, value) {
      state.ActiveTag = value;
    },
  },
  actions: {
    API_IndexInit({ commit }) {
      const vm = this;
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/Home/mobile`;
        axios.get(api).then((res) => {
          commit('index/setIndexInit', res.data.data, { root: true });
          vm.dispatch('index/API_IndexBanner');
          vm.dispatch('index/API_IndexMarquee');
          vm.dispatch('games/API_IndexGameTypeData');
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // banner
    API_IndexBanner({ commit, rootState }, payload) {
      return new Promise((resolve, reject) => {
        const res = rootState.index.indexJsonData['/api/FrontendBanner'];
        commit('index/setIndexBanners', res.data, { root: true });
        resolve(res);
      });
    },
    // API_IndexBanner({ commit }, payload) {
    //   return new Promise((resolve, reject) => {
    //     const api = `${window.APIHOST}/api/FrontendBanner`;
    //     axios.get(api, payload).then((res) => {
    //       commit('index/setIndexBanners', res.data.data, { root: true });
    //       resolve(res);
    //     }).catch((err) => {
    //       reject(err);
    //     });
    //   });
    // },
    // news
    API_IndexMarquee({ commit, rootState }, payload) {
      return new Promise((resolve, reject) => {
        const res = rootState.index.indexJsonData['/api/FrontendNews/Marquee'];
        commit('index/setIndexMarquee', res.data, { root: true });
        resolve(res);
      });
    },
    // API_IndexMarquee({ commit }, payload) {
    //   const api = `${window.APIHOST}/api/FrontendNews/Marquee`;
    //   axios.get(api, payload).then((res) => {
    //     if (res.data.status === 1) {
    //       commit('index/setIndexMarquee', res.data.data, { root: true });
    //     }
    //   }).catch((error) => {
    //     console.log(error.response);
    //   });
    // },
    API_IndexNews({ commit }, payload) {
      const api = `${window.APIHOST}/api/FrontendNews`;
      axios.get(api, payload).then((res) => {
        if (res.data.status === 1) {
          commit('index/setIndexNews', res.data.data, { root: true });
        }
      }).catch((error) => {
        console.log(error.response);
      });
    },
    API_News({ commit }, id) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/FrontendNews/${id}`;
        axios.get(api).then((res) => {
          commit('index/setNews', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // vip
    API_IndexVip({ commit }) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/Vip`;
        axios.get(api).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    API_vipStatement({ commit }) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/Vip/Statement`;
        axios.get(api).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // API_Vip({ commit }, id) {
    //   return new Promise((resolve, reject) => {
    //     const api = `${window.APIHOST}/api/Vip/${id}`;
    //     axios.get(api).then((res) => {
    //       resolve(res);
    //     }).catch((err) => {
    //       reject(err);
    //     });
    //   });
    // },
    // card
    setCardOpen({ commit }, value) {
      commit('index/setStateCardOpen', value, { root: true });
      if (value === false) {
        // 刪除URL query
        const query = Object.assign({}, router.currentRoute.query);
        delete query.card;
        delete query.type;
        router.replace({ query }).catch((err) => {});
        commit('index/setStateCardName', '', { root: true });
      }
    },
    setCardName({ commit }, payload) {
      if (!window.localStorage.JWT_TOKEN) {
        if (payload.card === 'bl_News' || payload.card === 'bl_popPromotion') {
          commit('index/setStateCardName', payload.card, { root: true });
          router.push({ path: router.history.current.fullPath, query: payload }).catch((err) => {});
        } else {
          this.dispatch('index/setCardOpen', false);
          router.push({ path: '/login' }).catch((err) => {});
        }
      } else {
        commit('index/setStateCardName', payload.card, { root: true });
        router.push({ path: router.history.current.fullPath, query: payload }).catch((err) => {});
      }
    },
  },
};
