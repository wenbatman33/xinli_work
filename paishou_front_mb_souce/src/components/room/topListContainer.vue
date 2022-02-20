<template lang="pug">
//- 貢獻榜內容
.top-list-container
    .flex.flex-col.items-stretch.pb-8
        //- 前三名
        .grid.grid-cols-3.gap-2.px-4.mt-2
            //- 第二名
            topListTop3(:item='top2', :rank='2')

            //- 第一名
            topListTop3(:item='top1', :rank='1')

            //- 第三名
            topListTop3(:item='top3', :rank='3')

        //- 頭號粉絲就是你
        .mt-12(v-if='isEmpty')
            .empty.text-sm.text-center.font-normal 头号粉丝，就是你

        //- 第四名後
        .mt-4(v-else)
            top-list-item(v-for='(item, index) in after4', :item='item', :rank='index + 4')
</template>
<script>
import { computed } from 'vue';
import topListTop3 from './topListTop3.vue';
import topListItem from './topListItem.vue';

export default {
    components: {
        topListTop3,
        topListItem,
    },
    props: {
        list: Array,
    },
    setup(props) {
		// 資料是否為空
		const isEmpty = computed(() => !props.list || props.list.length === 0);

		// 空資料
		const getBlankData = () => {
			return {
				avatar: '/publicAssets/img/room/img-avatar-default@3x.png',
				is_blank: true,
			};
		};

		// 第一名
		const top1 = computed(() => {
			return props.list[0] || getBlankData();
		});

		// 第二名
		const top2 = computed(() => {
			return props.list[1] || getBlankData();
		});

		// 第三名
		const top3 = computed(() => {
			return props.list[2] || getBlankData();
		});

		// 第四名後
		const after4 = computed(() => {
			return props.list?.slice(3) || [];
		});
        return {
            isEmpty,
            top1,
            top2,
            top3,
            after4,
        };
    },
}   
</script>
<style lang="scss" scoped>
.top-list-container {
    width: 100%;
}
.empty {
    color: #909399;
}
</style>