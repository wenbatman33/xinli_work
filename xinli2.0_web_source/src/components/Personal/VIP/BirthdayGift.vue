<template lang="pug">
.BonusCard.goldCard.relative.h-52.rounded-lg.overflow-hidden
	.absolute.top-2.-right-2
		img(:src='bgIcon_04')
	.BETWEEN_C.WH_FULL
		.w-full
			.title.Subtitle_3.text-center.py-2 VIP {{ userStore.vipInfo.level }} 生日礼品
			.bonus.text-center
				img(:src='BirthdayGift' :srcset='BirthdayGift_2x')
			.desc.text-center.mt-4 生日当日开放领取
		
		.receiveButton.CENTER.h-10.text-center.cursor-pointer(v-if='isBirthday' @click='openLiveChat')
			.Subtitle_3 联系在线客服
		.receiveButton.CENTER.h-10.text-center.cursor-pointer(v-else-if='!userStore.userInfo.birthday' @click='gotoProfile')
			.Subtitle_3 完善生日资讯
		.unReceiveButton.CENTER.h-10.text-center(v-else)
			.Subtitle_3 未达条件
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { openLiveChat } from '@/utils';
	import { useRouter } from 'vue-router';
	import dayjs from 'dayjs';

	const bgIcon_04 = `${window.staticPath}/static/img/VIP/bgIcon_04.png`;

	const BirthdayGift = `${window.staticPath}/static/img/VIP/BirthdayGift.png`;
	const BirthdayGift_2x = `${window.staticPath}/static/img/VIP/BirthdayGift@2x.png 2x`;

	const router = useRouter();
	const userStore = UserStore();
	const isBirthday = computed(() => dayjs().format('MM-DD') === dayjs(userStore.userInfo.birthday).format('MM-DD'));
	const gotoProfile = () => {
		router.push('/personal/profile');
	};
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
