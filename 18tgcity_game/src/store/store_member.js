import axios from 'axios';
import jwt from 'jwt-simple';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
import Fingerprint2 from 'fingerprintjs2';
import hash from 'object-hash';

let Finger = '';
new Fingerprint2().get((result, components) => {
  Finger = hash(components);
});
export default {
  namespaced: true,
  state: {
    UserName: '',
    UserId: '',
    MemberLogined: false,
    MemberRegisterErrorMessage: '',
    MemberLoginErrorMessage: '',
    MemberDataUpdateErrorMessage: '',
    MemberData: {},
    MemberBankList: {},
    MemberInboxList: {},
    MemberWallet: {},
    MemberOfferCount: {
      bonusCnt: '',
      returnCnt: '',
      rescueCnt: '',
      totalCnt: '',
    },
    MemberGameWallet: {},
    MemberGameWalletCommon: {},
    MemberGameWalletNormal: {},
    MemberRecords: {
      MemberCashLog: {},
      MemberCashOther: {},
      MemberDepositLog: {},
      MemberDepositOther: {},
      MemberWithdrawLog: {},
      MemberWithdrawOther: {},
      MemberTransLog: {},
      MemberTransOther: {},
      UserBetReport: {},
      UserGameBetReport: {},
      UserGameBetReportOther: {},
    },
    MemberBonus: {
      MemberReturnLog: {},
      MemberReturnOther: {},
      MemberRescueLog: {},
      MemberRescueOther: {},
      MemberBonusLog: {},
      MemberBonusOther: {},
    },
  },
  mutations: {
    MemberIsLogIn(state, palyload) {
      state.MemberLogined = true;
      state.UserName = palyload.username;
      state.UserId = palyload.userid;
    },
    MemberIsLogOut(state) {
      state.UserName = '';
      state.UserId = '';
      state.MemberLogined = false;
      state.MemberData = {};
    },
    loginError(state) {
      state.MemberLogined = false;
    },
    setAdminMemberData(state, payload) {
      state.MemberData = payload;
    },
    setMemberBankList(state, payload) {
      state.MemberBankList = payload;
    },
    setMemberRegisterErrorMessage(state, payload) {
      state.MemberRegisterErrorMessage = payload;
    },
    setMemberLoginErrorMessage(state, payload) {
      state.MemberLoginErrorMessage = payload;
    },
    setMemberDataUpdateErrorMessage(state, payload) {
      state.MemberDataUpdateErrorMessage = payload;
    },
    setMemberInboxList(state, payload) {
      state.MemberInboxList = payload;
    },
    setMemberInboxD(state, payload) {
      state.MemberInboxList = payload;
    },
    setUserWalletInfo(state, payload) {
      state.MemberWallet = payload;
    },
    setUserOfferCount(state, payload) {
      state.MemberOfferCount = payload;
    },
    setUserBetReport(state, payload) {
      state.MemberRecords.UserBetReport = payload.data;
    },
    setUserGameBetReport(state, payload) {
      state.MemberRecords.UserGameBetReport = payload.data;
      state.MemberRecords.UserGameBetReportOther = payload.other;
    },
    setMemberCashLog(state, payload) {
      state.MemberRecords.MemberCashLog = payload.data;
      state.MemberRecords.MemberCashOther = payload.other;
    },
    setMemberDepositLog(state, payload) {
      state.MemberRecords.MemberDepositLog = payload.data;
      state.MemberRecords.MemberDepositOther = payload.other;
    },
    setMemberWithdrawLog(state, payload) {
      state.MemberRecords.MemberWithdrawLog = payload.data;
      state.MemberRecords.MemberWithdrawOther = payload.other;
    },
    setMemberTransLog(state, payload) {
      state.MemberRecords.MemberTransLog = payload.data;
      state.MemberRecords.MemberTransOther = payload.other;
    },
    setMemberGameWallet(state, payload) {
      state.MemberGameWallet = payload;
    },
    setMemberGameWalletCommon(state, payload) {
      state.MemberGameWalletCommon = payload;
    },
    setMemberGameWalletNormal(state, payload) {
      state.MemberGameWalletNormal = payload;
    },
    setMemberGameWalletByOne(state, payload) {
      Object.filter = (obj, value) => 
        Object.keys(obj)
          .filter(key => value(obj[key]));
      const filtered = Object.filter(state.MemberGameWallet, cash => cash[0] === payload.groupName); 
      state.MemberGameWallet[filtered][1] = payload.cash;
    },
    setMemberReturnLog(state, payload) {
      state.MemberBonus.MemberReturnLog = payload.data;
      state.MemberBonus.MemberReturnOther = payload.other.Status;
    },
    setMemberRescueLog(state, payload) {
      state.MemberBonus.MemberRescueLog = payload.data;
      state.MemberBonus.MemberRescueOther = payload.other.Status;
    },
    setMemberBonusLog(state, payload) {
      state.MemberBonus.MemberBonusLog = payload.data;
      state.MemberBonus.MemberBonusOther = payload.other.Status;
    },
  },
  getters: {
    getUserId(state, getters, rootState) {
      return rootState.member.UserId;
    },
  },
  actions: {
    MemberLoginStatus({ commit }) {
      let token = '';
      return new Promise((resolve, reject) => {
        if (window.localStorage.JWT_TOKEN) {
          token = jwtDecode(window.localStorage.JWT_TOKEN);
          // 判斷JWT 給的登入狀態
          if (token.login_status === 'login') {
            commit('member/MemberIsLogIn', token, { root: true });
          } else if (token.login_status === 'logout') {
            commit('member/MemberIsLogOut', '', { root: true });
          }
          resolve('login');
        } else {
          reject();
        }
      });
    },
    JWT_INIT() {
      // alert('Finger');
      window.localStorage.removeItem('JWT_TOKEN');
      const secret = '84j5dcduprz7';
      const palyload = Finger;
      const token = jwt.encode(palyload, secret);
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/verification/GetServerJwt/`, palyload, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          window.localStorage.setItem('JWT_TOKEN', res.data.data.jwt_token);
          window.localStorage.setItem('UUID', Finger);
          resolve(res);
        })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    AdminMemberData({ commit }, member) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/AdminMemberData`, member)
          .then((res) => {
            commit('member/setAdminMemberData', res.data.data[0], { root: true });
            resolve(resolve);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    MemberBankList({ commit }, member) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/MemberBankList`, member)
          .then((res) => {
            commit('member/setMemberBankList', res.data.data, { root: true });
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    MemberRegister({ commit }, member) {
      member.Finger = Finger;
      const vm = this;
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Member/MemberRegister`, member)
          .then((res) => {
            if (res.data.status === 1) {
              window.localStorage.setItem('UUID', Finger);
              window.localStorage.removeItem('tgUserName');
              vm.dispatch('member/MemberLoginStatus', '');
              vm.dispatch('member/MemberGetDetilData');
              commit('member/setMemberRegisterErrorMessage', '', { root: true });
            } else {
              commit('member/setMemberRegisterErrorMessage', res.data.error_message, { root: true });
            }
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    MemberDataUpdate({ commit }, member) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/MemberDataUpdate`, member)
          .then((res) => {
            if (res.data.status === 1) {
              commit('member/setMemberDataUpdateErrorMessage', '', { root: true });
            } else {
              commit('member/setMemberDataUpdateErrorMessage', res.data.error_message, { root: true });
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      });
    },
    Member_AllMemberPasswordReset({ commit }, payload) {
      console.log(payload);
      const vm = this;
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/MemberPasswordReset`, payload)
          .then((res) => {
            if (res.data.status === 1) {
              vm.dispatch('member/MemberLoginStatus', '');
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      });
    },
    MemberPasswordReset({ commit }, payload) {
      const vm = this;
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Member/MemberPasswordReset`, payload)
          .then((res) => {
            if (res.data.status === 1) {
              vm.dispatch('member/MemberLoginStatus', '');
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      });
    },
    MemberKeepUserLoginID(payload) {
      if (payload.keepData === false) {
        window.localStorage.removeItem('tgUserName');
      }
    },
    MemberErrorLogout({ commit }) {
      commit('member/loginError', '', { root: true });
    },
    MemberLogin({ commit }, member) {
      member.Finger = Finger;
      // alert(Finger);
      const vm = this;
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Member/MemberLogin`, member)
          .then((res) => {
            resolve(res);
            if (res.data.status === 1) {
              if (member.keepData === true) {
                const keepUserData = {};
                keepUserData.keepData = member.keepData;
                keepUserData.UserName = member.UserName;
                window.localStorage.setItem('tgUserName', member.UserName);
              } else {
                window.localStorage.removeItem('tgUserName');
              }
              window.localStorage.setItem('UUID', Finger);
              vm.dispatch('member/MemberLoginStatus', '');
              vm.dispatch('member/MemberGetDetilData');
            } else {
              commit('member/setMemberLoginErrorMessage', res.data.error_message, { root: true });
              // commit('loginError', '', {root: true})
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    MemberGetDetilData() {
      const data = {};
      if (window.localStorage.JWT_TOKEN) {
        const token = jwtDecode(window.localStorage.JWT_TOKEN);
        if (token.login_status === 'login') {
          data.UserName = token.username;
          data.UserId = token.userid;
          data.Type = 'Detail';
          const member = { UserName: data.UserName, Page: 1, PageLimit: 30 };
          const payload = { UserId: data.UserId };
          const memberBankPayload = { UserId: data.UserId };
          this.dispatch('member/AdminMemberData', data);
          this.dispatch('member/MemberInbox', member);
          this.dispatch('member/MemberBankList', memberBankPayload);
          this.dispatch('member/MemberUserWalletInfo', payload);
          this.dispatch('member/MemberGetUserOfferCount', payload);
        }
      }
    },
    MemberRefreshUserOfferCount({ getters }) {
      // this.dispatch('member/MemberGetUserOfferCount', getters.getUserId);
    },
    MemberRefreshUserWalletInfo() {
      const data = {};
      if (window.localStorage.JWT_TOKEN) {
        const token = jwtDecode(window.localStorage.JWT_TOKEN);
        if (token.login_status === 'login') {
          data.UserName = token.username;
          data.UserId = token.userid;
          data.Type = 'Detail';
          const payload = { UserId: data.UserId };
          this.dispatch('member/MemberUserWalletInfo', payload);
        }
      }
    },
    MemberLogout({ commit }, member) {
      const vm = this;
      return axios.get(`${process.env.VUE_APP_APIHOST}/Member/MemberLogout`, member)
        .then((res) => {
          if (res.data.status === 1) {
            commit('member/MemberIsLogOut', '', { root: true });
            router.push('/');
            vm.dispatch('member/MemberLoginStatus', '');
          } else {
            commit('member/loginError', '', { root: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberInbox({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/MemberInbox`, member)
        .then((res) => {
          commit('member/setMemberInboxList', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberInboxDelete({ commit }, member) {
      const vm = this;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/MemberInboxManage/Delete/`, member)
        .then(() => {
          const payload = { UserName: member.UserName, Page: 1, PageLimit: 30 };
          vm.dispatch('member/MemberInbox', payload);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberInboxReaded({ commit }, member) {
      const vm = this;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/MemberInboxManage/Edit/`, member)
        .then(() => {
          const payload = { UserName: member.UserName, Page: 1, PageLimit: 30 };
          vm.dispatch('member/MemberInbox', payload);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberUserWalletInfo({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/UserWalletInfo`, member)
        .then((res) => {
          commit('member/setUserWalletInfo', res.data.data[0], { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetUserOfferCount({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GetUserOfferCount`, member)
        .then((res) => {
          commit('member/setUserOfferCount', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetUserBetReport({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/UserBetReport`, member)
        .then((res) => {
          commit('member/setUserBetReport', res, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetUserGameBetReport({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/UserGameBetReport`, member)
        .then((res) => {
          console.log(res);
          commit('member/setUserGameBetReport', res, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_All({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetCashLog/all`, member)
        .then((res) => {
          console.log(res.data);
          commit('member/setMemberCashLog', res.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_Deposit({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Payment/QueryOrder`, member)
        .then((res) => {
          commit('member/setMemberDepositLog', res.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_Withdraw({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/Payment/QueryOrder`, member)
        .then((res) => {
          commit('member/setMemberWithdrawLog', res.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_Trans({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetCashLog/trans`, member)
        .then((res) => {
          commit('member/setMemberTransLog', res.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetGameWallet({ commit }, member) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetGameWalletNew`, member)
          .then((res) => {
            commit('member/setMemberGameWalletCommon', res.data.data.Common, { root: true });
            commit('member/setMemberGameWalletNormal', res.data.data.Normal, { root: true });
            resolve(res);
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      });
    },
    MemberGetCashLog_return({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetCashLog/return`, member)
        .then((res) => {
          commit('member/setMemberReturnLog', res.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_rescue({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetCashLog/rescue`, member)
        .then((res) => {
          commit('member/setMemberRescueLog', res.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_bonus({ commit }, member) {
      return axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetCashLog/bonus`, member)
        .then((res) => {
          console.log(res);
          commit('member/setMemberBonusLog', res.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    API_TOKENTIMEOUT({ commit }, payload) {
      return axios.get('/static/tokenTimeout.json', payload)
        .then(() => {
          console.log('API_TOKENTIMEOUT');
          // commit('member/setIndexBanner', res.data.data, {root: true})
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
