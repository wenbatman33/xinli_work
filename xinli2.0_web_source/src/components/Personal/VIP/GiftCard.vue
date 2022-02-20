<template lang="pug">
.GiftCard.rounded-lg.bg-xGold.bg-cover(:class='"w-[288px] h-[288px]"' :style='{ "background-image": "url(" + giftCardBg + ")" }')
	.p-4
		h4.text-white.my-8 {{giftCardTitle}}
		p.text-white {{giftCardTitleType}}
		RollingNumber.mt-12(:preFix='"¥"' :number='props.data.gift' :fontSize='48', :speed="2" )
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { UserStore } from '@/store/userStore';
	import RollingNumber from '@/components/RollingNumber/index.vue';
	import type { MEMBERAJAX_GetVipGiftResponseData } from '@/api/model';

	interface Props {
		data: MEMBERAJAX_GetVipGiftResponseData;
	}
	const props = defineProps<Props>();
	const type_1 = `${window.staticPath}/static/img/VIP/giftCardBg/type_1.png`;
	const type_2 = `${window.staticPath}/static/img/VIP/giftCardBg/type_2.png`;
	const type_3 = `${window.staticPath}/static/img/VIP/giftCardBg/type_3.png`;
	const type_4 = `${window.staticPath}/static/img/VIP/giftCardBg/type_4.png`;
	const type_5 = `${window.staticPath}/static/img/VIP/giftCardBg/type_5.png`;
	const gameType_1 = `${window.staticPath}/static/img/VIP/giftCardBg/gameType_1.png`;
	const gameType_2 = `${window.staticPath}/static/img/VIP/giftCardBg/gameType_2.png`;
	const gameType_3 = `${window.staticPath}/static/img/VIP/giftCardBg/gameType_3.png`;
	const gameType_4 = `${window.staticPath}/static/img/VIP/giftCardBg/gameType_4.png`;
	const gameType_5 = `${window.staticPath}/static/img/VIP/giftCardBg/gameType_5.png`;

	const userStore = UserStore();
	const giftCardBg = computed(() => {
		let bg = '';
		if (props.data.type === 1) {
			bg = type_1;
		} else if (props.data.type === 2) {
			bg = type_2;
		} else if (props.data.type === 3) {
			bg = type_3;
		} else if (props.data.type === 4) {
			bg = type_4;
		} else if (props.data.type === 5) {
			bg = type_5;
		} else if (props.data.gameType === 1) {
			bg = gameType_1;
		} else if (props.data.gameType === 2) {
			bg = gameType_2;
		} else if (props.data.gameType === 3) {
			bg = gameType_3;
		} else if (props.data.gameType === 4) {
			bg = gameType_4;
		} else if (props.data.gameType === 5) {
			bg = gameType_5;
		}
		return bg;
	});
	const giftCardTitle = computed(() => {
		let title = '';
		// 禮金類型 1:月礼金,2:晉級,3:週年,4:返水,5:生日礼
		if (props.data.type === 1) {
			title = '月度礼金';
		} else if (props.data.type === 2) {
			title = '晉級礼金';
		} else if (props.data.type === 3) {
			title = '週年礼金';
		} else if (props.data.type === 4) {
			title = '返水礼金';
		} else if (props.data.type === 5) {
			title = '生日礼品';
		} else if (props.data.gameType === 1) {
			title = '返水特权强化';
		} else if (props.data.gameType === 2) {
			title = '返水特权强化';
		} else if (props.data.gameType === 3) {
			title = '返水特权强化';
		} else if (props.data.gameType === 4) {
			title = '返水特权强化';
		} else if (props.data.gameType === 5) {
			title = '返水特权强化';
		}
		return title;
	});
	const giftCardTitleType = computed(() => {
		let title = '';
		// 1:體育 2:真人 3:彩票 4:電競 5:電子
		if (props.data.type === 1) {
			title = '';
		} else if (props.data.type === 2) {
			title = '';
		} else if (props.data.type === 3) {
			title = '';
		} else if (props.data.type === 4) {
			title = '';
		} else if (props.data.type === 5) {
			title = '';
		} else if (props.data.gameType === 1) {
			title = '體育';
		} else if (props.data.gameType === 2) {
			title = '真人';
		} else if (props.data.gameType === 3) {
			title = '彩票';
		} else if (props.data.gameType === 4) {
			title = '電競';
		} else if (props.data.gameType === 5) {
			title = '電子';
		}
		return title;
	});
</script>
<style lang="scss" scoped></style>
