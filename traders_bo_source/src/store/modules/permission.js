import { adminRoutes, customerRoutes, constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  RESET_ROUTES: (state, routes) => {
    state.routes = []
  }
}

const actions = {
  generateRoutes({ commit }, role) {
    return new Promise(resolve => {
      let accessedRoutes
      if (role === 'admin') {
        accessedRoutes = adminRoutes || []
      } else if (role === 'customer') {
        accessedRoutes = customerRoutes
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },
  resetRoutes({ commit }, role) {
    return new Promise(resolve => {
      commit('RESET_ROUTES',)
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
