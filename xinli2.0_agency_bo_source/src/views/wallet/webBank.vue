<template>
	<div class="container pb-4 FLEX_C">
		<van-count-down :time="time">
			<template #default="timeData">
				<div class="grid justify-center grid-flow-col p-4 m-5 gap-x-0.5 rounded-md bg-[#191919]">
					<span class="p-1 text-white">{{ $t('wallet_webBank_02') }}</span>
					<span class="block ml-2">{{ Math.floor(timeData.hours / 10) }}</span>
					<span class="block">{{ timeData.hours % 10 }}</span>
					<span class="text-[#be9661] mx-1">:</span>
					<span class="block">{{ Math.floor(timeData.minutes / 10) }}</span>
					<span class="block">{{ timeData.minutes % 10 }}</span>
					<span class="text-[#be9661] mx-1">:</span>
					<span class="block">{{ Math.floor(timeData.seconds / 10) }}</span>
					<span class="block mr-2">{{ timeData.seconds % 10 }}</span>
					<span class="p-1 text-white">{{ $t('wallet_webBank_03') }}</span>
				</div>
			</template>
		</van-count-down>
		<div class="grid justify-center grid-flow-col p-4 mx-5 gap-x-0.5 rounded-md bg-[#191919]">
			<div class="text-xs text-[#FF4F42]">{{ $t('wallet_webBank_04') }}</div>
		</div>

		<div class="container flex content-end justify-center p-2 h-44">
			<div class="h-full p-3 border rounded-md rounded-lg w-80 bankCardBg border-primaryLight">
				<div class="flex justify-end">
					<div class="px-8 bg-darkOpacity">
						<span class="pb-4 text-xs">Ming Wang</span>
					</div>
				</div>
				<div class="grid grid-flow-col grid-rows-2 mt-2">
					<div class="items-start row-span-2 -mr-8">
						<img :src="bank_ch" />
					</div>
					<div class="col-span-2 font-bold -ml-7">China Construction Bank</div>
					<div class="col-span-2 text-xs text-gray-400 shadow-2xl -ml-7"> {{ $t('wallet_webBank_05') }} </div>
				</div>
				<div class="flex justify-between pt-4 mt-6">
					<div class="flex flex-col">
						<span class="text-xs font-bold text-gray-300">1234 4567 8901 2345</span>
					</div>
					<span class="text-xs bodoni text-primaryLight">BANK</span>
				</div>
			</div>
		</div>

		<div class="container flex justify-center p-2">
			<ul class="divide-y-2 divide-[#474747] w-80 bg-[#191919] rounded-lg">
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_webBank_06') }}</span>

					<span class="text-white">
						China Construction Bank
						<span class="text-[#8c8c8c]">
							<van-icon class="m-1 scale-150" class-prefix="my-icon" name="copy" @click="handleCopy('China Construction Bank')" />
						</span>
					</span>
				</li>
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_webBank_07') }}</span>

					<span class="text-white">
						122 3845 1345 3485 567
						<span class="text-[#8c8c8c]">
							<van-icon class="m-1 scale-150" class-prefix="my-icon" name="copy" @click="handleCopy('122 3845 1345 3485 567')" />
						</span>
					</span>
				</li>
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_webBank_08') }}</span>

					<span class="text-white">
						Ming Wang
						<span class="text-[#8c8c8c]">
							<van-icon class="m-1 scale-150" class-prefix="my-icon" name="copy" @click="handleCopy('Ming Wang')" />
						</span>
					</span>
				</li>
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_webBank_09') }}</span>

					<span class="text-white">
						197,473.00
						<span class="text-[#8c8c8c]">
							<van-icon class="m-1 scale-150" class-prefix="my-icon" name="copy" @click="handleCopy('197,473.00')" />
						</span>
					</span>
				</li>
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_webBank_10') }}</span>

					<span class="text-white">
						197,472.00
						<span class="text-[#8c8c8c]">
							<van-icon class="m-1 scale-150" class-prefix="my-icon" name="copy" @click="handleCopy('197,472.00')" />
						</span>
					</span>
				</li>
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_webBank_11') }}</span>

					<span class="text-white">
						431567
						<span class="text-[#8c8c8c]">
							<van-icon class="m-1 scale-150" class-prefix="my-icon" name="copy" @click="handleCopy('431567')" />
						</span>
					</span>
				</li>
			</ul>
		</div>
		<div class="container flex justify-center p-8">
			<ul>
				<li class="text-xss text-[#FF4F42]"> • {{ $t('wallet_webBank_12') }} </li>

				<li class="mt-2 text-white text-xss"> • {{ $t('wallet_webBank_13') }} </li>
				<li class="mt-2 text-xss text-[#FF4F42]"> • {{ $t('wallet_webBank_14') }} </li>
				<li class="mt-2 text-xss text-[#FF4F42]"> • {{ $t('wallet_webBank_15') }} </li>
			</ul>
		</div>
		<div class="container flex justify-center p-2">
			<ul class="divide-y-2 divide-[#474747] w-80 bg-[#191919] rounded-lg">
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_webBank_16') }}</span>

					<span class="text-white"> {{ $t('wallet_webBank_01') }} </span>
				</li>
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_webBank_17') }}</span>

					<span class="text-white"> {{ $t('wallet_webBank_18') }} </span>
				</li>
				<li class="flex justify-between p-3">
					<span class="text-white CENTER_C">{{ $t('wallet_webBank_19') }}</span>

					<span class="text-white"> 4857206037165 </span>
				</li>
			</ul>
		</div>
		<div class="container p-4 mt-8 FLEX_C loginBox">
			<van-button block round type="info" native-type="submit"> {{ $t('wallet_webBank_20') }} </van-button>
			<van-button round plain class="mt-4 mb-6" block color="#C60000" @click="showCancel = true">
				{{ $t('wallet_webBank_21') }}
			</van-button>
		</div>
		<van-popup v-model:show="showCancel" round class="bg-[#0F0F0F] w-80 shadow-xl">
			<div class="grid grid-cols-2">
				<div class="col-span-2 my-4 CENTER_C">{{ $t('wallet_webBank_21') }}</div>
				<div class="col-span-2 mx-6 my-2 text-xs text-gray-400 CENTER_C">
					{{ $t('wallet_webBank_22') }}
				</div>
				<div class="m-3 CENTER_C">
					<van-button round plain color="#CDA269" class="px-12">{{ $t('wallet_webBank_23') }}</van-button>
				</div>
				<div class="m-3 CENTER_C">
					<van-button round color="#cda269" class="px-12" @click="onSucesss">{{ $t('wallet_webBank_24') }}</van-button>
				</div>
			</div>
		</van-popup>
		<van-popup v-model:show="showIconSuccess" round class="bg-[#0F0F0F] w-80 shadow-xl">
			<div class="grid grid-cols-2">
				<div class="col-span-2 my-4 CENTER_C">{{ $t('wallet_webBank_21') }}</div>
				<div class="col-span-2 mx-6 my-2 text-xs text-gray-400 CENTER_C">
					{{ $t('wallet_webBank_22') }}
				</div>
				<div class="m-3 CENTER_C">
					<van-button round plain color="#CDA269" class="px-12">{{ $t('wallet_webBank_23') }}</van-button>
				</div>
				<div class="m-3 CENTER_C">
					<van-button round color="#cda269" class="px-12" @click="onSucesss">{{ $t('wallet_webBank_24') }}</van-button>
				</div>
			</div>
		</van-popup>
		<van-popup v-model:show="showSuccessMsg" round class="bg-[#0F0F0F] shadow-xl">
			<div class="grid w-40 grid-cols-2 START_R">
				<img class="m-3" :src="state.successMsg" />
				<div class="m-3 -ml-6">{{ $t('wallet_webBank_25') }}</div>
			</div>
		</van-popup>
	</div>
