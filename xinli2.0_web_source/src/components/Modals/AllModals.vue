<template lang="pug">
.allModals
	//- 舊版登入 註冊
	LoginModal
	RegisterModal
	//- 充值與提款
	WalletModal
	//- app 下載
	AppDownloadModal
	//- 使用者實名制
	EditUserNameModal
	EditUserPhoneModal
	EditUserPhoneModal
	EditUserPasswordModal
	EditUserEmailModal
	//- 新增銀行卡
	AddBankCardModal
	AddOtherBankCardModal
	AddUSDTModal
	DepositDetailModal
	//- 遊戲廳列表
	GamerRoomListModel
</template>

<script setup lang="ts">
	import { onMounted, computed, ref } from 'vue';
	/* store */
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	// 舊版登入 註冊
	import LoginModal from '@/components/Login/LoginModal.vue';
	import RegisterModal from '@/components/Register/RegisterModal.vue';
	// 舊版登入 註冊
	import AppDownloadModal from '@/components/Modals/AppDownloadModal.vue';
	// 使用者 相關設定
	import EditUserNameModal from '@/components/Modals/EditUserNameModal.vue';
	import EditUserPhoneModal from '@/components/Modals/EditUserPhoneModal.vue';
	import EditUserPasswordModal from '@/components/Modals/EditUserPasswordModal.vue';
	import EditUserEmailModal from '@/components/Modals/EditUserEmailModal.vue';
	// 新增銀行卡
	import AddBankCardModal from '@/components/Modals/AddBankCardModal.vue';
	import AddOtherBankCardModal from '@/components/Modals/AddOtherBankCardModal.vue';
	import AddUSDTModal from '@/components/Modals/AddUSDTModal.vue';
	// 充值相關
	import WalletModal from '@/components/Modals/WalletModal.vue';
	import DepositDetailModal from '@/components/Modals/DepositDetailModal.vue';
	// 遊戲廳列表
	import GamerRoomListModel from '@/components/Modals/GamerRoomListModel.vue';

	const userStore = UserStore();
	const systemStore = SystemStore();
	const init = async () => {};

	onMounted(() => {});
</script>
