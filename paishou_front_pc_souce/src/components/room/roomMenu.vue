<template lang="pug">
.roomMenu.w-full.h-full.relative
	.absolute.w-11.h-11.CENTER.rounded-full.bg-white.shadow.cursor-pointer(style='right:-20px; top:50%;', @click='menuSwitch')
		img(v-if='roomMenuOpen', src='/publicAssets/img/v3/icon-left.png', srcset='/publicAssets/img/v3/icon-left@2x.png 2x')
		img(v-else, src='/publicAssets/img/v3/icon-right.png', srcset='/publicAssets/img/v3/icon-right@2x.png 2x')
	.FLEX_C.h-full.BETWEEN.text-center
		.FLEX_C
			.logo.w-full.my-2
				router-link(to='/')
					img(class='w-[72px]', :src='logo_living')
		.FLEX_C.flex-grow.overflow-y-auto
			.FLEX_C
				.searchBar.w-full.CENTER.p-2.px-4(v-if='roomMenuOpen')
					a-input-search.w-full(placeholder='搜寻 直播间', @search='onSearch')

				.grid(:class='roomMenuOpen?"grid-cols-2":"grid-cols-1"')
					.col-span-1.menuBtn.h-16.border-b.cursor-pointer.text-center.items-center(
						class='hover:bg-psV3Red hover:text-white',
						:class='roomMenuOpen?"CENTER_R border-r":"CENTER_C"', 
						@mouseover='state.hoverIndex=1',
						@mouseout='state.hoverIndex=0',
						@click='gotoPage("/")')
							img.w-5(:src='state.hoverIndex===1?"/publicAssets/img/v3/icon-home-w.png":"/publicAssets/img/v3/icon-home-b.png"')
							span.font-bold 首页

					.col-span-1.menuBtn.h-16.border-b.cursor-pointer.text-center.items-center(
						class='hover:bg-psV3Red hover:text-white',
						:class='roomMenuOpen?"CENTER_R border-r":"CENTER_C"', 
						@mouseover='state.hoverIndex=2',
						@mouseout='state.hoverIndex=0',
						@click='gotoPage("/classify")')
							img.w-5(:src='state.hoverIndex===2?"/publicAssets/img/v3/icon-category-w.png":"/publicAssets/img/v3/icon-category-b.png"')
							span.font-bold 分类

					.col-span-1.menuBtn.h-16.border-b.cursor-pointer.text-center.items-center(
						class='hover:bg-psV3Red hover:text-white',
						:class='roomMenuOpen?"CENTER_R border-r":"CENTER_C"', 
						@mouseover='state.hoverIndex=3',
						@mouseout='state.hoverIndex=0',
						@click='gotoPage("/schedule")')
							img.w-5(:src='state.hoverIndex===3?"/publicAssets/img/v3/icon-game-w.png":"/publicAssets/img/v3/icon-game-b.png"')
							span.font-bold 赛程

					.col-span-1.menuBtn.h-16.border-b.cursor-pointer.text-center.items-center(
						class='hover:bg-psV3Red hover:text-white',
						:class='roomMenuOpen?"CENTER_R border-r":"CENTER_C"', 
						@mouseover='state.hoverIndex=4',
						@mouseout='state.hoverIndex=0',
						@click='gotoPage("/rank")')
							img.w-5(:src='state.hoverIndex===4?"/publicAssets/img/v3/icon-trophy-w.png":"/publicAssets/img/v3/icon-trophy-b.png"')
							span.font-bold 排行榜

					.col-span-1.menuBtn.h-16.border-b.cursor-pointer.text-center.items-center(
						class='hover:bg-psV3Red hover:text-white',
						:class='roomMenuOpen?"CENTER_R border-r":"CENTER_C"', 
						@mouseover='state.hoverIndex=5',
						@mouseout='state.hoverIndex=0',
						@click='gotoPage("/campaign")')
							img.w-5(:src='state.hoverIndex===5?"/publicAssets/img/v3/icon-activity-w.png":"/publicAssets/img/v3/icon-activity-b.png"')
							span.font-bold 活动

					.col-span-1.menuBtn.h-16.border-b.cursor-pointer.text-center.items-center(
						class='hover:bg-psV3Red hover:text-white',
						:class='roomMenuOpen?"CENTER_R border-r":"CENTER_C"', 
						@mouseover='state.hoverIndex=6',
						@mouseout='state.hoverIndex=0',
						@click='gotoPage("/article/class")')
							img.w-5(:src='state.hoverIndex===6?"/publicAssets/img/v3/icon-article-w.png":"/publicAssets/img/v3/icon-article-b.png"')
							span.font-bold 资讯

					.col-span-2.menuBtn.h-16.border-b.cursor-pointer.text-center.items-center(
						v-if='isLogin && roomMenuOpen',
						class='hover:bg-psV3Red hover:text-white',
						:class='roomMenuOpen?"CENTER_R border-r":"CENTER_C"', 
						@mouseover='state.hoverIndex=7',
						@mouseout='state.hoverIndex=0',
						@click='gotoPage("/personal/concern")')
							img.w-5(:src='state.hoverIndex===7?"/publicAssets/img/v3/icon-heart-w.png":"/publicAssets/img/v3/icon-heart-b.png"')
							span.font-bold 我的关注

			.classList.FLEX_C.p-2(v-if='roomMenuOpen',)
				.text-gray-500.text-left.mb-2 分类
				.grid.grid-cols-2.gap-2
					.col-span-1.bg-gray-50.h-10.CENTER.cursor-pointer(
						v-for='(citem, cindex) in currentClassList', 
						:key='citem.id', 
						class='hover:bg-psV3Red hover:text-white',
						@click='gotoClassify(citem.id, citem.name)') {{ citem.name }}
		.FLEX_C
			.w-full.CENTER
				img.cursor-pointer.mb-4(class='w-[60px]', :src='state.serviceIconForOlympic?.slide_pic', @click='gotoDeepLink(state.serviceIconForOlympic?.slide_url)')
			.w-full.CENTER.flex-row.py-4.border-b
				.AVATAR.w-10.h-10.mr-2.cursor-pointer(v-if='isLogin', @click='gotoPage("/personal/information")')
					img(:src='AVATAR', @error='errorPersonImg')
				.userInfo(v-if='USER_INFO && roomMenuOpen')
					.text-left
						img.w-6.mx-1(v-if='levelAnchorThumb', :src='levelAnchorThumb')
						img.w-6.mx-1(v-if='userLevelThumb(USER_INFO.level)', :src='userLevelThumb(USER_INFO.level)')
					h5.text-left.truncate {{ USER_INFO.user_nicename}}

				.guestUser.cursor-pointer(v-if='!isLogin', @click='showLoginModalHandle(1)')
					span
						img.w-6.h-6(src='/publicAssets/img/v3/icon-user.png', srcset='/publicAssets/img/v3/icon-user@2x.png 2x')
					span 登录/註冊
			.FLEX_C
				.grid(:class='roomMenuOpen?"grid-cols-2":"grid-cols-1"')
					.col-span-1.py-4.border-b.w-full.text-center.cursor-pointer(:class='roomMenuOpen?"border-r":""', @click='roomContentScrollTop')
						img.w-5(src='/publicAssets/img/v3/icon-top-web.png', srcset='/publicAssets/img/v3/icon-top-web@2x.png 2x')
						span.text-psV3Red 顶部
					.col-span-1.py-4.border-b.w-full.text-center.cursor-pointer(:class='roomMenuOpen?"border-r":""', @click='gotoPage("/download")')
						img(src='/publicAssets/img/v3/icon-arrowdown.png', srcset='/publicAssets/img/v3/icon-arrowdown@2x.png 2x')
						span.text-psV3Red 下载App
