import Vue from 'vue';
import Router from 'vue-router';
import fastregister from '@/views/fastregister.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/fastregister.html',
      name: 'fastregister',
      component: fastregister,
    },
  ],
});
