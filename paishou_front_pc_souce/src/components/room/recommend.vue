<template lang="pug">
.w-full.bg-white.rounded-xl.p-4.my-2
	.CENTER_BETWEEN
		.title.font-bold.text-base.my-4 推荐直播
		router-link.mr-4k(tag='span', :to="{ path: '/classify', query: { type: 1, name: '足球' } }")
			span.text-xs.text-psV3Red 查看更多
			RightOutlined.text-xs.text-psV3Red
	.grid.grid-cols-12.gap-4(v-if='state.dataList.length>0')
		.col-span-3(v-for='(item, index) in state.dataList', :key='index')
			videoItem(:videoData='item')
	.w-full.h-64.CENTER(v-else)
		a-empty
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { recommend } from '@/api';
import { RightOutlined } from '@ant-design/icons-vue';
import videoItem from '@/components/videoItem';

export default {
	components: {
		RightOutlined,
		videoItem,
	},
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			dataList: [],
		});
		const init = () => {
			recommend().then((res) => {
				state.dataList = res.data.list;
			});
		};
		onMounted(() => {
			init();
		});
		return {
			state,
			init,
		};
	},
};
</script>
<style lang="scss" scoped>
.class_head {
	padding: 10px 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	p {
		margin: 0;
		font-weight: bolder;
		font-size: 16px;
	}
	span {
		color: #a62337;
		font-size: 12px;
		cursor: pointer;
		img {
			transform: scale(0.7);
			margin-top: -2px;
		}
	}
}
</style>
