<template lang="pug">
//- 我的背包-道具列表
.backpack-gift.pb-8
	gift-list
</template>
<script>
import giftList from '@/components/backpack/giftList.vue';

export default {
	components: {
		giftList,
	},
};
</script>
<style lang="scss" scoped>
.backpack-gift {
	width: 100%;
}
</style>