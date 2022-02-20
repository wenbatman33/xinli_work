<template lang="pug">
//- 文章列表
.grid.grid-cols-1.gap-4
    article-item(v-for='item in list', :item='item')
</template>
<script>
import articleItem from '@/components/article/articleItem.vue';

export default {
	components: {
		articleItem,
	},
	props: {
		list: Array,
	},
};
</script>
