<template lang="pug">
//- 更改暱稱
.username
	//- 導航欄
	nav-bar(title='昵称', left-button='/publicAssets/img/icon-left-red@3x.png', @click-left='clickLeft')

	//- 表單
	van-form.mx-4.mt-6(@submit='submit')
		//- 暱稱輸入框
		input-field.mt-1(v-model='niceNameForm.nicename', label='编辑昵称', name='nicename', placeholder='请输入您的昵称(限制16字元)', :rules='[ { required: true, message: "请输入昵称" }, { validator: checkUserName, message: "限8個字(16個字元)" }, ]')

		//- 儲存按鈕
		submit-button.mt-12(:loading='state.editNameLoading', native-type='submit', text='确认保存')

	//- 備註
	.desc.text-sm.text-center.mx-4.mt-8 首次修改免费，后续每次修改需支付 100,000 蕉币
</template>
<script>
import { reactive, computed, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { editNicename } from '@/api';
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
			editNameLoading: false,
		});

		// Nice name form
		const niceNameForm = reactive({
			nicename: store.state?.user?.userInfo?.user_nicename,
		});

		// User id
		const uid = computed(() => store.state.user.uid || '');

		// 檢查暱稱欄位
		const checkUserName = () => /^.{1,16}$/.test(niceNameForm.nicename);

		// 點擊導覽欄返回按鈕
		const clickLeft = () => {
			router.go(-1);
		};

		// 送出表單
		const submit = () => {
			// Update loading state
			state.editNameLoading = true;

			// Post body
			const body = {
				uid: Number(uid.value),
				...toRaw(niceNameForm),
			};

			// Edit nice name
			editNicename(body)
				.then((res) => {
					// Validate response code
					if (res.code === 0) {
						// Dispatch update action
						store.dispatch('user/GET_USER_INFO');

						// Toast success message
						Toast('昵称修改成功');

						// Navigation back
						router.go(-1);
					}

					// Revert loading state on finished
					state.editNameLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.editNameLoading = false;
				});
		};
		return {
			state,
			niceNameForm,
			clickLeft,
			checkUserName,
			submit,
		};
	},
};
</script>
<style lang="scss" scoped>
.username {
	width: 100%;
	::v-deep(.van-cell) {
		padding: 0;
	}
	.desc {
		color: #afafaf;
	}
}
</style>