<template lang="pug">
//- 問卷完成
.w-full.FLEX_C.items-center.bg-finish.pb-12
    //- 標題
    img.w-title.mt-24(src='/publicAssets/img/questionnaire/icon-title@3x.png')

    //- 副標題
    .text-base.text-subtitle.text-center.font-bold.mt-6
        span 感谢用户对拍手的爱戴
        br
        span 您的宝贵意见是我们改善的动力

    //- 獎勵
    .text-2xl.text-bonus.text-center.font-bold.mt-24
        span 填写奖励已发送至您的背包
        br
        span 请至背包查看

    //- 確認
    a-button.w-auto.h-auto.px-8.py-4.mt-12.rounded-full.bg-confirm.border-transparent(type='link', @click='clickConfirm')
        .FLEX_R.items-center
            .text-2xl.text-white.font-bold 返回首页
            img.w-6.h-6.ml-2(src='/publicAssets/img/questionnaire/icon-arrow-right@3x.png')

    //- 倒計時
    .text-sm.text-countdown.text-center.mt-4
        span {{ state.countdown }}
        span 秒后返回首页
</template>
<script>
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
	setup() {
		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			countdown: 3,
		});

		// 點擊確認
		const clickConfirm = () => {
			router.replace('/');
		};

		// Countdown
		const countdown = () => {
			if (state.countdown > 0) {
				setTimeout(() => {
					state.countdown--;
					countdown();
				}, 1000);
			} else {
				clickConfirm();
			}
		};

		// On component mounted
		onMounted(() => {
			countdown();
		});
		return {
			state,
			clickConfirm,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-finish {
	background-image: url('/publicAssets/img/questionnaire/icon-bg@3x.png');
	background-position: top;
	background-size: cover;
}
.w-title {
	width: 30%;
}
.text-subtitle {
	color: #191919;
}
.text-bonus {
	color: #a62337;
}
.bg-confirm {
	background: #f8b62d;
}
.text-countdown {
	color: #969696;
}
</style>
