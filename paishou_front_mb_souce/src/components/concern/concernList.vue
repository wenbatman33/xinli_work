<template lang="pug">
//- 關注列表
.concern-list.flex.flex-col
	concern-item(v-for='item in list', :item='item', :path='path')
</template>
<script>
import concernItem from '@/components/concern/concernItem.vue';

export default {
	components: {
		concernItem,
	},
	props: {
		list: Array,
		path: String,
	},
};
</script>
<style lang="scss" scoped>
.concern-list {
	width: 100%;
}
</style>