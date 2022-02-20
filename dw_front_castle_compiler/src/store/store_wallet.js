import axios from 'axios';

export default {
  namespaced: true,
  state: {
    memberWallet: [],
    transactionLogDetail: [],
    paymentDepositList: [],
    transactionLog: [],
    transactionLogTotal: [],
    transactionLogTypeList: [],
    transactionLogStatusList: [],
    transactionLogCurrentType: '',
    bankCodeMappingList: [],
    memberBankCard: [],
    UserGameCash: [],
  },
  mutations: {
    setMemberWallet(state, payload) {
      state.memberWallet = [];
      state.memberWallet = payload;
    },
    setTransactionLogDetail(state, payload) {
      state.transactionLogDetail = [];
      state.transactionLogDetail = payload;
    },
    setPaymentDepositList(state, payload) {
      state.paymentDepositList = payload;
    },
    setTransactionLog(state, payload) {
      state.transactionLog = payload.data;
      state.transactionLogTotal = payload.meta.pagination.total;
    },
    setTransactionLogTypeList(state, payload) {
      state.transactionLogTypeList = payload.data[0];
    },
    setTransactionLogStatusList(state, payload) {
      state.transactionLogStatusList = payload.data[0];
    },
    changeTransactionLogCurrentType(state, payload) {
      state.transactionLogCurrentType = payload;
    },
    setTransactionLogCurrentType(state, payload) {
      state.transactionLogCurrentType = payload;
    },
    setBankCodeMappingList(state, payload) {
      state.bankCodeMappingList = payload;
    },
    setMemberBankCard(state, payload) {
      state.memberBankCard = payload;
    },
    setUserGameCash(state, payload) {
      state.UserGameCash = payload;
    },
    setCompanyGameCash(state, payload) {
      const item = state.UserGameCash[payload.index];
      state.UserGameCash[payload.index] = Object.assign(item, payload.data);
    },
  },
  actions: {
    getMemberWallet({ commit }) { 
      return new Promise((resolve, reject) => {
        axios.get('/api/Member/Wallet')
          .then((res) => {
            commit('wallet/setMemberWallet', res.data.data[0], { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getTransactionLog({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/Member/TransactionLog?type=${payload.type}&status=${payload.status}&page=${payload.page}&per_page=${payload.per_page}&start_time=${payload.start_time}&end_time=${payload.end_time}`)
          .then((res) => {
            commit('wallet/setTransactionLog', res.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getTransactionLogTypeList({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/Member/TransactionLog/TypeList')
          .then((res) => {
            commit('wallet/setTransactionLogTypeList', res.data, { root: true });
            // commit('wallet/setTransactionLogCurrentType', res.data.data[0], { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getTransactionLogStatusList({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/Member/TransactionLog/StatusList')
          .then((res) => {
            commit('wallet/setTransactionLogStatusList', res.data, { root: true });
            // commit('wallet/setTransactionLogCurrentType', res.data.data[0], { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getTransactionLogDetail({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/Member/TransactionLog/Detail?type=${payload.type}&order_id=${payload.orderId}`)
          .then((res) => {
            commit('wallet/setTransactionLogDetail', res.data.data[0], { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 1.先取得當前用戶能使用的存款方式
    getPaymentDepositList({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/Payment/Deposit')
          .then((res) => {
            commit('wallet/setPaymentDepositList', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 存款
    // 2.傳遞 從GET /api/Payment/Deposit 取得的 value 及金額，對用戶進行重導，或顯示對應內容。
    submitPaymentDepositList({ commit }, payload) {
      const vm = this;
      return new Promise((resolve, reject) => {
        axios.post('/api/Payment/Deposit', payload)
          .then((res) => {
            vm.dispatch('wallet/getMemberWallet');
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 提款 POST
    submitPaymentWithdraw({ commit }, payload) {
      const vm = this;
      return new Promise((resolve, reject) => {
        axios.post('/api/Payment/Withdraw', payload)
          .then((res) => {
            vm.dispatch('wallet/getMemberWallet');
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //   取得銀行列表
    getBankCodeMappingList({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/BankCode/MappingList')
          .then((res) => {
            commit('wallet/setBankCodeMappingList', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //  取得會員全部銀行卡
    getMemberBankCard({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/Member/BankCard')
          .then((res) => {
            commit('wallet/setMemberBankCard', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //  取得會員全部銀行卡
    patchMemberBankCard({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`/api/Member/BankCard/${payload.id}`, payload)
          .then((res) => {
            commit('wallet/setMemberBankCard', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    //  一鍵回收遊戲錢包
    recylingAllWallet({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get('/api/GameWallet/RecyclingAllWallet', payload)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getUserGameCash({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/Member/UserGameCash')
          .then((res) => {
            commit('wallet/setUserGameCash', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 更新遊戲單一錢包
    refreshCompanyWallet({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/UserGameCash', payload)
          .then((res) => {
            const result = {
              data: res.data.data[0],
              index: payload.currentIndex,
            };
            commit('wallet/setCompanyGameCash', result, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
