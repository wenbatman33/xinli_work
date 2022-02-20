<template lang="pug">
.w-full.bg-white.rounded-xl.p-4.my-2
	.CENTER_BETWEEN
		h3.my-4.text-psV3Red 
			img(src='/publicAssets/img/v3/icon-fire-2.png', srcset='/publicAssets/img/v3/icon-fire-2@2x.png 2x')
			span 最新直播
		router-link(tag='span', to='/newlive')
			span.text-xs.text-psV3Red 查看更多
			RightOutlined.text-xs.text-psV3Red
	.grid.grid-cols-12.gap-4(v-if='state.dataList && state.dataList.length>0')
		.col-span-3(v-for='(item, index) in state.dataList', :key='index')
			videoItem(:videoData='item' :parh='"/index/new"')
	.w-full.h-64.CENTER(v-else)
		a-empty
</template>
<script>
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, reactive } from 'vue';
import { newLive } from '@/api';
import { RightOutlined } from '@ant-design/icons-vue';
import videoItem from '@/components/videoItem';

export default {
	components: {
		RightOutlined,
		videoItem,
	},
	setup() {
		const router = useRouter();
		const state = reactive({
			dataList: [],
		});
		const init = () => {
			newLive().then((res) => {
				state.dataList = res.data.list.filter((task, index) => index < 8);
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
