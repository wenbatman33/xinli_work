import Vue from 'vue';
import Router from 'vue-router';
import index from '@/views/ev181224/pages/index.vue';

Vue.use(Router);
export default new Router({
  routes: [
    { path: '/', name: 'index', component: index },
  ],
});
