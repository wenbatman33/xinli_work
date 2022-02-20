<template lang="pug">
a-modal(:visible='showGameModal',width='800px' :class='"gameModal"', :bodyStyle='{"background":"#f4f5f8", "border-radius": "8px"}',  closable='', :footer='null', @cancel='closeMode')
	.gameInfo(v-if='currentGame')
		h6.text-center {{currentGame.cn || currentGame.title}}
		.flex.justify-around.my-2
			.CENTER_C(class='w-1/3')
				.w-14
					img.w-full(:src='currentGame.hlog || currentGame.home_logo', @error='errorTeamImg')
				.home.font-bold.truncate {{currentGame.home || currentGame.home_name }}
				.homescore.font-bold.truncate(v-if='currentGame.homescore') {{currentGame.homescore}}
			.FLEX_C.justify-center.text-center.items-center(class='w-1/3')
				.text-xs {{currentGame.begin_date || currentGame.date}}
				h3.text-psV3Yellow(v-if='checkGameTime(currentGame)==="10_mins"') 即将开赛
				h3.text-psV3Red(v-if='checkGameTime(currentGame)==="gameOnTime"') 赛事进行中
				h2.text-gray-500(v-if='checkGameTime(currentGame)==="none"') {{currentGame.begin1 || currentGame.time}}
			.CENTER_C(class='w-1/3')
				.w-14
					img.w-full(:src='currentGame.alog || currentGame.away_logo', @error='errorTeamImg')
				.away.font-bold.truncate {{currentGame.away || currentGame.away_name}}
				.awayscore.font-bold.truncate(v-if='currentGame.awayscore') {{currentGame.awayscore}}

		h4.text-center 选择主播
		h5.text-center.my-2 
			span.text-psV3Yellow.mr-2 {{currentGame.anchor_info.length}} 
			span.text-gray-300 位主播
		.grid.grid-cols-2.gap-4.px-12.py-4
			.col-span-1(v-for='(subItem, subIndex) in currentGame.anchorList')
				.CENTER_BETWEEN.px-4
					.FLEX_R.items-center
						img.AVATAR.mr-1.shadow-lg.w-10.h-10.border(:src='subItem.avatar', @error='errorPersonImg')
						.ml2.opacity-50(:class='{"opacity-100":subItem.isLive===1}')
							.FLEX_R
								.w-6.mr-2
									img.w-full(:src='levelAnchorbyLevel(subItem.level)')
								.w-6
									img.w-full(v-if='subItem.isLive===1', src='/publicAssets/img/v3/img-live-b.png', srcset='/publicAssets/img/v3/img-live-b@2x.png 2x')
							h4 {{subItem.user_nicename}}
					.enterBtn.bg-psV3Yellow.text-white.rounded-full.shadow.cursor-pointer.px-4(v-if='subItem.isLive===1', @click='viewLive(subItem.id)')
						span.text-xs 進入
</template>

<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { reactive, computed, onMounted } from 'vue';
import { errorPersonImg, errorTeamImg } from '@/utils';

export default {
	components: {},
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const currentGame = computed(() => store.state.game.currentGame);
		const showGameModal = computed(() => store.state.game.showGameModal);
		const LEVEL_ANCHOR = computed(() => store.state.config.levelanchor);
		const levelAnchorbyLevel = (level) => LEVEL_ANCHOR.value.filter((item, index) => item.levelid === level)[0]?.thumb;
		const closeMode = () => {
			store.commit('game/CLOSE_GAME_MODAL');
		};

		const checkGameTime = (item) => {
			const gameTime = item.begin_date + ' ' + item.begin1;
			const beforeGameTime_10_mins = dayjs(gameTime).subtract(10, 'minute').format('YYYY MM-DD HH:mm');
			const game_after_10_min = dayjs().isAfter(dayjs(beforeGameTime_10_mins));
			const game_before_onTime = dayjs().isBefore(dayjs(gameTime));
			if (game_after_10_min && game_before_onTime) {
				return '10_mins';
			} else if (game_after_10_min) {
				return 'gameOnTime';
			} else {
				return 'none';
			}
		};
		const viewLive = (liveuid) => {
			const routeUrl = router.resolve(`/room/${liveuid}`);
			window.open(routeUrl.href, '_blank');
		};
		return {
			store,
			route,
			router,
			showGameModal,
			closeMode,
			currentGame,
			checkGameTime,
			errorPersonImg,
			errorTeamImg,
			viewLive,
			LEVEL_ANCHOR,
			levelAnchorbyLevel,
		};
	},
};
</script>
<style lang="scss">
.gameModal {
	border-radius: 8px !important;
	overflow: hidden;
	padding-bottom: 0px !important;
}
</style>