</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, reactive, onMounted } from 'vue';
import userStaus from '@/components/headerNav/userStaus';
import { matomo_tabBar_check_classify, matomo_tabBar_check_campaign, matomo_tabBar_check_schedule, matomo_tabBar_check_rank, matomo_tabBar_check_search, matomo_index_on_live } from '@/matomoEvent';
import { matomo_liveRoom_open_menu } from '@/matomoEvent';
import { userLevelThumb, deepLink } from '@/utils';
import { slideList } from '@/api';
import { errorPersonImg } from '@/utils';

export default {
	components: {
		userStaus,
	},
	props: ['roomMenuOpen'],
	setup(props, { emit }) {
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
			serviceIcon: null,
			hoverIndex: 0,
			serviceIconForOlympic: null,
		});
		const logo_living = computed(() => store.state.config.logo_living || '');
		const USER_INFO = computed(() => store?.state?.user?.userInfo || '');
		const AVATAR = computed(() => store?.state?.user?.userInfo?.avatar || '');
		// store
		const UID = computed(() => store?.state?.user?.uid || '');
		const levelAnchorThumb = computed(() => store?.state?.user?.userInfo?.level_anchor_info?.thumb);
		const userUnreadInbox = computed(() => store?.state?.user?.unreadInbox);
		const ON_LIVE = computed(() => store?.state?.user?.onLive || '');
		const currentClassList = computed(() => store.state.config.currentclassList);
		// store
		const isLogin = computed(() => store?.state?.user?.token !== '' && store?.state?.user?.uid !== '');
		const onSearch = (value) => {
			if (value !== '') {
				matomo_tabBar_check_search();
				router.replace({ path: '/search', query: { keywords: value } });
			}
		};
		const menuSwitch = () => {
			matomo_liveRoom_open_menu();
			emit('switch');
		};
		const showLoginModalHandle = (type) => {
			if (route.path === '/login' || route.path === '/register') {
				router.push('/login');
			} else {
				store.commit('user/SHOW_LOGIN_MODEL', type);
			}
		};
		const roomContentScrollTop = () => (window.document.querySelector('#roomContent').scrollTop = 0);
		const openLiveChat = () => {
			try {
				window.LC_API.open_chat_window();
			} catch (e) {
				// console.log(e);
			}
		};
		const gotoClassify = (id, name) => {
			router.push({
				path: '/classify',
				query: { type: id, name: name },
			});
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
			} else if (url === '/personal/liveConfig') {
				matomo_index_on_live();
			}
			router.push({
				path: url,
			});
		};
		const gotoDeepLink = (link) => {
			deepLink(link);
		};
		onMounted(() => {
			slideList({ slide_cid: 28 }).then((res) => {
				state.serviceIconForOlympic = res.data.list ? res.data.list[0] : '';
			});
		});
		return {
			state,
			store,
			route,
			router,
			logo_living,
			USER_INFO,
			AVATAR,
			userUnreadInbox,
			currentClassList,
			ON_LIVE,
			isLogin,
			onSearch,
			showLoginModalHandle,
			gotoPage,
			menuSwitch,
			roomContentScrollTop,
			levelAnchorThumb,
			userLevelThumb,
			openLiveChat,
			gotoClassify,
			gotoDeepLink,
			errorPersonImg,
		};
	},
};
</script>

<style lang="scss" scoped>
.headerNav {
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
