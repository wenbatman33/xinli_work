<template>
	<div class="container pb-4 FLEX_C">
		<div v-if="showState === 1">
			<div class="container flex content-end justify-center mt-2">
				<div class="grid grid-flow-col grid-rows-2 p-2 my-2 border-2 rounded-md FLEX_C border-primaryLight w-80 btnBg">
					<div class="row-span-2 CENTER_R">
						<van-icon size="2rem" name="paid" class="text-primaryLight" />
					</div>
					<div class="col-span-2 font-bold text-primary">{{ $t('wallet_withdrawalWebBank_02') }}</div>
					<div class="col-span-2 text-white bodoni">999,649,000.00</div>
				</div>
			</div>

			<div class="container flex content-end justify-center p-2 h-44">
				<div class="h-full p-3 border rounded-md rounded-lg w-80 bankCardBg border-primaryLight">
					<div class="flex justify-end">
						<div class="px-8 bg-darkOpacity">
							<span class="pb-4 text-xs">王小明</span>
						</div>
					</div>
					<div class="grid grid-flow-col grid-rows-2 mt-2">
						<div class="items-start row-span-2 -mr-8">
							<img :src="bank_ch" />
						</div>
						<div class="col-span-2 font-bold -ml-7">中国建设银行</div>
						<div class="col-span-2 text-xs text-gray-400 shadow-2xl -ml-7"> {{ $t('wallet_withdrawalWebBank_03') }} </div>
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
						<span class="text-white CENTER_C">{{ $t('wallet_withdrawalWebBank_04') }}</span>

						<span class="text-white"> 197,473.00 </span>
					</li>
					<li class="flex justify-between p-3">
						<span class="text-white CENTER_C">{{ $t('wallet_withdrawalWebBank_05') }}</span>

						<span class="text-white"> {{ $t('wallet_withdrawalWebBank_01') }} </span>
					</li>
					<li class="flex justify-between p-3">
						<span class="text-white CENTER_C">{{ $t('wallet_withdrawalWebBank_01') }}</span>

						<span class="text-white"> 中国建设银行 </span>
					</li>
				</ul>
			</div>
			<div class="container p-4 mt-8 FLEX_C">
				<van-form @submit="onPasswordSubmit">
					<van-field
						v-model="password"
						name="password"
						:label="$t('wallet_withdrawalWebBank_06')"
						:placeholder="$t('wallet_withdrawalWebBank_07')"
						:rules="[{ validator: asyncValidator, message: $t('wallet_withdrawalWebBank_08') }]"
					>
						<template #button><span class="text-[#967140]"> 1/3 </span></template>
					</van-field>

					<van-button class="mt-4" block round type="info" native-type="submit"> {{ $t('wallet_withdrawalWebBank_19') }} </van-button>
					<van-button round plain class="mt-4 mb-6" block color="#C60000" @click="showCancel = true">
						{{ $t('wallet_withdrawalWebBank_10') }}
					</van-button>
				</van-form>
			</div>
		</div>
		<div v-if="showState === 2">
			<div class="grid p-8 m-5 mb-2 gap-x-0.5 rounded-md bg-[#191919]">
				<div class="col-span-1 CENTER_C">
					<span class="text-[#cda269]">{{ $t('wallet_withdrawalWebBank_11') }}</span>
				</div>
			</div>
			<div class="container flex content-end justify-center p-2 h-44">
				<div class="h-full p-3 border rounded-md rounded-lg w-80 bankCardBg border-primaryLight">
					<div class="flex justify-end">
						<div class="px-8 bg-darkOpacity">
							<span class="pb-4 text-xs">王小明</span>
						</div>
					</div>
					<div class="grid grid-flow-col grid-rows-2 mt-2">
						<div class="items-start row-span-2 -mr-8">
							<img :src="bank_ch" />
						</div>
						<div class="col-span-2 font-bold -ml-7">中国建设银行</div>
						<div class="col-span-2 text-xs text-gray-400 shadow-2xl -ml-7"> {{ $t('wallet_withdrawalWebBank_03') }} </div>
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
						<span class="text-white CENTER_C">{{ $t('wallet_withdrawalWebBank_04') }}</span>
						<span class="text-white"> 197,473.00 </span>
					</li>
					<li class="flex justify-between p-3">
						<span class="text-white CENTER_C">{{ $t('wallet_withdrawalWebBank_02') }}</span>
						<span class="text-white"> 0.00 </span>
					</li>
					<li class="flex justify-between p-3">
						<span class="text-white CENTER_C">{{ $t('wallet_withdrawalWebBank_05') }}</span>
						<span class="text-white"> {{ $t('wallet_withdrawalWebBank_01') }} </span>
					</li>
					<li class="flex justify-between p-3">
						<span class="text-white CENTER_C">{{ $t('wallet_withdrawalWebBank_12') }}</span>
						<span class="text-white"> 2022/02/06 22:30:00 </span>
					</li>
					<li class="flex justify-between p-3">
						<span class="text-white CENTER_C">{{ $t('wallet_withdrawalWebBank_13') }}</span>
						<span class="text-white"> AW1234567 </span>
					</li>
				</ul>
			</div>
			<div class="container p-8 mt-8 FLEX_C">
				<van-button class="mt-4" block round type="info" native-type="submit"> {{ $t('wallet_withdrawalWebBank_19') }} </van-button>
			</div>
		</div>
		<div v-if="showState === 3">
			<div class="grid p-8 m-5 mb-2 gap-x-0.5 rounded-md bg-[#191919]">
				<div class="col-span-1 CENTER_C">
					<span class="text-red">{{ $t('wallet_withdrawalWebBank_14') }}</span>
				</div>
			</div>
			<div class="grid grid-cols-1 mt-8">
				<div class="col-span-1 CENTER_C">
					<van-image width="10rem" height="10rem" :src="state.failed2" />
				</div>
				<div class="col-span-1 mt-4 CENTER_C">
					<span class="text-[#CDA269]">{{ $t('wallet_withdrawalWebBank_15') }}</span>
				</div>
				<div class="col-span-1 CENTER_C">
					<span class="text-[#CDA269]">{{ $t('wallet_withdrawalWebBank_16') }}</span>
				</div>
			</div>
			<div class="container p-8 mt-8 FLEX_C">
				<van-button class="mt-4" block round type="info" @click="back"> {{ $t('wallet_withdrawalWebBank_19') }} </van-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import { ref, computed, onMounted, reactive } from 'vue';
	import { useRouter } from 'vue-router';
	import { Toast } from 'vant';
	const failed2 = `${window.staticPath}/static/svg/failed2.svg `;
	const bank_ch = `${window.staticPath}/static/img/bank_ch.png`;
	export default {
		setup() {
			const router = useRouter();
			const userId = Number(router.query?.id);
			const date = ref('');
			const show = ref(false);
			const password = ref('');
			const depositValue = ref('');
			const showCancel = ref(false);
			const showState = ref(1);
			const showSuccessMsg = ref(false);
			const isLink = ref(true);
			const active = ref(0);
			const depositchannel = ref('');
			const state = reactive({
				failed2: failed2,
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
					Toast(t('wallet_withdrawalWebBank_18'));
				} else {
					Toast('Fail');
				}
			};
			const asyncValidator = (val) =>
				new Promise((resolve) => {
					console.log('asyncValidator', val);

					setTimeout(() => {
						if (val == 66666) {
							showState.value = 3;
							resolve(false);
						} else resolve(true);
					}, 1000);
				});

			const onPasswordSubmit = async (values) => {
				try {
					console.log('onDepositSubmit', values);
					showState.value = 2;
					console.log('onMounted', showState.value);
				} finally {
					// Turn loading off
					// loginLoading.value = false;
				}
			};
			const back = (value) => {
				router.push({
					path: '/wallet',
				});
			};
			onMounted(() => {
				showState.value = 1;
				console.log('onMounted', showState.value);
			});
			return {
				active,
				depositchannel,
				depositValue,
				date,
				onConfirm,
				onSucesss,
				state,
				showSuccessMsg,
				showState,
				asyncValidator,
				password,
				onPasswordSubmit,
				isLink,
				list,
				loading,
				finished,
				bank_ch,
				handleCopy,
				back,
				tableData: [
					{
						name: 'Johnnywang',
						money: '999,999,999.00',
						time: '2019/02/19 24:59:59',
						status: t('wallet_withdrawalWebBank_19'),
					},
					{
						name: 'Johnnywang',
						money: '999,999,999.00',
						time: '2019/01/19 24:59:59',
						status: t('wallet_withdrawalWebBank_19'),
					},
					{
						name: 'hnnywang',
						money: '999,999,999.00',
						time: '2019/05/19 24:59:59',
						status: t('wallet_withdrawalWebBank_19'),
					},
					{
						name: 'Jonnywang',
						money: '99,999,999.00',
						time: '2019/07/19 24:59:59',
						status: t('wallet_withdrawalWebBank_19'),
					},
					{
						name: 'Johnnywang',
						money: '999,999,999.00',
						time: '2019/02/19 24:59:59',
						status: t('wallet_withdrawalWebBank_19'),
					},
					{
						name: 'ohnnywang',
						money: '99,999,999.00',
						time: '2019/08/19 24:59:59',
						status: t('wallet_withdrawalWebBank_19'),
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

	.van-form {
		.van-field {
			display: inherit;
		}
	}
	.btnBg {
		// background-image: url('@/assets/pattern_btn_bg.svg'), linear-gradient(155.07deg, #343434 5.26%, #181818 84.13%);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: 98% center;
	}
</style>
