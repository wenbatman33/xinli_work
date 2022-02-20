import router from '@/router';
import * as types from '../mutation-types';
import { getAllMenuAPI } from '@/api/menu';
import pathMap from '../pathMap';
import { getPermissionAPI } from '@/api/acl/permission';
import { Message } from 'element-ui';
import { TITLE } from '@/config/server';

// state
export const state = {
  openTabs: [],
  menuTree: [],
  activeTab: '',
  activeMenu: '',
  tabKeys: {},
  tabMap: {}, // Tab 名字會先行比對 api 抓回來的 sidebar 找不到才去 pathMap 找
  pathMap,
  field: {}
}

function findAllPath(pathArray, path) {
  let result;
  pathArray.some(item => {
    let temp;

    if (item.path === path) {
      return result = [item];
    }

    temp = findAllPath(item.children || [], path);

    if (temp) {
      return result = [item, ...temp];
    }
  });

  return result;
}

function findPath(pathArray, path) {
  let result;
  pathArray.some(item => {
    let temp;
    if (item.path === path) {
      return result = item;
    }

    temp = findPath(item.children || [], path)

    if (temp) {
      return result = temp;
    }
  })

  return result;
}

// getters
export const getters = {
  getTabKey: state => routePath => `key-${state.tabKeys[routePath]}-${routePath}`,
  getAllPath: state => path => findAllPath(state.pathMap, path),
  getMenuTree: state => state.menuTree,
}

// mutations
export const mutations = {
  [types.SET_ALL_MENU_TREE] (state, tree) {
    state.menuTree = tree;
  },

  [types.SET_TAB_MAP] (state, tabMap) {
    state.tabMap = tabMap;
  },

  [types.SET_ACTIVE_TAB] (state, path) {
    const tab = findPath(state.pathMap, path.replace(/\//g,'').split('?')[0]);
    document.title = tab ? `${tab.title} | ${TITLE}` : TITLE;
    state.activeTab = path;
  },

  [types.SET_ACTIVE_MENU] (state, tab) {
    state.activeMenu = tab;
  },

  [types.ADD_TAB] (state, { route, button, block }) {
    const pushData = {
      path: route.fullPath,
      component: route.params.pathMatch,
      button,
      block
    }

    if (route.query.title) {
      pushData.title = route.query.title;
    } else if (route.path === '/dashboard') {
      pushData.title = '首页';
    } else {
      pushData.title =
        state.tabMap[route.params.pathMatch]
        || (findPath(state.pathMap, route.params.pathMatch) && findPath(state.pathMap, route.params.pathMatch).title)
        || 'no-title';
    }

    state.openTabs.push(pushData);
    state.tabKeys = Object.assign({}, state.tabKeys, {
      [route.fullPath]: state.tabKeys[route.fullPath]++ || 1
    })
  },

  [types.REMOVE_TAB] (state, path) {
    state.openTabs = state.openTabs.filter(tab => tab.path !== path);
  },

  [types.REFRESH_TAB] (state) {
    state.tabKeys[state.activeTab]++
  },

  [types.REMOVE_ALL_TAB] (state) {
    state.openTabs = [];
  },

  [types.SET_FIELD] (state, field) {
    state.field = field;
  }
}

// actions
export const actions = {
  addTab({ commit, dispatch, state }, route) {
    // 已經開啟過的 tab 直接切換即可
    if (state.openTabs.some(tab => tab.path === route.fullPath)) {
      commit(types.SET_ACTIVE_TAB, route.fullPath);
      return;
    }

    if (route.path === '/dashboard') {
      commit(types.ADD_TAB, {
        route,
        button: {},
        block: {}
      });
      commit(types.SET_ACTIVE_TAB, route.path);
      return;
    }

    getPermissionAPI().then(response => {
      let permission = response.data.data;

      if (! permission.read_auth) {
        dispatch('removeTab', [route.fullPath, false]);
        Message.error('您无权限！');
        dispatch('setNewActiveTab');
        return;
      }

      if (Object.keys(state.field).length === 0) {
        commit(types.SET_FIELD, permission.field || {});
      }

      commit(types.ADD_TAB, {
        route,
        button: permission.button || {},
        block: permission.block || {}
      });

      commit(types.SET_ACTIVE_TAB, route.fullPath);
    });
  },

  setActiveTab({ commit }, tab) {
    commit(types.SET_ACTIVE_TAB, tab);
  },

  setActiveMenu({ commit }, path) {
    const active = findPath(state.pathMap, path.replace(/\//g, ''));

    if (active) {
      commit(types.SET_ACTIVE_MENU, active.active || path)
    } else {
      commit(types.SET_ACTIVE_MENU, path)
    }
  },

  removeTab({ commit, state, dispatch }, path) {
    commit(types.REMOVE_TAB, path);
    // 如果删掉的tab是目前开启的
    if (path === state.activeTab) {
      dispatch('setNewActiveTab');
    }
  },

  setNewActiveTab({ dispatch }) {
    if (state.openTabs && state.openTabs.length >= 1) {
      dispatch(
        'setActiveTab',
        state.openTabs[state.openTabs.length - 1].path
      );
      router.push(state.activeTab);
    } else {
      router.push({ name: 'index' });
    }
  },

  refreshTab({ commit, dispatch, state }) {
    if (Object.keys(state.field).length === 0) {
      commit(types.REMOVE_TAB, state.activeTab);
      dispatch('addTab', router.app._route)
    } else {
      commit(types.REFRESH_TAB);
    }
  },

  removeAllTab({ commit }) {
    commit(types.REMOVE_ALL_TAB);
  },

  getAllPageApi({ commit }) {
    return getAllMenuAPI()
      .then(response => {
        const responseData = response.data.data || [];
        const mapTab = (menu, result = []) => {
          for (let index = 0; index < menu.length; index++) {
            if (menu[index].path) {
              result[menu[index].moduleName] = menu[index].funcName;
            }

            if (menu[index].subNode) {
              result.concat(mapTab(menu[index].subNode, result));
            }
          }

          return result;
        }

        commit(types.SET_ALL_MENU_TREE, responseData);
        commit(types.SET_TAB_MAP, mapTab(responseData));
      })
  },
}


