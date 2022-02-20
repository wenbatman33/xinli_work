<template lang="pug">
//- 獎項彈窗
a-modal(:visible='show', :closable='false', :footer='null')
    .FLEX_C.items-center.px-6.py-8
        //- 標題
        .text-base.text-title.font-bold 恭喜获得

        //- 骰子
        .self-stretch.grid.grid-cols-dice-list.justify-center.items-center.transform-dice-list.mt-6
            img.object-contain(v-for='item in diceList', :src='`/publicAssets/img/event/uefaeuro_2020/icon-dice-${item}@3x.png`')

        //- 點數
        .text-lg.text-point.font-bold.mt-6 
            span {{ dicePoint }}
            span.ml-2 点
        
        //- 確認
        a-button.w-auto.h-auto.mt-6.px-8.py-2.rounded.border-transparent.bg-confirm(type='link', @click='clickConfirm')
            .text-lg.text-white.font-bold 确认
</template>
<script>
import { computed } from 'vue';

export default {
	props: {
		show: Boolean,
		dicePoint: Number,
	},
	emits: ['update:show'],
	setup(props, { emit }) {
		// 骰子列表
		const diceList = computed(() => {
			var list = [];
			var point = props?.dicePoint || 0;
			while (point > 0) {
				var next = Math.min(point, 6);
				if (point > 1 && point <= 6 && list.length === 0) {
					next = Math.floor(Math.random() * (point - 1)) + 1;
				}
				list.push(next);
				point -= next;
			}
			for (var i = 0; i < list.length; i++) {
				const j = Math.floor(Math.random() * list.length);
				if (j === i) {
					continue;
				}
				var iv = list[i];
				var jv = list[j];
				if (iv > 1 && jv < 6) {
					iv -= 1;
					jv += 1;
				} else if (iv < 6 && jv > 1) {
					iv += 1;
					jv -= 1;
				}
				list[i] = jv;
				list[j] = iv;
			}
			return list;
		});

		// 點擊確認
		const clickConfirm = () => {
			emit('update:show', false);
		};
		return {
			diceList,
			clickConfirm,
		};
	},
};
</script>
<style lang="scss" scoped>
.text-title {
	color: #a62337;
}
.grid-cols-dice-list {
	grid-template-columns: repeat(auto-fit, 2.5rem);
}
.transform-dice-list {
	:nth-child(odd) {
		z-index: 10;
		transform: rotate(-15.9deg);
		grid-column: auto / 2 span;
	}
	:nth-child(even) {
		z-index: 20;
		margin-top: 2rem;
		transform: scale(2) rotate(15.24deg);
	}
}
.text-point {
	color: #a62337;
}
.bg-confirm {
	background: #a62337;
}
</style>
