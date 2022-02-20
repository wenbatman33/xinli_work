<template lang="pug">
//- 連續送禮列表
.grid.grid-cols-1.gap-4.justify-stretch.pl-3.pr-20.pt-8.pb-12
    combo-item(v-for='item in comboList', :item='item')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import comboItem from '@/components/room/comboItem.vue';

export default {
	components: {
		comboItem,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// 連續送禮列表
		const comboList = computed(() => {
			return store?.state?.socket?.comboList || [];
		});
		return {
			comboList,
		};
	},
};
</script>
