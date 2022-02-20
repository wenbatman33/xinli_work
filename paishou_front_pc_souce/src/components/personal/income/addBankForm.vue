<template lang="pug">
.w-full.FLEX_R
	.registerDepiction.relative.pt-32(class='w-1/2', style='min-height: 580px; background-image: linear-gradient(to top, #a62337, #d10828);')
		h2.text-white.text-center 绑定银行卡
		h2.text-white.text-center 提领您的直播收益
		.text-center.mt-4
			button.w-40.rounded-full.border.border-white.text-white.py-2 规则
		.text-sm.text-white.text-center.mt-2 - 实际详情请详阅拍手礼物提现说明 -
		.monkey.w-full.text-center.absolute(style='bottom:-100px;')
			img(src='/publicAssets/img/v3/card.png', srcset='/publicAssets/img/v3/card@2x.png 2x')
	.registerForm.pt-16.px-12(class='w-1/2')
		h3.text-psV3Red.mb-8 绑定银行卡
		a-form(:model='addBankCardForm',:rules='addBankCardFormRules', layout='vertical', @submit='addBnakSubmit')
			.grid.grid-cols-2.gap-4
				.col-span-1
					a-form-item.m-0(label='户名', name='real_name')
						a-input(v-model:value='addBankCardForm.real_name', :disabled='REAL_NAME!==""',  placeholder='请输入户名')
				.col-span-1
					a-form-item.m-0(label='开户银行', name='bank_name')
						a-input(v-model:value='addBankCardForm.bank_name',  placeholder='请输入开户银行')
				.col-span-1
					a-form-item.m-0(label='收款人身分证', name='cer_no')
						a-input(v-model:value='addBankCardForm.cer_no', :disabled='CER_NO!==""',  placeholder='请输入收款人身分证')
				.col-span-1
					a-form-item.m-0(label='卡号', name='bank_no')
						a-input(v-model:value='addBankCardForm.bank_no', placeholder='请输入卡号')
				.col-span-2
					a-form-item.m-0(label='验证码', name='code')
						.BETWEEN
							.flex.flex-grow.mr-2
								a-input(placeholder='请输入验证码', v-model:value='addBankCardForm.code')
							a-button(type='primary', :loading='state.codeState.smsSendBtn', @click='getUserBankSms') {{ (!state.codeState.smsSendBtn && '获取验证码') || state.codeState.time + ' s' }}
			.des.text-xs.text-red-500.my-2 为了您的财产安全，户名、身分证末认为您实名认证的信息，如资料修改，请联系客服
			.text-center.mt-12
				a-button.w-75(type='primary', block, :loading='state.loadingSms', size='large', html-type='submit') 确认添加
</template>
<script>
import { useStore } from 'vuex';
import { computed, onMounted, reactive, toRaw } from 'vue';
import { userBankBind, userBankSms } from '@/api';
import { useForm } from '@ant-design-vue/use';
import { message } from 'ant-design-vue';

export default {
	props: ['bank_no', 'bank_name'],
	setup(props, { emit }) {
		const store = useStore();
		const userInfo = computed(() => store.state.user.userInfo);
		const REAL_NAME = computed(() => store.state.user.userInfo.real_name);
		const CER_NO = computed(() => store.state.user.userInfo.cer_no);
		const state = reactive({
			real_nameDisabled: false,
			cer_noDisabled: false,
			codeState: {
				time: 60,
				smsSendBtn: false,
			},
			loadingSms: false,
		});
		const addBankCardForm = reactive({
			real_name: '',
			bank_name: '',
			cer_no: '',
			bank_no: '',
			code: '',
		});
		const addBankCardFormRules = reactive({
			real_name: [{ required: true, message: '请输入户名', trigger: ['change', 'blur'] }],
			bank_name: [{ required: true, message: '请输入开户银行', trigger: ['change', 'blur'] }],
			cer_no: [{ required: true, message: '请输入收款人身分证', trigger: ['change', 'blur'] }],
			bank_no: [{ required: true, message: '请输入卡号', trigger: ['change', 'blur'] }],
			code: [{ required: true, message: '验证码', trigger: ['change', 'blur'] }],
		});
		const getUserBankSms = () => {
			userBankSms()
				.then((res) => {
					if (res.code === 0) {
						state.codeState.smsSendBtn = true;
						const interval = window.setInterval(() => {
							if (state.codeState.time-- <= 0) {
								state.codeState.time = 60;
								state.codeState.smsSendBtn = false;
								window.clearInterval(interval);
							}
						}, 1000);
					} else {
						message.error(res.message);
					}
				})
				.catch((err) => {
					state.codeState.time = 60;
					state.codeState.smsSendBtn = false;
				});
		};
		const { validate, validateInfos } = useForm(addBankCardForm, addBankCardFormRules);

		const addBnakSubmit = (e) => {
			e.preventDefault();
			validate().then(() => {
				const data = toRaw(addBankCardForm);
				let payload = new FormData();
				for (let i in data) {
					payload.append(i, data[i]);
				}

				userBankBind(payload).then((res) => {
					message.success('绑定成功');
					state.codeState.smsSendBtn = false;
					state.addBankCardForm.code = '';
					emit('add-bank-scussecs');
				});
			});
		};
		onMounted(() => {
			REAL_NAME.value ? (addBankCardForm.real_name = REAL_NAME.value) : (state.real_nameDisabled = true);
			CER_NO.value ? (addBankCardForm.cer_no = CER_NO.value) : (state.cer_noDisabled = true);
			props.bank_name ? (addBankCardForm.bank_name = props.bank_name) : (addBankCardForm.bank_name = '');
			state.codeState.time = 60;
			state.codeState.smsSendBtn = false;
		});
		return {
			store,
			userInfo,
			REAL_NAME,
			CER_NO,
			state,
			addBankCardForm,
			addBankCardFormRules,
			getUserBankSms,
			addBnakSubmit,
			validateInfos,
		};
	},
};
</script>

<style lang="scss" scoped></style>
