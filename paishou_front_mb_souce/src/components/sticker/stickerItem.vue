<template lang="pug">
//- 貼圖物件
van-button.w-auto.h-auto.p-4.rounded.bg-transparent.border-transparent
    //- 貼圖圖片
    img.w-full.h-auto.object-contain(:src='img', @error='errorStickerImg')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    props: {
        item: Object,
    },
	setup(props) {
		// Vuex store
		const store = useStore();

        // 貼圖圖片
        const img = computed(() => {
            return props?.item?.img || '';
        });

		// 貼圖圖片讀取失敗
		const errorStickerImg = (e) => {
			e.target.src = '/publicAssets/img/room/icon-sticker-placeholder@3x.png';
		};
        return {
            img,
            errorStickerImg,
        };
    },
};
</script>