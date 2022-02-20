<template lang="pug">
//- 每日簽到列表
.flex.flex-row.flex-wrap.items-center(v-if='containsBonus', :class='$attrs.class')
	.day-item.flex-grow.p-1(v-for='(item, index) in bonusList', :class='{ "last-can": index === indexOfTheLastBonusCan, received: item.received === 1 }')
		van-button.btn.shadow.rounded-md(:disabled='item.received !== 0 || index !== indexOfTheLastBonusCan', :loading='state.isReceiving && item.received === 0 && index === indexOfTheLastBonusCan', @click='clickReceive')
			.flex.flex-col.items-center.px-1.py-4(:class='{ "opacity-50": index !== indexOfTheLastBonusCan }')
				//- 天數
				.text-xs.font-bold
					span(v-if='index === indexOfTheLastBonusCan && item.received === 1') 已领取
					span(v-else-if='index === indexOfTheLastBonusCan && item.received === 0') 可领取
					span(v-else-if='index < indexOfTheLastBonusCan && item.received === 1') 已登
					span(v-else) 第 {{ item.day }} 天

				//- 打勾圖示
				.w-10.h-10.flex.justify-center.items-center.mt-1(v-if='item.received === 1')
					van-icon(name='checked', color='#00DA16', size='1.5rem')

				//- 香蕉圖示
				img.w-10.h-10.mt-1(v-else, src='/publicAssets/img/banana.png')

				//- 香蕉數量
				.text-xs.mt-2 {{ item.coin }} 香蕉
			template(#loading)
				.flex.flex-col.items-center.px-1.py-4(:class='{ "opacity-50": item.received === 1 && index !== indexOfTheLastBonusCan }')
					//- 天數
					.text-xs.font-bold 第 {{ item.day }} 天

					//- 讀取中
					.w-10.h-10.flex.justify-center.items-center.mt-1
						van-loading.w-8.h-8.mt-1(type='spinner', color='#ffffff')

					//- 香蕉數量
					.text-xs.mt-2 {{ item.coin }} 香蕉

//- 目前暫無簽到任務
empty(v-else, text='目前暂无签到任务')

//- 簽到成功彈窗
bonus-success-popup(v-model:show='state.isShowSuccessPopup', title='签到成功', :type='state.bonusUnit', :quantity='state.bonusCoin')
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
import { bonusGet } from '@/api';
import { matomo_tasks_reward_login } from '@/matomoTrackEvent.js';
import empty from '@/components/empty';
import bonusSuccessPopup from '@/components/tasks/bonusSuccessPopup.vue';

export default {
	components: {
		empty,
		bonusSuccessPopup,
	},
	props: {
		path: String,
		popupStyle: Boolean,
	},
	emits: ['receive-success'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			isReceiving: false,
			isShowSuccessPopup: false,
			bonusUnit: '',
			bonusCoin: 0,
		});

		// User id
		const uid = computed(() => {
			return store?.state?.user?.uid || '';
		});

		// 簽到列表
		const bonusList = computed(() => {
			return store.getters['tasks/bonusList'];
		});

		// 是否存在簽到任務
		const containsBonus = computed(() => {
			return store.getters['tasks/containsBonus'];
		});

		// 最後一筆 can = 1 的資料
		const indexOfTheLastBonusCan = computed(() => {
			return store.getters['tasks/indexOfTheLastBonusCan'];
		});

		// 點擊簽到按鈕
		const clickReceive = () => {
			// Disable click on popup style
			if (props.popupStyle) {
				return;
			}

			// Update receiving state
			state.isReceiving = true;

			// Post body payload
			const payload = {
				uid: uid.value,
			};

			// Get bonus
			bonusGet(payload)
				.then((res) => {
					// Validate response code
					if (res.code === 0) {
						// Show bonus success popup
						state.bonusUnit = res?.data?.unit || '';
						state.bonusCoin = res?.data?.coin || 0;
						state.isShowSuccessPopup = true;

						// Emit receive success
						emit('receive-success');

						// Update bonus list
						store.dispatch('tasks/GET_BONUS_LIST', {});
					}

					// Revert receiving state on finished
					state.isReceiving = false;
				})
				.catch(() => {
					// Revert receiving state on error
					state.isReceiving = false;
				});

			// Matomo track
			if (props.path === '/tasks') {
				matomo_tasks_reward_login();
			} else if (props.path === '/bonusPopup') {
				// matomo_bonusPopup_reward();
			}
		};
		return {
			state,
			bonusList,
			containsBonus,
			indexOfTheLastBonusCan,
			clickReceive,
		};
	},
};
</script>

<style lang="scss" scoped>
::v-deep(.van-button--disabled) {
	opacity: 1;
}
::v-deep(.van-button__text) {
	width: 100%;
}
.day-item {
	min-width: 4.5rem;
	.btn {
		width: 100%;
		height: unset;
		padding: 0;
		color: #969696;
		border: transparent;
		background: #ffffff;
	}
	&.last-can {
		.btn {
			color: #ffffff;
			background: #F8B62D;
		}
		&.received {
			.btn {
				color: #ffffff;
				background: #A62337;
			}
		}
	}
}
</style>
