import { login, logout } from '@/api/member'
import { removeToken, removeUser, setUser, getUser } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    name: '',
    role: '',
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, role) => {
    state.role = role
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        account: account.trim(),
        password: password
      })
        .then(response => {
          const { data } = response
          if (response.debug) {
            reject(response.debug)
          }
          const role = (data[0].identity.value === 1) ? 'admin' : 'customer'
          const name = data[0].account
          commit('SET_NAME', name)
          commit('SET_ROLES', role)
          commit('SET_USERINFO', data[0])
          setUser(data[0])
          resolve({ name, role })
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // get user info
  getInfo({ commit }) {
    return new Promise((resolve) => {
      const userInfo = getUser()
      const role = (userInfo.identity.value === 1) ? 'admin' : 'customer'
      const name = userInfo.account
      commit('SET_NAME', name)
      commit('SET_ROLES', role)
      commit('SET_USERINFO', userInfo)
      resolve({ name, role })
    })
  },
  // user logout
  logout({ commit }) {
    return new Promise(resolve => {
      logout()
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeUser()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      removeUser()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
