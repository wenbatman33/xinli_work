import axios from 'axios';

export default {
  namespaced: true,
  state: {
    promotionsGroup: '',
    promotionsList: '',
    DialogTitle: '',
    DialogMessage: '',
  },
  mutations: {
    getPromotionsGroup(state, payload) {
      state.promotionsGroup = payload;
    },
    getPromotionsList(state, payload) {
      state.promotionsList = payload;
    },
    setDialogTitle(state, payload) {
      state.DialogTitle = payload;
    },
    setDialogMessage(state, payload) {
      state.DialogMessage = payload;
    },
  },
  actions: {
    PromotionsGroup({ commit }, payload) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/PromotionsGroup`, payload)
        .then((res) => {
          commit('promotion/getPromotionsGroup', res.data.data, { root: true });
          return res;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
    PromotionsList({ commit }, payload) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/PromotionsList`, payload)
        .then((res) => {
          commit('promotion/getPromotionsList', res.data.data, { root: true });
          return res;
        })
        .catch((error) => {
          console.log(error);
          return error;
        });
    },
  },
};
