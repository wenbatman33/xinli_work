<template lang="pug">
.Container.BETWEEN
	//- personal 左側區塊------------------------------------------------------------------------------------------------------------
	.funcBar.w-40.pr-4.flex-shrink-0
		menuList
	.w-full.min-h-screen
		income
</template>
<script>
import income from '@/components/personal/income/index.vue';
import menuList from '@/components/personal/menuList.vue';

export default {
	components: {
		income,
		menuList,
	},
};
</script>
<style lang="scss" scoped></style>
