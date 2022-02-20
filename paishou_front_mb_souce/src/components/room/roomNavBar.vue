<template lang="pug">
//- 直播間導覽欄
nav-bar(v-if='showNavBar', download, @click-logo='clickLogo', @click-download='clickDownload', @click-avatar='clickAvatar', @click-login='clickLogin')
</template>
<script>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import navBar from '@/components/index/navBar.vue';

export default {
    components: {
		navBar,
    },
    setup() {
		// Vue router
		const router = useRouter();

		// 是否顯示導覽欄
		const showNavBar = computed(() => {
			// Check standlone flag
			const query = '(display-mode: standalone)';
			const isPWA = navigator.standalone || window.matchMedia(query).matches;
			if (isPWA) {
				return false;
			}

			// Check andorid application
			if (window?.android?.isAndroidApp() === true) {
				return false;
			}

			// Display navigation bar
			return true;
		});

		// 點擊 Logo
		const clickLogo = () => {
			router.replace('/');
		};

		// 點擊下載
		const clickDownload = () => {
			router.push('/download');
		};

		// 點擊頭像
		const clickAvatar = () => {
			router.push('/personal');
		};

		// 點擊登入
		const clickLogin = () => {
			router.push('/login');
		};
        return {
			showNavBar,
			clickLogo,
			clickDownload,
			clickAvatar,
			clickLogin,
        };
    },
};
</script>