/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    IndexPromotion: [],
    PromotionDetail: [],
    IndexMyPromotionFinished: [],
    IndexMyPromotionUnfinished: [],
    MyPromotionDetail: [],
    MyPromotionDetailShow: [],
  },
  getters: {
    PromotionMethod(state) {
      return state.PromotionDetail[0] && state.PromotionDetail[0].promotionApplyMethod;
    },
    PromotionMode(state) {
      return state.PromotionDetail[0] && state.PromotionDetail[0].promotionApplyMode;
    },
    PromotionCycle(state) {
      return state.PromotionDetail[0] && state.PromotionDetail[0].promotionCycle;
    },
  },
  mutations: {
    // promotion
    setIndexPromotion(state, payload) {
      state.IndexPromotion = payload;
    },
    setPromotionDetail(state, payload) {
      state.PromotionDetail = payload;
    },
    setActivePromotion(state, payload) {
      state.ActivePromotion = payload;
    },
    // mypromotion
    setIndexMyPromotionFinished(state, payload) {
      state.IndexMyPromotionFinished = payload;
    },
    setIndexMyPromotionUnfinished(state, payload) {
      state.IndexMyPromotionUnfinished = payload;
    },
    setMyPromotionDetail(state, payload) {
      state.MyPromotionDetail = payload;
    },
    setMyPromotionDetailShow(state, payload) {
      state.MyPromotionDetailShow = payload;
    },
  },
  actions: {
    // promotion
    API_IndexPromotion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/FrontendPromotion`;
        axios.get(api, payload).then((res) => {
          commit('promotion/setIndexPromotion', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    API_PromotionDetail({ commit }, id) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/FrontendPromotion/${id}`;
        axios.get(api).then((res) => {
          commit('promotion/setPromotionDetail', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    API_ApplyPromotion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/FrontendPromotion/Apply`;
        axios.post(api, payload).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    API_GiveUpPromotion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/FrontendPromotion/GiveUp`;
        axios.post(api, payload).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // myPromotion
    API_IndexMyPromotion({ commit }, status = 0) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/MyPromotion?status=${status}`;
        axios.get(api).then((res) => {
          if (status === 0) {
            commit('promotion/setIndexMyPromotionUnfinished', res.data.data, { root: true });
          } else {
            commit('promotion/setIndexMyPromotionFinished', res.data.data, { root: true });
          }
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    API_MyPromotionDetail({ commit }, id) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/MyPromotionDetail?promotion_id=${id}`;
        axios.get(api).then((res) => {
          commit('promotion/setMyPromotionDetail', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    API_PromotionDetailShow({ commit }, id) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/promotionDetailShow/${id}`;
        axios.get(api).then((res) => {
          commit('promotion/setMyPromotionDetailShow', res.data.data, { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 領取優惠
    API_MyPromotionBonus({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/MyPromotionBonus`;
        axios.post(api, payload).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};
