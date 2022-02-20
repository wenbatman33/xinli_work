<template lang="pug">
//- 充值規則
.grid.grid-cols-2.gap-2.mt-2.px-4
	van-button.rule-button.rounded-md(v-for='item in list || []', :class='{ selected: item.id === selected }', @click='clickRule(item)')
		.flex.flex-col.pl-4.pb-2
			//- 贈送
			.bonus.self-end.text-sm.rounded-bl-md.rounded-tr-md.px-4(class='py-0.5', :class='{ "opacity-0": !item.bonus_quantity }')
				span 送
				span {{ item.bonus_name }}
				span x
				span {{ commaFormat(item.bonus_quantity || "") }}

			//- 金額
			.flex.flex-row.items-center.mt-1
				.text-sm(:style='{ "margin-top": "0.3125rem" }') ¥
				.text-2xl.font-bold.ml-1 {{ commaFormat(item.money || "") }}

			//- 商品
			.coin.text-sm.text-left.mt-1
				span {{ item.goods_name }}
				span x
				span {{ commaFormat(item.goods_quantity || "") }}
</template>
<script>
import { commaFormat } from '@/utils';
import { matomo_recharge_click_money } from '@/matomoTrackEvent.js';

export default {
	props: {
		list: Array,
		selected: Number,
	},
	emits: ['update:selected'],
	setup(props, { emit }) {
		// 點擊充值規則
		const clickRule = (item) => {
			// Emit rule selected
			emit('update:selected', item.id);

			// Matomo track
			matomo_recharge_click_money(item.money);
		};
		return {
			clickRule,
			commaFormat,
		};
	},
};
</script>
<style lang="scss" scoped>
.rule-button {
	width: 100%;
	height: unset;
	padding: 0px;
	color: #191919;
	border: transparent;
	background: #f4f4f4;
	::v-deep(.van-button__content) {
		width: 100%;
	}
	::v-deep(.van-button__text) {
		width: 100%;
	}
	.bonus {
		color: #ffffff;
		background: linear-gradient(262deg, #df2f4a, #a62337);
	}
	.coin {
		color: #969696;
	}
	&.selected {
		color: #a62337;
		border: 1px solid #a62337;
		background: #ffffff;
	}
}
</style>