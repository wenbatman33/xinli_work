import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/ev181207/pages/index.vue';
import p1 from '@/views/ev181207/pages/p1.vue';

Vue.use(Router);
export default new Router({
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/p1', name: 'ev181207', component: p1 },
  ],
});
