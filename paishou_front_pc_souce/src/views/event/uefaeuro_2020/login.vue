<template lang="pug">
//- 歐洲杯登入
.relative.w-full.min-h-full.bg-login.FLEX_C.items-center.overflow-hidden
	//- 2021
	img.absolute.top-32.w-2021(src='/publicAssets/img/event/uefaeuro_2020/icon-home-2021@3x.png')

	//- 頁面內容
	.FLEX_R.items-center.pb-20
		//- 左側按鈕列
		.pr-12
			.w-10

		//- 內容
		.FLEX_C.items-stretch
			//- 導覽欄
			nav-bar

			//- 標題
			.text-2xl.text-white.font-bold.mt-12 限时登入领取

			//- 副標題
			.text-base.font-bold.mt-4
				span.text-white 指定时间内登入内拍手即可立即领取
				span.text-highlight.ml-1 对应奖励。 

			//- 目前沒有紀錄
			.text-sm.text-white.mt-12(v-if='slideListEmpty') 目前没有紀錄

			//- 獎項列表
			.grid.grid-cols-4.gap-10.mt-14.mx-6(v-else)
				//- 獎項
				.FLEX_C.items-center.p-4.bg-item.rounded(v-for='item in state.slideList')
					//- 圖示
					img.w-28.h-28.object-contain(:src='item.slide_pic || ""', @error='errorSlideImg')

					//- 日期 
					.bg-date.text-sx.text-white.font-bold.rounded-full.px-4.mt-1 {{ item.slide_name }}

					//- 時間
					.text-base.text-time.text-white.font-bold.mt-1 {{ item.slide_des }}

					//- 名稱
					.text-sm.text-white.font-bold.mt-3 {{ item.slide_content }}

		//- 右側按鈕列
		.FLEX_C.items-center.pl-12
			//- 說明按鈕
			a-popover
				a-button(type='link')
					img.w-10.h-10(src='/publicAssets/img/event/uefaeuro_2020/icon-info@3x.png')
				template(#content)
					.FLEX_C.items-start.bg-white.rounded.px-4.py-5
						.text-base.text-desc-title.font-bold 限时登入活动说明
						.text-sm.mt-2 
							span.text-desc 指定时间内登入拍手
							br
							span.text-desc 即可立即领取
							span.text-highlight 对应奖励。

			//- 置頂按鈕
			a-button(type='link', @click='clickTop')
				img.w-10.h-10.mt-6(src='/publicAssets/img/event/uefaeuro_2020/icon-top@3x.png')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { slideList } from '@/api';
import navBar from '@/views/event/uefaeuro_2020/navBar.vue';

export default {
	components: {
		navBar,
	},
	setup() {
		// Component state
		const state = reactive({
			slideList: [],
		});

		// 獎勵列表是否為空
		const slideListEmpty = computed(() => {
			return !state.slideList || state.slideList.length === 0;
		});

		// 獎勵圖片讀取失敗
		const errorSlideImg = (e) => {
			e.target.src = '/publicAssets/img/event/uefaeuro_2020/icon-gift-placeholder@3x.png';
		};

		// 點擊向上按鈕
		const clickTop = () => {
			window.scrollTo(0, 0);
		};

		// On component mount
		onMounted(() => {
			slideList({ slide_cid: 16 }).then((res) => {
				state.slideList = res?.data?.list || [];
			});
		});
		return {
			state,
			slideListEmpty,
			errorSlideImg,
			clickTop,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-login {
	background: url('/publicAssets/img/event/uefaeuro_2020/icon-bg@3x.jpg');
	background-size: cover;
}
.w-2021 {
	width: 72%;
}
.text-highlight {
	color: #ffff10;
}
.bg-item {
	background: rgba($color: #ffffff, $alpha: 0.3);
	backdrop-filter: blur(6px);
}
.bg-date {
	background: #a62337;
}
.text-desc-title {
	color: #a62337;
}
.text-desc {
	color: #969696;
}
</style>
