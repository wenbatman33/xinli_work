<template lang="pug">
//- 廣告懸浮按鈕
van-button.w-button.h-button.z-10.ml-button.p-0.bg-transparent.border-transparent(v-if='show' @click='clickSlide')
    //- 廣告圖示
    img.w-full.h-full.rounded-full.object-cover(:src='pic', @error='errorPicImg')
</template>
<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { deepLink } from '@/utils';
import { matomo_room_check_slide, matomo_articleClass_check_slide } from '@/matomoTrackEvent.js';

export default {
    setup() {
        // Vue router
		const route = useRoute();

        // Vuex store
		const store = useStore();

        // 第一筆廣告
        const slide = computed(() => {
            const slideList = store?.state?.config?.floatSlideList || [];
            if (slideList.length > 0) {
                return slideList[0];
            } else {
                return undefined;
            }
        });

        // 是否顯示
		const show = computed(() => {
			if (store?.state?.config?.hideFloatSlide === true) {
				return false;
			} else if (!slide.value) {
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
			} else if (/room\/\d+/.test(route.path)) {
				return true;
			} else {
				return false;
			}
		});

        // 廣告圖示
        const pic = computed(() => {
            return slide?.value?.slide_pic || '';
        });

        // 廣告圖示讀取失敗
        const errorPicImg = (e) => {
            e.target.src = '/publicAssets/img/app/icon-slide-placeholder@3x.png';
        };

        // 點擊廣告
        const clickSlide = () => {
            // Deep link
            deepLink(slide?.value?.slide_url || '');

            // Matomo track
            if (/^\/room/.test(route.path)) {
                matomo_room_check_slide(slide?.value?.slide_id);
            } else if (/^\/article\/class/.test(route.path)) {
                matomo_articleClass_check_slide(slide?.value?.slide_id);
            }
        };

        // On component mounted
        onMounted(() => {
            store.dispatch('config/GET_FLOAT_SLIDE_LIST');
        });
        return {
            show,
            pic,
            errorPicImg,
            clickSlide,
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
	width: 72px;
}
.h-button {
	height: 72px;
}
.ml-button {
	margin-left: -12px;
}
</style>