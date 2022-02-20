<template lang="pug">
//- 主題列表
.flex.flex-row.flex-nowrap.w-full.overflow-x-auto
    topic-item.mr-2.my-1(v-for='item in list', :item='item')
</template>
<script>
import topicItem from '@/components/article/topicItem.vue';

export default {
	components: {
		topicItem,
	},
	props: {
		list: Array,
	},
};
</script>
