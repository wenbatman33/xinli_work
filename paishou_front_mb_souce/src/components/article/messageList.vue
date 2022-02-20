<template lang="pug">
//- 留言列表
.grid.grid-cols-1.gap-4
    message-item(v-for='item in list', :item='item')
</template>
<script>
import messageItem from '@/components/article/messageItem.vue';

export default {
	components: {
		messageItem,
	},
	props: {
		list: Array,
	},
};
</script>
