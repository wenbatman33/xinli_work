import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/moon18/pages/index.vue';
import p1 from '@/views/moon18/pages/p1.vue';
import p2 from '@/views/moon18/pages/p2.vue';
import p3 from '@/views/moon18/pages/p3.vue';
import p4 from '@/views/moon18/pages/p4.vue';
import p5 from '@/views/moon18/pages/p5.vue';

Vue.use(Router);
export default new Router({
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/p1', name: 'moon18_p1', component: p1 },
    { path: '/p2', name: 'moon18_p2', component: p2 },
    { path: '/p3', name: 'moon18_p3', component: p3 },
    { path: '/p4', name: 'moon18_p4', component: p4 },
    { path: '/p5', name: 'moon18_p5', component: p5 },
  ],
});
