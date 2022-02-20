<template lang="pug">
//- 標籤欄
van-tabbar.tabbar.shadow(v-if='isShow', :model-value='active', active-color='#A62337', inactive-color='#000000', safe-area-inset-bottom, @change='changeTab')
	//- 火熱
	van-tabbar-item(name='/', to='/', icon='/publicAssets/img/app/icon-home@3x.png') 火熱

	//- 賽程
	van-tabbar-item(name='/schedule', to='/schedule', icon='/publicAssets/img/app/icon-game@3x.png') 赛程

	//- 資訊
	van-tabbar-item(name='/article', to='/article', icon='/publicAssets/img/app/icon-article@3x.png') 资讯

	//- 關注
	van-tabbar-item(name='/concern', to='/concern', icon='/publicAssets/img/app/icon-heart@3x.png') 关注

	//- 我的
	van-tabbar-item(name='/personal', to='/personal', icon='/publicAssets/img/app/icon-user@3x.png') 我的
</template>
<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { matomo_index_tabbar_concern, matomo_index_tabbar_personal, matomo_index_tabbar_schedule, matomo_index_tabbar_article } from '@/matomoTrackEvent.js';

export default {
	setup() {
		// Vue router
		const route = useRoute();

		// Active tab
		const active = computed(() => {
			if (/^\/article/.test(route.path)) {
				return '/article';
			} else {
				return route.path;
			}
		});

		// Tab bar visible
		const isShow = computed(() => {
			if (route.path === '/') {
				return true;
			} else if (route.path === '/schedule') {
				return true;
			} else if (/^\/article/.test(route.path)) {
				return true;
			} else if (route.path === '/concern') {
				return true;
			} else if (route.path === '/personal') {
				return true;
			} else {
				return false;
			}
		});

		// 更新選擇的頁籤
		const changeTab = (active) => {
			switch (active) {
				case '/':
					// matomo_index_tabbar_index();
					break;
				case '/schedule':
					matomo_index_tabbar_schedule();
					break;
				case '/article':
					matomo_index_tabbar_article();
					break;
				case '/concern':
					matomo_index_tabbar_concern();
					break;
				case '/personal':
					matomo_index_tabbar_personal();
					break;
			}
		};
		return {
			active,
			isShow,
			changeTab,
		};
	},
};
</script>
<style lang="scss" scoped>
.tabbar {
	z-index: 999;
	background: #fff;
	::v-deep(.van-tabbar-item__text) {
		font-weight: bold;
	}
	::v-deep(.van-tabbar-item--active) {
		border-top: 2px solid #A62337;
	}
	.van-tabbar-item--active::v-deep(.van-icon) {
		filter: invert(23%) sepia(43%) saturate(2719%) hue-rotate(324deg) brightness(91%) contrast(102%);
	}
}
</style>
