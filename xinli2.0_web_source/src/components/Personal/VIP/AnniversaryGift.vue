<template lang="pug">
.BonusCard.blackCard.relative.h-52.rounded-lg.overflow-hidden
	.absolute.top-2.-right-2
		img(:src='bgIcon_03')
	.BETWEEN_C.WH_FULL
		.w-full
			.title.Subtitle_3.text-center.py-2 VIP {{AnniversaryGift?.vipLevel || userStore?.vipInfo?.next?.level }} 周年礼金
			.bonus.text-center ¥{{commaFormat(AnniversaryGift?.gift) ||commaFormat(userStore.vipSetting[userStore?.vipInfo?.level||0].monthlyGift)}}
			.desc.text-center.mt-4 等级需达 VIP {{userStore?.vipInfo?.next?.level}}
			
		.unReceiveButton.CENTER.h-10.text-center(v-if='AnniversaryGift?.status===1')
			.Subtitle_3 已領取
		.unReceiveButton.CENTER.h-10.text-center(v-if='!AnniversaryGift')
			.Subtitle_3 未达条件
		.receiveButton.CENTER.h-10.text-center.cursor-pointer(v-if='AnniversaryGift?.status===2'
			@click='AnniversaryGift?.id && takeMemberVipGift(AnniversaryGift?.id)')  
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

	const bgIcon_03 = `${window.staticPath}/static/img/VIP/bgIcon_03.png`;
	const userStore = UserStore();
	const AnniversaryGiftList = ref([] as MEMBERAJAX_GetVipGiftResponseData[]);
	const AnniversaryGift = computed(() => AnniversaryGiftList.value.find((item) => item.status === 2));
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
		getMemberVipGift({ type: 3 }).then((res) => {
			AnniversaryGiftList.value = res.data.data?.list || [];
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
