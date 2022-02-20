<template lang="pug">
//- 懸浮拼圖
van-button.w-button.h-button.p-0.bg-transparent.border-transparent(v-if='show', :loading='state.loading', @click='clickJigsaw')
	//- 拼圖圖示
	img.w-full.h-full.object-contain(:src='icon', @error='errorIconImg')

	//- 讀取中
	template(#loading)
		.relative.w-full.h-full
			img.relative.z-10.w-full.h-full.object-contain(:src='icon', @error='errorIconImg')
			van-loading.absolute.z-20.left-loading.top-loading.w-loading.h-loading(type='spinner', color='#ffffff')

//- 領取成功彈窗
van-popup(:show='state.showPopup', round, class='w-10/12 md:w-1/2')
	//- 彈窗內容
	.flex.flex-col.items-stretch.px-6.py-12
		//- 彈窗標題
		.text-popup-title.text-lg.text-center.font-bold 恭喜获得拼图一块!

		//- 彈窗內容
		.text-popup-content.text-xs.text-center.mt-3 请至活动页查看

		//- 彈窗按鈕
		.grid.grid-cols-2.gap-3.items-center.mx-5.mt-10
			//- 關閉
			van-button.w-auto.h-auto.p-2.rounded-full.shadow-popup-close.bg-white.border-transparent(@click='clickClose')
				.text-popup-close.text-sm 关闭

			//- 導頁
			van-button.w-auto.h-auto.p-2.rounded-full.bg-popup-navigate.border-transparent(@click='clickNavigate')
				.text-white.text-sm 活动页
</template>
<script>
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { event011Receive } from '@/api';

export default {
	setup() {
		// Vue router
		const route = useRoute();
		const router = useRouter();

		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			loading: false,
			showPopup: false,
		});

		// 拼圖圖示
		const icon = computed(() => {
			return store?.state?.socket?.jigsawInfo?.img || '';
		});

		// 是否顯示
		const show = computed(() => {
			return /^\/room/.test(route.path) && store?.state?.socket?.jigsawInfo?.get === false;
		});

		// 拼圖圖示讀取失敗
		const errorIconImg = (e) => {
			e.target.src = '/publicAssets/img/app/icon-jigsaw-placeholder@3x.png';
		};

		// 點擊拼圖
		const clickJigsaw = () => {
			// Update loading state
			state.loading = true;

			// Post body
			const body = {
				id: store?.state?.socket?.jigsawInfo?.id || 0,
			};

			// Receive jigsaw
			event011Receive(body)
				.then((res) => {
					// Revert loading state on finished
					state.loading = false;

					// Show success popup
					state.showPopup = true;

					// Clear jigsaw info
					store.commit('socket/SET_JIGSAW_INFO', {});

					// Update jigsaw info
					store.dispatch('socket/GET_JIGSAW_INFO');
				})
				.catch(() => {
					// Revert loading state on error
					state.loading = false;
				});
		};

		// 點擊彈窗關閉
		const clickClose = () => {
			state.showPopup = false;
		};

		// 點擊彈窗導頁
		const clickNavigate = () => {
			// Hide popup
			state.showPopup = false;

			// Navigate event page
			router?.push('/event/jigsaw');
		};
		return {
			state,
			icon,
			show,
			errorIconImg,
			clickJigsaw,
			clickClose,
			clickNavigate,
		};
	},
};
</script>
<style lang="scss" scoped>
.w-button {
	width: 80px;
}
.h-button {
	height: 80px;
}
.left-loading {
	left: 30px;
}
.top-loading {
	top: 30px;
}
.w-loading {
	width: 20px;
}
.h-loading {
	height: 20px;
}
.text-popup-title {
	color: #a62337;
}
.text-popup-content {
	color: #969696;
}
.shadow-popup-close {
	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
}
.text-popup-close {
	color: #a62337;
}
.bg-popup-navigate {
	background: #a62337;
}
</style>
