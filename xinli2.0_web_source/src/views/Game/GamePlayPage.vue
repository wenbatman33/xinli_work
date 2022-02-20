<template lang="pug">
.pageContainer.min-h-screen
	.container.pb-8.select-none
		.flex.rounded-xl(:class='"h-[600px]"')
			.chessMenu.rounded.bg-white.FLEX_C.flex-shrink-0.py-4(v-if='!TheaterMode' :class='"w-[220px]"')
				.sideMenu.rounded.bg-white.FLEX_C.py-4
					.chessItem.h-14
						.CENTER.items-center.h-full.cursor-pointer(:class='{"bg-gray-100": route.params.id ==="hot"}'  @click='showHotGame') 
							.mr-4
								img.w-8(:src='Hot')
							span {{state.groupName}}

					.chessItem.h-14
						.CENTER.items-center.h-full.cursor-pointer(:class='{"bg-gray-100": route.params.id ==="favorite"}'  @click='showFavorite') 
							.mr-4
								img.w-8(:src='FavoriteImage')
							span {{t('game_favorite')}}

					.chessItem.h-14(v-for='item in currentGameType')
						.CENTER.items-center.h-full.cursor-pointer(:class='{"bg-gray-100": state.currentId===item.id}' @click='changeGameGroup(item)') 
							.mr-4
								img.w-8(:src='item?.imagePc')
							span {{item?.displayName}}

			.chessGameContainer.FLEX_C.flex-grow
				#gameIFrameWarp.flex-grow.bg-gray-900
					iframe.WH_FULL(id='gameIFrame')

				.chessGameControlBar.flex.bg-gray-100.h-16.bg-xBlue.bg-opacity-5 
					.BETWEEN_CENTER.WH_FULL.p-2.px-4
						span
							span.Subtitle_4 {{t('game_wallet_balance')}}
							span.Body_4.mx-2.mr-8 ¥ {{userStore.money}}
							a-button(@click='showWallet') {{t('game_deposit_now')}}
						div
							span.mx-2
								SvgIcon.w-5.h-5.text-paimary.cursor-pointer(v-if='!TheaterMode' :name='"#Screen_Theater_On"' @click='toggelTheaterMode')
								SvgIcon.w-5.h-5.text-paimary.cursor-pointer(v-if='TheaterMode' :name='"#Screen_Theater_Off"' @click='toggelTheaterMode')

							span.mx-2
								SvgIcon.w-5.h-5.text-paimary.cursor-pointer(:name='"#Screen_Fullscreen"' @click='fullScreen')

						
</template>

<script setup lang="ts">
	import { reactive, ref, onMounted, computed } from 'vue';
	import { SystemStore } from '@/store/systemStore';
	import { UserStore } from '@/store/userStore';
	import { GameStore } from '@/store/gameStore';
	import { useI18n } from 'vue-i18n';
	import { useRoute, useRouter } from 'vue-router';
	/* components */
	import GameItem from '@/components/Game/GameItem.vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	/* assets */
	const Hot = `${window.staticPath}/static/img/game/chess/Hot.svg`;
	const FavoriteImage = `${window.staticPath}/static/img/game/chess/Game_Image1@2x.png`;

	const route = useRoute();
	const router = useRouter();

	const systemStore = SystemStore();
	const userStore = UserStore();
	const gameStore = GameStore();

	const TheaterMode = ref(false);
	const state = reactive({
		currentId: 1,
		groupName: '',
		currentPathName: '',
		gameTypeID: 0,
		chessMenu: [],
		HotGameList: [],
	});
	const showHotGame = () => {
		router.push({ name: state.currentPathName, params: { id: 'hot' } });
	};

	const showFavorite = () => {
		router.push({ name: state.currentPathName, params: { id: 'favorite' } });
	};
	const changeGameGroup = (item: any) => {
		router.push({ name: state.currentPathName, params: { id: String(item.id) } });
	};

	const currentGameType = computed(() => {
		const array = gameStore?.lobby.filter((item: any) => {
			return item.id === state.gameTypeID;
		})[0]?.gameGroupList;
		return array?.filter((item: any) => item.id !== 0);
	});
	const showWallet = () => {
		systemStore.walletToggle(true);
	};
	const toggelTheaterMode = () => {
		TheaterMode.value = !TheaterMode.value;
	};

	const fullScreen = () => {
		const elem: any = document.getElementById('gameIFrameWarp');
		if (elem?.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.msRequestFullscreen) {
			elem?.msRequestFullscreen();
		} else if (elem?.mozRequestFullScreen) {
			elem?.mozRequestFullScreen();
		} else if (elem?.webkitRequestFullscreen) {
			elem?.webkitRequestFullscreen();
		}
	};
	onMounted(() => {
		if (route.name === 'ChessGamePage') {
			state.groupName = t('game_hot_chess');
			state.gameTypeID = 5;
			state.currentPathName = 'Chess';
		} else if (route.name === 'FishGamePage') {
			state.groupName = t('game_hot_fish');
			state.gameTypeID = 6;
			state.currentPathName = 'Fish';
		} else if (route.name === 'SlotGamePage') {
			state.groupName = t('game_hot_slot');
			state.gameTypeID = 7;
			state.currentPathName = 'Slot';
		}
		(window.document.getElementById('gameIFrame') as HTMLFormElement).src = route.query.path;
	});
</script>
