<template lang="pug">
.feature_1.relative.Bg_Recommended(:style='{ "background-image": "url(" + Bg_Recommended + ")"}')
	.FLEX_R.WH_FUL
		img(:class='"w-[488px] h-[440px]"' :src='apiImgPath(props.banner[0]?.imageWeb)')
		.flex-grow
			.WH_FULL.FLEX_C_CENTER.p-4(v-if='props.banner.length<=1')
				.my-2
					img.w-52(:src='apiImgPath(props.banner[0]?.imageH5)')
				.my-2.text-2xl.font-bold {{props.banner[0]?.description}} 
				.my-2.pr-8 {{props.banner[0]?.context}}
				.my-2
					a-button.inline-block.BG_GRADIENT_1(type='primary' shape="round" size='large' @click='deepLink(props.banner[0]?.targetURL)') {{t('now_Bet')}}
			.grid.grid-cols-2.gap-4(v-if='props.banner.length>1')
				.col-span-1
					.WH_FULL.FLEX_C_CENTER.p-4
						.my-2
							img.w-52(:src='apiImgPath(props.banner[0]?.imageH5)')
						.my-2.text-2xl.font-bold {{props.banner[0]?.description}} 
						.my-2 {{props.banner[0]?.context}}
						.my-2
							a-button.inline-block.BG_GRADIENT_1(type='primary' shape="round" size='large' @click='deepLink(props.banner[0]?.targetURL)') {{t('now_Bet')}}
				.col-span-1
					PrintTicket(:data='props.banner[1]').mt-24
</template>

<script setup lang="ts">
	import { onMounted, ref, reactive, defineProps } from 'vue';
	import { getEventBanner } from '@/api';
	import type { EVENTAJAX_GetBannerResponseData } from '@/api/model';
	import { deepLink, apiImgPath } from '@/utils';
	import PrintTicket from '@/components/index/PrintTicket.vue';
	import { useI18n } from 'vue-i18n';
	interface Props {
		banner: EVENTAJAX_GetBannerResponseData[];
	}
	const props = defineProps<Props>();
	const { t } = useI18n();
	const Bg_Recommended = `${window.staticPath}/static/img/index/recommend/Bg_Recommended.png`;
</script>

<style scoped lang="scss">
	.Bg_Recommended {
		background-position: top 23px right 0px;
		background-repeat: no-repeat;
		height: 480px;
	}
</style>
