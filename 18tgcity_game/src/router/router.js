import Vue from 'vue';
import Router from 'vue-router';
import loading from '@/views/loading.vue';
import pt from '@/views/pt.vue';
import pth5 from '@/views/pth5.vue';
import pg from '@/views/pg.vue';
import pp from '@/views/pp.vue';
import im from '@/views/im.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/loading.html',
      name: 'loading',
      component: loading,
    },
    {
      path: '/pt.html',
      name: 'pt',
      component: pt,
    },
    {
      path: '/pth5.html',
      name: 'ptht',
      component: pth5,
    },
    {
      path: '/pg.html',
      name: 'pg',
      component: pg,
    },
    {
      path: '/pp.html',
      name: 'pp',
      component: pp,
    },
    {
      path: '/im.html',
      name: 'im',
      component: im,
    },
  ],
});

