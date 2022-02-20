<template lang="pug">
.text-center
	.my-4
		.text-gray-500 目前绑定手机
	.my-4
		.currentMobile.p-4.BETWEEN
			span +86
			span {{MOBILE}}
	.my-8
		a-button.mx-2(@click='closeModal', size='large') 取消
		a-button.mx-2(type='primary',@click='gotostep3', size='large') 更换手机号
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted, computed, toRaw } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { message } from 'ant-design-vue';
import { verifyMobile } from '@/api';

export default {
	props: [],
	setup(props, { emit }) {
		const store = useStore();
		const state = reactive({});
		const codeState = reactive({
			time: 60,
			smsSendBtn: false,
			loading: false,
		});
		const MOBILE = computed(() => store.state.user.userInfo.mobile || '');
		// validator 需先宣告
		let checkPhone = async (rule, value, callback) => {
			if (value === '') {
				return Promise.reject(new Error('请输手机号'));
			} else if (!/^(1)\d{10}$/.test(value)) {
				return Promise.reject(new Error('请输入正确的手机号'));
			} else {
				return Promise.resolve();
			}
		};
		const verifyMobileForm = reactive({
			account: '',
			password: '',
		});
		const verifyMobileFormRules = reactive({
			account: [
				{ required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
				{ validator: checkPhone, trigger: ['change', 'blur'] },
			],
			password: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }],
		});
		const { validate, validateInfos } = useForm(verifyMobileForm, verifyMobileFormRules);
		//
		const closeModal = () => {
			emit('close-modal');
		};
		const gotostep3 = () => {
			emit('step3');
		};
		return {
			store,
			state,
			MOBILE,
			closeModal,
			gotostep3,
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
.currentMobile {
	background: #f5f7fa;
	border-radius: 8px;
}
</style>
