<template lang="pug">
.pageContainer.py-8
	.container.bg-white.rounded.min-h-screen
		.FLEX_R
			.promoMenu.bg-white(:class='"w-[285px]"') 
				.userStatus.p-4.CENTER_C(:class='"h-[200px]"')
					p.my-4 
						span.Subtitle_2 {{userStore.userInfo.account}} 
						span , {{t('personal_hi')}}
					.BETWEEN
						img.mx-4(:class='"w-[90px]"' :src='currentLVIcon' :srcset='currentLVIcon2x')
						div
							.levelFlag.h-6.rounded.text-white.CENTER.mx-2.p-1(:style='VIP_Gradient_Style') VIP {{userStore.vipInfo.level}}
							.Caption_2.my-2 {{t('personal_monthly_amount')}}：
							.Caption_2 ¥ {{commaFormat(userStore.vipInfo.totalBetAmount)}} 

					a-progress(:percent='levelPercent' :show-info='false' :stroke-color='VIP_Gradient_color')
				.menuLink.h-14(:class='"h-[56px]"' v-for='(item, index) in menuLink')
					router-link(:to='item.path')
						.BETWEEN_CENTER.items-center.h-full.cursor-pointer.border-b.px-8(:class='{"bg-gray-100": route.path===item.path}') 
							.flex
								SvgIcon.w-5.h-5.text-paimary.mx-4(:name='item.icon')
								span.Subtitle_4.opacity-60 {{item.name}}
							.unread(v-if='item.path==="/personal/inbox" && eventStore.unReadCount>0') 
								.rounded-full.bg-xBlue.bg-opacity-60.CENTER.px-2 
									span.Subtitle_4.text-white {{eventStore.unReadCount}}
			.flex-grow.p-4(:class='"w-[955px]"') 
				router-view
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { useI18n } from 'vue-i18n';
	import { useRoute, useRouter } from 'vue-router';
	import { EventStore } from '@/store/eventStore';
	import { commaFormat } from '@/utils';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	const userStore = UserStore();
	const currentLVIcon = computed(() => `${window.staticPath}/static/img/VIP/VIP_Badge_LV_${userStore.vipInfo.level}.png`);
	const currentLVIcon2x = computed(() => `${window.staticPath}/static/img/VIP/VIP_Badge_LV_${userStore.vipInfo.level}@2x.png 2x`);

	const route = useRoute();
	const eventStore = EventStore();
	const levelPercent = computed(() => {
		const totalBetAmount = userStore?.vipInfo?.totalBetAmount || 0;
		const upgradeBetAmount = userStore?.vipInfo?.next?.upgradeBetAmount || 0;
		return (totalBetAmount / upgradeBetAmount) * 100;
	});
	const VIP_Gradient_color = computed(() => {
		let color;
		const LV = userStore?.vipInfo?.level || 0;
		if (LV <= 3) {
			color = { '0%': '#db082d', '100%': '#fe693b' };
		} else if (LV <= 6) {
			color = { '0%': '#44C7FF', '100%': '#1F25C1' };
		} else if (LV <= 9) {
			color = { '0%': '#CD5AEA', '100%': '#6D17A0' };
		} else if (LV >= 10) {
			color = { '0%': '#CF429E', '100%': '#731653' };
		}
		return color;
	});
	const VIP_Gradient_Style = computed(() => {
		let color;
		const LV = userStore?.vipInfo?.level || 0;
		if (LV <= 3) {
			// color = '{ '0%': '#db082d', '100%': '#fe693b' };'
			color = 'background: linear-gradient(to right, #db082d 0%, #fe693b 100%);';
		} else if (LV <= 6) {
			color = 'background: linear-gradient(to right, #44C7FF 0%, #1F25C1 100%);';
		} else if (LV <= 9) {
			color = 'background: linear-gradient(to right, #CD5AEA 0%, #6D17A0 100%);';
		} else if (LV >= 10) {
			color = 'background: linear-gradient(to right, #CF429E 0%, #731653 100%);';
		}
		return color;
	});
	const menuLink = ref([
		{ path: '/personal/personal', name: t('personal_personal'), icon: '#Setting', unread: 0 },
		{ path: '/personal/VIP', name: t('personal_VIP'), icon: '#VIP', unread: 0 },
		{ path: '/personal/profile', name: t('personal_profile'), icon: '#User_Info', unread: 0 },
		{ path: '/personal/bethistory', name: t('personal_bethistory'), icon: '#Bet_Rcord', unread: 0 },
		{
			path: '/personal/transaction',
			name: t('personal_transaction'),
			icon: '#Trade_Record',
			unread: 0,
		},
		{ path: '/personal/atm', name: t('personal_atm'), icon: '#Credit_Card', unread: 0 },
		// { path: '/personal/device', name: t('personal_device'), icon: '#Device', unread: 0 },
		{ path: '/personal/inbox', name: t('personal_inbox'), icon: '#Inbox', unread: 5 },
	]);
</script>

<style scoped lang="scss"></style>
