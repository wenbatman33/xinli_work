<template lang="pug">
.Container.BETWEEN
	//- personal 左側區塊------------------------------------------------------------------------------------------------------------
	.funcBar.w-40.pr-4.flex-shrink-0
		menuList
	.w-full
		.hFuncBar.FLEX_C.bg-white.rounded-lg.shadow.p-4.mb-4
			.w-full.CENTER_BETWEEN
				.FLEX_R.w-full.border-b.mb-4
					span.mr-8.cursor-pointer.font-black.pb-2(class='hover:text-psV3Red', :class='{"text-psV3Red border-psV3Red border-b-2": state.showType===1 }', @click='state.showType=1') 推荐纪录
					span.mr-8.cursor-pointer.font-black.pb-2(class='hover:text-psV3Red', :class='{"text-psV3Red border-psV3Red border-b-2": state.showType===2 }', @click='state.showType=2') 加码纪录

			.w-full.CENTER_BETWEEN
				.FLEX_R
					.rounded.border.border-gray-600.text-gray-600.p-2.mr-2 
						span.mr-4 本月已推荐 
						span {{state.inviteTotal}}/10
					.rounded.border.border-psV3Yellow.text-psV3Yellow.p-2.mr-2 
						span.mr-4 成功邀请 
						span {{USER_INFO?.invite?.count}}位
					.rounded.border.border-psV3Yellow.text-psV3Yellow.p-2.mr-2 
						span.mr-4 累积蕉币 
						span 
							img.w-5(src='/publicAssets/img/v3/coin.png')
							span {{USER_INFO?.invite?.bonus}}
					a-divider.h-full(type='vertical')
				.FLEX_R
					#myCode.rounded.bg-white.border.border-gray-600.p-2.mr-2.cursor-pointer(:data-clipboard-text='USER_INFO?.invite?.code', @click='copyMyCodetext(USER_INFO?.invite?.code)')
						span.text-gray-600.mr-4 您的专属分享码
						span.font-bold.text-psV3Red.mr-2 {{USER_INFO?.invite?.code}}
						span.text-psV3Yellow 复制
					.CENTER.rounded.bg-white.border.text-gray-600.border-gray-600.p-2.mr-2.cursor-pointer(@click='state.showInviteRuleModal=true')
						ExclamationCircleFilled.mr-2
						span.text-gray-600 推荐规则

		.inviteList.w-full.grid.grid-cols-3.gap-4.mb-4(v-if='state.showType===1')
			.col-span-1(v-if='state.inviteList?.length>0', v-for='(item, index) in  state.inviteList', :key='index')
				.bg-white.rounded-lg.shadow.p-4
					.BETWEEN
						div
							.text-gray-600 发送时间
							.text-gray-600 {{item.invite_date}}
						.rounded-full.border.border-psV3Yellow.text-psV3Yellow.p-2.px-4 奖励
					.CENTER.border.border-gray-100.rounded.font-bold.p-2.my-2 {{item.user_nicename}}
					.BETWEEN.bg-gray-100.rounded.p-2.mt-2
						span 蕉币金额
						span 
							img.w-4(src='/publicAssets/img/v3/coin.png')
							span.text-psV3Yellow {{item.coin}}
			.col-span-3.w-full.min-h-screen.CENTER.flex-col(v-else)
				img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
				.text-lg.text-gray-500.my-2 目前没有紀錄

		.bonusList.w-full.grid.grid-cols-3.gap-4.mb-4(v-if='state.showType===2')
			.col-span-1(v-if='state.bonusList?.length>0', v-for='(item, index) in  state.bonusList', :key='index')
				.bg-white.rounded-lg.shadow.p-4
					.BETWEEN
						div
							.text-gray-600 发送时间
							.text-gray-600 {{item.create_time}}
						.rounded-full.border.border-psV3Yellow.text-psV3Yellow.p-2.px-4 奖励
					.BETWEEN.bg-gray-100.rounded.p-2.mt-2
						span 蕉币金额
						span 
							img.w-4(src='/publicAssets/img/v3/coin.png')
							span.text-psV3Yellow {{item.coin}}
			.col-span-3.w-full.min-h-screen.CENTER.flex-col(v-else)
				img(src='/publicAssets/img/v3/img-no-information.png' , srcset='/publicAssets/img/v3/img-no-information@2x.png 2x')
				.text-lg.text-gray-500.my-2 目前没有紀錄

	a-modal(:visible='state.showInviteRuleModal', width='700px' :class='"inviteRuleModal"', :bodyStyle='{"background":"#f4f5f8", "border-radius": "8px"}',  closable='', :footer='null', @cancel='state.showInviteRuleModal=false')
		.text-center
			h2.text-psV3Red 荐者有份
			h4 好友一起来 优惠拿不完
			img.my-4(src='/publicAssets/img/v3/invite_banner.png')
			.text-gray-600.my-4 邀请朋友使用您的推荐码进行注册，注册成功后你与好友皆会获得1,000蕉币奖励。
			.text-sm.bg-gray-200.rounded.p-2.my-4
				span 每累计推荐
				span.text-psV3RedLight 10个好友
				span ，额外加送 
				span.text-psV3RedLight 5000蕉币
				span ，
				br
				span 单月推荐奖励上限10次，隔月1号00:00 重置赶紧一起推荐好友!!
</template>
<script>
import { copyText } from 'vue3-clipboard';
import { useStore } from 'vuex';
import { reactive, onMounted, computed, toRaw } from 'vue';
import { inviteList } from '@/api';
import { message } from 'ant-design-vue';
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
import menuList from '@/components/personal/menuList.vue';

export default {
	components: {
		ExclamationCircleFilled,
		menuList,
	},
	setup() {
		const store = useStore();
		const UID = computed(() => store.state.user.uid || '');
		const USER_INFO = computed(() => store.state.user.userInfo);
		const state = reactive({
			showType: 1,
			bonusList: null,
			inviteList: null,
			inviteTotal: null,
			showInviteRuleModal: false,
		});

		const init = () => {
			inviteList().then((res) => {
				state.inviteList = res.data.list;
				state.bonusList = res.data.bonus;
				state.inviteTotal = res.data.num || 0;
			});
		};
		const copyMyCodetext = (text) => {
			copyText(text, undefined, (error, event) => (error ? message.error('复制失败') : message.success('复制完成')));
		};
		onMounted(() => {
			init();
		});
		return {
			state,
			init,
			UID,
			USER_INFO,
			copyMyCodetext,
		};
	},
};
</script>
<style lang="scss">
.inviteRuleModal {
	border-radius: 8px !important;
	overflow: hidden;
	padding-bottom: 0px !important;
}
</style>
