<template lang="pug">
//- 我的背包-道具列表
.backpack-item.pb-8
	item-list
</template>
<script>
import itemList from '@/components/backpack/itemList.vue';

export default {
	components: {
		itemList,
	},
};
</script>
<style lang="scss" scoped>
.backpack-item {
	width: 100%;
}
</style>