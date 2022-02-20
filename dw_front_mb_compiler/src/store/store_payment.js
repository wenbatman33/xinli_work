/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    IndexPayment: [],
    ActiveTagName: 'Deposit',
    IndexWallet: {},
    IndexTransactionLogDetail: {},
  },
  mutations: {
    setIndexPayment(state, payload) {
      state.IndexPayment = payload;
    },
    setActiveTagName(state, payload) {
      state.ActiveTagName = payload;
    },
    setIndexWallet(state, payload) {
      state.IndexWallet = payload;
    },
    setIndexTransactionLogDetail(state, payload) {
      state.IndexTransactionLogDetail = payload;
    },
  },
  actions: {
    // 存款方式
    API_IndexPayment({ commit }) {
      const api = `${window.APIHOST}/api/Payment/Deposit`;
      axios.get(api).then((res) => {
        if (res.data.status === 1) {
          commit('payment/setIndexPayment', res.data.data, { root: true });
        }
      }).catch((err) => {
        console.log(err.response);
      });
    },
    API_Deposit({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/Payment/Deposit`;
        axios.post(api, payload).then((res) => {
          if (res.data.status === 1) {
            resolve(res);
          }
        }).catch((err) => {
          reject(err);
        });
      });
    },
    API_Withdraw({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/Payment/Withdraw`;
        axios.post(api, payload).then((res) => {
          if (res.data.status === 1) {
            resolve(res);
          }
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 錢包
    API_MemberWallet({ commit }) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/Member/Wallet`;
        axios.get(api).then((res) => {
          commit('payment/setIndexWallet', res.data.data[0], { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 取得遊戲錢包
    API_MemberWalletDetail({ commit }) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/Member/UserGameCash`;
        axios.get(api).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 更新遊戲錢包
    API_RefreshWalletDetail({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/Member/UserGameCash`;
        axios.post(api, payload).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 一鍵收回
    API_RecyclingAllWallet({ commit }) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/GameWallet/RecyclingAllWallet`;
        axios.get(api).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    // 資金紀錄
    API_IndexTransactionLogTypeList({ commit }) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/Member/TransactionLog/TypeList`;
        axios.get(api).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    API_MemberTransactionLog({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/Member/TransactionLog`;
        axios.get(api, payload).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    API_MemberTransactionLogDetail({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const api = `${window.APIHOST}/api/Member/TransactionLog/Detail`;
        axios.get(api, payload).then((res) => {
          console.log(res);
          commit('payment/setIndexTransactionLogDetail', res.data.data[0], { root: true });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};
