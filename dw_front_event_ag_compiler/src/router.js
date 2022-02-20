import Vue from 'vue';
import Router from 'vue-router';
import event from '@/views/event.vue';
import error from '@/views/error.vue';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    // { path: '/', name: 'index', component: index },
    { path: '/event/:id', name: 'event_1', component: event },
    { path: '/error', name: 'error', component: error },
    { path: '*', redirect: '/error' },
  ],
});

router.afterEach((to, from, next) => {
  setTimeout(() => NProgress.done(), 300);
  if (document.getElementById('mainContent')) document.getElementById('mainContent').scrollTop = 0;
});
router.beforeEach((to, from, next) => {
  next();
  setTimeout(() => NProgress.start());
});

export default router;
