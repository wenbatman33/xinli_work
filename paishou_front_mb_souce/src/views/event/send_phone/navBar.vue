<template lang="pug">
//- 導覽欄
.w-full.flex.flex-row.justify-between.items-center.pt-6
	//- 活動規則
	van-button.w-auto.h-auto.px-2.py-1.rounded-full.border-transparent.bg-rule(v-if='rule', @click='clickRule')
		.flex.flex-row.items-center
			img.w-4.h-4(src='/publicAssets/img/event/send_phone/icon-focus@3x.png')
			.text-xs.text-white.ml-2 活动规则

	//- 返回
	van-button.w-auto.h-auto.p-1.rounded-full.border-transparent.bg-transparent(v-if='back', @click='clickBack')
		img.w-6.h-6(src='/publicAssets/img/event/send_phone/icon-left@3x.png')

	//- 關閉
	van-button.w-auto.h-auto.p-1.rounded-full.border-transparent.bg-transparent(v-if='close', @click='clickClose')
		img.w-6.h-6(src='/publicAssets/img/event/send_phone/icon-close@3x.png')
</template>
<script>
import { useRouter } from 'vue-router';

export default {
	props: {
		rule: Boolean,
		back: Boolean,
		close: Boolean,
	},
	setup() {
		// Vue router
		const router = useRouter();

		// 點擊活動規則
		const clickRule = () => {
			router.push('/event/send_phone/rule');
		};

		// 點擊返回
		const clickBack = () => {
			router.go(-1);
		};

		// 點擊關閉
		const clickClose = () => {
			router.replace('/');
		};
		return {
			clickRule,
			clickBack,
			clickClose,
		};
	},
};
</script>
<style lang="scss" scoped>
.bg-rule {
	background: rgba(128, 128, 128, 0.5);
}
</style>