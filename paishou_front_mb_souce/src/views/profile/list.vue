<template lang="pug">
//- 個人資料
.profile.pb-8
	//- 導航欄
	nav-bar(title='个人资料', icon='/publicAssets/img/profile/icon-user@3x.png', right-button='/publicAssets/img/icon-close-red@3x.png', @click-right='onClickRight')

	//- 下拉刷新
	van-pull-refresh(:model-value='isLoading', @refresh='onRefresh')
		//- 頭像
		.flex.flex-row.bg-white.p-4
			//- 頭像圖示
			img.w-20.h-20.object-cover.rounded-full(:src='avatar', @error='onAvatarImgError')

			//- 頭像上傳
			van-uploader.w-20.h-20.ml-4(:after-read='afterReadAvatar')
				img(src='/publicAssets/img/profile/icon-camera@3x.png')
				.uploading.rounded-full(v-if='state.isUploading')
					van-loading(color='#ffffff')
					.text-white.text-base.mt-1 上传中...

		//- 基本資料標題
		.text-lg.text-psV3Red.font-bold.p-4 基本资料

		//- 暱稱
		profile-button(title='昵称', :value='userName', placeholder='未绑定', @click='onClickUserName')

		//- 性别
		.mt-2
			profile-button(title='性别', :value='sex', placeholder='未绑定', @click='onClickSex')

		//- 生日
		.mt-2
			profile-button(title='生日', :value='birthday', placeholder='未绑定', @click='onClickBirthday')

		//- 簽名
		.mt-2
			profile-button(title='签名', :value='signature', placeholder='填写个人签名，获得更多关注哦', @click='onClickSignature')

		//- 帳號管理標題
		.text-lg.text-psV3Red.font-bold.p-4 帐号管理

		//- 綁定郵箱
		profile-button(title='绑定邮箱', :value='email', placeholder='未绑定', @click='onClickEmail')

		//- 綁定手機
		.mt-2
			profile-button(title='绑定手机', :value='mobile', placeholder='未绑定', @click='onClickMobile')

		//- 修改密碼
		.mt-2
			profile-button(title='修改密码', @click='onClickPassword')

	//- 修改性別彈窗
	sex-popup(v-model:show='state.isSexModifying')

	//- 驗證彈窗
	verify-popup(v-model:show='state.isVerifying', @verify-success='onVerifySuccess', @verify-failed='onVerifyFailed')

	//- 驗證成功彈窗
	verify-success-popup(v-model:show='state.isVerifySuccess')

	//- 驗證失敗彈窗
	verify-failed-popup(v-model:show='state.isVerifyFailed', @retry='onClickVerifyRetry')
