<template lang="pug">
//- 更改簽名
.signature
	//- 導航欄
	nav-bar(title='签名', left-button='/publicAssets/img/icon-left-red@3x.png', @click-left='clickLeft')

	//- 表單
	van-form.mx-4.mt-6(@submit='submit')
		//- 簽名輸入框
		input-field.mt-1(v-model='editInfoForm.signature', label='编辑签名', name='signature', placeholder='限20個字(40個字元)', :rules='[ { required: true, message: "请输入签名" }, { validator: checkSignature, message: "限20個字(40個字元)" }, ]')

		//- 儲存按鈕
		submit-button.mt-12(:loading='state.editInfoLoading', native-type='submit', text='确认保存')
</template>
<script>
import { reactive, computed, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { editinfo } from '@/api';
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
			editInfoLoading: false,
		});

		// Edit info form
		const editInfoForm = reactive({
			signature: store.state?.user?.userInfo?.signature,
		});

		// User id
		const uid = computed(() => store.state.user.uid || '');

		// 點擊導覽欄返回按鈕
		const clickLeft = () => {
			router.go(-1);
		};

		// 檢查簽名欄位
		const checkSignature = () => /^.{1,40}$/.test(editInfoForm.signature);

		// 送出表單
		const submit = () => {
			// Update loading state
			state.editInfoLoading = true;

			// Post body
			const body = {
				uid: Number(uid.value),
				...toRaw(editInfoForm),
			};
			// Eidt info
			editinfo(body)
				.then((res) => {
					// Validate response code
					if (res.code === 0) {
						// Dispatch update action
						store.dispatch('user/GET_USER_INFO');

						// Toast success message
						Toast('签名修改成功');

						// Navigation back
						router.go(-1);
					}

					// Revert loading state on finished
					state.editInfoLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.editInfoLoading = false;
				});
		};
		return {
			state,
			editInfoForm,
			clickLeft,
			checkSignature,
			submit,
		};
	},
};
</script>
<style lang="scss" scoped>
.signature {
	width: 100%;
	::v-deep(.van-cell) {
		padding: 0;
	}
}
</style>