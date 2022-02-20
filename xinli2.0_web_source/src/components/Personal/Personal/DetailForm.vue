<template lang="pug">
.FLEX_C.mt-8
	.infomation
		.BETWEEN  
			.Body_4 {{t('personal_profile_subtitle_2')}}
			.Caption_2.cursor-pointer(v-if='editMode===false' @click='toggleEditMode') 
				SvgIcon.w-5.h-5.text-xBlue(:name='"#Edit"')
				span {{t('nav_edit')}}
		.grid.grid-cols-2.gap-4.py-4(v-if='editMode===false')
			.col-span-2.py-4
				.Body_4 {{t('personal_profile_address')}}
				.Subtitle_3 {{province}} {{city}} {{state}} {{street}} {{userStore.userInfo.address || t('personal_profile_input_notyet')}}
				
			.col-span-1.py-4
				.Body_4 {{t('Personal_detail_wechatID')}}
				.Subtitle_3 {{userStore.userInfo.wechatID || t('personal_profile_input_notyet')}}
			.col-span-1.py-4
				.Body_4 {{t('Personal_detail_qqID')}}
				.Subtitle_3  {{userStore.userInfo.qqID || t('personal_profile_input_notyet')}}
			.col-span-1.py-4
				.Body_4 {{t('personal_profile_birthday')}}
				.Subtitle_3 {{ userStore.userInfo.birthday? dayjs(userStore?.userInfo?.birthday).format('YYYY-MM-DD') : t('personal_profile_input_notyet')}}
			.col-span-1.py-4
				.Body_4 {{t('personal_profile_gender')}}
				.Subtitle_3 {{genderComputed || t('personal_profile_input_notyet')}}

		.editFromDiv(v-if='editMode===true')

			a-form.w-full(layout='vertical')
				.grid.grid-cols-2.gap-4.py-4
					.col-span-2
						a-form-item(name='address' :label='t("Personal_detail_address")')
							.grid.grid-cols-3.gap-4
								.col-span-1.py-4  
									a-select.w-full.border-none.bg-gray-100(v-model:value="editForm.provinceID" size='large' @change='setProvinces' )
										a-select-option(value='') {{t('Personal_detail_address_provinces_Placeholder')}}
										a-select-option(v-for='item in ProvincesList' :value='item?.id') {{item?.name}}
								.col-span-1.py-4
									a-select.w-full.border-none.bg-gray-100(v-model:value="editForm.cityID" size='large' @change='setCity')
										a-select-option(value='') {{t('Personal_detail_address_city_Placeholder')}}
										a-select-option(v-for='item in CitiesList' :value='item?.id') {{item?.name}}
								.col-span-1.py-4
									a-select.w-full.border-none.bg-gray-100(v-model:value="editForm.stateID" size='large' @change='setState')
										a-select-option(value='') {{t('Personal_detail_address_state_Placeholder')}}
										a-select-option(v-for='item in StateList' :value='item?.id') {{item?.name}}
								.col-span-1.py-4
									a-select.w-full.border-none.bg-gray-100(v-model:value="editForm.streetID" size='large' @change='setStreet')
										a-select-option(value='') {{t('Personal_detail_address_street_Placeholder')}}
										a-select-option(v-for='item in StreetList' :value='item?.id') {{item?.name}}
								.col-span-2.py-4
									a-input.border-none.bg-gray-100.w-full(v-model:value='editForm.address', size='large'  :placeholder='t("Personal_detail_address_Placeholder")')
					.col-span-1
						a-form-item(name='wechatID' :label='t("Personal_detail_wechatID")')
							a-input.border-none.bg-gray-100.w-full(v-model:value='editForm.wechatID', size='large'  :placeholder='t("Personal_detail_wechatID_Placeholder")')
					.col-span-1
						a-form-item(name='qqID' :label='t("Personal_detail_qqID")')
							a-input.border-none.bg-gray-100.w-full(v-model:value='editForm.qqID', size='large' :placeholder='t("Personal_detail_qqID_Placeholder")')
					.col-span-1
						a-form-item
							p.my-2(slot='label')
								span.mr-2 {{t('personal_profile_birthday')}}
								a-tooltip(placement="right")
									template(#title)
										.text-white {{t('Personal_detail_birthday_tooltip_line_1')}}
										.text-white {{t('Personal_detail_birthday_tooltip_line_2')}}
									SvgIcon.w-4.h-4.text-primary(:name='"#Info"')
							a-date-picker.border-none.bg-gray-100.w-full(v-model:value="editForm.birthday" size='large' :defaultPickerValue='"1990-07-01"' format='YYYY-MM-DD' :placeholder='t("Personal_detail_birthday_Placeholder")')
					.col-span-1
						a-form-item(name='gender' :label='t("personal_profile_gender")')
							a-radio-group(v-model:value="editForm.gender")
								a-radio(:value="1") {{t('Personal_detail_gender_male')}}
								a-radio(:value="2") {{t('Personal_detail_gender_female')}}

					.col-span-2.text-right
						a-button.w-56.h-11.rounded-lg.mx-2(@click='toggleEditMode') {{t('Personal_detail_cancelButton')}}
						a-button.w-56.h-11.rounded-lg.text-white.mx-2(type='primary'  @click='onSubmit') {{t('Personal_detail_submitButton')}}

</template>

<script setup lang="ts">
	import { onMounted, reactive, ref, computed } from 'vue';
	import { UserStore } from '@/store/userStore';
	import { putMemberDetail, getMemberRegionProvinces, getMemberRegionCities, getMemberRegionState, getMemberRegionStreet } from '@/api';
	import { notification } from 'ant-design-vue';
	import { useI18n } from 'vue-i18n';
	import moment from 'moment';
	import dayjs from 'dayjs';
	import SvgIcon from '@/components/SvgIcon/index.vue';

	const { t } = useI18n();
	const emit = defineEmits(['success']);
	const userStore = UserStore();

	const editMode = ref(false);

	const province = ref('');
	const city = ref('');
	const state = ref('');
	const street = ref('');
	const fullAddress = ref('');

	const ProvincesList = ref([] as any[]);
	const CitiesList = ref([] as any[]);
	const StateList = ref([] as any[]);
	const StreetList = ref([] as any[]);
	const toggleEditMode = () => {
		userStore.userInfo.provinceID && setProvinces(userStore.userInfo.provinceID);
		userStore.userInfo.cityID && setCity(userStore.userInfo.cityID);
		userStore.userInfo.stateID && setState(userStore.userInfo.stateID);
		// setState(userStore.userInfo.provinceID )

		editMode.value = !editMode.value;

		editForm.provinceID = userStore.userInfo.provinceID;
		editForm.cityID = userStore.userInfo.cityID;
		editForm.stateID = userStore.userInfo.stateID;
		editForm.streetID = userStore.userInfo.streetID;
		editForm.address = userStore.userInfo.address || '';
		editForm.qqID = userStore.userInfo.qqID || '';
		editForm.wechatID = userStore.userInfo.wechatID || '';
		editForm.gender = userStore.userInfo.gender || 1;
		editForm.birthday = userStore.userInfo.birthday ? dayjs(userStore?.userInfo?.birthday).format('YYYY-MM-DD') : '';
	};

	const genderComputed = computed(() => {
		let str = '';
		if (userStore.userInfo.gender === 0) {
			str = t('personal_profile_input_notyet');
		} else if (userStore.userInfo.gender === 1) {
			str = t('Personal_detail_gender_male');
		} else if (userStore.userInfo.gender === 2) {
			str = t('Personal_detail_gender_female');
		}
		return str;
	});
	interface iEditForm {
		provinceID: number | undefined;
		cityID: number | undefined;
		stateID: number | undefined;
		streetID: number | undefined;
		address: string;
		qqID: string;
		wechatID: string;
		gender: number;
		birthday: string;
	}
	const editForm = reactive<iEditForm>({
		provinceID: 0,
		cityID: 0,
		stateID: 0,
		streetID: 0,
		address: '',
		qqID: '',
		wechatID: '',
		gender: 1,
		birthday: '',
	});

	const onSubmit = async () => {
		// const birthday = editForm.birthday ? editForm.birthday : '';
		const payload = {
			qqID: editForm.qqID,
			wechatID: editForm.wechatID,
			gender: editForm.gender,
			provinceID: Number(editForm.provinceID),
			cityID: Number(editForm.cityID),
			stateID: Number(editForm.stateID),
			streetID: Number(editForm.streetID),
			address: editForm.address,
			birthday: editForm.birthday ? dayjs(editForm.birthday).format('YYYY-MM-DD') : '',
		};
		const res = await putMemberDetail(payload);
		if (res.data.status === 'ok') {
			notification.success({
				message: t('Personal_detail_submit_success'),
			});
			editMode.value = false;

			userStore.checkUserInfo();
			getAddress();
		} else {
			notification.error({
				message: res?.data?.msg || '',
			});
		}
	};

	const setProvinces = async (val: number | undefined) => {
		editForm.cityID = undefined;
		editForm.stateID = undefined;
		editForm.streetID = undefined;
		CitiesList.value = [];
		StateList.value = [];
		StreetList.value = [];
		const res = await getMemberRegionCities({ upid: val });
		CitiesList.value = res?.data?.data?.list || [];
	};

	const setCity = async (val: number | undefined) => {
		const res = await getMemberRegionState({ upid: val });
		StateList.value = res?.data?.data?.list || [];
	};

	const setState = async (val: number | undefined) => {
		const res = await getMemberRegionStreet({ upid: val });
		StreetList.value = res?.data?.data?.list || [];
	};
	const setStreet = async (val: number | undefined) => {
		//
	};
	const init = async () => {
		const res = await getMemberRegionProvinces();
		ProvincesList.value = res?.data?.data?.list || [];

		const provinceRes = await getMemberRegionProvinces();
		province.value =
			provinceRes?.data?.data?.list?.find((element) => {
				return element.id == userStore.userInfo.provinceID;
			})?.name || '';
	};
	const getAddress = async () => {
		const provinceRes = await getMemberRegionProvinces();

		if (!userStore.userInfo.address || !userStore.userInfo.provinceID) fullAddress.value = t('personal_profile_input_notyet');

		if (userStore.userInfo.provinceID) {
			province.value =
				provinceRes?.data?.data?.list?.find((element) => {
					return element.id == userStore.userInfo.provinceID;
				})?.name || '';

			const cityRes = await getMemberRegionCities({ upid: userStore.userInfo.provinceID });
			city.value =
				cityRes?.data?.data?.list?.find((element) => {
					return element.id == userStore.userInfo.cityID;
				})?.name || '';

			const stateRes = await getMemberRegionState({ upid: userStore.userInfo.cityID });
			state.value =
				stateRes?.data?.data?.list?.find((element) => {
					return element.id == userStore.userInfo.stateID;
				})?.name || '';

			const streetRes = await getMemberRegionStreet({ upid: userStore.userInfo.stateID });
			street.value =
				streetRes?.data?.data?.list?.find((element) => {
					return element.id == userStore.userInfo.streetID;
				})?.name || '';
		}
	};
	onMounted(() => {
		init();
		getAddress();
	});
</script>
<style lang="scss" scoped>
	::v-deep(.ant-input-affix-wrapper > input.ant-input) {
		background-color: rgb(243 244 246 / var(--tw-bg-opacity));
	}
	::v-deep(.ant-calendar-picker-input) {
		border: none;
		background-color: rgb(243 244 246 / var(--tw-bg-opacity));
	}
	::v-deep(.ant-select > .ant-select-selector) {
		border: none;
		background-color: rgb(243 244 246 / var(--tw-bg-opacity));
	}
</style>