</template>
<script>
import { reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { Toast } from 'vant';
import { editinfo, uploadFile } from '@/api';
import { matomo_profile_edit_phone, matomo_profile_edit_email, matomo_profile_edit_password, matomo_profile_edit_avater } from '@/matomoTrackEvent.js';
import navBar from '@/components/navBar';
import profileButton from '@/components/profile/profileButton.vue';
import sexPopup from '@/components/profile/sexPopup.vue';
import verifyPopup from '@/components/profile/verifyPopup.vue';
import verifySuccessPopup from '@/components/profile/verifySuccessPopup.vue';
import verifyFailedPopup from '@/components/profile/verifyFailedPopup.vue';
import dayjs from 'dayjs';

export default {
	components: {
		navBar,
		profileButton,
		sexPopup,
		verifyPopup,
		verifySuccessPopup,
		verifyFailedPopup,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			isUploading: false,
			isSexModifying: false,
			isVerifying: false,
			isVerifySuccess: false,
			isVerifyFailed: false,
		});

		// 是否正在取得個人資料
		const isLoading = computed(() => store.state?.user?.isGettingUserInfo === true);

		// 使用者資訊
		const userInfo = computed(() => store.state?.user?.userInfo);

		// User id
		const uid = computed(() => store.state?.user?.uid || '');

		// 頭像圖片網址
		const avatar = computed(() => {
			return userInfo?.value?.avatar;
		});

		// 暱稱
		const userName = computed(() => {
			return userInfo?.value?.user_nicename;
		});

		// 性別
		const sex = computed(() => {
			if (userInfo?.value?.sex === '0') {
				return '保密';
			} else if (userInfo?.value?.sex === '1') {
				return '男';
			} else if (userInfo?.value?.sex === '2') {
				return '女';
			} else {
				return '';
			}
		});

		// 生日
		const birthday = computed(() => {
			return userInfo?.value?.birthday;
		});

		// 簽名
		const signature = computed(() => {
			return userInfo?.value?.signature;
		});

		// 電子信箱
		const email = computed(() => {
			return userInfo?.value?.user_email;
		});

		// 手機號碼
		const mobile = computed(() => {
			return userInfo?.value?.mobile;
		});

		// 取得個人資訊
		const getUserInfo = () => {
			if (!store.state?.user?.isGettingUserInfo) {
				store.dispatch('user/GET_USER_INFO', {});
			}
		};

		// 下拉刷新
		const onRefresh = () => {
			getUserInfo();
		};

		// 點擊導覽欄返回按鈕
		const onClickRight = () => {
			router.go(-1);
		};

		// 頭像圖片讀取失敗
		const onAvatarImgError = (event) => {
			state.isAnchorLevelThumbError = true;
			event.target.src = '/publicAssets/img/default-avatar@3x.png';
		};

		// Data url to blob
		const dataURLToBlob = function (dataURL) {
			var BASE64_MARKER = ';base64,';
			if (dataURL.indexOf(BASE64_MARKER) == -1) {
				var parts = dataURL.split(',');
				var contentType = parts[0].split(':')[1];
				var raw = parts[1];

				return new Blob([raw], { type: contentType });
			}

			var parts = dataURL.split(BASE64_MARKER);
			var contentType = parts[0].split(':')[1];
			var raw = window.atob(parts[1]);
			var rawLength = raw.length;

			var uInt8Array = new Uint8Array(rawLength);

			for (var i = 0; i < rawLength; ++i) {
				uInt8Array[i] = raw.charCodeAt(i);
			}

			return new Blob([uInt8Array], { type: contentType });
		};

		// 選擇頭像檔案
		const afterReadAvatar = (data) => {
			// Update uploading state
			state.isUploading = true;

			// Data file
			const file = data.file;

			// Canvas
			const canvas = document.createElement('canvas');

			// Image
			const maxSize = 256;
			const image = new Image();
			image.onload = () => {
				var width = image.width;
				var height = image.height;
				if (width > height && width > maxSize) {
					height *= maxSize / width;
					width = maxSize;
				} else if (height > maxSize) {
					width *= maxSize / height;
					height = maxSize;
				}

				canvas.width = width;
				canvas.height = height;
				canvas.getContext('2d').drawImage(image, 0, 0, width, height);

				const dataUrl = canvas.toDataURL('image/png');
				const blob = dataURLToBlob(dataUrl);
				console.log(`data size = ${blob.size}`)
				const formData = new FormData();
				formData.append('file_name', blob, dayjs().format('YYYYMMDDhhmmssSSS.png'));

				uploadFile(formData).then(
					(res) => {
						// Validate upload file response code and data
						if (res.code === 0 && res.data && res.data.avatar) {
							// Retrieve new avatar url
							const newAvatar = res.data.avatar;

							// Edit info
							editinfo({
								uid: Number(uid.value),
								avatar: newAvatar,
							}).then(
								(res) => {
									// Validate edit info response code
									if (res.code === 0) {
										store.commit('user/EDIT_INFO', { avatar: newAvatar });
										Toast('头像修改成功');
									}

									// Revert uploading state on finished
									state.isUploading = false;
								},
								() => {
									// Revert uploading state on edit info failed
									state.isUploading = false;
								}
							);
						} else {
							// Revert uploading state on upload file response error
							state.isUploading = false;
						}
					},
					() => {
						// Revert uploading state on upload file failed
						state.isUploading = false;
					}
				);
			};
			image.onerror = (e) => {
				console.log(e);
				state.isUploading = false;
			};

			// File render
			const reader = new FileReader();
			reader.onload = function (e) {
				image.src = e.target.result;
			};
			reader.onerror = (e) => {
				console.log(e);
				state.isUploading = false;
			};
			reader.readAsDataURL(file);

			// Matomo track
			matomo_profile_edit_avater();
		};

		// 點擊暱稱按鈕
		const onClickUserName = () => {
			router.push('/profile/username');
		};

		// 點擊性別按鈕
		const onClickSex = () => {
			state.isSexModifying = true;
		};

		// 點擊生日按鈕
		const onClickBirthday = () => {
			router.push('/profile/birthday');
		};

		// 點擊簽名按鈕
		const onClickSignature = () => {
			router.push('/profile/signature');
		};

		// 點擊綁定信箱按鈕
		const onClickEmail = () => {
			if (email.value && email.value.length > 0) {
				router.push('/profile/email/check');
			} else {
				router.push('/profile/email/submit');
			}
			matomo_profile_edit_email();
		};

		// 點擊綁定手機按鈕
		const onClickMobile = () => {
			state.isVerifying = true;
			matomo_profile_edit_phone();
		};

		// 點擊修改密碼按鈕
		const onClickPassword = () => {
			router.push('/profile/password');
			matomo_profile_edit_password();
		};

		// 驗證成功
		const onVerifySuccess = () => {
			state.isVerifySuccess = true;
			setTimeout(() => {
				state.isVerifySuccess = false;
				if (mobile.value && mobile.value.length > 0) {
					router.push('/profile/mobile/check');
				} else {
					router.push('/profile/mobile/submit');
				}
			}, 2000);
		};

		// 驗證失敗
		const onVerifyFailed = () => {
			state.isVerifyFailed = true;
		};

		// 點擊驗證失敗彈窗 再次驗證按鈕
		const onClickVerifyRetry = () => {
			state.isVerifying = true;
		};

		// On component mounted
		onMounted(() => {
			getUserInfo();
		});
		return {
			state,
			isLoading,
			avatar,
			userName,
			sex,
			birthday,
			signature,
			email,
			mobile,
			onRefresh,
			onClickRight,
			onAvatarImgError,
			afterReadAvatar,
			onClickUserName,
			onClickSex,
			onClickBirthday,
			onClickSignature,
			onClickEmail,
			onClickMobile,
			onClickPassword,
			onVerifySuccess,
			onVerifyFailed,
			onClickVerifyRetry,
		};
	},
};
</script>
<style lang="scss" scoped>
.profile {
	width: 100%;
	.uploading {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: black;
		opacity: 0.7;
		display: flex;
		text-align: center;
		justify-content: center;
		align-content: center;
		flex-direction: column;
	}
}
</style>