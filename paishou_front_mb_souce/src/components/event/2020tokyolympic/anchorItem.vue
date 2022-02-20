<template lang="pug">
//- 主播物件
.grid.grid-cols-item.items-center(:class='{ "opacity-30": !live }')
    //- 頭像
    img.w-16.h-16.rounded-full.object-cover(:src='avatar', @error='errorAvatarImg')

    //- 主播資訊
    .flex.flex-col.items-stretch.px-4
        //- 狀態
        .flex.flex-row.items-center
            //- 等級
            img.h-4.w-auto.object-contain(:src='level', @error='errorLevelImg')

            //- LIVE
            img.h-4.w-auto.object-contain.ml-2(v-if='live', src='/publicAssets/img/schedule/img-live-b@3x.png')

        //- 暱稱
        .text-name.text-base.font-bold.mt-1 {{ name }}

    //- 進入按鈕
    van-button.w-auto.h-auto.px-4.py-1.rounded-full.bg-enter.border-transparent(v-if='live', @click='clickEnter')
        .text-white.text-sm.font-bold 进入
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { matomo_search_watch, matomo_schedule_watch } from '@/matomoTrackEvent.js';

export default {
	props: {
		item: Object,
	},
	setup(props) {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// 主播編號
		const uid = computed(() => {
			return props?.item?.id || '';
		});

		// 是否開播中
		const live = computed(() => {
			return props?.item?.isLive === true;
		});

		// 主播頭像
		const avatar = computed(() => {
			return props?.item?.avatar || '';
		});

		// 等級圖片
		const level = computed(() => {
			const levelAnchor = store?.state?.config?.levelanchor || [];
			const levelItem = levelAnchor.find((element) => {
				return element.levelid === props?.item?.level;
			});
			return levelItem?.thumb || '';
		});

		// 主播名稱
		const name = computed(() => {
			return props?.item?.user_nicename || '';
		});

		// 頭像圖片讀取失敗
		const errorAvatarImg = (event) => {
			event.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 等級圖片讀取失敗
		const errorLevelImg = (e) => {
			e.target.src = '/publicAssets/img/default-level@3x.png';
		};

		// 點擊進入按鈕
		const clickEnter = () => {
			router.push(`/room/${uid.value}`);
		};
		return {
			live,
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
.grid-cols-item {
	grid-template-columns: auto 1fr auto;
}
.text-name {
	color: #191919;
}
.bg-enter {
	background: #f8b62d;
}
</style>
