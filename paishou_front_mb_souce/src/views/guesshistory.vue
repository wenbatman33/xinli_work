<template lang="pug">
//- 競猜紀錄
.w-full.flex.flex-col.items-stretch
    //- 導覽欄
    nav-bar(title='竞猜纪录', icon='/publicAssets/img/guess/icon-guess@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='clickRight')

    //- 狀態列表
    van-tabs(animated, swipeable)
        //- 全部
        van-tab(title='全部')
            divider
            history-list(:status='-1')

        //- 未結算
        van-tab(title='未结算')
            divider
            history-list(:status='1')

        //- 已結算
        van-tab(title='已结算')
            divider
            history-list(:status='3')

        //- 取消
        van-tab(title='取消')
            divider
            history-list(:status='0')
</template>
<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import navBar from '@/components/navBar';
import divider from '@/components/divider';
import historyList from '@/components/guess/historyList.vue';

export default {
	components: {
		navBar,
		divider,
		historyList,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// 點擊導覽欄返回按鈕
		const clickRight = () => {
			router.replace('/personal');
		};

		// On component mounted
		onMounted(() => {
			store.dispatch('user/GET_GUESS_HISTORY');
		});
		return {
			clickRight,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-tabs__line) {
	background-color: #a62337;
}
::v-deep(.van-tab) {
	color: #969696;
}
::v-deep(.van-tab--active) {
	color: #a62337;
	font-weight: bold;
}
</style>
