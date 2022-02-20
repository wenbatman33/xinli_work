import axios from 'axios';
import store from '@/store/store';
import md5 from 'js-md5';

export default {
  namespaced: true,
  state: {
    memberLogined: 'notYet',
    registedFeedback: {
      memberAccount: '',
      memberPassword: '',
    },
    PersonalDetail: {
      id: '',
      memberId: '',
      memberAccount: '',
      memberPassword: '',
      memberRealname: '',
      memberBirthday: '',
      memberGender: {
        value: '',
        display: '',
      },
      memberPofilePicture: 1,
      memberProvince: '',
      memberCity: '',
      memberState: '',
      memberAddress: '',
      memberCreatedAt: '',
      memberUpdatedAt: '',
    },
    memberStatus: {
      account: '',
      accountChanged: '',
      email: '',
      phone: '',
      greeting: '',
    },
    memberProfile: {},
    memberInbox: [],
    memberInboxLength: 0,
    memberNotice: {},
    registedBanner: [],
    bonusTimes: 0,
  },
  getters: {},
  mutations: {
    MemberIsLogIn(state, payload) {
      state.memberLogined = true;
      state.PersonalDetail.memberAccount = payload.account;
      // matomo
      window._paq.push(['setUserId', payload.account]);
      window._paq.push(['trackPageView']);
    },
    
    MemberIsLogOut(state, payload) {
      state.memberLogined = false;
      state.PersonalDetail.memberAccount = '';
      // 清除搶紅包次數
      state.bonusTimes = 0;
      // matomo
      if (state.PersonalDetail.memberAccount) {
        window._paq.push(['setUserId', state.PersonalDetail.memberAccount]);
        window._paq.push(['trackPageView']);
      }
    },
    MemberMobileRegistered(state, payload) {
      // 為了註冊成功顯密碼
      state.registedFeedback.memberAccount = payload.account;
      state.registedFeedback.memberPassword = payload.password;
      // matomo
      window._paq.push(['setUserId', payload.account]);
      window._paq.push(['trackPageView']);
    },
    setPersonalDetailData(state, payload) {
      state.memberLogined = true;
      state.PersonalDetail = payload;
      // matomo
      window._paq.push(['setUserId', payload.memberAccount]);
      window._paq.push(['trackPageView']);
    },
    setMemberDetailData(state, payload) {
      state.memberStatus.account = payload.account;
      state.memberStatus.accountChanged = payload.accountChanged;
      state.memberStatus.email = payload.email;
      state.memberStatus.phone = payload.phone;
      state.memberStatus.greeting = payload.greeting;
      window.localStorage.setItem('LC_API_ID', payload.account);
      window.localStorage.setItem('LC_API_EMAIL', payload.email);
      window.LC_API.set_visitor_name(payload.account);
      window.LC_API.set_visitor_email(payload.email);
    },
    setMemberInbox(state, payload) {
      state.memberInbox = payload;
      state.memberInboxLength = 0;
      payload.forEach((item, index) => {
        if (item.inboxStatus.value === 0) {
          state.memberInboxLength += 1;
        }
      });
    },
    setMemberNotice(state, payload) {
      state.memberNotice = payload;
    },
    setMemberProfile(state, payload) {
      state.memberProfile = payload;
    },
    setRegistedBanner(state, payload) {
      state.registedBanner = payload;
    },
    setBonusTimes(state, payload) {
      state.bonusTimes = payload;
    },
  },
  actions: {
    checkMemberLoginStatus({ commit }) {
      return new Promise((resolve, reject) => {
        if (window.localStorage.JWT_TOKEN) {
          // 如果登入時取得 個人資訊 會員資訊 錢包金額 我的消息
          store.dispatch('member/getMemberDetailData');
          store.dispatch('member/MemberInbox');
          store.dispatch('member/getMemberProfile');
          store.dispatch('member/getBonusTimes');
          store.dispatch('wallet/getMemberWallet');
          store.dispatch('wallet/getBankCodeMappingList');
          store.dispatch('member/PersonalGetData')
            .then((res) => {
              resolve('logined');
            });
          // store.dispatch('wallet/getMemberBankCard');
        } else {
          store.commit('member/MemberIsLogOut', '', { root: true });
          // reject('logout');
        }
      });
    },
    getMemberProfile({ commit }) {
      return new Promise((resolve, reject) => {
        if (window.localStorage.JWT_TOKEN) {
          axios.get('/api/Member/Profile')
            .then((res) => {
              commit('member/setMemberProfile', res.data.data[0], { root: true });
              resolve(res);
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        } else {
          resolve('');
        }
      });
    },
    getMemberDetailData({ commit }) {
      return new Promise((resolve, reject) => {
        // 有JWT_TOKEN 則去取得使用者資訊
        if (window.localStorage.JWT_TOKEN) {
          axios.get('/api/Member/Detail')
            .then((res) => {
              commit('member/setMemberDetailData', res.data.data[0], { root: true });
              resolve(res);
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        } else {
          resolve('');
        }
      });
    },
    PersonalGetData({ commit }) {
      return new Promise((resolve, reject) => {
        // 有JWT_TOKEN 則去取得使用者資訊
        if (window.localStorage.JWT_TOKEN) {
          axios.get('/api/Member/Personal')
            .then((res) => {
              commit('member/setPersonalDetailData', res.data.data[0], { root: true });
              resolve(res);
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        } else {
          resolve('');
        }
      });
    },
    PersonalDataPatch({ commit }, payload) {
      return new Promise((resolve, reject) => {
        // 有JWT_TOKEN 則去取得使用者資訊
        axios.post('/api/Member/Personal/DataPatch', payload)
          .then((res) => {
            if (res.status === 200 && res.data.status === 1) {
              commit('member/setPersonalDetailData', res.data.data[0], { root: true });
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MemberLogin({ commit }, memberForm) {
      const payload = memberForm;
      payload.tryTime = new Date().getTime();
      payload.rpc = md5(window.localStorage.Finger + payload.tryTime);
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/Login', payload)
          .then((res) => {
            if (res.status === 200 && res.data.status === 1) {
              store.dispatch('member/checkMemberLoginStatus')
                .then((status) => {
                  if (status === 'logined') {
                    resolve(res);
                  }
                });
              store.dispatch('dialog/closeCommandDialog');
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    MemberMobileLogin({ commit }, memberForm) {
      const payload = memberForm;
      payload.tryTime = new Date().getTime();
      payload.rpc = md5(window.localStorage.Finger + payload.tryTime);
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/PhoneLogin', payload)
          .then((res) => {
            if (res.status === 200 && res.data.status === 1) {
              store.dispatch('member/checkMemberLoginStatus')
                .then((status) => {
                  if (status === 'logined') {
                    resolve(res);
                  }
                });
              store.dispatch('dialog/closeCommandDialog');
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    MemberChangePhone({ commit }, memberForm) {
      const payload = memberForm;
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/ChangePhone', payload)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MemberChangePhoneOtp({ commit }, memberForm) {
      const payload = memberForm;
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/ChangePhoneOtp', payload)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MemberChangePassword({ commit }, memberForm) {
      const payload = memberForm;
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/ChangePassword', payload)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MemberChangeAccount({ commit }, memberForm) {
      const payload = memberForm;
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/ChangeAccount', payload)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MemberChangeEmail({ commit }, memberForm) {
      const payload = memberForm;
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/ChangeEmail', payload)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MemberChangeEmailOtp({ commit }, memberForm) {
      const payload = memberForm;
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/ChangeEmailOtp', payload)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MemberLogout({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/Member/Logout')
          .then((res) => {
            commit('member/MemberIsLogOut', '', { root: true });
            commit('wallet/setMemberBankCard', [], { root: true });
            commit('wallet/setMemberWallet', [], { root: true });
            window.localStorage.removeItem('JWT_TOKEN');
            window.localStorage.removeItem('LC_API_ID');
            window.localStorage.removeItem('LC_API_EMAIL');
            window.localStorage.removeItem('agency');
            window.LC_API.set_visitor_name('GUEST');
            window.LC_API.set_visitor_email('');
            resolve(res);
          })
          .catch((error) => {
            commit('member/MemberIsLogOut', '', { root: true });
            commit('wallet/setMemberBankCard', [], { root: true });
            window.localStorage.removeItem('JWT_TOKEN');
            window.localStorage.removeItem('LC_API_ID');
            window.localStorage.removeItem('LC_API_EMAIL');
            window.LC_API.set_visitor_name('GUEST');
            window.LC_API.set_visitor_email('');
            reject(error);
          });
      });
    },
    MemberRegister({ commit }, memberForm) {
      const payload = memberForm;
      payload.tryTime = new Date().getTime();
      payload.rpc = md5(window.localStorage.Finger + payload.tryTime);
      // 若 agency 編號時註冊同時需要送出 agency_code
      if (window.localStorage.agency) {
        payload.agency_code = window.localStorage.agency;
      }
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/SignUp', payload)
          .then((res) => {
            if (res.status === 200 && res.data.status === 1) {
              store.dispatch('member/MemberLogin', memberForm);
              store.dispatch('dialog/closeCommandDialog');
            }
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    MemberMobileRegister({ commit }, memberForm) {
      const payload = memberForm;
      payload.tryTime = new Date().getTime();
      payload.rpc = md5(window.localStorage.Finger + payload.tryTime);
      // 若 agency 編號時註冊同時需要送出 agency_code
      if (window.localStorage.agency) {
        payload.agency_code = window.localStorage.agency;
      }
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/PhoneSignUp', payload)
          .then((res) => {
            if (res.status === 200 && res.data.status === 1) {
              // 為了註冊成功顯密碼
              const payload = {};
              payload.account = res.data.data[0].account;
              payload.password = res.data.data[0].password;
              console.log(payload);
              commit('member/MemberMobileRegistered', payload, { root: true });
              // 註冊成功自動登入
              store.dispatch('member/MemberLogin', payload);
              store.dispatch('dialog/closeCommandDialog');
            }
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    API_RegistedBanner({ commit }, payload) {
      return axios.get(`/api/FrontendBanner?banner_group_id=${payload.banner_group_id}&banner_type=${payload.banner_type}&device=${payload.device}&page=1&per_page=20`, payload)
        .then((res) => {
          commit('member/setRegistedBanner', res.data.data[0], { root: true });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    MemberInbox({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/Member/Inbox')
          .then((res) => {
            if (res.status === 200 && res.data.status === 1) {
              commit('member/setMemberInbox', res.data.data, { root: true });
            }
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    MemberInboxPatch({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`/api/Member/Inbox/${payload.id}`, payload.status)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    MemberNotice({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/api/Member/Notice')
          .then((res) => {
            commit('member/setMemberNotice', res.data.data[0], { root: true });
            resolve(res);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    MemberForgetPassOtp({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/ForgetPassOtp', payload)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MemberForgetPassCert({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/ForgetPassCert', payload) 
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MemberForgetPassChange({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/Member/ForgetPassChange', payload) 
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MemberGetBetLog({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`/api/Member/Bet?game_type=${payload.game_type}&company_tag=${payload.company_tag}&time_start=${payload.time_start}&time_end=${payload.time_end}&page=${payload.page}&per_page=${payload.per_page}`) 
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MemberGetBetGameGroup({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`api/Member/Bet/GameGroup?game_type=${payload}`) 
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 夢之城取搶紅包點數
    getBonusTimes({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.get('/api/Task/Bonus/Count') 
          .then((res) => {
            resolve(res);
            commit('member/setBonusTimes', res.data.data[0].count, { root: true });
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
