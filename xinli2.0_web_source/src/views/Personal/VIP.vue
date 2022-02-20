<template lang="pug">
.contentContainer
	.pageTitle.FLEX_R
		.icon.mr-4
			.bg-xRed.rounded-full.w-8.h-8.CENTER
				SvgIcon.w-5.h-5.text-white(:name='"#VIP"')
		h5.text-xRed {{t('personal_VIP')}}

	.VIP_Info.rounded.shadow.p-4.my-4.grid.grid-cols-12.gap-4
		div(:class='[userStore.vipInfo.level!==0? "col-span-7":"col-span-12"]')
			.BETWEEN
				.FLEX_C
					h5 当前等級 VIP {{userStore.vipInfo.level}}
					p 保级期限至 {{userStore?.vipInfo?.lastSatisfyTime }}
				img.mx-4(:class='"w-[90px]"' :src='currentVIP_LV_Icon' :srcset='currentVIP_LV_Icon2x')
			.FLEX_R
				.flex-grow.FLEX_C
					.my-2
						span.text-sm 累计有效流水
						span.text-sm.font-semibold ¥ {{commaFormat(userStore?.vipInfo?.totalBetAmount)}}
						span.text-xs.text-gray-400.mx-2 /
						span.text-xs.text-gray-400  {{commaFormat(userStore?.vipInfo?.current?.upgradeBetAmount)}} Lv {{userStore?.vipInfo?.next?.level}} {{t('personal_betamount')}} 
					.w-full
						a-progress(:percent='levelPercent' :show-info='false' :stroke-color='VIP_Gradient_color')
		.col-span-5.border-l.px-4(v-if='userStore.vipInfo.level!==0')
			.BETWEEN
				h6 保级任务
			.h-24.rounded-lg.bg-gray-100.FLEX_C_CENTER.p-4
				.my-1 
					span.rounded-full.px-2.py-1.bg.BG_GRADIENT_GOLD.text-white.mr-2.text-xs.font-bold 进行中
					span 需在 {{userStore?.vipInfo?.lastSatisfyTime }} 前完成
				.my-1 当月有效流水 ¥ {{commaFormat(userStore?.vipInfo?.totalBetAmount)}} / {{commaFormat(userStore?.vipInfo?.current?.keepBetAmount)}}

	.Body_4.text-gray-500.my-4
		span.mr-2 {{t('personal_VIP_privilege')}}
		a-tooltip(placement="right")
			template(#title)
				.text-white 专属特权将于晋级后 5 号实行。查看 VIP 等级说明
			SvgIcon.w-4.h-4.text-primary(:name='"#Info"')

	.VIP_Info.rounded.shadow.p-4.my-4
		.w-full.grid.grid-cols-7.gap-4
			.col-span-1(v-for='item in VIP_infoList')
				.rounded-full.CENTER.py-1.px-2(:style='{"background-color" : item.tipBgColor }')
					.Caption_2(:style='{"color" : item.textColor }') {{ item.name }}
				.Subtitle_3.text-center.my-2 {{ item.ratio }}
				.Caption_2.text-center.text-gray-400.my-2 {{ item.status }}

	.Body_4.text-gray-500.my-4
		span.mr-2 {{t('personal_VIP_exclusive_bonus')}}
		a-tooltip(placement="right")
			template(#title)
				.text-white 礼金将于晋级后 5 号派发。查看 VIP 等级说明
			SvgIcon.w-4.h-4.text-primary(:name='"#Info"')

	.grid.grid-cols-4.gap-4.my-4
		.col-span-1
			UpgradeGift
		.col-span-1
			MonthlyGift
		.col-span-1
			AnniversaryGift
		.col-span-1
			BirthdayGift

	.Body_4.text-gray-500.my-4
		span.mr-2 {{t('personal_VIP_rebate_bonus')}}
		a-tooltip(placement="right")
			template(#title)
				.text-white 返水比例以当月『原等级』计算，将于晋级后 5 号生效。查看 VIP 等级说明 
			SvgIcon.w-4.h-4.text-primary(:name='"#Info"')
	BonusList

	.Body_4.text-gray-500.my-4
		span.mr-2 {{t('personal_VIP_custom_service')}}
		a-tooltip(placement="right")
			template(#title)
				.text-white 等级达到后，将由专人与你联系。查看 VIP 等级说明
			SvgIcon.w-4.h-4.text-primary(:name='"#Info"')
	.grid.grid-cols-4.gap-4.my-4
		.col-span-1.rounded-xl.border.border-gray-200.p-2.text-center(v-for="vpsitem in VIP_service")
			.text-xGold.text-lg.font-semibold {{vpsitem.title}}
			img.w-20.h-20.my-4(:src='vpsitem.img')
			.text-xGold.text-sm {{vpsitem.desc}}

	GiftListModal
</template>

<script setup lang="ts">
	import { computed, onMounted } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { useI18n } from 'vue-i18n';
	import { commaFormat } from '@/utils';

	import UpgradeGift from '@/components/Personal/VIP/UpgradeGift.vue';
	import MonthlyGift from '@/components/Personal/VIP/MonthlyGift.vue';
	import AnniversaryGift from '@/components/Personal/VIP/AnniversaryGift.vue';
	import BirthdayGift from '@/components/Personal/VIP/BirthdayGift.vue';
	import BonusList from '@/components/Personal/VIP/BonusList.vue';
	import GiftListModal from '@/components/Personal/VIP/GiftListModal.vue';

	import SvgIcon from '@/components/SvgIcon/index.vue';

	const userStore = UserStore();
	const { t } = useI18n();
	const img_1 = `${window.staticPath}/static/img/VIP/img_1.png`;
	const img_2 = `${window.staticPath}/static/img/VIP/img_2.png`;
	const img_3 = `${window.staticPath}/static/img/VIP/img_3.png`;
	const img_4 = `${window.staticPath}/static/img/VIP/img_4.png`;

	const currentVIP_LV_Icon = computed(() => `${window.staticPath}/static/img/VIP/VIP_Badge_LV_${userStore.vipInfo.level}.png`);
	const currentVIP_LV_Icon2x = computed(() => `${window.staticPath}/static/img/VIP/VIP_Badge_LV_${userStore.vipInfo.level}@2x.png 2x`);

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

	const levelPercent = computed(() => {
		const totalBetAmount = userStore?.vipInfo?.totalBetAmount || 0;
		const upgradeBetAmount = userStore?.vipInfo?.next?.upgradeBetAmount || 0;
		return (totalBetAmount / upgradeBetAmount) * 100;
	});
	const VIP_infoList = computed(
		() =>
			userStore?.vipInfo?.current && [
				{
					name: '体育返水',
					ratio: `${userStore?.vipInfo?.current?.sportRefund} %`,
					status: '启动中',
					textColor: '#FFB054',
					tipBgColor: 'rgba(255, 198, 71, 0.2)',
				},
				{
					name: '真人返水',
					ratio: `${userStore?.vipInfo?.current?.personRefund} %`,
					status: '启动中',
					textColor: '#FFB054',
					tipBgColor: 'rgba(255, 198, 71, 0.2)',
				},
				{
					name: '电子返水',
					ratio: `${userStore?.vipInfo?.current?.electronicRefund} %`,
					status: '启动中',
					textColor: '#FFB054',
					tipBgColor: 'rgba(255, 198, 71, 0.2)',
				},
				{
					name: '彩票返水',
					ratio: `${userStore?.vipInfo?.current?.lotteryRefund} %`,
					status: '启动中',
					textColor: '#FFB054',
					tipBgColor: 'rgba(255, 198, 71, 0.2)',
				},
				{
					name: '电竞返水',
					ratio: `${userStore?.vipInfo?.current?.esportRefund} %`,
					status: '启动中',
					textColor: '#FFB054',
					tipBgColor: 'rgba(255, 198, 71, 0.2)',
				},
				{
					name: '提款额度',
					ratio: `每日${userStore?.vipInfo?.current?.withdrawAmountLimit && userStore?.vipInfo?.current?.withdrawAmountLimit.toLocaleString()}`,
					status: '启动中',
					textColor: 'rgba(240, 69, 58, 0.8)',
					tipBgColor: 'rgba(240, 69, 58, 0.1)',
				},
				{
					name: '提款次数',
					ratio: `每日${userStore?.vipInfo?.current?.withdrawTimesLimit}次`,
					status: '启动中',
					textColor: 'rgba(240, 69, 58, 0.8)',
					tipBgColor: 'rgba(240, 69, 58, 0.1)',
				},
			]
	);

	const VIP_service = computed(() => [
		{ title: '私人客服管家', desc: '等级需达 Lv 7', img: img_1 },
		{ title: '私订制域', desc: '等级需达 Lv 8', img: img_2 },
		{ title: '存款专属通道', desc: '等级需达 Lv 8', img: img_3 },
		{ title: '新利品牌特邀', desc: '等级需达 Lv 9', img: img_4 },
	]);

	const init = () => {};

	onMounted(() => {
		init();
	});
</script>

<style scoped lang="scss"></style>
