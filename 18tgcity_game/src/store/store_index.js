import axios from 'axios';

export default {
  namespaced: true,
  state: {
    AllProvider: [],
    slotProvider: [],
    fishingProvider: [],
    boardProvider: [],
  },
  getters: {},
  mutations: {
    setAllProvider(state) {
      const tempArray = [];
      const arr1 = state.slotProvider;
      const arr2 = state.fishingProvider;
      const arr3 = state.boardProvider;
      state.AllProvider = tempArray.concat(arr1, arr2, arr3);
    },
    setSlotProvider(state, payload) {
      state.slotProvider = [];
      state.slotProvider = payload;
      state.slotProviderIndexName = payload[0].GroupName;
    },
    setFishingProvider(state, payload) {
      state.fishingProvider = [];
      state.fishingProvider = payload;
      state.fishingroviderIndexName = payload[0].GroupName;
    },
    setBoardProvider(state, payload) {
      state.boardProvider = [];
      state.boardProvider = payload;
      state.boardProviderIndexName = payload[0].GroupName;
    },
  },
  actions: {
    API_SlotProvider({ commit }) {
      const payload = {};
      payload.GameType = 1;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('index/setSlotProvider', res.data.data, { root: true });
          return res;
        })
        .catch(error => error);
    },
    API_FishingProvider({ commit }) {
      const payload = {};
      payload.GameType = 2;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('index/setFishingProvider', res.data.data, { root: true });
          return res;
        })
        .catch(error => error);
    },
    API_BoardProvider({ commit }) {
      const payload = {};
      payload.GameType = 3;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('index/setBoardProvider', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
