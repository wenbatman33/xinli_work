import Vue from 'vue';
import Router from 'vue-router';
import redirection from '@/views/redirection.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/redirection.html',
      name: 'redirection',
      component: redirection,
    },
  ],
});
