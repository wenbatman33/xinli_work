<template lang="pug">
//- 修改密碼
.password
	//- 導覽欄
	nav-bar(title='修改密码', left-button='/publicAssets/img/icon-left-red@3x.png', @click-left='clickLeft')

	//- 表單
	van-form.mx-4.mt-6(@submit='submit')
		//- 新密碼輸入框
		input-field(v-model='editPwdForm.user_pass', type='password', name='userPass', placeholder='请输入新密码', :rules='[{ required: true, message: "请输入新密码" }]')

		//- 二次密碼輸入框
		input-field.mt-6(v-model='editPwdForm.user_pass2', type='password', name='userPass2', placeholder='请再次输入新密码', :rules='[{ required: true, message: "请再次输入新密码" }]')

		//- 儲存按鈕
		submit-button.mt-12(:loading='state.editPwdLoading', native-type='submit', text='储存')
</template>
<script>
import { reactive, computed, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { useStore } from 'vuex';
import { editpwd } from '@/api';
import navBar from '@/components/navBar';
import inputField from '@/components/inputField';
import submitButton from '@/components/submitButton';

export default {
	components: {
		navBar,
		inputField,
		submitButton,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			editPwdLoading: false,
		});

		// Edit pwd form
		const editPwdForm = reactive({
			user_pass: '',
			user_pass2: '',
		});

		// User id
		const uid = computed(() => store.state.user.uid || '');

		// 點擊導覽欄返回按鈕
		const clickLeft = () => {
			router.go(-1);
		};

		// 送出表單
		const submit = () => {
			// Update loading state
			state.editPwdLoading = true;

			// Post body
			const body = {
				uid: Number(uid.value),
				...toRaw(editPwdForm),
			};

			// Edit pwd
			editpwd(body)
				.then((res) => {
					// Validate response code
					if (res.code === 0) {
						// Dispatch update action
						store.dispatch('user/GET_USER_INFO');

						// Toast success message
						Toast('密码修改成功');

						// Navigation back
						router.go(-1);
					}

					// Revert loading state on finished
					state.editPwdLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.editPwdLoading = false;
				});
		};
		return {
			state,
			editPwdForm,
			clickLeft,
			submit,
		};
	},
};
</script>
<style lang="scss" scoped>
.password {
	width: 100%;
	::v-deep(.van-cell) {
		padding: 0;
	}
}
</style>