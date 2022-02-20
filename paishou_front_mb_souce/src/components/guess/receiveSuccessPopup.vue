<template lang="pug">
//- 競猜下注成功彈窗
van-popup(:show='show', round, class='w-8/12 md:w-6/12', teleport='.popupTeleport', @click-overlay='clickOverlay')
    //- 內容
    .flex.flex-col.items-center.px-6.pt-12.pb-8
        //- 打勾圖片
        img.w-20.h-20(src='/publicAssets/img/guess/icon-check@3x.png')

        //- 標題
        .text-xl.text-title.font-bold.mt-8 领取奖励成功
        
        //- 關閉
        van-button.w-full.h-auto.px-4.py-2.mt-2.rounded.bg-transparent.border-close.mt-4(@click='clickClose')
            .text-sm.text-close 关闭
</template>
<script>
export default {
    props: {
        show: Boolean,
    },
    emits: ['update:show'],
    setup(props, { emit }) {
		// 點擊遮罩層
		const clickOverlay = () => {
			emit('update:show', false);
		};

        // 點擊關閉按鈕
        const clickClose = () => {
			emit('update:show', false);
        };
        return {
            clickOverlay,
            clickClose,
        };
    },
};
</script>
<style lang="scss" scoped>
.text-title {
	color: #a62337;
}
.border-close {
	border: 1px solid #a62337;
}
.text-close {
	color: #a62337;
}
</style>