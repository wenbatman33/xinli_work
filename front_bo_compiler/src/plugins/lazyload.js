import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  preLoad: 20,
  error: 'assets/images/error.png',
  loading: 'assets/images/loading.gif',
  attempt: 1
});
