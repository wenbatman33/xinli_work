<template lang="pug">
//- 置頂文章列表
.flex.flex-col
    //- 輪播
    van-swipe(:autoplay='3000', indicator-color='white', @change='changeSwipe')
        van-swipe-item.w-full(v-for='item in list')
            .relative
                //- 點擊按鈕
                van-button.absolute.w-full.h-full.top-0.left-0.bg-transparent.border-transparent(@click='clickArticle')

                //- 文章圖片
                .w-full.h-0.pb-pic.overflow-hidden
                    img.w-full.object-cover(:src='item.pic || ""', @error='errorPicImg')

    //- 文章資訊
    .relative.z-20.w-full.px-4.mt-info
        .relative
            //- 點擊按鈕
            van-button.absolute.w-full.h-full.top-0.left-0.rounded.bg-transparent.border-transparent(@click='clickArticle')

            .w-full.rounded.shadow.bg-white.px-4.py-2
                //- 日期
                .text-xs.text-date {{ date }}

                //- 標題
                .text-sm.text-title.font-bold.whitespace-nowrap.overflow-hidden.overflow-ellipsis.mt-1 {{ title }}

                //- 詳細資訊
                .flex.flex-row.items-center.justify-between.mt-1
                    //- 作者資訊
                    .flex.flex-row.items-center
                        //- 頭像
                        img.w-6.h-6.object-cover(:src='avatar', @error='errorAvatarImg')

                        //- 暱稱
                        .text-xs.text-name.font-bold.ml-2 {{ name }}

                    //- 數量資訊
                    .flex.flex-row.items-center
                        //- 眼睛圖示
                        img.w-4.h-4(src='/publicAssets/img/article/icon-eye@3x.png')

                        //- 觀看數量
                        .text-xs.text-view-num.font-normal.ml-1 {{ viewNum }}

                        //- 對話框圖示
                        img.w-4.h-4.ml-3(src='/publicAssets/img/article/icon-message@3x.png')

                        //- 留言數量
                        .text-xs.text-message-num.font-normal.ml-1 {{ messageNum }}
</template>
<script>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';

export default {
	props: {
		list: Array,
	},
	setup(props) {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			index: 0,
		});

		// Current item
		const currentItem = computed(() => {
			const list = props?.list || [];
			if (state.index >= 0 && state.index < list.length) {
				return list[state.index];
			} else {
				return undefined;
			}
		});

		// 文章日期
		const date = computed(() => {
			try {
				return dayjs(currentItem?.value?.release_time).format('YYYY/MM/DD HH:mm');
			} catch (e) {
				return currentItem?.value?.release_time || '';
			}
		});

		// 文章標題
		const title = computed(() => {
			return currentItem?.value?.title || '';
		});

		// 作者頭像
		const avatar = computed(() => {
			return currentItem?.value?.avatar || '';
		});

		// 作者暱稱
		const name = computed(() => {
			return currentItem?.value?.nickname || '';
		});

		// 觀看數
		const viewNum = computed(() => {
			return currentItem?.value?.pageview_front || 0;
		});

		// 留言數
		const messageNum = computed(() => {
			return currentItem?.value?.message_num || 0;
		});

		// 文章圖片讀取失敗
		const errorPicImg = (e) => {
			e.target.src = '/publicAssets/img/default-banner@3x.png';
		};

		// 頭像圖片讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 輪播改變
		const changeSwipe = (index) => {
			state.index = index;
		};

		// 點擊文章
		const clickArticle = () => {
			const item = currentItem?.value;
			if (item) {
				router.push(`/article/info/${item.id}`);
			}
		};
		return {
			date,
			title,
			avatar,
			name,
			viewNum,
			messageNum,
			errorPicImg,
			errorAvatarImg,
			changeSwipe,
			clickArticle,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-swipe__indicators) {
	bottom: 1.5rem;
}
.pb-pic {
	padding-bottom: 39.2%;
}
.mt-info {
	margin-top: -1rem;
}
.text-date {
	color: #969696;
}
.text-title {
	color: #191919;
}
.text-name {
	color: #969696;
}
.text-view-num {
	color: #969696;
}
.text-message-num {
	color: #969696;
}
</style>
