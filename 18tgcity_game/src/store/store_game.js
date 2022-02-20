import axios from 'axios';
import _ from 'lodash';

export default {
  namespaced: true,
  state: {
    gameGroup: [],
  },
  mutations: {
    setGameGroup(state, payload) {
      state.gameGroup = payload;
    },
  },
  actions: {
    API_GameGroup({ commit }, payload) {
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GameGroup`, payload)
        .then((res) => {
          commit('game/setGameGroup', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
