<template lang="pug">
//- 蓋板廣告彈窗
van-popup.w-full.h-full.py-8.grid.grid-cols-1.grid-rows-popup.gap-4.bg-transparent(:show='show')
    //- 蓋板廣告輪播
    van-swipe.justify-self-stretch(:autoplay='3000', indicator-color='white')
        //- 蓋板廣告物件
        van-swipe-item.flex.flex-col.justify-center(v-for='item in slideList')
            //- 蓋板廣告圖片
            img.w-full.px-8.object-contain.object-center(:src='item.slide_pic || ""', @error='errorSlideImg', @click='clickSlide(item)')

    //- 關閉按鈕
    van-button.justify-self-center.w-8.h-8.p-1.rounded-full.bg-transparent.border-close(@click='clickClose')
        //- 關閉圖示
        img.w-full.h-full.object-contain(src='/publicAssets/img/app/icon-close-white@3x.png')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { deepLink } from '@/utils';

export default {
    setup() {
        // Vuex store
        const store = useStore();

        // 蓋板廣告列表
        const slideList = computed(() => {
            return store?.state?.config?.slideList || [];
        });

        // 是否隱藏蓋板廣告
        const hideSlide = computed(() => {
            return store?.state?.config?.hideSlide === true;
        });
        
        // 是否顯示蓋板廣告
        const show = computed(() => {
            return hideSlide.value === false && slideList.value.length > 0;
        });

		// 廣告圖片讀取失敗
		const errorSlideImg = (e) => {
			e.target.src = '/publicAssets/img/default-banner@3x.png';
		};

        // 點擊廣告
        const clickSlide = (item) => {
            deepLink(item?.slide_url || '');
            store.commit('config/SET_HIDE_SLIDE', true);
        };

        // 點擊關閉按鈕
        const clickClose = () => {
            store.commit('config/SET_HIDE_SLIDE', true);
        };
        return {
            slideList,
            show,
            errorSlideImg,
            clickSlide,
            clickClose,
        };
    },
};
</script>
<style lang="scss" scoped>
.grid-rows-popup {
    grid-template-rows: 1fr auto;
}
.border-close {
    border: 2px solid #ffffff;
}
</style>