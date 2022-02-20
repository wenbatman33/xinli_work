import jwtDecode from "jwt-decode";
import router from "@/router";
import { Message } from "element-ui";

export default {
  namespaced: true,
  state: {
    socket: null,
    user_info: {},
    user_page_auth: {}
  },
  mutations: {
    set_user_page_auth(state, auth) {
      state.user_page_auth = auth;
    },
    logined(state, token) {
      state.user_info = token;
    },
    logOut(state) {
      window.localStorage.removeItem("JWT_TOKEN");
      state.user_info = {};
    },
    setSocket(state, gsocket) {
      state.socket = gsocket;
    },
    closeSocket(state, gsocket) {
      if (state.socket != null) {
        console.log("socketClose");
        state.socket.disconnect();
        //state.socket.close();
        state.socket = null;
      }
    }
  },
  actions: {
    get_page_auth({ commit, state }, page_path) {
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryAuthority",
        data: {
          Path: page_path
        }
      })
        .then(function(response) {
          if (response.data.status == 0) {
            router.push({
              name: "index"
            });
          } else {
            let page_auth = response.data.data.find(function(
              item,
              index,
              array
            ) {
              return item.AdminUserId == state.user_info.admin_userid;
            });
            commit("set_user_page_auth", page_auth);
            // console.log(response.data.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    CheckLoginStatus({ commit }) {
      return new Promise(function(resolve, reject) {
        let token;
        if ((token = jwtDecode(window.localStorage.JWT_TOKEN))) {
          if (token.login_status === "login") {
            commit("logined", token);
            resolve(true);
          } else if (token.login_status === "logout") {
            commit("logOut");
            Message.error("你已登出系統，請再次登入帳戶以繼續操作");
            router.push("/login");
            resolve(false);
          } else {
            commit("logOut");
            Message.error("你已登出系統，請再次登入帳戶以繼續操作");
            router.push("/login");
            resolve(false);
          }
        } else {
          commit("logOut");
          Message.error("你已登出系統，請再次登入帳戶以繼續操作");
          router.push("/login");
          resolve(false);
        }
      });
    },
    MemberLogin({ dispatch, commit }, jwt_token) {
      commit("logined", jwtDecode(jwt_token));
      window.localStorage.setItem("JWT_TOKEN", jwt_token);
      router.push({
        name: "index"
      });
    },
    MemberLogout({ commit }) {
      window.localStorage.removeItem("JWT_TOKEN");
      commit("logOut");
      commit("closeSocket");
      router.push("/login");
    },
    MemberSocket({ commit }, gsocket) {
      commit("setSocket", gsocket);
    }
  }
};
