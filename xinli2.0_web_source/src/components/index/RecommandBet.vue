<template lang="pug">
.RecommandGames.my-8
	.container
		.text-2xl.font-bold.border-l-4.border-xRed.px-2.my-2 {{t('game_recommend_bet')}}
		.BETWEEN_CENTER
			.mr-4.leftButton.cursor-pointer(:class='"hover:-translate-y-1"')
				SvgIcon.w-6.h-6(:name='"#Arrow_Left_Line"')
			
			swiper.mySwiper.w-full.select-none.py-4(:loop="true" :slidesPerView="3" :spaceBetween="30" :navigation='navigationOption')
				swiper-slide(v-for='item in betGameList') 
					.WH_FULL.rounded-lg.p-4.cursor-pointer.p-4.shadow-lg
						p.mb-4 {{item.name}} {{item.gameDate}} {{item.gameTime}} 
						.BETWEEN_CENTER
							.gameTeams
								p.my-2
									img.w-5(:src='teamLogo_1')
									span.mx-2 {{item.homeTeam}}
								p.my-2
									img.w-5(:src='teamLogo_2')
									span.mx-2 {{item.awayTeam}}
							.gameOdds
								.grid.grid-cols-2.gap-4
									.col-span-1
										.rounded.bg-slate-100.CENTER_C.p-4
											p +1.5
											b 2.81

									.col-span-1
										.rounded.bg-slate-100.CENTER_C.p-4
											p -1.5
											b 2.81

			.ml-4.rightButton.cursor-pointer(:class='"hover:-translate-y-1"')
				SvgIcon.w-6.h-6(:name='"#Arrow_Right_Line"')

</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import { useI18n } from 'vue-i18n';
	const { t } = useI18n();

	const teamLogo_1 = `${window.staticPath}/static/img/index/teamLogo_1.png`;
	const teamLogo_2 = `${window.staticPath}/static/img/index/teamLogo_2.png`;

	import SvgIcon from '@/components/SvgIcon/index.vue';
	// install Swiper modules
	SwiperCore.use([Autoplay, Pagination, Navigation]);

	const navigationOption = {
		nextEl: '.rightButton',
		prevEl: '.leftButton',
	};
	const betGameList = ref([
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
