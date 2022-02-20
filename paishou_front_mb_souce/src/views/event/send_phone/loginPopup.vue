<template lang="pug">
//- 登入彈窗
van-popup(:show='show', round, class='w-10/12 md:w-1/2', teleport='.popupTeleport')
    .flex.flex-col.items-center.px-6.py-8
        //- 標題
        .text-base.text-title.font-bold 请先登录

        //- 訊息
        .text-sm.text-message.mt-4 要进入或使用相关功能，请先登录。

        .w-full.grid.grid-cols-2.gap-4.mt-6
            //- 關閉
            van-button.w-auto.h-auto.px-4.py-2.rounded-full.shadow.border-transparent.bg-transparent(@click='clickClose')
                .text-sm.text-close 关闭

            //- 登入
            van-button.w-auto.h-auto.px-4.py-2.rounded-full.shadow.border-transparent.bg-login(@click='clickLogin')
                .text-sm.text-white 登录
</template>
<script>
import { useRoute, useRouter } from 'vue-router';

export default {
	props: {
		show: Boolean,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
        // Vue router
        const route = useRoute();
        const router = useRouter();

		// 點擊關閉按鈕
		const clickClose = () => {
			emit('update:show', false);
		};
        
		// 點擊登入按鈕
		const clickLogin = () => {
            window.localStorage.setItem('tempUrl', route.path);
            router.push('/login');
		};
		return {
			clickClose,
            clickLogin,
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
.bg-login {
    background: #a62337;
}
</style>