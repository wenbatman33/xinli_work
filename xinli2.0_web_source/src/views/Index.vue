<template lang="pug">
.WH_FULL.bg-white.pb-4
	Banners
	.w-full
		.container
			.CENTER
				Announcement
			
	Sponsor
	.w-full.my-4
		RecommandGames

	//- .w-full.my-4
	//- 	HotLive

	//- .w-full.my-4
	//- 	RecommandBet
		


	.featureBanners.w-full.my-8.select-none.bg-cover(:style='{ "background-image": "url(" + featureBannersBg + ")"}')
		.container
			FeatureBlock(:banner='eventStore.banner_1')
			FeatureBlock(:banner='eventStore.banner_2')
			FeatureBlock(:banner='eventStore.banner_3')

	.w-full.my-12
		.container.relative
			.absolute.h-full.FLEX_C_CENTER.top-0.z-10.pl-20
				img.w-52(:src='apiImgPath(eventStore.banner_4[0]?.imageH5)')
				h5.text-xBlue.my-4 {{eventStore.banner_4[0]?.description}} 
				.text-xBlue.text-xl.font-semibold.mt-8 {{eventStore.banner_4[0]?.context}}
			img.w-full(:src='apiImgPath(eventStore.banner_4[0]?.imageWeb)')

	.w-full.my-12
		.container
			img.w-full(:src='apiImgPath(eventStore.banner_5[0]?.imageWeb)')

	.w-full.my-12.select-none
		.container
			.grid.grid-cols-4.gap-4
				.col-span-1.relative
					img.w-full.shadow.rounded-lg(:src='featureBg')
					.absolute.WH_FULL.z-10.top-0.text-center
						img.w-44.mt-8(:src='feather')
					.absolute.WH_FULL.top-0(:class='"z-2"')
						.text-xl.font-semibold.text-center.mt-7 {{t('index_feature_titie_1')}}
						.text-xs.text-center Product advantages
						.text-sm.text-center.mt-8 {{t('index_feature_1_desc_line_1')}}
						.text-sm.text-center {{t('index_feature_1_desc_line_2')}}
				.col-span-1.relative
					img.w-full.shadow.rounded-lg(:src='featureBg')
					.absolute.WH_FULL.z-10.top-0.text-center
						img.w-44.mt-8(:src='feather')
					.absolute.WH_FULL.top-0(:class='"z-2"')
						.text-xl.font-semibold.text-center.mt-7 {{t('index_feature_titie_2')}}
						.text-xs.text-center Product advantages
						.text-sm.text-center.mt-8 {{t('index_feature_2_desc_line_1')}}
						.text-sm.text-center {{t('index_feature_2_desc_line_2')}}
				.col-span-1.relative
					img.w-full.shadow.rounded-lg(:src='featureBg')
					.absolute.WH_FULL.z-10.top-0.text-center
						img.w-44.mt-8(:src='feather')
					.absolute.WH_FULL.top-0(:class='"z-2"')
						.text-xl.font-semibold.text-center.mt-7 {{t('index_feature_titie_3')}}
						.text-xs.text-center Product advantages
						.text-sm.text-center.mt-8 {{t('index_feature_3_desc_line_1')}}
						.text-sm.text-center {{t('index_feature_3_desc_line_2')}}
				.col-span-1.relative
					img.w-full.shadow.rounded-lg(:src='featureBg')
					.absolute.WH_FULL.z-10.top-0.text-center
						img.w-44.mt-8(:src='feather')
					.absolute.WH_FULL.top-0(:class='"z-2"')
						.text-xl.font-semibold.text-center.mt-7 {{t('index_feature_titie_4')}}
						.text-xs.text-center Product advantages
						.text-sm.text-center.mt-8 {{t('index_feature_4_desc_line_1')}}
						.text-sm.text-center {{t('index_feature_4_desc_line_2')}}
</template>

<script setup lang="ts">
	import { onMounted, ref, reactive } from 'vue';
	import { getEventBanner } from '@/api';
	import { deepLink, apiImgPath } from '@/utils';
	import { EventStore } from '@/store/eventStore';
	import Banners from '@/components/index/Banners.vue';
	import Announcement from '@/components/index/Announcement.vue';
	import RecommandGames from '@/components/index/RecommandGames.vue';
	import RecommandBet from '@/components/index/RecommandBet.vue';
	import PrintTicket from '@/components/index/PrintTicket.vue';
	import FeatureBlock from '@/components/index/FeatureBlock.vue';

	import Sponsor from '@/components/index/Sponsor.vue';
	import HotLive from '@/components/index/HotLive.vue';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const featureBannersBg = `${window.staticPath}/static/img/index/featureBannersBg@2x.jpg`;
	const Bg_Recommended = `${window.staticPath}/static/img/index/recommend/Bg_Recommended.png`;

	// -------------------

	const featureBg = `${window.staticPath}/static/img/index/featureBg@2x.png`;
	const feather = `${window.staticPath}/static/img/index/feather@2x.png`;
	const eventStore = EventStore();
</script>

<style scoped lang="scss">
	.Bg_Recommended {
		background-position: top 23px right 0px;
		background-repeat: no-repeat;
		height: 480px;
	}
</style>
