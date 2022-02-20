<template lang="pug">
//- 獎項列表
.grid.grid-cols-1.gap-3.items-stretch
    //- 獎項物件
    reward-item(v-for='(item, index) in list', :item='item', :index='index')
</template>
<script>
import rewardItem from '@/components/event/luckyspin/rewardItem.vue';

export default {
	components: {
		rewardItem,
	},
	props: {
		list: Array,
	},
};
</script>
