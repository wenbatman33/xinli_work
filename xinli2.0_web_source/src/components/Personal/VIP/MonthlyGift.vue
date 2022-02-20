<template lang="pug">
.BonusCard.goldCard.relative.h-52.rounded-lg.overflow-hidden
	.absolute.top-2.-right-2
		img(:src='bgIcon_02')
	.BETWEEN_C.WH_FULL
		.w-full
			.title.Subtitle_3.text-center.py-2 VIP {{MonthlyGift?.vipLevel || userStore?.vipInfo?.next?.level }} 月度礼金
			.bonus.text-center ¥{{commaFormat(MonthlyGift?.gift) || commaFormat(userStore?.vipSetting[userStore?.vipInfo?.level||0]?.monthlyGift)}}
			.desc.text-center.mt-4 等级需达 VIP {{userStore?.vipInfo?.next?.level}}


		.unReceiveButton.CENTER.h-10.text-center(v-if='MonthlyGift?.status===1')
			.Subtitle_3 已領取

		.unReceiveButton.CENTER.h-10.text-center(v-if='!MonthlyGift')
			.Subtitle_3 未达条件
		//- 領取狀態 1:已領取 2:未領取 
		.receiveButton.CENTER.h-10.text-center.cursor-pointer(v-if='MonthlyGift?.status===2' 
			@click='MonthlyGift?.id && takeMemberVipGift(MonthlyGift?.id)') 
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

	const bgIcon_02 = `${window.staticPath}/static/img/VIP/bgIcon_02.png`;

	const userStore = UserStore();
	const MonthlyGiftList = ref([] as MEMBERAJAX_GetVipGiftResponseData[]);
	const MonthlyGift = computed(() => MonthlyGiftList.value.find((item) => item.status === 2));
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
		getMemberVipGift({ type: 1 }).then((res) => {
			MonthlyGiftList.value = res.data.data?.list || [];
		});
	};
	onMounted(() => {
		init();
	});
</script>
<style scoped lang="scss">
	.goldCard {
		background: linear-gradient(#ac8954, #eccc95);
		filter: drop-shadow(0px 8px 12px #f1dfc4);

		.title {
			color: #fff;
		}
		.bonus {
			font-size: 44px;
			color: #fff;
		}
		.desc {
			color: #fff;
		}
		.receiveButton {
			color: #fff;
			background: linear-gradient(#b98843, #dbb26c);
		}
		.unReceiveButton {
			color: rgba(255, 255, 255, 0.6);
			background: rgba(255, 255, 255, 0.1);
		}
	}
</style>
