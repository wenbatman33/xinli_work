<template lang="pug">
.pageContainer.pb-10
	.container.select-none
		.grid.grid-cols-12.gap-4
			.col-span-2
				.sideMenu.min-h-screen.rounded.bg-white.FLEX_C.py-4
					.chessItem.h-14
						.CENTER.items-center.h-full.cursor-pointer(:class='{"bg-gray-100": route.params.id ==="hot"}'  @click='showHotGame') 
							.mr-4
								img.w-8(:src='Hot')
							span {{groupName}}

					.chessItem.h-14
						.CENTER.items-center.h-full.cursor-pointer(:class='{"bg-gray-100": route.params.id ==="favorite"}'  @click='showFavorite') 
							.mr-4
								img.w-8(:src='FavoriteImage')
							span {{t('game_favorite')}}

					.chessItem.h-14(v-for='item in currentGameType') 
						.CENTER.items-center.h-full.cursor-pointer(:class='{"bg-gray-100": route.params.id ===String(item.id)}'  @click='changeGameGroup(item)') 
							.mr-4
								img.w-8(:src='apiImgPath(item.imagePc)')
							span {{item.displayName}}

			.col-span-10
				HotGameList(v-if='route.params.id ==="hot"')
				FavoriteList(v-if='route.params.id ==="favorite"')
				GaemList(v-if='route.params.id !=="hot" && route.params.id !=="favorite"')
</template>

<script setup lang="ts">
	import { reactive, computed, onMounted } from 'vue';
	import { GameStore } from '@/store/gameStore';
	import { notification } from 'ant-design-vue';
	import { apiImgPath } from '@/utils';
	import { useRoute, useRouter } from 'vue-router';
	import { useI18n } from 'vue-i18n';
	import HotGameList from '@/views/Game/HotGameList.vue';
	import FavoriteList from '@/views/Game/FavoriteList.vue';
	import GaemList from '@/views/Game/GaemList.vue';

	const { t } = useI18n();
	const route = useRoute();
	const router = useRouter();
	/* components */
	/* assets */
	const Hot = `${window.staticPath}/static/img/game/chess/Hot.svg`;
	const FavoriteImage = `${window.staticPath}/static/img/game/chess/Game_Image1@2x.png`;
	const gameStore = GameStore();

	const showHotGame = () => {
		router.push({ name: state.currentPathName, params: { id: 'hot' } });
	};

	const showFavorite = () => {
		router.push({ name: state.currentPathName, params: { id: 'favorite' } });
	};
	const changeGameGroup = (item: any) => {
		router.push({ name: state.currentPathName, params: { id: String(item.id) } });
	};
	const state = reactive({
		groupName: '',
		currentPathName: '',
		gameTypeID: 0,
	});
	const groupName = computed(() => {
		if (route.path.indexOf('/chess') >= 0) {
			state.groupName = t('game_hot_chess');
			state.gameTypeID = 5;
			state.currentPathName = 'Chess';
		} else if (route.path.indexOf('/fish') >= 0) {
			state.groupName = t('game_hot_fish');
			state.gameTypeID = 6;
			state.currentPathName = 'Fish';
		} else if (route.path.indexOf('/slot') >= 0) {
			state.groupName = t('game_hot_slot');
			state.gameTypeID = 7;
			state.currentPathName = 'Slot';
		}
		return state.groupName;
	});
	const currentGameType = computed(() => {
		const array = gameStore?.lobby.filter((item: any) => item.id === state.gameTypeID)[0]?.gameGroupList;
		// 刪除 全部 0 的預設值選項
		return array?.filter((item: any) => item.id !== 0);
	});
</script>
