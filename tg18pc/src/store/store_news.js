import axios from 'axios';

export default {
  namespaced: true,
  state: {
    newsNotify: false,
    LastNewsTime: '',
    newsGroup: '',
    newsGroup_total_rows: '',
    newsList: '',
    newsList_total_rows: '',
  },
  mutations: {
    getNewsGroup(state, payload) {
      state.newsGroup = payload.data.data_list;
      state.newsGroup_total_rows = payload.total_rows;
    },
    getNewsList(state, payload) {
      state.newsList = payload.data.data_list;
      state.newsList_total_rows = payload.total_rows;
    },
    setLastNewsTime(state, payload) {
      state.LastNewsTime = payload;
    },
    updateNewsNotify(state) {
      state.newsNotify = true;
    },
    readedNewsNotify(state) {
      state.newsNotify = false;
    },
  },
  getters: {},
  actions: {
    NewsGroup({ commit }, payload) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/NewsGroup`, payload)
        .then((res) => {
          commit('news/getNewsGroup', res.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    NewsList({ commit }, payload) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/NewsList`, payload)
        .then((res) => {
          commit('news/setLastNewsTime', res.data.other.LastNewsTime, { root: true });
          commit('news/getNewsList', res.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    CheckLastNewsTime({ commit, state, rootState }) {
      if (!window.localStorage[`tgNewsTime_${rootState.member.UserId}`]) {
        commit('news/updateNewsNotify', '', { root: true });
      } else {
        const currentTime = new Date(window.localStorage[`tgNewsTime_${rootState.member.UserId}`]);
        const LastNewsTime = new Date(state.LastNewsTime);
        if (LastNewsTime > currentTime) {
          commit('news/updateNewsNotify', '', { root: true });
        } else {
          commit('news/readedNewsNotify', '', { root: true });
        }
      }
    },
  },
};
