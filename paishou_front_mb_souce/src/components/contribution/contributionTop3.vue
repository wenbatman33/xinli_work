<template lang="pug">
//- 排行榜物件(前三名)
.contribution-top-3
	van-button.trasparent-button.rounded(@click='clickItem')
	.flex.flex-col.items-center.pb-2
		.relative.w-24.h-24
			//- 頭像
			van-button.avatar-button.rounded-full.top-2.left-2(v-if='rank === 1', @click='clickItem')
				img.w-20.h-20.rounded-full.object-cover(:src='item?.avatar || ""', @error='errorAvatarImg')
			van-button.avatar-button.rounded-full.top-4.left-4(v-else, @click='clickItem')
				img.w-16.h-16.rounded-full.object-cover(:src='item?.avatar || ""', @error='errorAvatarImg')

			//- 皇冠
			img.absolute.w-10.left-7(v-if='rank === 1', src='/publicAssets/img/contribution/icon-crown@3x.png')

			//- 已關注
			van-button.followed-button.absolute.rounded-full.shadow.top-9.right-0(v-if='type === "live" && item?.is_blank !== true && item?.is_follow === true', :loading='item?.is_loading === true', @click='clickFollow')
				img.w-6.h-6(src='/publicAssets/img/contribution/icon-followed@3x.png')
				template(#loading)
					.w-6.h-6.flex.justify-center.items-center
						van-loading.w-4.h-4(type='spinner', color='#ffffff')

			//- 關注
			van-button.follow-button.absolute.rounded-full.shadow.top-9.right-0(v-else-if='type === "live" && item?.is_blank !== true', :loading='item?.is_loading === true', @click='clickFollow')
				img.w-6.h-6(src='/publicAssets/img/contribution/icon-follow@3x.png')
				template(#loading)
					.w-6.h-6.flex.justify-center.items-center
						van-loading.w-4.h-4(type='spinner', color='#a62337')

			//- 名次
			.absolute.bg-white.rounded-full.shadow.left-9.bottom-0(v-if='rank !== 1')
				.w-6.h-6.flex.justify-center.items-center
					.rank.text-xs.font-bold {{ rank }}

		//- LIVE
		img.h-4.object-contain.mt-2(v-if='item?.is_live === true', src='/publicAssets/img/contribution/iconLive@3x.png')

		//- 等級
		img.h-4.object-contain.mt-2(v-else-if='item?.is_blank !== true', :src='levelThumb', @error='errorLevelImg')

		//- 暱稱
		.name.text-xs.font-bold.mt-2 {{ item?.user_nicename || "-" }}

		//- 人氣
		.flex.flex-row.items-center.mt-1(v-if='path === "popular"')
			img.w-4.h-4(src='/publicAssets/img/contribution/mic@3x.png')
			.popular.text-xs.font-bold.break-all.ml-1 {{ item?.contribution || "-" }}

		//- 明星
		.flex.flex-row.items-center.mt-1(v-else-if='path === "superstar"')
			img.w-4.h-4(src='/publicAssets/img/contribution/star@3x.png')
			.superstar.text-xs.font-bold.break-all.ml-1 {{ item?.contribution || "-" }}

		//- 富豪
		.flex.flex-row.items-center.mt-1(v-else-if='path === "rich"')
			img.w-4.h-4(src='/publicAssets/img/contribution/money@3x.png')
			.rich.text-xs.font-bold.break-all.ml-1 {{ item?.contribution || "-" }}
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
.contribution-top-3 {
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
		width: 100%;
		color: #191919;
		overflow: hidden;
		white-space: nowrap;
		text-align: center;
		text-overflow: ellipsis;
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