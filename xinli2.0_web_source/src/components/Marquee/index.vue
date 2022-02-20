<template lang="pug">
.Marquee.w-full.FLEX_R.overflow-hidden
	.CENTER.flex-shrink-0.items-center
		SvgIcon.w-5.h-5.text-xBlue.mx-2(:name='"#Announcement"')
		span.text-xBlue.font-semibold {{t('announcement')}}
	.CENTER.flex-grow.relative.overflow-hidden(v-if='announcementList.length>0')
		.MarqueeContent.flex.flex-nowrap.truncate(:class='{"MarqueePaused": MarqueePaused === true }' :style='MarqueeStyle')
			.FLEX_R.mr-8(v-for='item in data' @mouseover='MarqueePaused=true' @mouseout='MarqueePaused=false' )
				.flex-shrink-0.truncate {{ item?.title }}

</template>

<script setup lang="ts">
	import { onMounted, ref, computed } from 'vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';
	import { useI18n } from 'vue-i18n';
	import type { EVENTAJAX_GetBannerResponseData } from '@/api/model';

	interface Props {
		data: EVENTAJAX_GetBannerResponseData[];
	}
	const props = defineProps<Props>();
	const { t } = useI18n();
	const MarqueePaused = ref(false);
	const announcementList = ref([] as EVENTAJAX_GetBannerResponseData[]);
	const MarqueeStyle = computed(() => `animation-duration: ${announcementList.value.length * 8 || 0}s`);
	onMounted(() => {
		announcementList.value = props?.data || [];
	});
</script>

<style lang="scss" scoped>
	.MarqueeContent {
		position: absolute;
		animation: mymove;
		// animation-duration: 30s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	@keyframes mymove {
		0% {
			left: 110%;
		}

		100% {
			left: -140%;
		}
	}
	.MarqueePaused {
		animation-play-state: paused;
	}
</style>
