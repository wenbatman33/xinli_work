<template lang="pug">
.w-full
	.CENTER_BETWEEN
		.font-bold.text-base 
			h3.mb-2 推荐直播
			.titleLine
	.grid.grid-cols-12.gap-4(v-if='state.dataList.length>0')
		.col-span-2(v-for='(item, index) in state.dataList', :key='index')
			videoItem(:videoData='item')
	.w-full.h-64.CENTER(v-else)
		a-empty
</template>
<script>
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
.titleLine {
	width: 50px;
	height: 2px;
	border-style: solid;
	border-width: 2px;
	border-image-source: linear-gradient(107deg, #ff0000 -76%, #ffff00 103%);
	border-image-slice: 1;
}
</style>
