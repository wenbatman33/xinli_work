<template lang="pug">
//- 搜尋結果分類標題
.search-header.flex.flex-row.items-center
    //- 圖示
    img.w-6.h-6.ml-4(:src='icon')

    //- 標題
    .flex-grow.title.text-base.font-bold.mx-2 {{ text }}

    //- 更多
    van-button.more.rounded-full.mr-1(v-if='more', @click='clickMore') 
        .flex.items-center.justify-center.w-10.h-10
            img.w-6.h-6(src='/publicAssets/img/search/icon-Right@3x.png')
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
            emit('click-more')
        };
        return {
            clickMore,
        };
    },
}
</script>
<style lang="scss" scoped>
.search-header {
    width: 100%;
	.title {
		color: #a62337;
	}
	.more {
		height: unset;
		padding: unset;
		border: transparent;
		background-color: transparent;
		color: #a62337;
	}
}
</style>