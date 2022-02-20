<template lang="pug">
.w-full.bg-white.rounded-xl.p-4.my-2
	.CENTER_BETWEEN
		h3.my-4.text-psV3Red
			img(src='/publicAssets/img/v3/icon-fire-2.png', srcset='/publicAssets/img/v3/icon-fire-2@2x.png 2x')
			span {{filterClassId(classID)}}热门直播
	.grid.grid-cols-12.gap-4(v-if='state.dataList')
		.col-span-3(v-for='(item, index) in state.dataList', :key='index')
			videoItem(:videoData='item', :path='"/index/class"', :classID='classID')
</template>
<script>
import { useStore } from 'vuex';
import { onMounted, reactive, computed } from 'vue';
import videoItem from '@/components/videoItem';
import { liveClassList } from '@/api';

export default {
	props: ['classID'],
	components: {
		videoItem,
	},
	setup(props, { emit }) {
		const store = useStore();
		const classList = computed(() => store.state.config.classList);
		const state = reactive({
			dataList: [],
		});
		const filterClassId = (id) => classList?.value?.filter((classItem) => classItem?.id === id)[0]?.name;
		onMounted(() => {
			liveClassList({ liveclassid: props.classID }).then((res) => {
				state.dataList = res?.data?.list?.filter((item, index) => index < 8) || [];
			});
		});

		return {
			state,
			store,
			classList,
			filterClassId,
		};
	},
};
</script>
<style lang="scss" scoped></style>
