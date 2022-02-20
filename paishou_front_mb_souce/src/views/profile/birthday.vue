<template lang="pug">
//- 更改生日
.birthday.pb-6
	//- 導覽欄
	nav-bar(title='生日', left-button='/publicAssets/img/icon-left-red@3x.png', @click-left='clickLeft')

	//- 表單
	van-form.mx-4.mt-6
		//- 生日按鈕
		input-field.mt-1(:model-value='birthdayFormatted', label='编辑生日', @click='clickBirthday')

		//- 儲存按鈕
		submit-button.mt-12(:loading='state.isLoading', text='确认保存', @click='clickSubmit')

	//- 修改生日彈窗
	birthday-popup(v-model:show='state.isShowBirthdayPopup', v-model:selected='state.birthday')
</template>
<script>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { editinfo } from '@/api';
import navBar from '@/components/navBar';
import inputField from '@/components/inputField';
import submitButton from '@/components/submitButton';
import birthdayPopup from '@/components/profile/birthdayPopup.vue';
import dayjs from 'dayjs';

export default {
	components: {
		navBar,
		inputField,
		submitButton,
		birthdayPopup,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// 儲存的生日
		const birthdayStored = store.state?.user?.userInfo?.birthday;

		// Component state
		const state = reactive({
			isLoading: false,
			isShowBirthdayPopup: false,
			birthday: birthdayStored ? dayjs(birthdayStored).toDate() : dayjs().add(-20, 'y').toDate(),
		});

		// User id
		const uid = computed(() => store.state.user.uid || '');

		// 格式化的生日
		const birthdayFormatted = computed(() => dayjs(state.birthday).format('YYYY/MM/DD'));

		// 點擊導覽欄返回按鈕
		const clickLeft = () => {
			router.go(-1);
		};

		// 點擊生日按鈕
		const clickBirthday = () => {
			state.isShowBirthdayPopup = true;
		};

		// 點擊確認按鈕
		const clickSubmit = () => {
			// Update loading state
			state.isLoading = true;

			// Post body
			const body = {
				uid: Number(uid.value),
				birthday: dayjs(state.birthday).format('YYYY-MM-DD'),
			};

			// Edit info
			editinfo(body)
				.then((res) => {
					// Validate response code
					if (res.code === 0) {
						// Dispatch update action
						store.dispatch('user/GET_USER_INFO');

						// Toast success message
						Toast('生日修改成功');

						// Back previous page
						router.go(-1);
					}

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.isLoading = false;
				});
		};
		return {
			state,
			birthdayFormatted,
			clickLeft,
			clickBirthday,
			clickSubmit,
		};
	},
};
</script>
<style lang="scss" scoped>
.birthday {
	width: 100%;
	::v-deep(.van-cell) {
		padding: 0;
	}
}
</style>