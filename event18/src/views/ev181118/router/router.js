import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/ev181118/pages/index.vue';
import p1 from '@/views/ev181118/pages/p1.vue';

Vue.use(Router);
export default new Router({
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/p1', name: 'ev181118', component: p1 },
  ],
});
