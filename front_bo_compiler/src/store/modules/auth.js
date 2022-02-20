import * as types from '../mutation-types';

// state
export const state = {
  user: {}
}

// actions
export const actions = {
  getGoogleAuth({ commit }, googleAuth) {
    window.localStorage.setItem('userEmail', googleAuth.w3.U3)
    commit(types.SET_GOOGLE_OAUTH_DATA, googleAuth);
  },
  logout() {
    const tempUsername = window.localStorage.getItem('username');
    window.localStorage.clear();
    if (tempUsername) {
      window.localStorage.setItem('username', tempUsername);
    }
  }
}
