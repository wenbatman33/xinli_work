<template lang="pug">
.w-full
	h3.text-psV3Red.mb-4 绑定手机
	.step_0.text-center(v-if='state.editMobileStep===0')
		h4.text-psV3Red.my-4 您要放弃此次行为？
		.p.my-4  您确定要取消此次行为离开此页？此次修改将不会覆盖原来的资料。
		.text-center.my-4 
			a-button.mx-2(@click='state.editMobileStep=state.tempStep', size='large') 取消
			a-button.mx-2(type='primary', @click='hidePhoneModal', size='large') 确定
	//- -------------------------------------------------------------------------------------------------------
	.step_1(v-if='state.editMobileStep===1')
		editPhoneStep_1(@backStep0='backStep0', @step2='step2')
	.step_2(v-if='state.editMobileStep===2')
		editPhoneStep_2(@step3='step3', @close-modal='hidePhoneModal')
	.step_3(v-if='state.editMobileStep===3')
		editPhoneStep_3(@backStep0='backStep0', @step4='step4')
	.step_4.text-center(v-if='state.editMobileStep===4')
		h4.text-psV3Red.my-4 手机号修改成功
		p.text-xs.text-gray-500.my-4 手机号修改已成功！下次请以新的手机号登入！
		.text-center.my-4 
			a-button.confirmBtn.mx-2(type='primary', @click='hidePhoneModal' , size='large') 确认
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted, computed, toRaw } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { message } from 'ant-design-vue';
import { verifyMobile, verifyMobileSms, verifyMobileBind } from '@/api';
import editPhoneStep_1 from '@/components/personal/profile/editPhoneStep_1.vue';
import editPhoneStep_2 from '@/components/personal/profile/editPhoneStep_2.vue';
import editPhoneStep_3 from '@/components/personal/profile/editPhoneStep_3.vue';
import { matomo_personal_edit_phone } from '@/matomoEvent';

export default {
	components: {
		editPhoneStep_1,
		editPhoneStep_2,
		editPhoneStep_3,
	},
	setup(props, { emit }) {
		const store = useStore();
		const state = reactive({
			showMobileModal: false,
			tempStep: 1,
			editMobileStep: 1,
			firstEdit: true,
		});
		const userInfo = computed(() => store.state.user.userInfo);
		const UID = computed(() => store.state.user.uid || '');
		const MOBILE = computed(() => userInfo.value.mobile || '');
		let checkPhone = async (rule, value) => {
			if (value === '') {
				return Promise.reject(new Error('请输手机号'));
			} else if (!/^(1)\d{10}$/.test(value)) {
				return Promise.reject(new Error('请输入正确的手机号'));
			} else {
				return Promise.resolve();
			}
		};
		const openModal = () => {
			state.showMobileModal = true;
			matomo_personal_edit_phone();
		};
		const closeModal = () => {
			state.showMobileModal = false;
			state.editMobileStep = 1;
			state.tempStep = 1;
		};
		const backStep0 = () => {
			state.editMobileStep = 0;
		};
		const step1 = () => {
			// console.log('step1');
		};
		const step2 = () => {
			state.editMobileStep = 2;
		};
		const step3 = () => {
			state.tempStep = 3;
			state.editMobileStep = 3;
		};
		const step4 = () => {
			state.editMobileStep = 4;
		};
		const hidePhoneModal = () => {
			state.editMobileStep = 1;
			emit('hidePhoneModal');
		};
		return {
			store,
			state,
			userInfo,
			UID,
			MOBILE,
			openModal,
			closeModal,
			backStep0,
			step1,
			step2,
			step3,
			step4,
			hidePhoneModal,
		};
	},
};
</script>
<style lang="scss" scoped>
.editBtn {
	cursor: pointer;
	border-radius: 20px;
	color: #a62337;
	background: #fff;
	padding: 0 8px;
	border: 1px solid #a62337;
	font-size: 12px;
}
.confirmBtn {
	cursor: pointer;
	border-radius: 4px;
	outline: none;
	padding: 5px 20px;
	background: #a62337;
	border: 1px solid #a62337;
	color: #fff;
}
.cancelBtn {
	cursor: pointer;
	border-radius: 4px;
	outline: none;
	padding: 5px 20px;
	background: #fff;
	border: 1px solid #a62337;
	color: #a62337;
}
.bindBtn {
	cursor: pointer;
	border-radius: 20px;
	color: #ff9a00;
	background: #ff9a00;
	padding: 0 8px;
	border: 1px solid #ff9a00;
	font-size: 12px;
	color: #fff;
}
</style>
