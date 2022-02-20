<template lang="pug">
//- 公告跑馬燈
.notice-bar.rounded-md.mx-4.mt-2(v-if='!isEmpty')
	van-button.notice-button(@click='clickBar')
		.flex.flex-row.items-center.px-4
			//- 圖示
			img.w-4.h-4(src='/publicAssets/img/index/icon-notice@3x.png')

			//- 輪播
			van-swipe.notice-swipe(vertical, :autoplay='3000', :show-indicators='false', :touchable='false', @change='changeSwipe')
				van-swipe-item.notice-swipe-item(v-for='item in state.bullteinList') 
					.notice-title.text-sm.font-normal.px-3 {{ item.title }}
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { bulltein } from '@/api';
import { matomo_index_check_notice, matomo_classLive_notice } from '@/matomoTrackEvent.js';

export default {
	name: 'noticeBar',
	props: {
		path: String,
	},
	setup(props) {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			index: 0,
			bullteinList: [],
		});

		// 資料是否為空
		const isEmpty = computed(() => {
			return !state.bullteinList || state.bullteinList.length === 0;
		});

		// On component mounted
		onMounted(() => {
			bulltein().then((res) => {
				state.bullteinList = res?.data?.list || [];
			});
		});

		// 輪播改變
		const changeSwipe = (index) => {
			state.index = index;
		};

		// 點擊公告按鈕
		const clickBar = () => {
			// Validate index
			const index = state.index;
			const bullteinList = state.bullteinList;
			if (bullteinList && bullteinList.length > 0 && index < bullteinList.length) {
				// Navigate notice detail page
				const id = bullteinList[index]?.id || 0;
				router.push(`/notice/details/${id}`);

				// Matomo track
				if (props.path === '/index') {
					matomo_index_check_notice(id);
				} else if (props.path === '/classLive') {
					matomo_classLive_notice(id);
				}
			}
		};
		return {
			state,
			isEmpty,
			clickBar,
			changeSwipe,
		};
	},
};
</script>
<style lang="scss" scoped>
.notice-bar {
	background: #f8f8f8;
}
.notice-button {
	width: 100%;
	height: unset;
	padding: 0;
	border: transparent;
	background: transparent;
	::v-deep(.van-button__content) {
		width: 100%;
	}
	::v-deep(.van-button__text) {
		width: 100%;
	}
}
.notice-swipe,
.notice-swipe-item {
	width: 100%;
	height: 2.5rem;
	line-height: 2.5rem;
}
.notice-title {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	color: #4b4b4b;
	cursor: pointer;
}
</style>
