<template lang="pug">
//- 競猜列表
.grid.grid-cols-1.gap-4.items-stretch
    //- 競猜物件
    guess-item(v-for='item in list', :item='item', @bet-success='betSuccess')
</template>
<script>
import guessItem from '@/components/event/2020tokyolympic/guessItem.vue';

export default {
	components: {
		guessItem,
	},
	props: {
		list: Array,
	},
	emits: ['bet-success'],
	setup(props, { emit }) {
		// 下注成功
		const betSuccess = (item) => {
			emit('bet-success');
		};
		return {
			betSuccess,
		};
	},
};
</script>
