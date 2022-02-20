<template lang="pug">
//- 活動首頁
.w-full.flex.flex-col.items-stretch.justify-between
    //- 導覽欄
    nav-bar(rule, close)

    //- 頁面內容
    .flex.flex-col.items-stretch.py-6
        //- 圖片組合
        .relative.flex.flex-col.items-center
            //- 手機圖片
            img.absolute.z-10.w-full.h-full.object-contain.opacity-30(src='/publicAssets/img/event/send_phone/img-mobile@3x.png')

            //- 商標圖片
            img.relative.z-20.w-logo.mt-20(src='/publicAssets/img/event/send_phone/img-logo@3x.png')

            //- 文字圖片
            img.relative.z-20.w-full.mt-2.mb-20(src='/publicAssets/img/event/send_phone/img-text@3x.png')

        //- 開始抽獎
        van-button.w-full.h-auto.p-4.mt-4.rounded-md.border-2.border-white.bg-transparent(@click='clickPlay')
            .text-sm.text-white.font-bold 开始抽奖

        //- 返回首頁
        van-button.w-full.h-auto.p-4.mt-1.rounded-md.border-transparent.bg-transparent(@click='clickBack')
            .flex.flex-row.items-center
                .text-xs.text-white 返回拍手首页
                img.w-2.h-2.ml-2(src='/publicAssets/img/event/send_phone/icon-right-3@3x.png')

    //- 版權聲明
    copyright
</template>
<script>
import { useRouter } from 'vue-router';
import navBar from '@/views/event/send_phone/navBar.vue';
import copyright from '@/views/event/send_phone/copyright.vue';

export default {
    components: {
        navBar,
        copyright,
    },
	setup() {
		// Vue router
		const router = useRouter();

        // 點擊開始按鈕
        const clickPlay = () => {
            router.push('/event/send_phone/game');
        };

        // 點擊返回按鈕
        const clickBack = () => {
            router.replace('/');
        };
        return {
            clickPlay,
            clickBack,
        }
    },
};
</script>
<style lang="scss" scoped>
.w-logo {
    width: 35%;
}
</style>