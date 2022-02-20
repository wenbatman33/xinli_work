<template lang="pug">
.w-full(v-if='state.adBannerList')
	h3.my-4.text-psV3Red 拍手活动
	.grid.grid-cols-3.gap-4
		.col-span-1.rounded.cursor-pointer(v-for='(item,index) in state.adBannerList', @click='gotoDeepLink(item.slide_url)')
			img.w-full(:src='item.slide_pic')
</template>
<script>
import dayjs from 'dayjs';
import { useRoute, useRouter } from 'vue-router';
import { reactive, onMounted } from 'vue';
import { slideList } from '@/api';
import { deepLink } from '@/utils';

export default {
	setup() {
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			adBannerList: null,
		});
		const gotoDeepLink = (link) => {
			deepLink(link);
		};
		const init = () => {
			slideList({ slide_cid: 19 }).then((res) => {
				state.adBannerList = res?.data?.list?.filter((task, index) => index < 3);
			});
		};
		onMounted(() => {
			init();
		});
		return {
			init,
			state,
			gotoDeepLink,
		};
	},
};
</script>
<style lang="scss" scoped></style>
