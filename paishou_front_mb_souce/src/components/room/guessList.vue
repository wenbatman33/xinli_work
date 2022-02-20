<template lang="pug">
//- 競猜
van-pull-refresh.flex-grow.bg-guess-list(:model-value='state.loading', @refresh='refresh')
    .w-full.min-h-full.flex.flex-col.items-stretch.px-4.pb-8
        //- 目前沒有紀錄
        empty.mt-6(v-if='guessListEmpty')

        //- 競猜列表
        .mt-2(v-else)
            guess-item(v-for='item in state.guessList', :item='item', @bet-success='betSuccess')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { guessList } from '@/api';
import empty from '@/components/empty';
import guessItem from '@/components/room/guessItem.vue';

export default {
	components: {
		empty,
		guessItem,
	},
	setup() {
		// Vue router
		const route = useRoute();

		// Component state
		const state = reactive({
			loading: false,
			guessList: [],
		});

		// 競猜列表是否為空
		const guessListEmpty = computed(() => {
			return !state.guessList || state.guessList.length === 0;
		});

		// 取得直播間競猜列表
		const getGuessList = () => {
			// Update loading state
			state.loading = true;

			// Get query
			const query = {
				live_id: route.params.id,
			};

			// Get guess list
			guessList(query)
				.then((res) => {
					// Update guess list
					state.guessList = res?.data?.list || [];

					// Revert loading state on finished
					state.loading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.loading = false;
				});
		};

		// 刷新資料
		const refresh = () => {
			getGuessList();
		};

		// 下注成功
		const betSuccess = () => {
			refresh();
		};

		// On component mounted
		onMounted(() => {
			refresh();
		});
		return {
			state,
			guessListEmpty,
			refresh,
			betSuccess,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-guess-list {
	background: #fafafa;
}
.text-title {
	color: #191919;
}
</style>
