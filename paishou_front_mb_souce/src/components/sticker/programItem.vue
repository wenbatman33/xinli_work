<template lang="pug">
//- 購買方案物件
van-button.w-auto.h-auto.p-4.rounded.bg-program.border-transparent(:loading='loading', :class='{ "disabled": disabled }', @click='clickProgram')
    //- 物件內容
    .w-full.flex.flex-row.justify-between.items-center
        //- 名稱
        .text-base.text-white.font-bold
            span {{ day }}
            span 天使用权

        //- 金額
        .text-sm.text-price(:class='{ "disabled": disabled }') {{ price }}
    
    //- 讀取中樣式
    template(#loading)
        van-loading.w-6.h-6(type='spinner', color='#ffffff')
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { stickerBuy } from '@/api';

export default {
	props: {
		item: Object,
		loading: Boolean,
		buyingProgram: Object,
	},
	emits: ['update:show', 'update:loading', 'update:success', 'update:buying-program', 'update:success-object'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// 方案編號
		const id = computed(() => {
			return props?.item?.id || 0;
		});

		// 是否讀取中
		const loading = computed(() => {
			return props?.loading === true && props?.item?.id === props?.buyingProgram?.id;
		});

		// 是否禁用
		const disabled = computed(() => {
			const amount = props?.item?.price || 0;
			if (props?.loading === true) {
				return true;
			} else if (props?.item?.type === 1) {
				const banana = store?.state?.user?.userInfo?.banana || 0;
				return banana < amount;
			} else if (props?.item?.type === 2) {
				const coin = store?.state?.user?.userInfo?.coin || 0;
				return coin < amount;
			} else {
				return true;
			}
		});

		// 方案天數
		const day = computed(() => {
			return props?.item?.day || 0;
		});

		// 方案金額
		const price = computed(() => {
			const amount = props?.item?.price || 0;
			var unit = '';
			if (props?.item?.type === 1) {
				unit = '根香蕉';
			} else if (props?.item?.type === 2) {
				unit = '蕉币';
			}
			return `${amount}${unit}`;
		});

		// 點擊購買方案
		const clickProgram = () => {
			// Validate disabled status
			if (disabled.value) {
				return;
			}

			// Update loading state
			emit('update:loading', true);
			emit('update:buying-program', props.item);

			// Post body
			const body = {
				program_id: id.value,
			};

			// Buy sticker
			stickerBuy(body)
				.then((res) => {
					// Update user info
					store.dispatch('user/GET_USER_INFO');
					
					// Hide program popup
					emit('update:show', false);

					// Update success data object
					emit('update:success-object', res?.data || {});

					// Show buy success popup
					emit('update:success', true);

					// Revert loading state on finished
					emit('update:loading', false);
				})
				.catch(() => {
					// Revert loading state on error
					emit('update:loading', false);
				});
		};
		return {
			loading,
			disabled,
			day,
			price,
			clickProgram,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-button__content) {
	width: 100%;
}
::v-deep(.van-button__text) {
	width: 100%;
}
.bg-program {
	background: #a62337;
	&.disabled {
		background: #c8c8c8;
	}
}
.text-price {
	color: #f8b62d;
	&.disabled {
		color: #ffffff;
	}
}
</style>
