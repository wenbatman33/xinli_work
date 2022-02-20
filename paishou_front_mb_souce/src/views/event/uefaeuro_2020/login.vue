<template lang="pug">
//- 歐洲杯登入獎勵
.w-full.min-h-full.bg-login.flex.flex-col.items-stretch
    //- 2021
    img.absolute.top-52.w-2021.object-contain(src='/publicAssets/img/event/uefaeuro_2020/icon-home-2021@3x.png')
    
    //- 頁面內容
    .w-full.flex.flex-col.items-stretch.pb-12
        //- 導覽欄
        navBar.w-full(title='限时登入领取')

        //- 目前沒有紀錄
        .self-center.text-sm.text-white.mt-12(v-if='slideListEmpty') 目前没有紀錄

        //- 獎項列表
        .grid.grid-cols-1.gap-4.mt-2.mx-6(v-else)
            //- 獎項
            .grid.grid-cols-item.items-center.p-4.bg-item.rounded(v-for='item in state.slideList')
                //- 圖示
                img.w-12.h-12.object-contain(:src='item.slide_pic || ""', @error='errorSlideImg')

                //- 內容
                .flex.flex-col.pl-4
                    //- 日期
                    .text-xs.text-date
                        span {{ item.slide_name }}
                        span.ml-1 {{ item.slide_des }}

                    //- 名稱
                    .text-lg.text-white.font-bold.mt-1 {{ item.slide_content }}

        //- 說明
        .text-sm.text-desc.text-center.bg-white.rounded.p-4.mx-6.mt-14
            span 指定时间内登入拍手即可立即领取 对应奖励。
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
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-login {
	background: url('/publicAssets/img/event/uefaeuro_2020/icon-bg@3x.png');
	background-size: cover;
}
.bg-item {
    background: rgba($color: #ffffff, $alpha: 0.3);
    backdrop-filter: blur(6px);
}
.grid-cols-item {
    grid-template-columns: auto 1fr;
}
.text-date {
    color: #F4F4F4;
}
.text-desc {
    color: #969696;
}
</style>
