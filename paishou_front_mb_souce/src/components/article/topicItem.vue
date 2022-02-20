<template lang="pug">
//- 主題物件
van-button.w-auto.h-auto.px-4.py-2.shadow.rounded.bg-transparent.border-transparent(:ontouchmove='onTouchMove', @click='clickItem')
    .text-sm.text-item.whitespace-nowrap {{ item?.name || '' }}
</template>
<script>
import { useRouter } from 'vue-router';
import { matomo_articleClass_check_topic } from '@/matomoTrackEvent.js'

export default {
	props: {
		item: Object,
	},
	setup(props) {
		// Vue router
		const router = useRouter();

		// 觸碰移動
		const onTouchMove = (e) => {
			e.stopPropagation();
		};

		// 點擊物件
		const clickItem = () => {
			// Navigate
			router.push(`/article/topic/${props?.item?.id}`);

			// Matomo track
			matomo_articleClass_check_topic(props?.item?.name, props?.item?.id);
		};
		return {
			onTouchMove,
			clickItem,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-item {
	color: #969696;
}
</style>
