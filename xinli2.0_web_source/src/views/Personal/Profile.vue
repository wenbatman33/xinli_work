<template lang="pug">
.contentContainer
	.pageTitle.FLEX_R
		.icon.mr-4
			.bg-xBlue.rounded-full.w-8.h-8.CENTER
				SvgIcon.w-5.h-5.text-white(:name='"#User_Info"')

		.title
			h5 {{t('personal_profile_title')}}
	
	.pageContent.my-4
		.Body_4 {{t('personal_profile_subtitle_1')}}
		.menuLink.h-14(:class='"h-[90px]"')
			.BETWEEN_CENTER.h-full.border-b.px-4
				.FLEX_R
					.icon.mr-4
						.bg-gray-100.rounded-full.w-8.h-8.CENTER
							SvgIcon.w-5.h-5.text-primary(:name='"#Setting"')

					.title
						.Body_4 {{t('personal_profile_account')}}
						.Subtitle_3 {{userStore.userInfo.account}}

		.menuLink.h-14(:class='"h-[90px]"')
			.BETWEEN_CENTER.h-full.border-b.px-4
				.FLEX_R
					.icon.mr-4
						.bg-gray-100.rounded-full.w-8.h-8.CENTER
							SvgIcon.w-5.h-5.text-primary(:name='"#User_Info"')

					.title
						.Body_4 {{t('personal_profile_name')}} 
							a-tooltip(placement="right")
								template(#title)
									.text-white {{t('personal_profile_name_tip_1')}}
								SvgIcon.w-4.h-4.text-primary(:name='"#Info"')
						.Subtitle_3 {{ userStore.userInfo.name || t('personal_profile_input_notyet') }} 

				.Body_4.text-center(v-if='!userStore.userInfo.name') {{t('personal_profile_name_tip_2')}}

				a-button(v-if='userStore.userInfo.name===""' type='primary' danger @click='showNameModal') {{t('personal_profile_verify')}}

		.menuLink.h-14(:class='"h-[90px]"')
			.BETWEEN_CENTER.h-full.border-b.px-4
				.FLEX_R
					.icon.mr-4
						.bg-gray-100.rounded-full.w-8.h-8.CENTER
							SvgIcon.w-5.h-5.text-primary(:name='"#Mobile"')

					.title
						.Body_4 {{t('personal_profile_phone')}}
							span.text-xGreenLight.mx-2(v-if='userStore.userInfo.phoneCert==="1"') {{t('personal_profile_verified')}}
						.Subtitle_3 {{ userStore.userInfo.phone ||t('personal_profile_input_notyet')}} 

				.Body_4.text-center(v-if='!userStore.userInfo.phone')  {{t('personal_profile_phone_tip')}}

				a-button(v-if='userStore.userInfo.phoneCert!=="1"' type='primary' danger @click='showPhoneModal') {{userStore.userInfo.phoneCert==="1"? t('personal_profile_modify') :t('personal_profile_verify')}}

		.menuLink.h-14(:class='"h-[90px]"')
			.BETWEEN_CENTER.h-full.border-b.px-4
				.FLEX_R
					.icon.mr-4
						.bg-gray-100.rounded-full.w-8.h-8.CENTER
							SvgIcon.w-5.h-5.text-primary(:name='"#Mail"')
							
					.title
						.Body_4 {{t('personal_profile_mail')}}
							span.text-xGreenLight.mx-2(v-if='userStore.userInfo.emailCert==="1"') {{t('personal_profile_verified')}}
						.Subtitle_3 {{ userStore.userInfo.email ||t('personal_profile_input_notyet')}} 

				.Body_4.text-center(v-if='!userStore.userInfo.email') {{t('personal_profile_mail_tip')}}

				a-button(type='primary' danger @click='showEmailModal') {{userStore.userInfo.emailCert==="1"? t('personal_profile_modify') :t('personal_profile_verify')}}

		.menuLink.h-14(:class='"h-[90px]"')
			.BETWEEN_CENTER.h-full.border-b.px-4
				.FLEX_R
					.icon.mr-4
						.bg-gray-100.rounded-full.w-8.h-8.CENTER
							SvgIcon.w-5.h-5.text-primary(:name='"#Lock"')
							
					.title
						.Body_4 {{t('personal_profile_password')}}
						.Subtitle_3 ********

				.Body_4.text-center {{t('personal_profile_password_tip')}}

				a-button(type='primary' danger @click='showPasswordModal') {{t('personal_profile_modify')}}
		
		DetailForm



</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { SystemStore } from '@/store/systemStore';
	import { useI18n } from 'vue-i18n';
	import DetailForm from '@/components/Personal/Personal/DetailForm.vue';

	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	const userStore = UserStore();
	const systemStore = SystemStore();
	const showModal = ref(false);

	const editType = ref('');
	const showNameModal = () => {
		systemStore.editUserNameVisabled = true;
	};
	const showPhoneModal = () => {
		systemStore.editUserPhoneVisabled = true;
	};
	const showPasswordModal = () => {
		systemStore.editUserPasswordVisabled = true;
	};
	const showEmailModal = () => {
		systemStore.editUserEmailVisabled = true;
	};
</script>

<style scoped lang="scss"></style>
