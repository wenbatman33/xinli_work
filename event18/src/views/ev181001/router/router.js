import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/ev181001/pages/index.vue';
import p1 from '@/views/ev181001/pages/p1.vue';

Vue.use(Router);
export default new Router({
  routes: [
    { path: '/', name: 'index', component: index },
    { path: '/p1', name: 'moon18_p1', component: p1 },
  ],
});
