<template lang="pug">
.relative.bg-white.rounded-xl.p-4.my-2
	.CENTER_BETWEEN
		h3.my-4.text-psV3Red 
			img(src='/publicAssets/img/v3/icon-lightning.png', srcset='/publicAssets/img/v3/icon-lightning@2x.png 2x')
			span 热门直播
		router-link.mr-4(tag='span', to='/hotlive')
			span.text-xs.text-psV3Red 查看更多 
			RightOutlined.text-xs.text-psV3Red
	.w-full.grid.grid-cols-3.gap-4(v-if='state.dataList && state.dataList.length>0')
		.col-span-1(v-for='(item, index) in state.dataList', :key='index')
			videoItem(:videoData='item')
	.w-full.h-64.CENTER(v-else)
		a-empty
</template>
<script>
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, reactive } from 'vue';
import { hotLive } from '@/api';
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
			hotLive().then((res) => {
				state.dataList = res.data.list.filter((task, index) => index < 4);
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
<style lang="scss" scoped></style>
