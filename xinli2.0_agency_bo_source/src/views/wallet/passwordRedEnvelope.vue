<template>
	<div class="container pb-4 FLEX_C">
		<div class="grid p-4 m-5 mb-2 gap-x-0.5 rounded-md bg-[#191919]">
			<div class="grid grid-cols-1">
				<div class="col-span-1 CENTER_C">
					<span class="text-[#cda269]">{{ $t('wallet_passwordRedEnvelope_02') }}</span>
				</div>
				<div class="grid justify-center grid-flow-col p-3 gap-x-0.5 rounded-md bg-[#191919]">
					<input class="block" type="text" inputmode="numeric" maxlength="1" />
					<input class="block" type="text" inputmode="numeric" maxlength="1" />
					<input class="block" type="text" inputmode="numeric" maxlength="1" />
					<input class="block" type="text" inputmode="numeric" maxlength="1" />
					<input class="block" type="text" inputmode="numeric" maxlength="1" />
					<input class="block" type="text" inputmode="numeric" maxlength="1" />
					<input class="block" type="text" inputmode="numeric" maxlength="1" />
					<input class="block" type="text" inputmode="numeric" maxlength="1" />
				</div>

				<span class="m-1 text-xs text-white CENTER_C">{{ $t('wallet_passwordRedEnvelope_03') }}</span>
			</div>
		</div>

		<!-- <h6>VUE implements automatic jumping to the next input after entering the current input</h6>
            <h6>https://www.twblogs.net/a/5c680a24bd9eee01cc9e2138</h6> -->
		<div class="container flex justify-start p-8">
			<ul>
				<li class="mt-2 text-xs text-white">• {{ $t('wallet_passwordRedEnvelope_04') }}</li>

				<li class="mt-2 text-xs text-white"> • {{ $t('wallet_passwordRedEnvelope_05') }} </li>
			</ul>
		</div>
		<div class="container flex justify-center p-2">
			<ul class="divide-y-2 divide-[#474747] w-80 bg-[#191919] rounded-lg">
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_passwordRedEnvelope_06') }}</span>

					<span class="text-white"> 197,473.00 </span>
				</li>
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_passwordRedEnvelope_07') }}</span>

					<span class="text-white"> {{ $t('wallet_passwordRedEnvelope_01') }} </span>
				</li>
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_passwordRedEnvelope_08') }}</span>

					<span class="text-white"> {{ $t('wallet_passwordRedEnvelope_09') }} </span>
				</li>
			</ul>
		</div>
		<div class="container p-4 mt-8 FLEX_C loginBox">
			<van-button block round type="info" native-type="submit"> {{ $t('wallet_passwordRedEnvelope_10') }} </van-button>
			<van-button round plain class="mt-4 mb-6" block color="#C60000" @click="showCancel = true">
				{{ $t('wallet_passwordRedEnvelope_11') }}
			</van-button>
		</div>
		<van-popup v-model:show="showCancel" round class="bg-[#0F0F0F] w-80 shadow-xl">
			<div class="grid grid-cols-2">
				<div class="col-span-2 my-4 CENTER_C">{{ $t('wallet_passwordRedEnvelope_11') }}</div>
				<div class="col-span-2 mx-6 my-2 text-xs text-gray-400 CENTER_C">
					{{ $t('wallet_passwordRedEnvelope_12') }}
				</div>
				<div class="m-3 CENTER_C">
					<van-button round plain color="#CDA269" class="px-12">{{ $t('wallet_passwordRedEnvelope_13') }}</van-button>
				</div>
				<div class="m-3 CENTER_C">
					<van-button round color="#cda269" class="px-12" @click="onSucesss">{{ $t('wallet_passwordRedEnvelope_14') }}</van-button>
				</div>
			</div>
		</van-popup>
		<van-popup v-model:show="showIconSuccess" round class="bg-[#0F0F0F] w-80 shadow-xl">
			<div class="grid grid-cols-2">
				<div class="col-span-2 my-4 CENTER_C">{{ $t('wallet_passwordRedEnvelope_15') }}</div>
				<div class="col-span-2 mx-6 my-2 text-xs text-gray-400 CENTER_C">
					{{ $t('wallet_passwordRedEnvelope_12') }}
				</div>
				<div class="m-3 CENTER_C">
					<van-button round plain color="#CDA269" class="px-12">{{ $t('wallet_passwordRedEnvelope_13') }}</van-button>
				</div>
				<div class="m-3 CENTER_C">
					<van-button round color="#cda269" class="px-12" @click="onSucesss">{{ $t('wallet_passwordRedEnvelope_14') }}</van-button>
				</div>
			</div>
		</van-popup>
		<van-popup v-model:show="showSuccessMsg" round class="bg-[#0F0F0F] shadow-xl">
			<div class="grid w-40 grid-cols-2 START_R">
				<img class="m-3" :src="state.successMsg" />
				<div class="m-3 -ml-6">{{ $t('wallet_passwordRedEnvelope_15') }}</div>
			</div>
		</van-popup>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, reactive } from 'vue';
	import { useRoute } from 'vue-router';
	import { Toast } from 'vant';
	import { useI18n } from 'vue-i18n';

	const successMsg = `${window.staticPath}/static/img/svg/successMsg.svg`;
	const bank_ch = `${window.staticPath}/static/img/bank_ch.png`;

	const route = useRoute();
	const { t } = useI18n();
	const userId = Number(route.query?.id);
	const date = ref('');
	const show = ref(false);

	const depositValue = ref('');
	const showCancel = ref(false);
	const showSuccessMsg = ref(false);
	const isLink = ref(true);
	const active = ref(0);
	const depositchannel = ref('');
	const state = reactive({
		successMsg: successMsg,
	});
	const value = ref('123');
	const showKeyboard = ref(true);
	const formatDate = (date) => `${date.getFullYear() + 1}/${date.getMonth() + 1}/${date.getDate()}`;
	const onConfirm = (values) => {
		const [start, end] = values;
		show.value = false;
		date.value = `${formatDate(start)} - ${formatDate(end)}`;
		isLink.value = false;
	};
	const onSucesss = () => {
		showSuccessMsg.value = true;
		showCancel.value = false;
	};
	const list = ref([]);
	const loading = ref(false);
	const finished = ref(false);
	const handleCopy = (value) => {
		const textArea = document.createElement('textarea');
		textArea.value = value || '';
		textArea.style.top = '0';
		textArea.style.left = '0';
		textArea.style.position = 'fixed';
		// console.log("sds", value);

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		let success;
		try {
			success = document.execCommand('copy');
		} catch (e) {
			success = false;
		} finally {
			document.body.removeChild(textArea);
		}

		if (success) {
			Toast(t('wallet_passwordRedEnvelope_16'));
		} else {
			Toast('Fail');
		}
	};
	const time = ref(1 * 60 * 60 * 1000);
	const tableData = ref([
		{
			name: 'Johnnywang',
			money: '999,999,999.00',
			time: '2019/02/19 24:59:59',
			status: t('wallet_passwordRedEnvelope_17'),
		},
		{
			name: 'Johnnywang',
			money: '999,999,999.00',
			time: '2019/01/19 24:59:59',
			status: t('wallet_passwordRedEnvelope_17'),
		},
		{
			name: 'hnnywang',
			money: '999,999,999.00',
			time: '2019/05/19 24:59:59',
			status: t('wallet_passwordRedEnvelope_17'),
		},
		{
			name: 'Jonnywang',
			money: '99,999,999.00',
			time: '2019/07/19 24:59:59',
			status: t('wallet_passwordRedEnvelope_17'),
		},
		{
			name: 'Johnnywang',
			money: '999,999,999.00',
			time: '2019/02/19 24:59:59',
			status: t('wallet_passwordRedEnvelope_17'),
		},
		{
			name: 'ohnnywang',
			money: '99,999,999.00',
			time: '2019/08/19 24:59:59',
			status: t('wallet_passwordRedEnvelope_17'),
		},
	]);
</script>

<style lang="less" scoped>
	::v-deep(.van-field__label) {
		color: #967140;
	}

	::v-deep(.van-field__label) {
		color: #967140;
	}
	// ::v-deep(.van-picker-column__item) {
	//   color: #ffffff;
	// }
	.van-form {
		.van-field {
			display: inherit;
		}
	}
	.van-button--info {
		color: #fff;
		background-color: #c60000;
	}

	.van-button-normal {
		padding: 0 5px;
	}
	.bankCardBg {
		// background-image: url('@/assets/MaskGroup.svg'), linear-gradient(155.07deg, #343434 5.26%, #181818 84.13%);
		background-image: linear-gradient(155.07deg, #343434 5.26%, #181818 84.13%);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.block {
		display: inline-block;
		width: 20px;
		color: #cda269;
		font-size: 18px;
		text-align: center;
		padding: 0.25rem;
		margin: 0.25rem;
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		border-radius: 0.25rem;
		background-color: #4d4d4d;
	}
	.text-xss {
		font-size: 0.75rem;
		line-height: 2rem;
	}
</style>
