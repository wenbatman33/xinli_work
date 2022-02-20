<template lang="pug">
a-modal(:visible='showRechargeModal',width='1200px' :class='"rechargeModal"', :bodyStyle='{"background":"#fff", "border-radius": "8px"}',  closable='', :footer='null', @cancel='closeMode')
	recharge
</template>

<script>
import { useStore } from 'vuex';
import { reactive, computed, onMounted } from 'vue';
import { rechargeList, alipay } from '@/api';
import { message } from 'ant-design-vue';

import recharge from '@/components/recharge';

export default {
	components: {
		recharge,
	},
	setup() {
		const store = useStore();
		const showRechargeModal = computed(() => store.state.user.showRechargeModal);
		const closeMode = () => {
			store.commit('user/CLOSE_RECHARGE_MODEL');
		};
		return {
			store,
			showRechargeModal,
			closeMode,
		};
	},
};
</script>
<style lang="scss">
.rechargeModal {
	border-radius: 8px !important;
	overflow: hidden;
	padding-bottom: 0px !important;
}
</style>
