<template lang="pug">
.betingPlayers.p-4(v-if='betingPlayersList')
	h4.text-psV3Red.mb-4 竞猜活动参与清单

	.w-full.overflow-y-auto.relative(style='height:450px')
		.grid.grid-cols-1.gap-4
			.col-span-1.BETWEEN.items-center(v-for='item in betingPlayersList')
				.FLEX_R.items-center
					img.AVATAR.w-9.h-9(:src='item.avatar', @error='errorPersonImg')
					.text-xs.mx-2
						.text-gray-500 {{item.bet_time}}
						h5 {{item.nickname}}
				.flex-row
					span.text-xs.mr-2
						img.coin.w-3(src='/publicAssets/img/v3/coin.png')
					span.text-xs.text-psV3Yellow {{item.guess_bet}}

		.totalInfo.w-full.absolute.bottom-1.z-10(v-if='betingPlayersList')
			.BETWEEN.w-80.text-xs.rounded-full.bg-white.shadow.p-2.mx-auto
				//- span 222 人支持
				span.text-gray-500 {{betingPlayersList?.length || 0}} 人支持
				span
					span
						img.coin.w-3(src='/publicAssets/img/v3/coin.png')
					span.text-psV3Yellow {{total_bet}}

		.w-full.h-full.CENTER.flex-col(v-if='betingPlayersList?.length<=0')
			img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
			.text-gray-500.my-2 还未有用户投注记录

</template>
<script>
export default {
	props: ['betingPlayersList', 'total_bet'],
	setup(props, { emit }) {
		return {};
	},
};
</script>
<style lang="scss" scoped></style>
