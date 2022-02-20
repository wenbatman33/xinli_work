<template lang="pug">
//- 貢獻榜前三名
.topListTop3
	//- 內容
	.content.px-2.py-4(:class='{ top1: rank === 1, top2: rank === 2, top3: rank === 3 }')
		//- 圖片資訊
		.relative.w-24.h-24
			//- 頭像
			img.absolute.w-20.h-20.rounded-full.object-cover.left-2.top-4(v-if='rank === 1', :src='item?.avatar || ""', @error='errorAvatarImg')
			img.absolute.w-16.h-16.rounded-full.object-cover.left-4.top-8(v-else, :src='item?.avatar || ""', @error='errorAvatarImg')

			//- 外框
			img.absolute.w-20.h-20.left-2.top-4(v-if='rank === 1', src='/publicAssets/img/room/img-photoframe@2x.png')
			img.absolute.w-16.h-16.left-4.top-8(v-else, src='/publicAssets/img/room/img-photoframe@2x.png')

			//- 皇冠
			img.absolute.w-6.left-9.top-0(v-if='rank === 1', src='/publicAssets/img/room/icon-crwon-gold@3x.png')
			img.absolute.w-6.left-9.top-4(v-if='rank === 2', src='/publicAssets/img/room/icon-crwon-gray@3x.png')
			img.absolute.w-6.left-9.top-4(v-if='rank === 3', src='/publicAssets/img/room/icon-crwon-copper@3x.png')

		//- 暱稱
		.name.text-sm.mt-2(:class='{ "invisible": item.is_blank === true }') {{ item.user_nicename || "-" }}

		//- 等級
		img.h-4.mt-2(:src='levelThumb || ""', @error='errorLevelImg', :class='{ "invisible": item.is_blank === true }')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
	props: {
		item: Object,
		rank: Number,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// 等級圖片
		const levelThumb = computed(() => {
			const levelList = store?.state?.config?.levelList || [];
			const levelItem = levelList.find((element) => {
				return element?.levelid === props?.item?.level;
			});
			return levelItem?.thumb || '';
		});

		// 頭像圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/room/img-color-block@3x.png';
		};
		return {
			levelThumb,
			errorAvatarImg,
			errorLevelImg,
		};
	},
};
</script>
<style lang="scss" scoped>
.topListTop3 {
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.content {
	width: 6.5rem;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-size: contain;
	background-position: bottom;
	background-repeat: no-repeat;
	&.top1 {
		background-image: url('/publicAssets/img/room/img-1@3x.png');
	}
	&.top2 {
		background-image: url('/publicAssets/img/room/img-2@3x.png');
	}
	&.top3 {
		background-image: url('/publicAssets/img/room/img-3@3x.png');
	}
}
.name {
	width: 100%;
	color: #ffffff;
	font-weight: bold;
	text-align: center;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>