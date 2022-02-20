<template lang="pug">
//- 導覽欄
.flex.flex-col.items-stretch
    //- 內容
    .flex.flex-row.items-center.pr-4.pt-8.pb-2(class='pl-1.5')
        //- 返回按鈕
        van-button.flex-shrink-0.w-10.h-10.p-2.rounded-full.bg-transparent.border-transparent(@click='clickBack')
            img.w-6.h-6(src='/publicAssets/img/icon-left-red@3x.png')

        //- 輸入框
        van-search.flex-grow.p-0(shape='round', :model-value='keyword', @update:model-value='updateKeyword', placeholder='请输入搜索关键词', @search='clickSearch')

        //- 搜尋按鈕
        van-button.flex-shrink-0.w-auto.h-auto.px-2.py-0.ml-2.rounded-full.bg-search.border-transparent(:disabled='searchDisabled', @click='clickSearch')
            .text-sm.text-white.font-bold.py-1.px-2 搜寻

    //- 分隔線
    divider
</template>
<script>
import { computed } from 'vue';
import divider from '@/components/divider';

export default {
	components: {
		divider,
	},
	props: {
		keyword: String,
	},
	emits: ['update:keyword', 'click-back', 'click-search'],
	setup(props, { emit }) {
		// 禁用搜尋按鈕
		const searchDisabled = computed(() => {
			return !props?.keyword || props?.keyword?.length === 0;
		});

		// 更新關鍵字
		const updateKeyword = (e) => {
			emit('update:keyword', e);
		};

		// 點擊返回按鈕
		const clickBack = () => {
			emit('click-back');
		};

		//- 點擊搜尋按鈕
		const clickSearch = () => {
			emit('click-search');
		};
		return {
			searchDisabled,
			updateKeyword,
			clickBack,
			clickSearch,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-search {
	background: #a62337;
}
</style>
