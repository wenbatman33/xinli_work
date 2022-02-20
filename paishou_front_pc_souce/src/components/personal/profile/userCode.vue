<template lang="pug">
.userCode.overflow-hidden.relative
	img.w-full(src='/publicAssets/img/v3/userCode.png')
	.w-full.h-full.absolute.top-0(style='padding-left:340px;padding-top:24px;') 
		.text-white 您的专属分享码
		#myCode.w-60.rounded.bg-white.border.border-gray-600.p-2.mr-2.mb-2.cursor-pointer(@click='copyMyCodetext(USER_INFO?.invite?.code)')
			span.font-bold.text-psV3Red.mr-2 {{USER_INFO?.invite?.code}}
			span.text-psV3Yellow.float-right 复制
		.my-4
			router-link(to='/personal/myCode')
				span.rounded-full.border.border-white.text-white.mr-2.py-2.px-4.cursor-pointer 推荐纪录
			router-link(to='/personal/myCode')
				span.rounded-full.border.border-white.text-white.mr-2.py-2.px-4.cursor-pointer 加码纪录
</template>
<script>
import { copyText } from 'vue3-clipboard';
import { useStore } from 'vuex';
import { computed } from 'vue';
import { message } from 'ant-design-vue';
import { matomo_my_copy_code } from '@/matomoEvent';

export default {
	components: {},
	setup() {
		const store = useStore();
		const UID = computed(() => store?.state?.user.uid || '');
		const USER_INFO = computed(() => store?.state?.user.userInfo);
		const USER_NICENAME = computed(() => store?.state?.user?.userInfo?.user_nicename);
		const copyMyCodetext = (code) => {
			const str = `
Hi！
您的朋友${USER_NICENAME.value}(拍手用户名称)推荐您使用拍手直播。
注册並绑定个人资料，即可获得1000蕉币!!
每累计推荐10个好友，额外加送5000蕉币，无上限额度，赶紧一起来推荐好友!!
分享碼：${code}
点击链接立即注册领好礼:https://domainname/signup/?invitecode=${code}
			`;
			matomo_my_copy_code();
			copyText(str, undefined, (error, event) => (error ? message.error('复制失败') : message.success('复制完成')));
		};
		return {
			store,
			UID,
			USER_INFO,
			USER_NICENAME,
			copyMyCodetext,
		};
	},
};
</script>
<style lang="scss"></style>
