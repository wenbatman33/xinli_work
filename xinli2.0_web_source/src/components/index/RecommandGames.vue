<template lang="pug">
.RecommandGames.my-8.gap-4
	.container.FLEX_R
		.flex-shrink-0(v-if='playedGameList.length>0')
			.FLEX_C
				.text-2xl.font-bold.border-l-4.border-xRed.px-2.my-2 {{t('game_played_game')}}
				.flex.gap-4
					.FLEX_R(v-for='item in playedGameList')
						img.w-28.rounded-lg.cursor-pointer(:src='apiImgPath(item?.gameList?.imagePc)' @error='errorImg' @click='gamePlay(item?.gameList)')

		.flex-grow.overflow-hidden
			.FLEX_C
				.text-2xl.font-bold.border-l-4.border-xRed.px-2.my-2 {{t('game_recommend_game')}}
				.flex.flex-nowrap.gap-4
					.w-28(v-for='item in recommendGames')
						//- p {{item}} 
						img.w-28.rounded-lg.cursor-pointer(:src='apiImgPath(item?.imagePc)'  @error='errorImg'  @click='gamePlay(item)')
			

</template>

<script setup lang="ts">
	import { ref, computed, onMounted, watch } from 'vue';
	import { getPlayedGame, getHotgame, getGameRecommendedgame } from '@/api';
	import type { GAMEAJAX_HotGameData } from '@/api/model';
	import { apiImgPath, errorImg } from '@/utils';
	import { gameLoing } from '@/api';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { GameStore } from '@/store/gameStore';

	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const userStore = UserStore();
	const systemStore = SystemStore();
	const gameStore = GameStore();
	const playedGameList = ref([] as GAMEAJAX_HotGameData[]);

	const gamePlay = (item: any) => {
		if (userStore.userInfo.account) {
			gameStore.gameLoingHandle(item?.id, item.openWay, item.gameTypeID);
		} else {
			systemStore.commonLogin();
		}
	};

	const recommendList = ref([] as any);
	const recommendGames = computed(() => {
		const lens = 9 - playedGameList.value.length;
		const list = recommendList?.value?.filter((item: any, index: any) => index < lens);
		return list;
	});
	const init = async () => {
		const recommendRes = await getGameRecommendedgame();
		recommendList.value = recommendRes?.data?.data?.list || [];
		// 登入後取得曾經遊玩遊戲
		if (userStore?.userInfo?.id && userStore?.userInfo?.account) {
			const res = await getPlayedGame();
			const games = res?.data?.data?.list?.filter((item, index) => index < 5) || [];
			playedGameList.value = games || [];
		}
	};
	onMounted(() => {
		init();
	});
</script>

<style lang="scss" scoped></style>
