import Vue from 'vue';
import axios from 'axios';
import jwt from 'jwt-simple';
import jwtDecode from 'jwt-decode';
// import _ from 'lodash'
import router from '@/router/router';

let Finger = '';
function uuid() {
  console.log('uuid');
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';
  const uuid = s.join('');
  return uuid;
}
if (window.localStorage.UUID) {
  Finger = window.localStorage.UUID;
} else {
  Finger = uuid();
}

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
    MemberVIPData: {},
    MemberBankList: {},
    MemberInboxList: {},
    MemberBonusNumber: {},
    MemberWallet: {},
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
    },
    MemberBetRecords: {
      MemberBetReport: {},
      MemberGameBetReport: {},
    },
    MemberBonus: {
      MemberReturnLog: {},
      MemberReturnOther: {},
      MemberRescueLog: {},
      MemberBonusLog: {},
      MemberRescueOther: {},
      MemberBonusOther: {},
    },
    MemberForgetSteps: 1,
    MemberShowInboxDelBtn: false,
    MemberInboxShowMore: false,
    MemberShowDatePicker: false,
    MemberShowDetailData: {},
    MemberBonusActName: '',
    MemberReloadSwitch: false,
    MemberCashLogText: {
      1: '存款',
      2: '轉進',
      3: '反水',
      4: '救援金',
      5: '紅利',
      6: '提款失敗回款',
      101: '提款處理',
      102: '轉出',
      103: '提款成功',
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
    setAdminMemberVIPData(state, payload) {
      state.MemberVIPData = payload;
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
      payload.data_list = payload.data_list.filter((item, index, array) => item.Status !== 2);
      payload.data_list = payload.data_list.sort((a, b) => (a.Create_At < b.Create_At ? 1 : -1));
      state.MemberInboxList = payload;
    },
    setMemberInboxD(state, payload) {
      state.MemberInboxList = payload;
    },
    setMemberBonusNumber(state, payload) {
      state.MemberBonusNumber = payload;
    },
    setUserWalletInfo(state, payload) {
      state.MemberWallet = payload;
    },
    setMemberCashLog(state, payload) {
      state.MemberRecords.MemberCashLog = payload.data;
      state.MemberRecords.MemberCashOther = payload.other;
      state.MemberRecords.MemberCashSearchDate = { Date_E: payload.Date_E, Date_S: payload.Date_S };
    },
    setMemberCashLogMore(state, payload) {
      state.MemberRecords.MemberCashLog.data_list = state.MemberRecords.MemberCashLog.data_list.concat(payload.data.data_list);
    },
    setMemberDepositLog(state, payload) {
      state.MemberRecords.MemberDepositLog = payload.data;
      state.MemberRecords.MemberDepositOther = payload.other;
      state.MemberRecords.MemberDepositSearchDate = { Date_E: payload.Date_E, Date_S: payload.Date_S };
    },
    setMemberDepositLogMore(state, payload) {
      state.MemberRecords.MemberDepositLog.data_list = state.MemberRecords.MemberDepositLog.data_list.concat(payload.data.data_list);
    },
    setMemberWithdrawLog(state, payload) {
      state.MemberRecords.MemberWithdrawLog = payload.data;
      state.MemberRecords.MemberWithdrawOther = payload.other;
      state.MemberRecords.MemberWithdrawSearchDate = { Date_E: payload.Date_E, Date_S: payload.Date_S };
    },
    setMemberWithdrawLogMore(state, payload) {
      state.MemberRecords.MemberWithdrawLog.data_list = state.MemberRecords.MemberWithdrawLog.data_list.concat(payload.data.data_list);
    },
    setMemberTransLog(state, payload) {
      state.MemberRecords.MemberTransLog = payload.data;
      state.MemberRecords.MemberTransOther = payload.other;
      state.MemberRecords.MemberTransSearchDate = { Date_E: payload.Date_E, Date_S: payload.Date_S };
    },
    setMemberTransLogMore(state, payload) {
      state.MemberRecords.MemberTransLog.data_list = state.MemberRecords.MemberTransLog.data_list.concat(payload.data.data_list);
    },
    setMemberBetReport(state, payload) {
      state.MemberBetRecords.MemberBetReport = payload.data;
      state.MemberBetRecords.MemberBetReportSearchDate = { Date_E: payload.Date_E, Date_S: payload.Date_S };
    },
    setMemberBetReportMore(state, payload) {
      state.MemberBetRecords.MemberBetReport.data_list = state.MemberBetRecords.MemberBetReport.data_list.concat(payload.data.data_list);
    },
    setMemberGameBetReport(state, payload) {
      state.MemberBetRecords.MemberGameBetReport = payload.data;
      state.MemberBetRecords.MemberGameBetReportSearchDate = { Date_E: payload.Date_E, Date_S: payload.Date_S };
    },
    setMemberGameBetReportMore(state, payload) {
      state.MemberBetRecords.MemberGameBetReport.data_list = state.MemberBetRecords.MemberGameBetReport.data_list.concat(payload.data.data_list);
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
    // setMemberGameWalletByOne(state, payload) {
    //   Vue.set(state.MemberGameWallet, payload.id, [payload.groupName, payload.cash]);
    // },
    setMemberGameWalletByOne(state, payload) {
      console.log(payload.cash);
      Object.filter = (obj, value) => 
        Object.keys(obj)
          .filter(key => value(obj[key]));
      const filtered = Object.filter(state.MemberGameWallet, cash => cash[0] === payload.groupName); 
      console.log(state.MemberGameWallet[filtered]);
      state.MemberGameWallet[filtered][1] = payload.cash;
    },
    setMemberReturnLog(state, payload) {
      state.MemberBonus.MemberReturnLog = payload.data;
      state.MemberBonus.MemberReturnOther = payload.other.Status;
      state.MemberBonus.MemberReturnSearchDate = { Date_E: payload.Date_E, Date_S: payload.Date_S };
    },
    setMemberReturnLogMore(state, payload) {
      state.MemberBonus.MemberReturnLog.data_list = state.MemberBonus.MemberReturnLog.data_list.concat(payload.data.data_list);
    },
    setMemberRescueLog(state, payload) {
      state.MemberBonus.MemberRescueLog = payload.data;
      state.MemberBonus.MemberRescueOther = payload.other.Status;
      state.MemberBonus.MemberRescueSearchDate = { Date_E: payload.Date_E, Date_S: payload.Date_S };
    },
    setMemberRescueLogMore(state, payload) {
      state.MemberBonus.MemberRescueLog.data_list = state.MemberBonus.MemberRescueLog.data_list.concat(payload.data.data_list);
    },
    setMemberBonusLog(state, payload) {
      state.MemberBonus.MemberBonusLog = payload.data;
      state.MemberBonus.MemberBonusOther = payload.other.Status;
      state.MemberBonus.MemberBonusSearchDate = { Date_E: payload.Date_E, Date_S: payload.Date_S };
    },
    reSetMemberBonusLogs(state) {
      state.MemberBonus.MemberReturnLog = '';
      state.MemberBonus.MemberRescueLog = '';
      state.MemberBonus.MemberBonusLog = '';
    },
    setMemberBonusLogMore(state, payload) {
      state.MemberBonus.MemberBonusLog.data_list = state.MemberBonus.MemberBonusLog.data_list.concat(payload.data.data_list);
    },
    setMemberShowDetail(state, payload) {
      console.log(payload);
      state.MemberShowDetailData = payload;
      // for (const key in payload)  {
      //  state.MemberShowDetailData[key] = payload[key];
      // }
    },
  },
  getters: {
    getUserId(state, getters, rootState, rootGetters) {
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
    MemberErrorLogout({ commit }) {
      commit('member/loginError', '', { root: true });
    },
    JWT_INIT() {
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
      axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/AdminMemberData`, member)
        .then((res) => {
          commit('member/setAdminMemberData', res.data.data[0], { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    AdminMemberVIPData({ commit }, member) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/AdminMemberData`, member)
          .then((res) => {
            commit('member/setAdminMemberVIPData', res.data.data, { root: true });
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
              vm.dispatch('member/MemberLoginStatus', '');
              window.localStorage.setItem('UUID', Finger);
              window.localStorage.removeItem('tgUserName');
              commit('member/setMemberRegisterErrorMessage', '', { root: true });
              // router.push('/');
              resolve(res);
            } else {
              commit('member/setMemberRegisterErrorMessage', res.data.error_message, { root: true });
            }
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
      axios.post(`${process.env.VUE_APP_APIHOST}/Member/MemberPasswordReset`, payload)
        .then((res) => {
          if (res.data.status === 1) {
            window.localStorage.setItem('tgUserName', payload.VertifyInfo);
            vm.dispatch('member/MemberLoginStatus', '');
            router.push('/');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberKeepUserLoginID({ commit }, payload) {
      if (payload === false) {
        window.localStorage.removeItem('tgUserName');
      }
    },
    MemberPswCheck({ commit }, member) {
      member.Finger = Finger;
      const vm = this;
      axios.post(`${process.env.VUE_APP_APIHOST}/Member/MemberLogin`, member)
        .then((res) => {
          if (res.data.status === 1) {
            member.Password = member.newPassword;
            vm.dispatch('member/MemberDataUpdate', member);
          } else {
            commit('member/setMemberDataUpdateErrorMessage', '舊密碼輸入錯誤', { root: true });
          }
        })
        .catch((error) => {
          commit('member/setMemberDataUpdateErrorMessage', error, { root: true });
          console.log(error);
        });
    },
    MemberLogin({ commit }, member) {
      member.Finger = Finger;
      const vm = this;
      // console.log(member)
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/Member/MemberLogin`, member)
          .then((res) => {
            resolve(res);
            if (res.data.status === 1) {
              window.LC_API.set_custom_variables([{ name: member.UserName }]);
              if (member.keepData === true) {
                const keepUserData = {};
                keepUserData.keepData = member.keepData;
                keepUserData.UserName = member.UserName;
                window.localStorage.setItem('tgUserName', member.UserName);
              }
              member.Type = 'Detail';
              window.localStorage.setItem('UUID', Finger);
              vm.dispatch('member/AdminMemberData', member);
              vm.dispatch('member/MemberLoginStatus', '');
              vm.dispatch('member/MemberGetDetilData', '');
              commit('member/setMemberLoginErrorMessage', '', { root: true });
              // if (member.goUrl !== '') {
              //   router.push(member.goUrl);
              // } else {
              //   router.push('/member');
              // }
            } else {
              commit('member/setMemberLoginErrorMessage', res.data.error_message, { root: true });
              // commit('loginError', '', {root: true})
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    MemberGetDetilData({ commit }) {
      const data = {};
      const dataVIP = {};
      if (window.localStorage.JWT_TOKEN) {
        const token = jwtDecode(window.localStorage.JWT_TOKEN);
        if (token.login_status === 'login') {
          data.UserName = token.username;
          data.UserId = token.userid;
          data.Type = 'Detail';
          dataVIP.UserName = token.username;
          dataVIP.UserId = token.userid;
          dataVIP.Type = 'Vip';
          const member = { UserName: data.UserName, Page: 1, PageLimit: 30 };
          const payload = { UserId: data.UserId };
          const memberBankPayload = { UserId: data.UserId };
          this.dispatch('member/AdminMemberData', data);
          this.dispatch('member/AdminMemberVIPData', dataVIP);
          this.dispatch('member/MemberInbox', member);
          this.dispatch('member/MemberBankList', memberBankPayload);
          this.dispatch('member/MemberUserWalletInfo', payload);
          payload.Status = 0;
          this.dispatch('member/MemberGetGameWallet', payload);
          this.dispatch('member/MemberBonusNumber', payload);
        }
      }
    },
    MemberLogout({ commit }, member) {
      const vm = this;
      axios.get(`${process.env.VUE_APP_APIHOST}/Member/MemberLogout`, member)
        .then((res) => {
          window.localStorage.removeItem('JWT_TOKEN_Overdue');
          if (res.data.status === 1) {
            commit('member/MemberIsLogOut', '', { root: true });
            // router.push('/');
            vm.dispatch('member/MemberLoginStatus', '');
          } else {
            commit('member/loginError', '', { root: true });
          }
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberInbox({ commit }, member) {
      // let vm = this
      axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/MemberInbox`, member)
        .then((res) => {
          commit('member/setMemberInboxList', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberInboxEdit({ commit }, member) {
      const vm = this;
      axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/MemberInboxManage/Edit/`, member)
        .then((res) => {
          // console.log(res)
          delete member.Sn;
          delete member.Status;
          vm.dispatch('member/MemberInbox', member);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberInboxDelete({ commit }, member) {
      const vm = this;
      axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/MemberInboxManage/Delete/`, member)
        .then((res) => {
          console.log(res);
          delete member.Sn;
          vm.dispatch('member/MemberInbox', member);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberBonusNumber({ commit }, member) {
      const vm = this;
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/GetUserOfferCount`, member)
        .then((res) => {
          commit('member/setMemberBonusNumber', res.data.data, { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberUserWalletInfo({ commit }, member) {
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/UserWalletInfo`, member)
        .then((res) => {
          commit('member/setUserWalletInfo', res.data.data[0], { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_All({ commit }, member) {
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetCashLog/all`, member)
        .then((res) => {
          if (member.more) {
            commit('member/setMemberCashLogMore', res.data, { root: true });
          } else {
            res.data.Date_S = member.Date_S;
            res.data.Date_E = member.Date_E;
            commit('member/setMemberCashLog', res.data, { root: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_Deposit({ commit }, member) {
      axios.post(`${process.env.VUE_APP_APIHOST}/Payment/QueryOrder`, member)
        .then((res) => {
          if (member.more) {
            commit('member/setMemberDepositLogMore', res.data, { root: true });
          } else {
            res.data.Date_S = member.Date_S;
            res.data.Date_E = member.Date_E;
            commit('member/setMemberDepositLog', res.data, { root: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_Withdraw({ commit }, member) {
      axios.post(`${process.env.VUE_APP_APIHOST}/Payment/QueryOrder`, member)
        .then((res) => {
          if (member.more) {
            commit('member/setMemberWithdrawLogMore', res.data, { root: true });
          } else {
            res.data.Date_S = member.Date_S;
            res.data.Date_E = member.Date_E;
            commit('member/setMemberWithdrawLog', res.data, { root: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_Trans({ commit }, member) {
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetCashLog/trans`, member)
        .then((res) => {
          if (member.more) {
            commit('member/setMemberTransLogMore', res.data, { root: true });
          } else {
            res.data.Date_S = member.Date_S;
            res.data.Date_E = member.Date_E;
            commit('member/setMemberTransLog', res.data, { root: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberBetReport({ commit }, member) {
      axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/UserBetReport`, member)
        .then((res) => {
          if (member.more) {
            commit('member/setMemberBetReportMore', res.data, { root: true });
          } else {
            res.data.Date_S = member.Date_S;
            res.data.Date_E = member.Date_E;
            commit('member/setMemberBetReport', res.data, { root: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGameBetReport({ commit }, member) {
      axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/UserGameBetReport`, member)
        .then((res) => {
          if (member.more) {
            commit('member/setMemberGameBetReportMore', res.data, { root: true });
          } else {
            res.data.Date_S = member.Date_S;
            res.data.Date_E = member.Date_E;
            commit('member/setMemberGameBetReport', res.data, { root: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetGameWallet({ commit }, member) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetGameWalletNew`, member)
          .then((res) => {
            const copy = Object.assign({}, res.data.data.Common, res.data.data.Normal);
            commit('member/setMemberGameWallet', copy, { root: true });
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
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetCashLog/return`, member)
        .then((res) => {
          if (member.more) {
            commit('member/setMemberReturnLogMore', res.data, { root: true });
          } else {
            res.data.Date_S = member.Date_S;
            res.data.Date_E = member.Date_E;
            commit('member/setMemberReturnLog', res.data, { root: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_rescue({ commit }, member) {
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetCashLog/rescue`, member)
        .then((res) => {
          if (member.more) {
            commit('member/setMemberRescueLogMore', res.data, { root: true });
          } else {
            res.data.Date_S = member.Date_S;
            res.data.Date_E = member.Date_E;
            commit('member/setMemberRescueLog', res.data, { root: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberGetCashLog_bonus({ commit }, member) {
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/GetCashLog/bonus`, member)
        .then((res) => {
          if (member.more) {
            commit('member/setMemberBonusLogMore', res.data, { root: true });
          } else {
            res.data.Date_S = member.Date_S;
            res.data.Date_E = member.Date_E;
            commit('member/setMemberBonusLog', res.data, { root: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
