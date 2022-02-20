<template lang="pug">
.menu
	.userMode(v-if='state.anchorMode===false')
		router-link.mb-12(v-if='isAnchor===1' ,to='/personal/liveconfig', @click='matomoClick("主播模式")')
			.rounded.bg-psV3Red.shadow.text-white.text-center.p-2.cursor-pointer
				img.mx-2(src='/publicAssets/img/v3/icon-diamond.png' , srcset='/publicAssets/img/v3/icon-diamond@2x.png 2x')
				span 主播模式
		//- ------------------------------------------------------------------------------------------------------------------------------------------------
		router-link(to='/personal/information', @click='matomoClick("我的资料")')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/information"}') 
				.pl-4 我的资料
		router-link(to='/personal/concern', @click='matomoClick("我的关注")')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/concern"}')
				.pl-4 我的关注
		router-link(to='/personal/wallet', @click='matomoClick("我的钱包")')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/wallet"}')
				.pl-4 我的钱包
		router-link(to='/personal/backpack', @click='matomoClick("我的背包")')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/backpack"}')
				.pl-4 我的背包
		router-link(to='/personal/inbox', @click='matomoClick("我的消息")')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/inbox"}')
				.pl-4 我的消息
		router-link(to='/personal/myCode', @click='matomoClick("我的推荐码")')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/myCode"}')
				.pl-4 我的推荐码
		router-link(to='/personal/guesshistory')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/guesshistory"}')
				.pl-4 竞猜纪录
		router-link(v-if='isRoomAdmin.length>0' , to='/personal/usersupervisor', @click='matomoClick("我的推荐码")')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/usersupervisor" }')
				.pl-4 房间管理
	//- ------------------------------------------------------------------------------------------------------------------------------------------------
	.anchorMode(v-if='state.anchorMode===true')
		router-link.mb-12(to='/personal/information', @click='matomoClick("返回用户")')
			.rounded.bg-white.shadow.text-psV3Red.text-center.p-2.cursor-pointer
				img.mx-2(src='/publicAssets/img/v3/icon-exchange-r.png' , srcset='/publicAssets/img/v3/icon-exchange-r@2x.png 2x')
				span 返回用户
		router-link(v-if='isAnchor===1' ,to='/personal/liveconfig' , @click='matomoClick("直播设置")')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/liveconfig" }')
				.pl-4 直播设置
		router-link(v-if='isAnchor===1', to='/personal/liveincome', @click='matomoClick("主播收益")')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/liveincome"}')
				.pl-4 主播收益
		router-link(v-if='isAnchor===1', to='/personal/liver', @click='matomoClick("开播预约")')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/liver"}')
				.pl-4 开播预约
		router-link(v-if='isRoomHost.length>0' ,to='/personal/livesupervisor', @click='matomoClick("房间管理")')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/livesupervisor" }')
				.pl-4 房间设定
		router-link(v-if='isRoomHost.length>0' ,to='/personal/liveguess')
			.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive": route.path == "/personal/liveguess" }')
				.pl-4 竞猜管理
</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { reactive, onMounted, computed, watch } from 'vue';
import { matomo_my_menu_click } from '@/matomoEvent';

export default {
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			showClassifyType: false,
			anchorMode: false,
		});
		const classList = computed(() => store.state.config.classList);
		const userUnreadInbox = computed(() => store.state.user.unreadInbox);
		const userInfo = computed(() => store.state.user.userInfo || '');
		const isRoomAdmin = computed(() => (userInfo.value.identities ? userInfo.value.identities.filter((item) => item.identity === 3) : []));
		const isRoomHost = computed(() => (userInfo.value.identities ? userInfo.value.identities.filter((item) => item.identity === 4) : []));
		const isAnchor = computed(() => userInfo.value.is_anchor || 0);

		const changeAnchorMode = () => {
			router.push('/personal/liveConfig');
		};
		const changeUserMode = () => {
			router.push('/personal/information');
		};
		const checkRoute = () => {
			route.meta.mode === 'user' ? (state.anchorMode = false) : (state.anchorMode = true);
		};
		const matomoClick = (name) => {
			matomo_my_menu_click(name);
		};
		watch(
			() => route.meta,
			(newMode) => {
				checkRoute();
			},
			{ deep: true }
		);
		const selectType = (id, name) => {
			router.replace({
				path: '/classify/live_class',
				query: {
					type: id,
					name: name,
				},
			});
		};
		onMounted(() => {
			checkRoute();
		});
		return {
			route,
			router,
			state,
			userInfo,
			isAnchor,
			isRoomAdmin,
			isRoomHost,
			classList,
			userUnreadInbox,
			selectType,
			checkRoute,
			changeAnchorMode,
			changeUserMode,
			matomoClick,
		};
	},
};
</script>
<style lang="scss" scoped></style>
