<template lang="pug">
.headerNav#headerNav
	.Container.h-full.BETWEEN
		.w-full.h-full.CENTER_BETWEEN
			.h-full.FLEX_R
				.logo.mr-4
					router-link(to='/')
						img(class='w-[150px]', :src='logo_navigation')
				.nav.FLEX_R
					.text-base.font-semibold.flex.items-center.px-4.cursor-pointer(class='hover:text-psV3Red', @click='gotoPage("/")', :class='{ active: route.path == "/"}') 首页
					.text-base.font-semibold.flex.items-center.px-4.cursor-pointer(class='hover:text-psV3Red', @click='gotoPage("/classify")', :class='{ active: route.path== "/classify" }') 分类
					.text-base.font-semibold.flex.items-center.px-4.cursor-pointer(class='hover:text-psV3Red', @click='gotoPage("/campaign")', :class='{ active: route.path== "/campaign" }') 活动
					.text-base.font-semibold.flex.items-center.px-4.cursor-pointer(class='hover:text-psV3Red', @click='gotoPage("/schedule")', :class='{ active: route.path == "/schedule" }') 赛程
					.text-base.font-semibold.flex.items-center.px-4.cursor-pointer(class='hover:text-psV3Red', @click='gotoPage("/rank")', :class='{ active: route.path == "/rank" }') 排行榜
					.text-base.font-semibold.flex.items-center.px-4.cursor-pointer(class='hover:text-psV3Red', @click='gotoPage("/article/class")', :class='{ active: route.path == "/article/class" }') 资讯
			.FLEX_R.items-center
				.searchBar.FLEX_R.items-center.mx-2
					a-input-search(placeholder='搜寻 直播间', style='width: 200px', @search='onSearch')
				router-link.mx-2(v-if='isLogin && userInfo.is_anchor!==1', to='/anchorauth') 
					.cursor-pointer.rounded-full.text-psV3Yellow.border-2.border-psV3Yellow.p-1
						img.mx-2(src='/publicAssets/img/v3/icon-activity.png')
						span.mr-2 成为主播
				.mx-2(v-if='isLogin && userInfo.is_anchor===1 && !ON_LIVE', @click='gotoPage("/personal/liveConfig")')
					.cursor-pointer.rounded-full.text-psV3Red.border-2.border-psV3Red.p-1
						img.mx-2(src='/publicAssets/img/v3/icon-video.png')
						span.mr-2 开播
				router-link.mx-2(v-if='isLogin && userInfo.is_anchor===1 && ON_LIVE', to='/personal/liveConfig') 
					.cursor-pointer.rounded-full.text-white.bg-psV3Red.border-2.border-psV3Red.p-1
						img.mx-2(src='/publicAssets/img/v3/icon-liveroom.png')
						span.mr-2 直播中
				.userBtn
					.guestUser.cursor-pointer(v-if='!isLogin', @click='showLoginModalHandle(1)')
						span
							img(src='/publicAssets/img/v3/icon-user.png', srcset='/publicAssets/img/v3/icon-user@2x.png 2x')
						span.mr-2(@click='showLoginModalHandle(1)') 登录/註冊
					.userFunctionButton(v-if='isLogin')
						userStaus
</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive } from 'vue';
import userStaus from '@/components/headerNav/userStaus';
import { matomo_tabBar_check_classify, matomo_tabBar_check_campaign, matomo_tabBar_check_schedule, matomo_tabBar_check_rank, matomo_tabBar_check_search, matomo_index_on_live, matomo_tabBar_check_article } from '@/matomoEvent';

export default {
	components: {
		userStaus,
	},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			showTask: false,
			visible: true,
			menu: [1],
			active: 0,
			taskList: [{ taskname: '每日登录', explain: '每日登入增加经验值', complete: 1 }],
			paths: ['/', '/classify/all_live', '/schedule'],
			timer: '',
			isOnLIve: false,
		});
		const logo_navigation = computed(() => store.state.config.logo_navigation || '');
		const userInfo = computed(() => store.state.user.userInfo || '');
		// store
		const token = computed(() => store.state.user.token || '');
		const UID = computed(() => store.state.user.uid || '');
		const ON_LIVE = computed(() => store.state.user.onLive || '');
		// store
		const isLogin = computed(() => store.state.user.token !== '' && store.state.user.uid !== '');
		const onSearch = (value) => {
			if (value !== '') {
				matomo_tabBar_check_search();
				router.replace({ path: '/search', query: { keywords: value } });
			}
		};
		const showLoginModalHandle = (type) => {
			if (route.path === '/login' || route.path === '/register') {
				router.push('/login');
			} else {
				store.commit('user/SHOW_LOGIN_MODEL', type);
			}
		};
		const gotoPage = (url) => {
			if (url === '/classify') {
				matomo_tabBar_check_classify();
			} else if (url === '/campaign') {
				matomo_tabBar_check_campaign();
			} else if (url === '/schedule') {
				matomo_tabBar_check_schedule();
			} else if (url === '/rank') {
				matomo_tabBar_check_rank();
			} else if (url === '/article/class') {
				matomo_tabBar_check_article();
			} else if (url === '/personal/liveConfig') {
				matomo_index_on_live();
			}
			router.push({
				path: url,
			});
		};
		return {
			state,
			store,
			route,
			router,
			logo_navigation,
			userInfo,
			ON_LIVE,
			token,
			isLogin,
			onSearch,
			showLoginModalHandle,
			gotoPage,
		};
	},
};
</script>

<style lang="scss" scoped>
.headerNav {
	position: relative;
	z-index: 2;
	width: 100%;
	min-width: 1200px;
	height: 60px;
	box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
}
.nav {
	.active {
		font-weight: bold;
		color: #a62337;
		border-bottom: 2px solid #a62337;
	}
}
.searchBar {
	::v-deep(.ant-input-search) {
		border-radius: 30px;
		background: #f4f4f4;
		border: none;
		// color: #fff;
	}
	::v-deep(.ant-input) {
		background: none;
		// color: #fff;
	}
	::v-deep(.ant-input-affix-wrapper) {
		width: 128px !important;
		// margin-right: 20px;
	}
}

.login_btn,
.register_btn {
	outline: none;
	width: 70px;
	height: 30px;
	line-height: 30px;
	border-radius: 30px;
	color: #fff;
	cursor: pointer;
}

.login_btn {
	background: rgba(255, 255, 255, 0);
	border: 1px solid #fff;
}
</style>