</template>

<script lang="ts">
	import { ref, computed, onMounted, reactive } from 'vue';
	import { useRoute } from 'vue-router';
	import { Toast } from 'vant';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const successMsg = `${window.staticPath}/static/svg/successMsg.svg `;
	const bank_ch = `${window.staticPath}/static/img/bank_ch.png`;
	export default {
		setup() {
			const route = useRoute();
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
					Toast(t('wallet_webBank_26'));
				} else {
					Toast('Fail');
				}
			};
			return {
				active,
				depositchannel,
				depositValue,
				date,
				onConfirm,
				onSucesss,
				state,
				showSuccessMsg,
				isLink,
				list,
				loading,
				finished,
				bank_ch,
				handleCopy,
				tableData: [
					{
						name: 'Johnnywang',
						money: '999,999,999.00',
						time: '2019/02/19 24:59:59',
						status: t('wallet_webBank_27'),
					},
					{
						name: 'Johnnywang',
						money: '999,999,999.00',
						time: '2019/01/19 24:59:59',
						status: t('wallet_webBank_27'),
					},
					{
						name: 'hnnywang',
						money: '999,999,999.00',
						time: '2019/05/19 24:59:59',
						status: t('wallet_webBank_27'),
					},
					{
						name: 'Jonnywang',
						money: '99,999,999.00',
						time: '2019/07/19 24:59:59',
						status: t('wallet_webBank_27'),
					},
					{
						name: 'Johnnywang',
						money: '999,999,999.00',
						time: '2019/02/19 24:59:59',
						status: t('wallet_webBank_27'),
					},
					{
						name: 'ohnnywang',
						money: '99,999,999.00',
						time: '2019/08/19 24:59:59',
						status: t('wallet_webBank_27'),
					},
				],
				showCancel,
				time: ref(1 * 60 * 60 * 1000),
			};
		},
	};
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
