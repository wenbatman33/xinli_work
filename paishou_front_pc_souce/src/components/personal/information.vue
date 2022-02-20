<template lang="pug">
.Container.BETWEEN
	//- personal 左側區塊------------------------------------------------------------------------------------------------------------
	.funcBar.w-40.pr-4.flex-shrink-0
		menuList
	.information.BETWEEN(v-if='userInfo')
		.FLEX_C.flex-grow.mr-4
			userProfile.mb-4
			userCode.mb-4
			userAccount.mb-4
			campaign
		.bg-white.rounded.flex-shrink-0(style='width:364px')
			allTasksList
</template>
<script>
import { useStore } from 'vuex';
import { reactive, onMounted, computed, toRaw } from 'vue';
import userProfile from '@/components/personal/profile/userProfile';
import userCode from '@/components/personal/profile/userCode';
import userAccount from '@/components/personal/profile/userAccount';
import campaign from '@/components/campaign';
import allTasksList from '@/components/tasks/allTasksList';
import menuList from '@/components/personal/menuList.vue';

export default {
	components: {
		userProfile,
		userCode,
		userAccount,
		campaign,
		allTasksList,
		menuList,
	},
	setup() {
		const store = useStore();
		const userInfo = computed(() => store?.state?.user?.userInfo);
		return {
			userInfo,
		};
	},
};
</script>
<style lang="scss" scoped>
.basicInfo,
.accountInfo {
	background: #fff;
	border-radius: 8px;
}
</style>
