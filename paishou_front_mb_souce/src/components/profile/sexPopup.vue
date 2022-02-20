<template lang="pug">
//- 性別選擇彈窗
van-popup(round, position='bottom', teleport='.popupTeleport', :show='show', @update:show='updateShow')
	.sex-popup.px-6.pt-6.pb-10
		//- 標題
		.header.text-base.font-bold 请选择性别

		//- 選項
		.grid.grid-cols-2.gap-4.mt-8
			//- 男性
			van-button.sex-button.rounded-md.shadow(:class='{ selected: sex === "1" }', :loading='state.isLoading', @click='clickMale')
				.w-full.flex.flex-row.items-center.px-4.py-2
					img.w-6.h-6(src='/publicAssets/img/profile/icon-male@3x.png')
					.text-base.font-bold.ml-2 男性
				template(#loading)
					.w-full.flex.flex-row.items-center.px-4.py-2
						van-loading.w-6.h-6(type='spinner')
						.text-base.font-bold.ml-2 男性
			//- 女性
			van-button.sex-button.rounded-md.shadow(:class='{ selected: sex === "2" }', :loading='state.isLoading', @click='clickFemale')
				.w-full.flex.flex-row.items-center.px-4.py-2
					img.w-6.h-6(src='/publicAssets/img/profile/icon-female@3x.png')
					.text-base.font-bold.ml-2 女性
				template(#loading)
					.w-full.flex.flex-row.items-center.px-4.py-2
						van-loading.w-6.h-6(type='spinner')
						.text-base.font-bold.ml-2 女性
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { Toast } from 'vant';
import { editinfo } from '@/api';

export default {
	props: ['show'],
	emits: ['update:show'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			isLoading: false,
		});

		// User id
		const uid = computed(() => store.state.user.uid || '');

		// Sex
		const sex = computed(() => store.state?.user?.userInfo?.sex);

		// 更改使用者性別
		const editSex = (sex) => {
			// Update loading state
			state.isLoading = true;

			// Post body payload
			const payload = {
				uid: Number(uid.value),
				sex: sex,
			};

			// Eidt info
			editinfo(payload)
				.then((res) => {
					// Validate response code
					if (res.code === 0) {
						// Dispatch update action
						store.dispatch('user/GET_USER_INFO');

						// Toast success message
						Toast('性别修改成功');

						// Dismiss popup
						emit('update:show', false);
					}

					// Revert loading state on finished
					state.isLoading = false;
				})
				.catch(() => {
					// Revert loading state on error
					state.isLoading = false;
				});
		};

		// 更新彈窗顯示狀態
		const updateShow = (value) => {
			emit('update:show', value);
		};

		// 點擊男性按鈕
		const clickMale = () => {
			editSex(1);
		};

		// 點擊女性按鈕
		const clickFemale = () => {
			editSex(2);
		};
		return {
			state,
			sex,
			updateShow,
			clickMale,
			clickFemale,
		};
	},
};
</script>
<style lang="scss" scoped>
.sex-popup {
	width: 100%;
	.header {
		color: #a62337;
	}
	.sex-button {
		width: 100%;
		height: unset;
		padding: 0;
		color: #a62337;
		border-color: transparent;
		background-color: transparent;
		::v-deep(.van-button__text) {
			width: 100%;
			text-align: start;
		}
		::v-deep(.van-loading) {
			color: #a62337;
		}
		img {
			filter: invert(19%) sepia(21%) saturate(7495%) hue-rotate(331deg) brightness(95%) contrast(94%);
		}
		&.selected {
			color: #ffffff;
			background-color: #f2994a;
			img {
				filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(183deg) brightness(103%) contrast(100%);
			}
			::v-deep(.van-loading) {
				color: #ffffff;
			}
		}
	}
}
</style>