import Vue from 'vue';
import store from '@/store';
import Meta from 'vue-meta';
import routes from './router';
import Router from 'vue-router';

Vue.use(Meta)
Vue.use(Router)

const router = createRouter();

export default router

function createRouter () {
  const router = new Router({
    base: process.env.BASE_URL,
    mode: 'history',
    routes
  })

  router.beforeEach(beforeEach)
  router.afterEach(afterEach)

  return router
}

async function beforeEach(to, from, next) {
  store.dispatch('menu/setActiveMenu', to.path);

  if (to.name === 'login' || to.name === 'resetPass') {
    if (window.localStorage.JWT_TOKEN) {
      next('/')
    }
    next();
  } else if (window.localStorage.JWT_TOKEN) {
    if (to.path !== '/') {
      store.dispatch('menu/addTab', to);
    }

    next();
  } else {
    next({
      name: 'login'
    });
  }
}

function afterEach(to) {
  if (to.path === '/') {
    router.push('/dashboard');
  }
}
