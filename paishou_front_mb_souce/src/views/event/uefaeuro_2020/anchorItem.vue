<template lang="pug">
.flex.flex-row.items-center.py-2(:class='{ "opacity-30": !isLive }')
    //- 頭像
    img.w-16.h-16.flex-shrink-0.object-cover.rounded-full(:src='avatar', @error='errorAvatarImg')

    //- 資訊
    .flex.flex-col.flex-shrink.overflow-hidden.mx-4
        .w-full.flex.flex-row
            //- 等級
            img.h-4.object-contain(:src='level', @error='errorLevelImg')

            //- LIVE
            img.h-4.object-contain.ml-2(v-if='isLive', src='/publicAssets/img/event/uefaeuro_2020/icon-live-b@3x.png')

        //- 暱稱
        .text-name.w-full.text-base.font-bold.whitespace-nowrap.overflow-hidden.overflow-ellipsis.mt-1 {{ name }}

    //- 留白
    .flex-grow

    //- 進入按鈕
    van-button.flex-shrink-0.w-auto.h-auto.px-4.py-1.rounded-full.bg-enter.border-transparent(v-if='isLive', @click='clickEnter')
        .text-sm.text-white.font-bold 进入</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
	props: {
		item: Object,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// 是否直播中
		const isLive = computed(() => {
			return props?.item?.isLive === true;
		});

		// 頭像圖片
		const avatar = computed(() => {
			return props?.item?.avatar || '';
		})

		// 等級圖片
		const level = computed(() => {
			const levelAnchor = store?.state?.config?.levelanchor || [];
			const levelItem = levelAnchor.find((element) => element.levelid === props?.item?.level);
			return levelItem?.thumb || '';
		});

		// 主播暱稱
		const name = computed(() => {
			return props?.item?.user_nicename || '';
		});

		// 頭像圖片讀取失敗
		const errorAvatarImg = (event) => {
			event.target.src = '/publicAssets/img/event/uefaeuro_2020/icon-default@3x.png';
		};

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/event/uefaeuro_2020/icon-level-placeholder@3x.png';
		};

		// 點擊進入按鈕
		const clickEnter = () => {
			router.push(`/room/${props?.item?.id}`);
		};
		return {
			isLive,
			avatar,
			level,
			name,
			errorAvatarImg,
			errorLevelImg,
			clickEnter,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-name {
	color: #191919;
}
.bg-enter {
	background: #f8b62d;
}
</style>
