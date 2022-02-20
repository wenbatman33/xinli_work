import axios from 'axios';

const getTaskGameListAPI = () => axios.get('/api/TaskGame/Offline/List');
const getEventDataAPI = payload => axios.get(`/api/Event0002/Frontend/GetEventData?id=${payload}`);
const submitEventDataAPI = payload => axios.post(`/api/Event0002/Frontend/RegEvent`, payload);

export default {
  namespaced: true,
  state: {
    indexBanner: [],
    betGameList: [],
    eventData: [],
    eventFormObject:null,
  },
  getters: {},
  mutations: {
    setIndexBanner(state, payload) {
      state.indexBanner = payload;
    },
    setBetGameList(state, payload) {
      state.betGameList = payload;
    },
    setEventData(state, payload) {
      state.eventData = payload;
    },
    setEventFormObject(state, payload) {
      state.eventFormObject = payload;
    },
  },
  actions: {
    getBetGameList({ commit }) {
      return new Promise((resolve, reject) => {
        getTaskGameListAPI()
          .then((res) => { 
            commit('event_1/setBetGameList', res.data.data, { root: true }); 
            resolve(res);
          })
          .catch((error) => { 
            reject(error); 
          });
      });
    },
    getEventData({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getEventDataAPI(payload)
          .then((res) => { 
            commit('event_1/setEventData', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => { 
            reject(error); 
          });
      });
    },
    API_IndexBanner({ commit }, payload) {
      return axios.get(`/api/FrontendBanner?banner_group_id=${payload.banner_group_id}&device=${payload.device}&platform=${payload.platform}&banner_type=${payload.banner_type}&page=1&per_page=1000`, payload)
        .then((res) => {
          commit('event_1/setIndexBanner', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_SubmitEventDataAPI ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        submitEventDataAPI(payload)
          .then((res) => { 
            resolve(res);
          })
          .catch((error) => { 
            reject(error); 
          });
      });
    },
  },
};
