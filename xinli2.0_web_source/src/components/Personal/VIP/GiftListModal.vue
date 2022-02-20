<template lang="pug">
.AllVipGiftModal(v-if='giftListByUnread')

	.LeveUpgrade.container(v-if='steps===1 || steps===2')
		.WH_FULL.CENTER_C
			h5.text-white.mb-20 等级提升
			.UpgradeLevel.relative.CENTER_C(:class='"w-[300px] h-[300px]"')
				.m-auto.absolute.-top-4.z-30
					img.w-44(v-if='steps===1' :src='minLevel')
					img.w-44(v-if='steps===2' :src='maxLevel')

				.m-auto.absolute.z-20.CENTER_C.mt-8
					.relative.h-2.w-36.rounded-full.absolute.bg-slate-300.overflow-hidden
						#oldProgressBar.progressBar.absolute.h-full.w-0(v-if='steps===1' :style="oldProgressBarStyle")
						#newProgressBar.progressBar.absolute.h-full.w-0(v-if='steps===2' :style="newProgressBarStyle")

				.m-auto.absolute.z-10.CENTER_C
					.rounded-full.bg-slate-300.h-2.w-36
					img(:src='upgradebBg_1')

				.m-auto.absolute.-top-8.z-0
					img.animate-spin-slow(v-if='showNextLevel' :src='upgradebBg_2')

	.Unread.container(v-if='steps===3')
		.closeButton.rounded-lg.w-11.h-11.bg-white.bg-opacity-40.CENTER.absolute.z-50.right-4.top-4.cursor-pointer(@click='takeMemberVipGiftAll')
			SvgIcon.w-6.h-6.text-black(:name='"#Close_Solid"')
		.WH_FULL.CENTER_C
			h5.text-white.mb-20 晋级奖励
			.FLEX_R.my-4
				GiftCard.m-4(:data='giftListByUnread')
			button.rounded.w-40.BG_GRADIENT_GOLD.font-semibold.p-2(@click='giftListByUnread?.id && takeGift(giftListByUnread?.id)') 下一奖励
		//- img.mx-4.animate-spin-slow(:src='upgradebBg_2')
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { getMemberVipGift, postMemberVipGiftRead, postMemberVipGiftAll } from '@/api';
	import type { MEMBERAJAX_GetVipGiftResponseData } from '@/api/model';
	import GiftCard from '@/components/Personal/VIP/GiftCard.vue';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const userStore = UserStore();
	const upgradebBg_1 = `${window.staticPath}/static/img/VIP/upgradebBg_1.png`;
	const upgradebBg_2 = `${window.staticPath}/static/img/VIP/upgradebBg_2.png`;
	const showLeveUpgrade = ref(true);
	const showUnreadGift = ref(false);
	const steps = ref(1);

	const VIP_GiftResult = ref([] as MEMBERAJAX_GetVipGiftResponseData[]);
	const UpgradeMinLevel = ref(0);
	const UpgradeMaxLevel = ref(0);
	const minLevel = computed(() => `${window.staticPath}/static/img/VIP/VIP_Badge_LV_${UpgradeMinLevel.value}@2x.png`);
	const maxLevel = computed(() => `${window.staticPath}/static/img/VIP/VIP_Badge_LV_${UpgradeMaxLevel.value}@2x.png`);

	// 取得現在會員未讀的列表
	const giftListByUnread = computed(() => {
		const unreadList = VIP_GiftResult.value?.filter((item) => item.read === 2);
		return unreadList && unreadList[0];
	});

	// 會員現在的進度條
	const levelPercent = computed(() => {
		const totalBetAmount = userStore?.vipInfo?.totalBetAmount || 0;
		const upgradeBetAmount = userStore?.vipInfo?.next?.upgradeBetAmount || 0;
		return (totalBetAmount / upgradeBetAmount) * 100;
	});
	// 設定單筆已讀
	const takeGift = (id: number) => {
		postMemberVipGiftRead({ ids: [id] }).then((res) => {
			init();
		});
	};
	// 設定全部已讀
	const takeMemberVipGiftAll = () => {
		postMemberVipGiftAll();
		VIP_GiftResult.value = [];
	};
	const oldProgressBarStyle = ref('');
	const newProgressBarStyle = ref('');

	// 進度條依照等樣式
	const getGradientStyle = (level: number, percent: number) => {
		let color;
		const LV = level || 0;
		if (LV <= 3) {
			color = 'background: linear-gradient(to right, #db082d 0%, #fe693b 100%);';
		} else if (LV <= 6) {
			color = 'background: linear-gradient(to right, #44C7FF 0%, #1F25C1 100%);';
		} else if (LV <= 9) {
			color = 'background: linear-gradient(to right, #CD5AEA 0%, #6D17A0 100%);';
		} else if (LV >= 10) {
			color = 'background: linear-gradient(to right, #CF429E 0%, #731653 100%);';
		}
		const s1 = `transition-property: width; transition-duration: 2s; width:${percent}%;`;

		return s1 + color;
	};

	// 秀下一個等級
	const showNextLevel = ref(false);

	const steps1 = () => {
		showLeveUpgrade.value = true;
		oldProgressBarStyle.value = getGradientStyle(UpgradeMinLevel.value, 100);
		setTimeout(() => {
			steps2();
		}, 2000);
	};
	const steps2 = () => {
		steps.value = 2;
		newProgressBarStyle.value = getGradientStyle(UpgradeMaxLevel.value, levelPercent.value);
		showNextLevel.value = true;
		setTimeout(() => {
			step3();
		}, 2500);
	};
	const step3 = () => {
		steps.value = 3;
	};

	const init = () => {
		VIP_GiftResult.value = [];
		getMemberVipGift().then((res) => {
			const levelList = [] as number[];
			VIP_GiftResult.value = res.data.data?.list || [];
			VIP_GiftResult.value.forEach((element) => {
				if (element.vipLevel) {
					levelList.push(element?.vipLevel);
				}
			});
			UpgradeMinLevel.value = Math.min(...levelList);
			UpgradeMaxLevel.value = Math.max(...levelList) + 1;
			// 渲染時間差
			setTimeout(() => {
				steps1();
			}, 100);
		});
	};
	onMounted(() => {
		init();
	});
</script>
<style lang="scss" scoped>
	.AllVipGiftModal {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.6);
	}
</style>
