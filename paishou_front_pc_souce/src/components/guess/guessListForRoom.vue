<template lang="pug">
.w-full(v-if='state.guessDataList')
	h3.my-4.text-psV3Red 
		span 主播竞猜
		span.text-gray-500.text-xs.ml-4 所有竞猜可重复下注
	.grid.grid-cols-2.gap-4
		.col-span-1.rounded.bg-white.shadow(v-for='(guessGame, index) in state.guessDataList')
			guessListForRoomItem(:guessGame='guessGame', @gameUpadte='gameUpadte')

						
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import { guessList } from '@/api';
import guessListForRoomItem from '@/components/guess/guessListForRoomItem';

export default {
	components: {
		guessListForRoomItem,
	},
	props: {
		liveId: Number,
	},
	setup(props, { emit }) {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			guessDataList: [],
		});

		const gameUpadte = () => {
			// state.guessDataList = [];
			init();
		};
		const init = () => {
			guessList({
				live_id: props?.liveId,
			}).then((res) => {
				state.guessDataList = res?.data?.list;
			});
		};
		onMounted(() => {
			init();
		});
		return {
			init,
			state,
			gameUpadte,
		};
	},
};
</script>
<style lang="scss" scoped></style>
