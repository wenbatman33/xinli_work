import Vue from 'vue'
import App from './App.vue'
import VueQrcodeReader from 'vue-qrcode-reader'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.use(VueQrcodeReader)
Vue.use(VueFire)
firebase.initializeApp({
  apiKey: "AIzaSyClxyWJX8P7ex5H53G0ymwlN0-6ycORxdw",
  authDomain: "party-dd1e4.firebaseapp.com",
  databaseURL: "https://party-dd1e4.firebaseio.com",
  projectId: "party-dd1e4",
  storageBucket: "party-dd1e4.appspot.com",
  messagingSenderId: "853310015177"
});
firebase.firestore().settings({ timestampsInSnapshots: true })
Vue.config.productionTip = false;
export const db = firebase.firestore()
Vue.config.ignoredElements = ['qrcode-reader','QrcodeReader']

new Vue({
  render: h => h(App)
}).$mount('#app')
