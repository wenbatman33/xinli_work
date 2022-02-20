<template lang="pug">
//- 首頁標題
.index-header.flex.flex-row.items-center.px-4.pt-6.pb-2
    //- 圖示
    img.w-6.h-6(:src='icon')

    //- 文字
    .flex-grow.text-lg.text-psV3Red.font-bold.px-2 {{ text }}

    //- 更多按鈕
    van-button.more-button.rounded-full(v-if='more', @click='clickMore')
        .w-8.h-8.flex.justify-center.items-center
            img.w-6.h-6(src='/publicAssets/img/index/icon-right-red@3x.png')
</template>
<script>
export default {
	props: {
		icon: String,
		text: String,
		more: Boolean,
	},
	emits: ['click-more'],
	setup(props, { emit }) {
		const clickMore = () => {
			emit('click-more');
		};
		return {
			clickMore,
		};
	},
};
</script>
<style lang="scss" scoped>
.index-header {
	width: 100%;
    .more-button {
        width: unset;
        height: unset;
        padding: 0;
        border: transparent;
        background: transparent;
    }
}
</style>