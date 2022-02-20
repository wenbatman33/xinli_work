<template lang="pug">
.BonusCard.blackCard.relative.h-52.rounded-lg.overflow-hidden
	.absolute.top-2.-right-2
		img(:src='bgIcon_01')
	.BETWEEN_C.WH_FULL
		.w-full
			.title.Subtitle_3.text-center.py-2 VIP {{UpgradeGift?.vipLevel || userStore?.vipInfo?.next?.level }}晋级礼金
			.bonus.text-center ¥{{commaFormat(UpgradeGift?.gift) || commaFormat(userStore?.vipInfo?.next?.upgradeGift) }}
			.desc.text-center.mt-4 晋级后 5号开放领取


		.unReceiveButton.CENTER.h-10.text-center(v-if='UpgradeGift?.status===1')
			.Subtitle_3 已領取

		.unReceiveButton.CENTER.h-10.text-center(v-if='!UpgradeGift')
			.Subtitle_3 未达条件

		//- 領取狀態 1:已領取 2:未領取 
		//- 需判斷 領取時間之後才可以顯示領取按鈕
		.receiveButton.CENTER.h-10.text-center.cursor-pointer(
			v-if='UpgradeGift?.status===2 && dayjs().isAfter(dayjs(UpgradeGift?.takenAt))' 
			@click='UpgradeGift?.id && takeMemberVipGift(UpgradeGift?.id)') 
			.Subtitle_3 立即领取
</template>

<script setup lang="ts">
	import { onMounted, ref, computed } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { notification } from 'ant-design-vue';
	import { getMemberVipGift, postMemberVipGift } from '@/api';
	import dayjs from 'dayjs';
	import type { MEMBERAJAX_GetVipGiftResponseData } from '@/api/model';
	import { commaFormat } from '@/utils';

	const bgIcon_01 = `${window.staticPath}/static/img/VIP/bgIcon_01.png`;

	const userStore = UserStore();
	const UpgradeGiftList = ref([] as MEMBERAJAX_GetVipGiftResponseData[]);
	const UpgradeGift = computed(() => UpgradeGiftList.value.find((item) => item.status === 2));
	const takeMemberVipGift = (giftID: number) => {
		postMemberVipGift({ id: giftID })
			.then((res) => {
				if (res.data.statusCode === 0) {
					notification.success({ message: '已派发至您的中心钱包' });
					init();
				} else {
					notification.error({ message: '派发异常，请联系客服处理' });
				}
			})
			.catch((err) => {
				notification.error({ message: err });
			});
	};
	const init = () => {
		// 禮金類型 1:月礼金,2:晉級,3:週年,4:返水,5:生日礼
		getMemberVipGift({ type: 2 }).then((res) => {
			UpgradeGiftList.value = res.data.data?.list || [];
		});
	};
	onMounted(() => {
		init();
	});
</script>
<style scoped lang="scss">
	.blackCard {
		background: linear-gradient(#1c1c1d, #393a3e);
		filter: drop-shadow(0px 14px 16px #d2d2d2);

		.title {
			color: #d8b782;
		}
		.bonus {
			font-size: 44px;
			color: #d8b782;
		}
		.desc {
			color: #d8b782;
		}
		.receiveButton {
			color: #000;
			background: linear-gradient(#d4b484, #fadfb5);
		}
		.unReceiveButton {
			color: rgba(255, 255, 255, 0.6);
			background: #535357;
		}
	}
</style>
