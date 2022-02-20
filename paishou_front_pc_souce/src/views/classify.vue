<template lang="pug">
.Container.FLEX_C.py-8
	//- AD 側區塊
	.w-full.my-4
		slideBanner(:slide_cid='14',  :autoPlaySpeed='5000')
	.BETWEEN
		//- classify 左側區塊------------------------------------------------------------------------------------------------------------
		.funcBar.w-40.pr-2.flex-shrink-0
			.classListMenu
			//- ------------------------------------------------------
			router-link(to='/classify')
				.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive":(state.liveclassid=="")}')
					.pl-4 所有直播
			//- ------------------------------------------------------
			router-link(v-for='(item, index) in currentClassList', :key='item.id',  :to="{ path: '/classify', query: { type: item.id, name: item.name } }")
				.menuItem(class='hover:text-psV3Red', :class='{"menuItemActive":(state.liveclassid==item.id)}')
					.pl-4 {{ item.name }}
		//- classify 右側區塊------------------------------------------------------------------------------------------------------------
		.classifyList.FLEX_C.flex-grow
			.min-h-screen(v-if='state.dataList && state.dataList.length>0')
				.grid.grid-cols-12.gap-4
					.col-span-3(v-for='(item, index) in state.dataList', :key='index')
						videoItem(:videoData='item')
			//- classify 無內容-----------------------------------------------
			.w-full.min-h-screen.CENTER.flex-col(v-if='state.nullData')
				img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
				.text-lg.text-gray-500.my-2 抱歉！目前暂无赛事！
			a-skeleton(v-if='state.fetchLoading', active, :paragraph='{ rows: 8}')

</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { reactive, computed, onMounted, watch } from 'vue';
import slideBanner from '@/components/swipers/slideBanner.vue';
import { slideList, liveClassList, classList } from '@/api';
import videoItem from '@/components/videoItem';

export default {
	components: {
		slideBanner,
		videoItem,
	},
	setup() {
		const store = useStore();
		const router = useRouter();
		const route = useRoute();
		const currentClassList = computed(() => store.state.config.currentclassList);
		const state = reactive({
			dataList: [],
			liveclassid: '',
			fetchLoading: false,
			nullData: false,
		});

		const fetchLiveClassList = () => {
			state.dataList = [];
			state.liveclassid = route.query.type || 0;
			state.fetchLoading = true;
			liveClassList({
				liveclassid: state.liveclassid,
			}).then((res) => {
				state.fetchLoading = false;
				state.dataList = res.data.list;
				state.nullData = res.data.list.length <= 0;
			});
		};
		watch(
			() => route.query,
			(newVal) => {
				fetchLiveClassList();
			}
		);
		const init = () => {
			fetchLiveClassList();
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			route,
			router,
			currentClassList,
			fetchLiveClassList,
		};
	},
};
</script>
<style lang="scss" scoped></style>
