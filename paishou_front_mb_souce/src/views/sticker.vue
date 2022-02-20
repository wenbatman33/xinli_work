<template lang="pug">
//- 貼圖專區
.flex.flex-col.items-stretch
    //- 導覽欄
    .flex.flex-row.justify-between.items-center.px-6.pt-3.pb-2
        //- 標題
        .text-lg.text-title.font-bold 贴图专区

        //- 關閉
        van-button.w-8.h-8.p-1.rounded-full.bg-transparent.border-transparent(@click='clickClose')
            img.w-full.h-full(src='/publicAssets/img/sticker/icon-close@3x.png')

    //- 頁籤列表
    sticker-tabs
</template>
<script>
import { useRouter } from 'vue-router';
import stickerTabs from '@/components/sticker/stickerTabs.vue';

export default {
    components: {
        stickerTabs,
    },
    setup() {
		// Vue router
		const router = useRouter();

        // 點擊關閉按鈕
        const clickClose = () => {
            router.go(-1);
        };
        return {
            clickClose,
        };
    },
};
</script>