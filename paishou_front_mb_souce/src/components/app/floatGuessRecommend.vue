<template lang="pug">
.flex.flex-row.items-center(v-if='show')
    //- 關閉按鈕
    van-button.w-close.h-close.z-20.p-0.rounded-full.bg-transparent.border-transparent(@click='clickClose')
        //- 關閉圖示
        img.w-full.h-full.object-contain(src='/publicAssets/img/app/icon-close@3x.png')
        
    //- 競猜推薦懸浮按鈕
    van-button.w-button.h-button.z-10.ml-button.p-0.rounded-full.shadow-button.bg-white.border-transparent(@click='clickRecommend')
        //- 橫列
        .w-full.h-full.flex.flex-row.items-center.overflow-hidden
            //- 主播圖示
            img.flex-shrink-0.w-avatar.h-avatar.rounded-full.object-cover(:src='avatar', @error='errorAvatarImg')

            //- 查看
            .flex-grow.text-sm.text-view.text-center.font-bold 查看主播竞猜
</template>
<script>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
	setup() {
		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Vuex store
		const store = useStore();

		// 第一筆競猜推薦
		const recommend = computed(() => {
			const guessRecommendList = store?.state?.config?.floatGuessRecommendList || [];
			if (guessRecommendList.length > 0) {
				return guessRecommendList[0];
			} else {
				return undefined;
			}
		});

		// 是否顯示
		const show = computed(() => {
			if (store?.state?.config?.hideFloatGuessRecommend === true) {
				return false;
			} else if (!recommend.value) {
				return false;
			} else if (route.path === '/') {
				return true;
			} else if (/\/contribution\/\w+\/\w+/.test(route.path)) {
				return true;
			} else if (route.path === '/schedule') {
				return true;
			} else if (/^\/article\/class/.test(route.path)) {
				return true;
			} else if (route.path === '/personal') {
				return true;
			} else if (route.path === '/search') {
				return true;
			} else if (route.path === '/concern') {
				return true;
			} else {
				return false;
			}
		});

		// 主播圖示
		const avatar = computed(() => {
			return recommend?.value?.avatar || '';
		});

		// 主播圖示讀取失敗
		const errorAvatarImg = (e) => {
			e.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// 點擊關閉
		const clickClose = () => {
			store.dispatch('config/HIDE_FLOAT_GUESS_RECOMMEND');
		};

		// 點擊競猜推薦
		const clickRecommend = () => {
			router.push({
				path: `/room/${recommend?.value?.uid}`,
				query: {
					tab: 'guesslist',
				},
			});
		};

		// On component mounted
		onMounted(() => {
			store.dispatch('config/GET_FLOAT_GUESS_RECOMMEND_LIST');
		});
		return {
			show,
			avatar,
			errorAvatarImg,
			clickClose,
			clickRecommend,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-button__content) {
	width: 100%;
	height: 100%;
}
::v-deep(.van-button__text) {
	width: 100%;
	height: 100%;
}
.w-close {
	width: 24px;
}
.h-close {
	width: 24px;
}
.w-button {
	width: 148px;
}
.h-button {
	height: 46px;
}
.ml-button {
	margin-left: -12px;
}
.shadow-button {
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
}
.w-avatar {
	width: 46px;
}
.h-avatar {
	height: 46px;
}
.text-view {
	color: #191919;
}
</style>
