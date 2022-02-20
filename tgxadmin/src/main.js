import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import ElementUI from 'element-ui'
import '@/plugins/axios'
import '@/plugins/filter'
import '@/plugins/GAuth'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')