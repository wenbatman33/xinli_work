<template lang="pug">
#headerNav.fixed.z-20(v-if='showHeaderNav' :class='"w-full h-[106px]"')
	.subMenu.FrostedGlass(:class='{"bg-white bg-opacity-80 shadow-xl": showNavBgColor ==true || showSubMenu, "h-[360px]": showSubMenu, "h-[106px]": !showSubMenu, }')
		.container.transition(v-if='showSubMenu' @mouseleave='navMouseOut')
			.FLEX_R
				.CENTER_C.mr-4.p-2(:class='"w-[160px] h-[200px]"')
					.text-xBlue.highlightTitle {{currentName}}{{t('subMenu_type_title_bet')}}
					.Rubika.highlight {{currentRatio}}
					.text-sm {{t('nav_sub_dec')}}
				.CENTER_C.cursor-pointer.mr-4.p-2(v-for='sitem in subMenuData' :class='"hover:navHoverJump"')
					.relative.overflow-hidden.CENTER(:class='"w-[160px] h-[200px]"')
						NoSevice(v-if='sitem.status===3' :data='sitem')
						img(:class='"w-[160px]"' :src='apiImgPath(sitem?.imagePc)' @error='errorImg' @click='playHandle(sitem)')
					
	.topMenu(:class='"w-full h-[106px]"')
		.container.h-full
			.FLEX_R.h-full
				.flex.flex-shrink-0.mx-4.items-center
					router-link(to='/')
						img(class='w-[114px]' :src='logo')
						
				.menuLink.flex-grow
					.grid.grid-cols-8.h-full(v-if="lobby.length>0")
						.col-span-1.CENTER.cursor-pointer
							.text-base.font-semibold(
								:class='"mx-2 transition opacity-50 hover:opacity-100"'
								@mouseover='showSubMenu = false' 
								@click='gotoIndex') {{t('nav_label_0')}}
						
						.col-span-1.CENTER.cursor-pointer(v-for='item in lobby')
							.text-base.font-semibold(
								:class='{ "Subtitle_1 opacity-100 border-xRed border-b-2": checkRouter(item), "mx-2 transition opacity-50 hover:opacity-100": true }'
								@mouseover='navMouseOver(item)' @click='gotoPlay(item)') {{item.name}}
				

				.secondMenuArray.flex.items-center.px-4(:class='"w-[320px]"')
					.grid.grid-cols-4.WH_FULL
						.col-span-1.CENTER.mx-2.text-center(v-for='item in secondMenuArray')
							.Subtitle_3.opacity-50.cursor-pointer(:class='"hover:opacity-100"' @click='jumpLink(item.path)') 
								p.text-center
									SvgIcon.w-6.h-6.text-paimary(:name='item.icon')
								p.text-center {{ item.name }}
								
				.logInStatus.FLEX_C_CENTER(v-if='!userStore.userInfo.account')
					.flex
						a-button.w-24.mx-1(type='primary' danger @click='loginHandle') {{$t('menu_login')}}
						a-button.w-24.cancelBtn.mx-2(@click='registerHandle') {{$t('menu_register')}}
						
				.logInStatus.FLEX_C_CENTER(:class='"w-260px]"' v-else)
					.FLEX_R.my-2
						router-link(to='/personal/inbox')
							.notify.FLEX_R_CENTER.mx-2
								SvgIcon.w-6.h-6.text-paimary(:name='"#Bell_Unread"' v-if='eventStore.unReadCount>0')
								SvgIcon.w-6.h-6.text-paimary(:name='"#Bell_Read"' v-else)
								
								span.mx-2 {{ $t('nav_notify') }}
								span.bg-xBlue.bg-opacity-60.rounded-full.text-white.px-2.CENTER {{eventStore.unReadCount}}
						a-dropdown
							.user.FLEX_R.mx-2.cursor-pointer
								.levelFlag.BG_GRADIENT_1.w-6.h-6.rounded.text-white.CENTER.mx-2 V1
								span.truncate {{userStore.userInfo.account}}
								
							template(#overlay)
								a-menu.p-2
									a-menu-item.p-2(v-for='pitem in personalMenuArray')
										router-link(:to='pitem.path')
											SvgIcon.w-5.h-5.text-paimary.mx-2(:name='pitem.icon')
											span.Body_4 {{pitem.name}}
									a-menu-item.p-2(@click='logOutHandle')
										SvgIcon.w-5.h-5.text-paimary.mx-2(:name='"#Logout"')
										span.Body_4 {{t('nav_logout')}}
											
					.MyWalle.relative
						.money.rounded-full.bg-xBlue.bg-opacity-5.FLEX_R.cursor-pointer
							.rounded-full.BG_GRADIENT_1.text-white.p-1.px-2(@click='walletHandle') {{t('nav_add_value')}}
							.text-primary.p-1.px-2.mx-2(@click='toggleMyWallet') ¥ {{commaFormat(userStore.money)}}
						MyWallet(v-if='systemStore.myWalletVisabled')
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, onUnmounted } from 'vue';
	import { GameStore } from '@/store/gameStore';
	import { SystemStore } from '@/store/systemStore';
	import { EventStore } from '@/store/eventStore';
	import { UserStore } from '@/store/userStore';
	import { useI18n } from 'vue-i18n';
	import { useRoute, useRouter } from 'vue-router';
	import type { GAMEAJAX_GameGroupLobbyGameTypeListDTO, GAMEAJAX_GameGroupLobbyGameGroupListDTO } from '@/api/model';
	import { apiImgPath, commaFormat } from '@/utils';
	import { errorImg } from '@/utils';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import MyWallet from '@/components/Wallet/MyWallet.vue';
	import NoSevice from '@/components/Nav/NoSevice.vue';

	const { t } = useI18n();

	const logo = `${window.staticPath}/static/img/logo@2x.png`;
	const No_Sevice = `${window.staticPath}/static/img/svg/No_Sevice.svg`;

	const route = useRoute();
	const router = useRouter();
	//////////////////////////////////////////
	const systemStore = SystemStore();
	const userStore = UserStore();
	const gameStore = GameStore();
	const eventStore = EventStore();
	//////////////////////////////////////////
	const showHeaderNav = computed(() => systemStore.NO_NAV !== false);
	const currentID = ref<number | undefined>(0);
	const currentName = ref<string>('');
	const currentRatio = ref<string>('');
	const showSubMenu = ref<boolean>(false);
	const subMenuData = ref<GAMEAJAX_GameGroupLobbyGameGroupListDTO[]>([]);
	const lobby = computed(() => gameStore.lobby as GAMEAJAX_GameGroupLobbyGameTypeListDTO[]);
	const showNavBgColor = ref(false);

	const checkRouter = (menuItem: any) => {
		// 判斷 active 狀態
		const filterItem = mainMenuArray.value.filter((item) => item.id === menuItem.id)[0];
		return route.path === filterItem?.path;
	};
	const playHandle = (item: any) => {
		if (userStore.userInfo.account) {
			checkOpenWay(item);
		} else {
			systemStore.commonLogin();
		}
	};
	const checkOpenWay = (item: any) => {
		if (item.openWay === 3) {
			const json = item.openGameListIDs;
			console.log(subMenuData.value);
			gameStore.gameList = json;
			gameStore.currentgameID = currentID.value;

			systemStore.gamerRoomListModelVisabled = true;
		} else if (item.openWay === 2) {
			gameStore.gameLoingHandle(item.openGameListIDs[0].id, item.openWay, item.id);
		} else {
			gameStore.gameLoingHandle(item?.id, item.openWay, item.id);
		}
	};
	const toggleMyWallet = () => {
		systemStore.toggleMyWallet();
	};
	const scrollEvent = () => (window.scrollY > 50 ? (showNavBgColor.value = true) : (showNavBgColor.value = false));
	onMounted(() => {
		window.addEventListener('scroll', scrollEvent);
		scrollEvent();
	});
	onUnmounted(() => {
		window.removeEventListener('scroll', scrollEvent);
	});

	const mainMenuArray = ref([
		{ path: '/', name: t('nav_label_0') },
		{ id: 1, ratio: '1.00%', name: t('nav_label_1') },
		{ id: 2, ratio: '1.00%', name: t('nav_label_2') },
		{ id: 3, ratio: '0.80%', name: t('nav_label_3') },
		{ id: 4, ratio: '1.00%', name: t('nav_label_4') },
		{ id: 5, ratio: '1.00%', name: t('nav_label_5') },
		{ id: 6, ratio: '1.00%', name: t('nav_label_6') },
		{ id: 7, ratio: '1.20%', name: t('nav_label_7') },
	]);
	const secondMenuArray = ref([
		{ path: '/promotion', name: t('subNav_label_1'), icon: '#Gift_Light' },
		{ path: '/personal/VIP', name: t('subNav_label_2'), icon: '#VIP' },
		{
			path: 'https://rule.xinli18sport.com/affiliate/index.html?token=&uuid=731c47cf-5644-459f-b29e-446c81c15374',
			name: t('subNav_label_3'),
			icon: '#Affiliate',
		},
		{ path: '/casino9', name: t('subNav_label_4'), icon: '#Client_Service' },
	]);

	const personalMenuArray = ref([
		{ path: '/personal/personal', name: t('personal_personal'), icon: '#Setting', unread: 0 },
		{ path: '/personal/VIP', name: t('personal_VIP'), icon: '#VIP', unread: 0 },
		{ path: '/personal/profile', name: t('personal_profile'), icon: '#User_Info', unread: 0 },
		{ path: '/personal/bethistory', name: t('personal_bethistory'), icon: '#Bet_Rcord', unread: 0 },
		{
			path: '/personal/transaction',
			name: t('personal_transaction'),
			icon: '#Trade_Record',
			unread: 0,
		},
		{ path: '/personal/atm', name: t('personal_atm'), icon: '#Credit_Card', unread: 0 },
		// { path: '/personal/device', name: t('personal_device'), icon: '#Device', unread: 0 },
		{ path: '/personal/inbox', name: t('personal_inbox'), icon: '#Inbox', unread: 5 },
	]);

	const jumpLink = (link: string) => {
		if (link.indexOf('http') >= 0) {
			window.open(link, '_blank');
		} else {
			router.push(link);
		}
	};

	const gotoIndex = () => {
		router.push('/');
	};

	const gotoPlay = (item?: GAMEAJAX_GameGroupLobbyGameTypeListDTO) => {
		if (item?.id === 2) {
			router.push('/casino');
			showSubMenu.value = false;
		} else if (item?.id === 5) {
			router.push('/chess/hot');
			showSubMenu.value = false;
		} else if (item?.id === 6) {
			router.push('/fish/hot');
			showSubMenu.value = false;
		} else if (item?.id === 7) {
			router.push('/slot/hot');
			showSubMenu.value = false;
		}
	};

	const navMouseOver = (item?: GAMEAJAX_GameGroupLobbyGameTypeListDTO) => {
		// 滑鼠移出視窗外的事件
		document?.addEventListener('mouseleave', (event) => navMouseOut());
		// 先收起 SubNav
		showSubMenu.value = false;
		currentID.value = item?.id;
		currentName.value = item?.name || '';
		const filterItem = mainMenuArray.value.filter((i) => i.id === item?.id)[0];
		currentRatio.value = filterItem?.ratio || '';

		const condition_1 = item?.id !== 2 && item?.id !== 5 && item?.id !== 6 && item?.id !== 7;
		const condition_2 = item?.gameGroupList && item.gameGroupList?.length > 1 ? true : false;
		setTimeout(() => (showSubMenu.value = condition_1 && condition_2), 100);
		subMenuData.value = item?.gameGroupList?.filter((item) => item.id !== 0) || [];
	};
	const navMouseOut = () => {
		// 取消滑鼠移出視窗外的事件
		document?.removeEventListener('mouseleave', (event) => navMouseOut());
		setTimeout(() => (showSubMenu.value = false), 300);
		currentID.value = 0;
	};
	// 	共同登入
	const loginHandle = () => systemStore.commonLogin();
	const registerHandle = () => systemStore.commonRegiste();

	// 	舊版登入
	// const loginHandle = () => systemStore.loginModalShow();
	// const registerHandle = () => systemStore.registerModalShow();

	const walletHandle = () => systemStore.walletToggle(true);
	const logOutHandle = () => userStore.clearUserInfo();
	onUnmounted(() => {
		document?.removeEventListener('mouseleave', (event) => navMouseOut());
	});
</script>
<style scoped lang="scss">
	.active {
		color: red;
	}
	.FrostedGlass {
		backdrop-filter: blur(10px);
		// background: rgba(255, 255, 255, 0.6);
	}
	.topMenu {
		top: 0px;
		left: 0px;
		width: 100%;
		position: absolute;
	}
	.subMenu {
		top: 0px;
		left: 0px;
		width: 100%;
		overflow: hidden;
		position: absolute;
		padding-top: 106px;
		transition: height 0.3s;
	}
</style>
