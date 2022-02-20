<template lang="pug">
#main
	//- 下載廣告
	download-banner

	//- 子頁面
	router-view

	//- 標籤欄
	tab-bar

	//- 每日簽到
	bonus-popup

	//- 懸浮按鈕
	float-button
	
	//- 彈窗容器
	.popupTeleport

	//- 蓋板廣告
	slide-popup

	//- App 版本更新彈窗
	app-update-popup
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { matomo_open_pwa, matomo_open_h5 } from '@/matomoTrackEvent.js';
import tabBar from '@/components/app/tabBar.vue';
import bonusPopup from './components/app/bonusPopup.vue';
import slidePopup from '@/components/app/slidePopup.vue';
import floatButton from '@/components/app/floatButton.vue';
import downloadBanner from '@/components/app/downloadBanner.vue';
import appUpdatePopup from '@/components/app/appUpdatePopup.vue';

export default {
	components: {
		tabBar,
		bonusPopup,
		slidePopup,
		floatButton,
		downloadBanner,
		appUpdatePopup,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// 檢查首次安裝 PWA
		const checkPwaFirstInstall = () => {
			const is_PWA = window.location.pathname === '/source=pwa_app';
			if (is_PWA && !window.localStorage.PWA_INSTALLED) {
				// 塞入 PWA 首次安裝的紀錄
				window.localStorage.setItem('PWA_INSTALLED', true);

				// 發送 matomo pwa event
				matomo_open_pwa();
			} else {
				// 發送 matomo h5 event
				matomo_open_h5();
			}
		};

		// 更新設定資訊
		const checkMaintain = () => {
			store.dispatch('config/GET_CONFIG').then((res) => {
				if (store.getters['config/IS_MAINTAIN']) {
					router.push('/maintain');
				}
			});
		};

		// 更新登入資訊
		const updateLoginInfo = () => {
			if (store.getters['user/IS_LOGIN']) {
                 store.dispatch('user/GET_USER_INFO');
                 store.dispatch('tasks/GET_BONUS_LIST');
             }
		}

		// On component mounted
		onMounted(() => {
			checkPwaFirstInstall();
			checkMaintain();
			updateLoginInfo();
		});
		return {
			store,
		};
	},
};
</script>