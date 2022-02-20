<template lang="pug">
.CENTER.h-full.recruit_bgm(:style='"background-image: url("+state.adBannerList+");"')

</template>
<script>
import { onMounted, reactive } from 'vue';
import { slideList } from '@/api';

export default {
	setup() {
		const state = reactive({
			adBannerList: null,
		});
		onMounted(() => {
			window.scrollTo(0, 0);
			slideList({ slide_cid: 13 }).then((res) => {
				state.adBannerList = res.data?.list?.filter((task, index) => index < 1)[0].slide_pic || null;
			});
		});
		return {
			state,
		};
	},
};
</script>
<style lang="scss" scoped>
.recruit_bgm {
	width: 100%;
	min-width: 1200px;
	height: calc(100vh - 60px);
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	position: relative;
}
</style>
