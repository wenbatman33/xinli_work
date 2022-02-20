import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store';
import router from '@/router';
import VCharts from 'v-charts';

// plugins
import '@/plugins/axios';
import '@/plugins/filter';
import '@/plugins/GAuth';
import '@/plugins/element';
import '@/plugins/sweetalert';
import '@/plugins/lazyload';
import '@/plugins/clipboard';

// global component
import DataFilter from '@/components/DataFilter';
import LineClamp from '@/components/LineClamp';
import MemberDisplay from '@/components/MemberDisplay';

// global filters
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;
Vue.use(VCharts)

Vue.component('data-filter', DataFilter);
Vue.component('line-clamp', LineClamp);
Vue.component('member-display', MemberDisplay);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
