import axios from 'axios';
import jwt from 'jwt-simple';
import jwtDecode from 'jwt-decode';
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
  },
  getters: {
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
      window.localStorage.removeItem('JWT_TOKEN');
      const secret = '84j5dcduprz7';
      const palyload = Finger;
      const token = jwt.encode(palyload, secret);
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_APIHOST}/verification/GetServerJwt/`, palyload, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          window.localStorage.setItem('JWT_TOKEN', res.data.data.jwt_token);
          resolve(res);
        })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },
    MemberLogin({ commit }, member) {
      member.Finger = Finger;
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
              // vm.dispatch('member/MemberLoginStatus', '');
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
        }
      }
    },
  },
};
