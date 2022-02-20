<template lang="pug">
.w-full
	h3.text-psV3Red.mb-4 修改密码
	a-form(:model='passwordForm', :rules='passwordFormRules', @submit='changePass')
		a-form-item(name='user_pass')
			a-input(v-model:value='passwordForm.user_pass', autocomplete='off', type='password', placeholder='请输入密码')
		a-form-item(name='user_pass2')
			a-input(v-model:value='passwordForm.user_pass2', autocomplete='off', type='password', placeholder='请再次输入密码')
	.BETWEEN.my-4.text-center
		div.pr-4(class='w-1/3')
			a-button.w-full.rounded(@click='hidePasswordModal', size='large') 取消
		div(class='w-2/3')
			a-button.w-full.rounded(type='primary', html-type='submit', size='large' @click='changePass') 确认修改
</template>
<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { reactive, onMounted, computed, toRaw } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { message } from 'ant-design-vue';
import { editinfo, editpwd } from '@/api';

export default {
	setup(props, { emit }) {
		const store = useStore();
		const state = reactive({});
		const UID = computed(() => store.state.user.uid || '');
		let checkPassword = async (rule, value) => {
			if (value !== passwordForm.user_pass) {
				return Promise.reject(new Error('两次输入密码不一致'));
			} else {
				return Promise.resolve();
			}
		};
		const passwordForm = reactive({
			user_pass: '',
			user_pass2: '',
			uid: Number(UID.value),
		});
		const passwordFormRules = reactive({
			user_pass: [{ required: true, message: '请输入密码', trigger: ['change', 'blur'] }],
			user_pass2: [
				{ required: true, message: '请再次输入密码', trigger: ['change', 'blur'] },
				{ validator: checkPassword, message: '两次输入密码不一致', trigger: ['change', 'blur'] },
			],
		});
		const hidePasswordModal = () => {
			emit('hidePasswordModal');
		};
		const changePass = (e) => {
			e.preventDefault();
			validate()
				.then(() => {
					const payload = toRaw(passwordForm);
					editpwd(payload).then((res) => {
						message.success('修改成功');
						state.showPassModal = false;
					});
				})
				.catch((error) => {
					message.error('输入密码有误');
				});
		};
		const { validate, validateInfos } = useForm(passwordForm, passwordFormRules);
		return {
			store,
			state,
			validateInfos,
			UID,
			passwordForm,
			passwordFormRules,
			changePass,
			hidePasswordModal,
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
	color: #fff;
	border: none;
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
