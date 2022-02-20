<template lang="pug">
.liveNotice.FLEX_R.flex-shrink-0.p-2
	.noticeIcon.pr-1.flex-shrink-0
		img.w-full(src='/publicAssets/img/v3/icon-announcement-r.png')
	#MarqueeDiv.FLEX_C.flex-grow.text-xs.h-auto.text-psV3Red(v-html='state.Marquee')
</template>
<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, reactive } from 'vue';
import { roomNotice } from '@/api';

export default {
	setup(props) {
		// ---------------------------
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		// ---------------------------
		const state = reactive({
			Marquee: '',
			MarqueeWidth: 0,
			roomNoticeList: [],
		});

		const getroomNotice = () => {
			roomNotice({
				liveuid: route.params.id,
			}).then((res) => {
				// 2021/09/27 新增預設兩則預設訊息
				const defalutMarquee = `
					<span>主播专属链接 :
						<a class="text-psV3Blue" target="_blank" href="https://direct.lc.chat/8233741/12">请点我</a>
					</span>
					<span>主播特别推荐 : 
						<a class="text-psV3Blue" target="_blank"  href="https://direct.lc.chat/8233741/12">请点我</a>
					</span>
					<span>注册找右下角领取优惠 备注"拍手直播"</span>
				`;
				if (res.data.list) {
					state.roomNoticeList = res.data.list;
					console.log(res.data.list);
					state.Marquee = defalutMarquee + state.roomNoticeList[0].notice;
				} else {
					state.roomNoticeList = [];
				}
			});
		};
		onMounted(() => {
			getroomNotice();
		});
		return {
			state,
			getroomNotice,
		};
	},
};
</script>
<style lang="scss" scoped>
.liveNotice {
	width: 100%;
	height: auto;
	overflow: hidden;
	user-select: none;
}
</style>

<style lang="scss">
#MarqueeDiv {
	a {
		text-decoration: underline !important;
		margin-right: 8px !important;
	}
}
</style>
