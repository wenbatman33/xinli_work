import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/ev190118/pages/index.vue';
import p1 from '@/views/ev190118/pages/p1.vue';
import p2 from '@/views/ev190118/pages/p2.vue';


Vue.use(Router);
export default new Router({
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/p1', name: 'p1', component: p1 },
    { path: '/p2', name: 'p2', component: p2 },
    { path: '*', redirect: '/' },
  ],
});
