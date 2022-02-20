<template lang="pug">
//- 充值
.recharge.pb-16
	//- 導覽欄
	nav-bar(title='充值', left-button='/publicAssets/img/icon-left-red@3x.png', @click-left='clickLeft')

	//- 下拉刷新
	van-pull-refresh(:model-value='state.isLoading', @refresh='refresh')
		.flex.flex-col
			//- 蕉幣
			van-button.coin-button
				.flex.flex-col.px-4.py-6
					//- 標題
					.header.text-sm.text-left 您的蕉币余额

					//- 內容
					.flex.flex-row.items-center.mt-2
						//- 圖示
						img.w-6.h-6(src='/publicAssets/img/coin.png')

						//- 餘額
						.coin.text-2xl.font-bold.ml-4 {{ coin }}

			//- 廣告
			.px-4.mt-4(v-if='!isSlideEmpty')
				.slide-container.rounded-md
					van-button.slide-button(@click='clickSlide')
						img.w-full.object-cover(:src='firstSlide.slide_pic || ""', @error='errorSlideImg')

			//- 充值金額標題
			recharge-header 充值金额

			//- 禮物列表
			recharge-rules(:list='state.rulesList', :selected='state.rulesId', @update:selected='updateSelected')

			//- 支付方式
			.mt-4.px-4
				van-button.method-button.rounded-md
					.flex.flex-row.items-center.px-4.py-2
						img.h-10(src='/publicAssets/img/recharge/alipay-logo.png')
						.text-sm.text-left.ml-2 拍手平台仅使用支付宝第三方支付提供充值服务，如有不便敬请见谅。

			//- 下一步
			.mt-8.px-4
				submit-button(text='下一步', :loading='state.isPosting', @click='clickNext')
</template>

<script>
import { reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Notify } from 'vant';
import { useStore } from 'vuex';
import { slideList, rechargeList, alipay } from '@/api';
import { deepLink, commaFormat } from '@/utils';
import { matomo_recharge_click_submit } from '@/matomoTrackEvent.js';
import navBar from '@/components/navBar';
import submitButton from '@/components/submitButton';
import rechargeHeader from '@/components/recharge/rechargeHeader.vue';
import rechargeRules from '@/components/recharge/rechargeRules.vue';

export default {
	components: {
		navBar,
		submitButton,
		rechargeHeader,
		rechargeRules,
	},
	setup() {
		// Vuex store
		const store = useStore();

		// Vue router
		const router = useRouter();

		// Component state
		const state = reactive({
			isLoading: false,
			isPosting: false,
			coin: null,
			rulesId: null,
			slideList: [],
			rulesList: [],
		});

		// 蕉幣餘額
		const coin = computed(() => {
			const value = state.coin || store?.state?.user?.userInfo?.coin;
			if (value) {
				return commaFormat(value);
			} else {
				return value;
			}
		});

		// 廣告是否為空
		const isSlideEmpty = computed(() => {
			return !state.slideList || state.slideList.length === 0;
		});

		// 第一筆廣告
		const firstSlide = computed(() => {
			if (isSlideEmpty.value) {
				return {};
			} else {
				return state.slideList[0] || {};
			}
		});

		// 取得廣告列表
		const getSlideList = (callback) => {
			// Get query
			const query = {
				slide_cid: 20,
			};

			// Get slide list
			slideList(query)
				.then((res) => {
					// Update slide list
					state.slideList = res?.data?.list || [];

					// Invoke callback on finished
					callback();
				})
				.catch(() => {
					// Invoke callback on error
					callback();
				});
		};

		// 取得充值選項列表
		const getRechargeList = (callback) => {
			// Get recharge list
			rechargeList()
				.then((res) => {
					// Update data list
					const giftList = res?.data?.gift_list || [];
					const goodsList = res?.data?.goods_list || [];
					const coinList = res?.data?.coin_list || [];
					state.rulesList = giftList.concat(goodsList).concat(coinList);

					// Invoke callback on finished
					callback();
				})
				.catch(() => {
					// Invoke callback on error
					callback();
				});
		};

		// 取得資料
		const getData = () => {
			// Update loading state on start
			state.isLoading = true;

			// Get slide list
			getSlideList(() => {
				// Get recharge list
				getRechargeList(() => {
					// Revert loading state on finished
					state.isLoading = false;
				});
			});
		};

		// On component mounted
		onMounted(() => {
			getData();
		});

		// 下拉刷新
		const refresh = () => {
			getData();
		};

		// 廣告圖片讀取失敗
		const errorSlideImg = (e) => {
			e.target.src = '/publicAssets/img/default-banner@3x.png';
		};

		// 更新選擇的充值規則
		const updateSelected = (selected) => {
			state.rulesId = selected;
		};

		// 點擊導覽欄返回按鈕
		const clickLeft = () => {
			router.go(-1);
		};

		// 點擊廣告
		const clickSlide = () => {
			const url = firstSlide.value?.slide_url;
			if (url && url.length > 0) {
				deepLink(url);
			}
		};

		// 點擊下一步
		const clickNext = () => {
			// Validate selected rule
			if (!state.rulesId) {
				Notify({ type: 'danger', message: '请选择充值金额' });
				return;
			}

			// Android native alipay
			if (window?.android?.isAndroidApp() === true && window?.android?.alipay) {
				// Update posting state on start
				state.isPosting = true;

				// Post body
				const body = {
					rules_id: state.rulesId,
					ambient: 0,
				};

				// Alipay
				alipay(body)
					.then((res) => {
						// Javascript interface
						const orderInfo = res?.data?.pay_url || '';
						window?.android?.alipay(orderInfo);

						// Revert posting state on finished
						state.isPosting = false;
					})
					.catch(() => {
						// Revert posting state on error
						state.isPosting = false;
					});
			}

			// Web alipay
			else {
				// Update posting state on start
				state.isPosting = true;

				// Post body
				const body = {
					rules_id: state.rulesId,
					ambient: 2,
				};

				// Open new tab before asynchoronus
				const newTab = window.open('', '_blank');

				// Alipay
				alipay(body)
					.then((res) => {
						// Open pay url
						newTab.location.href = res?.data?.pay_url || '';

						// Revert posting state on finished
						state.isPosting = false;
					})
					.catch(() => {
						// Revert posting state on error
						state.isPosting = false;
					});
			}

			// Matomo track
			matomo_recharge_click_submit();
		};
		return {
			state,
			coin,
			isSlideEmpty,
			firstSlide,
			refresh,
			errorSlideImg,
			updateSelected,
			clickLeft,
			clickSlide,
			clickNext,
		};
	},
};
</script>
<style lang="scss" scoped>
.recharge {
	width: 100%;
	::v-deep(.van-button__content) {
		width: 100%;
	}
	::v-deep(.van-button__text) {
		width: 100%;
	}
	.coin-button {
		width: 100%;
		height: unset;
		padding: 0px;
		color: #a62337;
		border: transparent;
		background: #fcfcfc;
		.header {
			color: #969696;
		}
	}
	.slide-container {
		width: 100%;
		height: 0;
		padding-bottom: 39.067%;
		overflow: hidden;
	}
	.slide-button {
		width: 100%;
		height: unset;
		padding: 0;
		border: transparent;
		background: transparent;
	}
	.method-button {
		width: 100%;
		height: unset;
		padding: 0px;
		color: #c8c8c8;
		border: transparent;
		background: #fcfcfc;
	}
}
</style>
