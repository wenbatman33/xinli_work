<template lang="pug">
.HotLive.my-8
	.container
		.text-2xl.font-bold.border-l-4.border-xRed.px-2.my-2 {{t('index_hot_live_title')}}
		.BETWEEN.gap-4
			.flex-shrink-0.shadow-xl(:class='"w-[800px]"' :style='{ "background-image": "url(" + hotliveBg + ")"}')
				.w-full.FLEX_C.rounded-t-lg.p-4
					.BETWEEN_CENTER
						.my-4
							span.text-2xl.font-bold teamA 
							img.w-14.mx-4(:src='teamLogo_1')
							span.text-2xl.font-bold.text-xRed vs 
							img.w-14.mx-4(:src='teamLogo_2')
							span.text-2xl.font-bold teamB
						a-button.BG_GRADIENT_1(type='primary' shape="round") {{t('now_Bet')}}
					.w-full.aspect-video.bg-black
						video.WH_FULL(controls muted autoplay)
							source(src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4")
			.FLEX_C.flex-grow.shadow-xl.p-4(:class='"w-[800px]"' :style='{ "background-image": "url(" + hotliveBg + ")"}')
				.rounded.bg-white.shadow.my-2(v-for='item in gameList')
					.gameName.border-b.p-2 
						img.mr-4(:src='footballIcon')
						span {{item.name}}
					.BETWEEN
						.gameTeams
							.homeTeam.p-2 
								img.w-5.h-5.mr-4(:src='teamLogo_1')
								span {{item.homeTeam}}
							.awayTeam.p-2 
								img.w-5.h-5.mr-4(:src='teamLogo_2')
								span {{item.awayTeam}}
						.gameTime.bg-white.shadow.rounded.CENTER_C.m-2.p-2
							p {{item.gameDate}}
							p {{item.gameTime}}


</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const teamLogo_1 = `${window.staticPath}/static/img/index/teamLogo_1.png`;
	const teamLogo_2 = `${window.staticPath}/static/img/index/teamLogo_2.png`;
	const footballIcon = `${window.staticPath}/static/img/index/footballIcon.png`;
	const hotliveBg = `${window.staticPath}/static/img/index/hotliveBg.png`;

	const gameList = ref([
		{
			id: 1,
			name: '德国甲级足球联赛1',
			homeTeam: '西汉姆联',
			awayTeam: '阿森纳',
			gameDate: '3月9日',
			gameTime: '14:00',
		},
		{
			id: 2,
			name: '德国甲级足球联赛2',
			homeTeam: '西汉姆联',
			awayTeam: '阿森纳',
			gameDate: '3月9日',
			gameTime: '14:00',
		},
		{
			id: 3,
			name: '德国甲级足球联赛3',
			homeTeam: '西汉姆联',
			awayTeam: '阿森纳',
			gameDate: '3月9日',
			gameTime: '14:00',
		},
		{
			id: 4,
			name: '德国甲级足球联赛4',
			homeTeam: '西汉姆联',
			awayTeam: '阿森纳',
			gameDate: '3月9日',
			gameTime: '14:00',
		},
	]);
</script>

<style lang="scss" scoped></style>
