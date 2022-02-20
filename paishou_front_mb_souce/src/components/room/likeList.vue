<template lang="pug">
//- 相同賽事直播列表
.flex.flex-row.flex-nowrap.items-center.px-4.py-3.overflow-x-auto(:class='likeListVisibled ? "block" : "hidden"')
	//- 當前主播物件
	like-item.flex-shrink-0.anchor(:item='anchor')

	//- 相同賽事直播物件
	like-item.flex-shrink-0(v-for='item in likeList' :item='item')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import likeItem from '@/components/room/likeItem.vue';

export default {
	components: {
		likeItem,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// 當前主播資訊
		const anchor = computed(() => {
			return {
				uid: store?.state?.socket?.uid || 0,
				avatar_thumb: store?.state?.socket?.anchorInfo?.avatar || '',
				user_nicename: store?.state?.socket?.anchorInfo?.user_nicename || '',
			};
		});

		// 相同賽事直播列表
		const likeList = computed(() => {
			return store?.state?.socket?.likeList || [];
		});

		// 是否顯示相同賽事直播列表
		const likeListVisibled = computed(() => {
			return store?.state?.socket?.likeListVisibled === true;
		})
		return {
			anchor,
			likeList,
			likeListVisibled,
		};
	},
};
</script>
