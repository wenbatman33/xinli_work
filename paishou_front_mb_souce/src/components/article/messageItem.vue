<template lang="pug">
//- 留言物件
.flex.flex-row.items-start.shadow.rounded.p-4
	//- 頭像
	img.flex-shrink-0.w-6.h-6.rounded-full.object-cover(:src='avatar', @error='errorAvatarImg')

	//- 留言資訊
	.flex.flex-col.flex-grow.px-4.overflow-hidden
		//- 使用者資訊
		.flex.flex-row.items-center
			//- 暱稱
			.text-sm.text-name.font-bold {{ name }}

			//- 等級
			img.h-3.object-contain.object-start.ml-2(:src='level', @error='errorLevelImg')

		//- 日期
		.text-sm.text-date.mt-1 {{ date }}

		//- 內容
		.text-sm.text-content.mt-1 {{ content }}

	//- 讚
	van-button.flex-shrink-0.w-auto.h-auto.p-1.rounded-full.border-transparent.bg-transparent(:disabled='state.likeLoading', @click='clickLike')
		.flex.flex-row.items-center(:class='{ "filter-like": likeClicked }')
			.text-sm.text-like {{ like }}
			img.w-4.h-4.ml-1(src='/publicAssets/img/article/icon-like@3x.png')
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { articleMessageLike } from '@/api';
import { matomo_articleInfo_like_message } from '@/matomoTrackEvent.js';
import dayjs from 'dayjs';

export default {
	props: {
		item: Object,
	},
	emits: ['like-success'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			likePlus: 0,
			likeLoading: false,
		});

		// 頭像
		const avatar = computed(() => {
			return props?.item?.avatar || '';
		});

		// 暱稱
		const name = computed(() => {
			return props?.item?.nickname || '';
		});

		// 等級
		const level = computed(() => {
			const levelId = props?.item?.level || 1;
			const levelList = store?.state?.config?.levelList || [];
			const levelItem = levelList.find((element) => element.levelid === levelId);
			return levelItem?.thumb || '';
		});

		// 日期
		const date = computed(() => {
			try {
				return dayjs(props?.item?.created_at).format('YYYY/MM/DD HH:mm');
			} catch (e) {
				return props?.item?.created_at || '';
			}
		});

		// 內容
		const content = computed(() => {
			return props?.item?.content || '';
		});

		// 讚數
		const like = computed(() => {
			const origin = props?.item?.like || 0;
			const plus = state?.likePlus || 0;
			return origin + plus;
		});

		// 已點擊讚
		const likeClicked = computed(() => {
			return state.likePlus > 0;
		});

		// 作者圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/default-level@3x.png';
		};

		// 點讚
		const clickLike = () => {
			// Update loading state
			state.likeLoading = true;

			// Post body
			const body = {
				message_id: props?.item?.id,
			};

			// Like message
			articleMessageLike(body)
				.then((res) => {
					// Validate response code
					if (res?.code === 0) {
						// Plus like count
						state.likePlus = state.likePlus + 1;
					}

					// Revert loading state on finished
					state.likeLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.likeLoading = false;
				});

			// Matomo track
			matomo_articleInfo_like_message(props?.item?.id);
		};
		return {
			state,
			avatar,
			name,
			level,
			date,
			content,
			like,
			likeClicked,
			errorAvatarImg,
			errorLevelImg,
			clickLike,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-name {
	color: #191919;
}
.text-date {
	color: #969696;
}
.text-content {
	color: #000000;
}
.text-like {
	color: #191919;
}
.filter-like {
	filter: brightness(0) saturate(100%) invert(14%) sepia(50%) saturate(4522%) hue-rotate(336deg) brightness(102%) contrast(88%);
}
</style>
