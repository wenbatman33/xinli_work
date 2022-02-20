<template lang="pug">
//- 問卷首頁
.flex.flex-col.items-center.pt-24.pb-12.px-6
    //- 標題
    img.w-full(src='/publicAssets/img/questionnaire/icon-title@3x.png')

    //- 副標題
    .text-base.text-subtitle.text-center.font-bold.mt-6
        span 感谢用户对拍手的爱戴
        br
        span 您的宝贵意见是我们改善的动力

    //- 獎勵A
    .w-full.grid.grid-cols-bonus-a.gap-1.justify-center.items-center.bg-white.rounded-bonus.shadow-bonus.mt-6.p-4
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
    .w-full.grid.grid-cols-bonus-b.gap-1.justify-center.items-center.bg-white.rounded-bonus.shadow-bonus.mt-4.p-4
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
    van-button.w-auto.h-auto.px-8.py-4.mt-12.rounded-full.bg-confirm.border-transparent(:loading='state.loading', @click='clickConfirm')
        .flex.flex-row.items-center
            .text-2xl.text-white.font-bold 立即填选
            img.w-6.h-6.ml-2(src='/publicAssets/img/questionnaire/icon-arrow-right@3x.png')
        template(#loading)
            van-loading.w-6.h-6(color='#ffffff')
</template>
<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { questionnaires } from '@/api';
import { Notify } from 'vant';

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
			if (!store.getters['user/IS_LOGIN']) {
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
			                Notify({ type: 'danger', message: '目前没有问卷' });
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
</style>
