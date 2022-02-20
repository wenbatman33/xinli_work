<template lang="pug">
.w-full
	h3.text-psV3Red 直播间
	.grid.grid-cols-4.gap-4
		.cursor-pointer.col-span-1(v-for='(item, index) in dataList', :key='index')
			videoItem(:videoData='item')
</template>
<script>
import { useStore } from 'vuex';
import { onMounted, computed, watch, reactive } from 'vue';
import videoItem from '@/components/videoItem';

export default {
	components: {
		videoItem,
	},
	props: ['dataList'],
	setup(props) {
		const store = useStore();
		const state = reactive({});
		const isLogin = computed(() => store.state.user.token !== '' && store.state.user.uid !== '');
		const UID = computed(() => store.state.user.uid || '');
		watch(
			() => props.dataList,
			() => {
				init();
			}
		);
		const init = () => {};
		onMounted(() => {
			init();
		});
		return {
			state,
			init,
			isLogin,
			UID,
		};
	},
};
</script>
<style lang="scss" scoped></style>
