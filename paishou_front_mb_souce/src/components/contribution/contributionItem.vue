<template lang="pug">
//- 排行榜物件(第四名後)
.mx-4.my-2
	.contribution-item
		van-button.trasparent-button.rounded(@click='clickItem')
		.flex.flex-row.justify-between.items-center.py-2.px-4.rounded.shadow
			.flex.flex-row.flex-shrink.items-center.overflow-hidden
				.flex-shrink-0.relative.w-14.h-14
					//- 頭像
					van-button.avatar-button.rounded-full(@click='clickItem')
						img.w-14.h-14.rounded-full.object-cover(:src='item?.avatar || ""', @error='errorAvatarImg')

					//- 名次
					.absolute.bg-white.rounded-full.shadow.top-0.left-0
						.w-6.h-6.flex.justify-center.items-center
							.rank.text-xs.font-bold {{ rank }}

				.flex.flex-col.flex-shrink.overflow-hidden.ml-4
					.flex.flex-row.items-center
						//- 等級
						img.h-3.object-contain.object-left(v-if='item?.is_blank !== true', :src='levelThumb', @error='errorLevelImg')

						//- LIVE
						img.h-3.object-contain.object-left.ml-1(v-if='item?.is_live === true', src='/publicAssets/img/contribution/iconLive@3x.png')

					//- 暱稱
					.name.text-xs.font-bold.overflow-hidden.overflow-ellipsis.whitespace-nowrap.mt-1 {{ item?.user_nicename || "-" }}

			.flex.flex-row.items-center
				//- 人氣
				.flex.flex-row.flex-shrink-0.items-center.ml-4(v-if='path === "popular"')
					img.w-4.h-4(src='/publicAssets/img/contribution/mic@3x.png')
					.popular.text-xs.font-bold.ml-1 {{ item?.contribution || "-" }}

				//- 明星
				.flex.flex-row.flex-shrink-0.items-center.ml-4(v-else-if='path === "superstar"')
					img.w-4.h-4(src='/publicAssets/img/contribution/star@3x.png')
					.superstar.text-xs.font-bold.ml-1 {{ item?.contribution || "-" }}

				//- 富豪
				.flex.flex-row.flex-shrink-0.items-center.ml-4(v-else-if='path === "rich"')
					img.w-4.h-4(src='/publicAssets/img/contribution/money@3x.png')
					.rich.text-xs.font-bold.ml-1 {{ item?.contribution || "-" }}

				//- 已關注
				van-button.followed-button.flex-shrink-0.rounded-full.shadow.ml-4(v-if='type === "live" && item?.is_blank !== true && item?.is_follow === true', :loading='item?.is_loading === true', @click='clickFollow')
					img.w-6.h-6(src='/publicAssets/img/contribution/icon-followed@3x.png')
					template(#loading)
						.w-6.h-6.flex.justify-center.items-center
							van-loading.w-4.h-4(type='spinner', color='#ffffff')

				//- 關注
				van-button.follow-button.flex-shrink-0.rounded-full.shadow.ml-4(v-else-if='type === "live" && item?.is_blank !== true', :loading='item?.is_loading === true', @click='clickFollow')
					img.w-6.h-6(src='/publicAssets/img/contribution/icon-follow@3x.png')
					template(#loading)
						.w-6.h-6.flex.justify-center.items-center
							van-loading.w-4.h-4(type='spinner', color='#a62337')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
	props: {
		item: Object,
		rank: Number,
		type: String,
		path: String,
	},
	emits: ['click-item', 'click-follow'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// 等級圖片
		const levelThumb = computed(() => {
			if (props.type === 'live') {
				return props?.item?.level_anchor_info?.thumb || '';
			} else {
				const levelList = store?.state?.config?.levelList || [];
				const levelItem = levelList.find((element) => element.levelid === props?.item?.level);
				return levelItem?.thumb || '';
			}
		});

		// 頭像圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/default-level@3x.png';
		};

		// 點擊物件
		const clickItem = () => {
			emit('click-item', props.item);
		};

		// 點擊關注按鈕
		const clickFollow = () => {
			emit('click-follow', props.item);
		};
		return {
			levelThumb,
			errorAvatarImg,
			errorLevelImg,
			clickItem,
			clickFollow,
		};
	},
};
</script>
<style lang="scss" scoped>
.contribution-item {
	width: 100%;
	position: relative;
	::v-deep(.van-button__content) {
		width: 100%;
	}
	::v-deep(.van-button__text) {
		width: 100%;
	}
	.trasparent-button {
		width: 100%;
		height: 100%;
		position: absolute;
		padding: 0;
		border: transparent;
		background: transparent;
	}
	.avatar-button {
		width: unset;
		height: unset;
		position: absolute;
		padding: 0;
		border: transparent;
		background: transparent;
	}
	.followed-button {
		width: unset;
		height: unset;
		padding: 0;
		border: transparent;
		background: #f8b62d;
	}
	.follow-button {
		width: unset;
		height: unset;
		padding: 0;
		border: transparent;
		background: transparent;
	}
	.rank {
		color: #000000;
	}
	.name {
		color: #191919;
	}
	.popular {
		color: #ff7a00;
	}
	.superstar {
		color: #2f80ed;
	}
	.rich {
		color: #df2f4a;
	}
}
</style>