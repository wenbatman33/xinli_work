<template lang="pug">
//- 下載廣告
.download-banner(v-if='isShow')
    //- 廣告連結
    van-button.pic-button(@click='clickPic')

    //- 廣告圖示
    img.w-full(:src='slidePic', @error='errorSlideImg')

    //- 關閉按鈕
    van-button.close-button.rounded-full.left-1(:style='{ "margin-top": "-1.25rem" }', @click='clickHide')
        .w-10.h-10.flex.justify-center.items-center
            img.w-6.h-6(src='/publicAssets/img/app/icon-close-white@3x.png')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { slideList } from '@/api';

export default {
	setup() {
        // Vue router
        const route = useRoute();
        const router = useRouter();

		// Component state
		const state = reactive({
			slideList: [],
            isHide: sessionStorage.getItem('hide_downalod_banner'),
            isSlideImgError: false,
		});

        // 第一筆廣告的圖片
        const slidePic = computed(() => {
            if (!state.slideList) {
                return '';
            } else if (state.slideList.length === 0) {
                return '';
            } else {
                return state.slideList[0].slide_pic || '';
            }
        });

        // 是否顯示
        const isShow = computed(() => {
            // Check path
            if (route.path === '/download') {
                return false;
            }
            if (route.path === '/tasks') {
                return false;
            }
            if (/\/article\/topic\/\w+/.test(route.path)) {
                return false;
            }
            if (/\/room\/\w+/.test(route.path)) {
                return false;
            }

            // Check standlone flag
			const query = '(display-mode: standalone)';
			const isPWA = navigator.standalone || window.matchMedia(query).matches;
            if (isPWA) {
                return false;
            }

            // Check andorid application
            if (window?.android?.isAndroidApp() === true) {
                return false;
            }
            
            // Check hide flag
            if (state.isHide === 'true') {
                return false;
            }

            // Check slide picture
            if (!slidePic.value || slidePic.value.length === 0) {
                return false;
            }

            // Check img error
            if (state.isImgError) {
                return false;
            }
            
            // Display download banner
            return true;
        });

		// On component mounted
		onMounted(() => {
            state.isSlideImgError = false;
			slideList({ slide_cid: 18 }).then((res) => {
				state.slideList = res?.data?.list || [];
			});
		});

        // 點擊隱藏
        const clickHide = () => {
            state.isHide = 'true';
            sessionStorage.setItem('hide_downalod_banner', 'true');
        };

        // 點擊圖片
        const clickPic = () => {
            router.push('/download');
        };

        // 廣告圖片讀取失敗
        const errorSlideImg = () => {
            state.isSlideImgError = true;
        };
		return {
            slidePic,
            isShow,
            clickHide,
            clickPic,
            errorSlideImg,
        };
	},
};
</script>
<style lang="scss" scoped>
.download-banner {
    width: 100%;
    position: relative;
    .pic-button {
        width: 100%;
        height: 100%;
        padding: 0px;
        border: transparent;
        background: transparent;
        position: absolute;
    }
    .close-button {
        width: unset;
        height: unset;
        padding: 0px;
        border: transparent;
        background: transparent;
        position: absolute;
        top: 50%
    }
}
</style>