<template lang="pug">
//- 問卷調查
.relative.w-full.min-h-full.flex.flex-col.items-stretch.bg-index
    //- 導覽欄
    .grid.grid-cols-nav.pt-6.px-6
        //- 注意事項
        van-button.w-auto.h-auto.px-2.py-1.rounded-full.bg-notice.border-transparent(@click='clickNotice')
            .flex.flex-row.items-center
                img.w-4.h-4(src='/publicAssets/img/questionnaire/icon-notice@3x.png')
                .text-sm.text-white.ml-1 注意事項

        //- 間距
        .bg-transparent

        //- 關閉
        van-button.w-auto.h-auto.p-1.rounded-full.bg-transparent.border-transparent(@click='clickClose')
            img.w-6.h-6(src='/publicAssets/img/questionnaire/icon-close@3x.png')

    //- 子頁面
    router-view.flex-grow

//- 注意事項彈窗
notice-popup(v-model:show='state.showNoitce')
</template>
<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import noticePopup from '@/views/questionnaire/noticePopup.vue';

export default {
    components: {
        noticePopup,
    },
	setup() {
        // Vue router
        const router = useRouter();

        // Component state
        const state = reactive({
            showNoitce: false,
        });

		// 點擊注意事項
		const clickNotice = () => {
            state.showNoitce = true;
        };

		// 點擊關閉
		const clickClose = () => {
            router.go(-1);
        };
		return {
            state,
			clickNotice,
			clickClose,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-index {
	background-image: url('/publicAssets/img/questionnaire/icon-bg@3x.png');
	background-position: top;
	background-size: cover;
}
.grid-cols-nav {
	grid-template-columns: auto 1fr auto;
}
.bg-notice {
	background: #191919;
}
</style>
