import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/ev190218/pages/index.vue';
import p1 from '@/views/ev190218/pages/p1.vue';
import service from '@/views/ev190218/pages/service.vue';
import service2 from '@/views/ev190218/pages/service2.vue';


Vue.use(Router);
export default new Router({
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/p1', name: 'p1', component: p1 },
    { path: '/service', name: 'service', component: service },
    { path: '/service2', name: 'service2', component: service2 },
    { path: '*', redirect: '/' },
  ],
});
