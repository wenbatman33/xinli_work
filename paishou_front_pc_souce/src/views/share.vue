<template lang="pug">
.w-full.h-full.flex.justify-center.items-center
	.share.py-8.flex-col.justify-between.items-center
		.text-center.my-12
			img.mascot(src='/publicAssets/img/v3/mascot.png', alt='')
		.text-center.m-8 {{state.timeOut}} 秒后,转跳页面
		.text-center.m-8
			a(:href='state.link')
				a-button(type='primary') 开启app
		.text-center.m-8
			a-button(type='primary', @click='downloadHandle') 下载拍手
</template>

<script>
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { deepLink, isIOS, browserType } from '@/utils';
import { getconfig } from '@/api';
import { message } from 'ant-design-vue';

let timer = null;
export default {
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const state = reactive({
			link: '',
			timeOut: 6,
			downConfig: null,
		});
		const openApp = () => {
			window.open(state.link, 'newWindow');
		};
		const loop = () => {
			if (state.timeOut <= 0) {
				deepLink(state.link);
				clearTimeout(timer);
			} else {
				state.timeOut -= 1;
				timer = setTimeout(() => {
					loop();
				}, 1000);
			}
		};
		const init = () => {
			getconfig().then((res) => {
				state.downConfig = res.data;
			});
			if (route.query.link) {
				state.link = route.fullPath.split('/share?link=')[1] || route.fullPath.split('/share/?link=')[1];
				loop();
			} else {
				router.push('/');
			}
		};
		const downloadHandle = () => {
			if (isIOS()) {
				if (state.downConfig.ipa_url) {
					window.location.href = state.downConfig.ipa_url;
				} else {
					message.warning('敬请期待！');
				}
			} else {
				if (state.downConfig.apk_url) {
					window.location.href = state.downConfig.apk_url;
				} else {
					message.warning('敬请期待！');
				}
			}
			state.showDownload = false;
		};
		onMounted(() => {
			init();
		});
		return {
			store,
			state,
			route,
			router,
			loop,
			downloadHandle,
		};
	},
};
</script>
<style lang="scss" scoped>
.mascot {
	width: 80%;
	max-width: 300px;
}
</style>
