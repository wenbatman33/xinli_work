import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import Axios from '@/api/Axios';
import router from './router';
import Antd from 'ant-design-vue';
import { createPinia } from 'pinia';
import 'ant-design-vue/dist/antd.less';
import '@/assets/scss/main.scss';
import 'swiper/css';
import './registerServiceWorker';
import i18n from '@/i18n';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 设置语言 或 moment.lang('zh-cn');
/////////////////////////
let ENV = import.meta.env;
const app = createApp(App);
/////////////////////////
function setupApp() {
	app.use(router).use(createPinia()).use(Antd).use(i18n).mount('#app');
}
async function init() {
	let envJson = '';
	if (ENV.MODE === 'dev' || ENV.MODE === 'test') {
		envJson = '../static/json/pc.json';
	} else if (ENV.MODE === 'stage') {
		envJson = 'https://storage.googleapis.com/gcs-luck2-stg-static/public_env/pc_env.json';
	} else if (ENV.MODE === 'production') {
		// 尚未定義
		// envJson = '';
	}
	const { data } = await axios.get(envJson);
	axios.defaults.baseURL = data.api.url;
	window.staticPath = data.img.url;
	window.apiUrl = data.api.url;
	window.apiImg = data.apiImg.url;
	window.socketUrl = data.socketUrl.url;
	window.memberUrl = data.memberUrl.url;
	Axios.defaults.baseURL = window.apiUrl;
	setupApp();
}
init();
