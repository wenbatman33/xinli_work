<template lang="pug">
//- 維護頁
.maintenance.px-4
	//- 大香蕉圖示
	img(class='w-1/2 md:w-1/3', src='/publicAssets/img/maintain/img-maintain@3x.png')

	//- 維護提示
	.tips.mt-8(v-html='tips')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
	setup() {
		// Vuex store
		const store = useStore();

		// Maintenance tips
		const tips = computed(() => {
			const defaultTips = '亲，为提供更好的服务<br/>拍手正进行全站系统维护<br/>请稍后再回到拍手唷！'
			return store?.state?.config?.config?.maintain_tips || defaultTips;
		});
		return {
			tips,
		};
	},
};
</script>
<style lang="scss" scoped>
.maintenance {
	width: 100%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.tips {
		color: #969696;
		font-weight: bold;
		text-align: center;
	}
}
</style>