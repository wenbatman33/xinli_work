<template lang="pug">
.comboRank.overflow-hidden
	.my-2(class='w-[300px]', v-for='item in COMBO_LIST')
		comboRankItem(:dataList='item')
</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, reactive, toRaw, watch } from 'vue';
import comboRankItem from '@/components/room/combo/comboRankItem.vue';

export default {
	components: {
		comboRankItem,
	},
	setup(props, { emit }) {
		const store = useStore();
		// ---------------------------
		const state = reactive({});
		const COMBO_LIST = computed(() => store.state.socket.comboList || []);

		return {
			store,
			state,
			COMBO_LIST,
		};
	},
};
</script>
<style lang="scss" scoped></style>
