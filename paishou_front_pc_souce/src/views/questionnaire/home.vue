<template lang="pug">
//- 問卷首頁
.w-full.FLEX_C.items-center.bg-home.pb-12
    //- 標題
    img.w-title.mt-24(src='/publicAssets/img/questionnaire/icon-title@3x.png')

    //- 副標題
    .text-lg.text-subtitle.text-center.font-bold.mt-6
        span 感谢用户对拍手的爱戴
        br
        span 您的宝贵意见是我们改善的动力

    //- 獎勵列表
    .grid.grid-cols-2.gap-4.items-stretch.mt-6
        //- 獎勵A
        .grid.grid-cols-bonus-a.gap-1.justify-center.items-center.bg-white.rounded-bonus.shadow-bonus.p-4
            //- 圖示
            img.w-6.h-6(src='/publicAssets/img/questionnaire/icon-a@3x.png')

            //- 條件
            .text-base.text-action.font-bold.px-1 填写完成立即赠送

            //- 蕉幣圖示
            img.w-6.h-6(src='/publicAssets/img/questionnaire/icon-coin@3x.png')

            //- 蕉幣標題
            .text-base.text-bonus.font-bold 蕉币

            //- 蕉幣數量
            .text-base.text-quantity.font-bold 1,888

        //- 獎勵B
        .grid.grid-cols-bonus-b.gap-1.justify-center.items-center.bg-white.rounded-bonus.shadow-bonus.p-4
            //- 圖示
            img.w-6.h-6.row-span-2(src='/publicAssets/img/questionnaire/icon-b@3x.png')

            //- 條件
            .text-base.text-action.font-bold.px-1.row-span-2 新注册会员再加赠

            //- 獎勵
            .text-base.text-center.font-bold
                span.text-bonus 拍手礼包
                span.text-quantity 1个

            //- 獎勵
            .text-sm.text-quantity.font-bold (666*5+love*5+蕉幣688)

    //- 確認
    a-button.w-auto.h-auto.px-8.py-4.mt-14.rounded-full.bg-confirm.border-transparent(type='link', :loading='state.loading', @click='clickConfirm')
        a-spin(v-if='state.loading')
        .FLEX_R.items-center(v-else)
            .text-2xl.text-white.font-bold 立即填选
            img.w-6.h-6.ml-2(src='/publicAssets/img/questionnaire/icon-arrow-right@3x.png')

    //- 注意事項標題
    .text-2xl.text-notice-title.font-bold.mt-20 注意事項

    //- 注意事項內容
    .text-sm.text-center.text-notice-content.mt-4
        span 1.限每个用户领取一次优惠，不可重复领取
        br
        span 2.拍手直播有权利提早或终止活动，若提前截止，会提早公告。活动过程中如有发现违规行为，我方有
        br
        span 权取消此行为的用户参予活动资格，并扣除本活动所获得奖励。
</template>
<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { questionnaires } from '@/api';
import { message } from 'ant-design-vue';

export default {
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			loading: false,
		});

		// 點擊確認
		const clickConfirm = () => {
			// Check login status
			const uid = store?.state?.user?.uid || '';
			const token = store?.state?.user?.token || '';
			if (uid === 0 || uid === '' || token === '') {
				window.localStorage.setItem('tempUrl', '/questionnaire/home');
				router.push('/login');
				return;
			}

			// Update loading state
			state.loading = true;

			// Get questionnaires
			questionnaires()
				.then((res) => {
					// Revert loading state on finished
					state.loading = false;

					// Navigate first questionnaire
					const questionnaireList = res?.data?.list || [];
					if (res?.code === 0 && questionnaireList.length > 0) {
						if (questionnaireList.length > 0) {
							const id = questionnaireList[0]?.id;
							router.push(`/questionnaire/question/list/${id}`);
						} else {
							message.error('目前没有问卷');
						}
					}
				})
				.catch(() => {
					// Revert loading state on error
					state.loading = false;
				});
		};
		return {
			state,
			clickConfirm,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-home {
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
.grid-cols-bonus-a {
	grid-template-columns: auto auto auto auto auto;
}
.grid-cols-bonus-b {
	grid-template-columns: auto auto auto;
}
.rounded-bonus {
	border-radius: 6px;
}
.shadow-bonus {
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
}
.text-action {
	color: #a62337;
}
.text-bonus {
	color: #f8b62d;
}
.text-quantity {
	color: #969696;
}
.bg-confirm {
	background: linear-gradient(90deg, #a62337 0%, #d10828 100%);
}
.text-notice-title {
	color: #a62337;
}
.text-notice-content {
	color: #969696;
}
</style>
