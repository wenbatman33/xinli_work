<template lang="pug">
//- 登入彈窗
van-popup(:show='show', round, class='w-10/12 md:w-1/2', teleport='.popupTeleport')
    .flex.flex-col.items-center.px-6.py-8
        //- 標題
        .text-base.text-title.font-bold 系统提示

        //- 訊息
        .text-sm.text-message.mt-4 {{ errorMsg }}

        //- 關閉
        van-button.w-auto.h-auto.mt-6.px-4.py-2.rounded-full.shadow.border-transparent.bg-transparent(@click='clickClose')
            .text-sm.text-close 关闭
</template>
<script>
export default {
	props: {
		show: Boolean,
        errorMsg: String,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// 點擊關閉按鈕
		const clickClose = () => {
			emit('update:show', false);
		};
		return {
			clickClose,
		};
	},
}
</script>
<style lang="scss" scoped>
.text-title {
	color: #a62337;
}
.text-message {
	color: #969696;
}
.text-close {
	color: #a62337;
}
</style>