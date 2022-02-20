import Vue from 'vue';
import Router from 'vue-router';
import loading from '@/views/loading.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/loading.html',
      name: 'loading',
      component: loading,
    },
  ],
});

