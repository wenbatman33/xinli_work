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
  apiKey: "AIzaSyDHVVuMjchcngBnINQ8DI5LLnlkimRgJU8",
  authDomain: "party-261c0.firebaseapp.com",
  databaseURL: "https://party-261c0.firebaseio.com",
  projectId: "party-261c0",
  storageBucket: "party-261c0.appspot.com",
  messagingSenderId: "528572212327"
});
firebase.firestore().settings({ timestampsInSnapshots: true })
Vue.config.productionTip = false;
export const db = firebase.firestore()
Vue.config.ignoredElements = ['qrcode-reader','QrcodeReader']

new Vue({
  render: h => h(App)
}).$mount('#app')
