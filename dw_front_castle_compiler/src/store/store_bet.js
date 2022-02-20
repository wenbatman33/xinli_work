import axios from 'axios';

const getTaskGameListAPI = () => axios.get('/api/TaskGame/List');
const getTaskSingleGameListAPI = payload => axios.get(`/api/TaskGame/List?game_id=${payload.id}`);
const submitTaskGameBetAPI = payload => axios.post('/api/TaskGame/Bet', payload);
const getTaskGameBetLogAPI = payload => axios.get(`/api/TaskGame/Bet/Log?start_time=${payload.start_time}&end_time=${payload.end_time}&win=${payload.win}`);

export default {
  namespaced: true,
  state: {
    betGameList: [],
    singleGameData: [],
    betGameBetLog: [],
  },
  mutations: {
    setBetGameList(state, payload) {
      state.betGameList = payload;
    },
    setSingleGameData(state, payload) {
      state.singleGameData = payload;
    },
    setBetGameBetLogData(state, payload) {
      state.betGameBetLog = payload;
    },
  },
  actions: {
    getBetGameList({ commit }) {
      return new Promise((resolve, reject) => {
        getTaskGameListAPI()
          .then((res) => { 
            commit('bet/setBetGameList', res.data.data, { root: true }); 
            resolve(res);
          })
          .catch((error) => { 
            reject(error); 
          });
      });
    },
    getSingleBetGameList({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getTaskSingleGameListAPI(payload)
          .then((res) => { 
            commit('bet/setSingleGameData', res.data.data, { root: true }); 
            resolve(res);
          })
          .catch((error) => { 
            reject(error); 
          });
      });
    },
    submitTaskGameBet({ commit }, payload) {
      return new Promise((resolve, reject) => {
        submitTaskGameBetAPI(payload)
          .then((res) => { 
            resolve(res);
          })
          .catch((error) => { 
            reject(error); 
          });
      });
    },
    getTaskGameBetLog({ commit }, payload) {
      return new Promise((resolve, reject) => {
        getTaskGameBetLogAPI(payload)
          .then((res) => { 
            commit('bet/setBetGameBetLogData', res.data.data, { root: true }); 
            resolve(res);
          })
          .catch((error) => { 
            reject(error); 
          });
      });
    },
  },
};
