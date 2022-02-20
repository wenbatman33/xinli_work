<template lang="pug">
//- 添加黑名單彈窗
van-popup(:show='show', class='w-8/12 md:w-6/12', teleport='.popupTeleport', round)
    //- 彈窗內容
    .flex.flex-col.items-stretch.px-6.pt-4.pb-6
        //- 彈窗表頭
        manage-header(:item='item', back, @click-close='clickClose', @click-back='clickBack')

        //- 標題
        .text-xs.text-title.text-center.font-bold.mt-8(v-if='type === "ip"') 添加封禁IP
        .text-xs.text-title.text-center.font-bold.mt-8(v-else-if='type === "user"') 添加黑名单

        //- 選項
        .grid.grid-cols-2.gap-4.mt-4
            //- 禁止發話
            van-button.w-full.h-auto.p-3.rounded.bg-transparent.border-option.text-option(:class='{ "selected": state.selected === "shutup" }', @click='clickShutup') 
                .text-xs 禁止发话

            //- 禁止訪問
            van-button.w-full.h-auto.p-3.rounded.bg-transparent.border-option.text-option(:class='{ "selected": state.selected === "kicking" }', @click='clickKicking')
                .text-xs 禁止访问

        //- 封閉時間
        input-field.mt-4(v-model='state.time', type='number', placeholder='输入封闭时间(小时)', :formatter='timeFormatter')
            template(#button)
                van-button.w-auto.h-auto.py-2.px-5.rounded-full.bg-confirm.border-transparent(:loading='shutupLoading', :disabled='confirmDisabled', @click='clickConfirm')
                    .text-xs.text-white 确认
</template>
<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import inputField from '@/components/inputField';
import manageHeader from '@/components/room/manageHeader.vue';

export default {
	components: {
		inputField,
		manageHeader,
	},
	props: {
		show: Boolean,
		item: Object,
        type: String,
	},
	emits: ['update:show', 'click-back'],
	setup(props, { emit }) {
		// Vuex store
		const store = useStore();

		// Component state
		const state = reactive({
			time: '',
			selected: 'shutup',
		});

		// 用戶 uid
		const uid = computed(() => {
			return props?.item?.uid || '';
		});

		// 是否正在禁言/踢出用戶
		const shutupLoading = computed(() => {
			return store?.state?.socket?.shutupLoading || store?.state?.socket?.kickingLoading;
		});

		// 是否禁用確認按鈕
		const confirmDisabled = computed(() => {
			return !state.time || state.time.length === 0;
		});

		// 格式化輸入時間
		const timeFormatter = (val) => {
			return val.replace(/\D/, '');
		};

		// 點擊關閉
		const clickClose = () => {
			emit('update:show', false);
		};

		// 點擊返回
		const clickBack = () => {
			emit('update:show', false);
			emit('click-back');
		};

		// 點擊禁止發話
		const clickShutup = () => {
			state.selected = 'shutup';
		};

		// 點擊禁止訪問
		const clickKicking = () => {
			state.selected = 'kicking';
		};

		// 點擊確認
		const clickConfirm = () => {
            // Shutup params
            const params = {
                touid: uid.value,
                time: state.time,
				type: props?.type,
            }

            // Shutup
			if (state.selected === 'shutup') {
				store.dispatch('socket/SET_SHUTUP', params).then(() => {
					emit('update:show', false);
				});
			} 

            // Kicking
            else if (state.selected === 'kicking') {
				store.dispatch('socket/SET_KICKING', params).then(() => {
					emit('update:show', false);
				});
			}
		};
		return {
			state,
			shutupLoading,
			confirmDisabled,
			timeFormatter,
			clickClose,
			clickBack,
			clickShutup,
			clickKicking,
			clickConfirm,
		};
	},
};
</script>
<style lang="scss" scoped>
::v-deep(.van-cell) {
	padding: 0;
}
.text-title {
	color: #a62337;
}
.text-option {
	color: #909399;
	&.selected {
		color: #a62337;
	}
}
.border-option {
	border: 1px solid #e8e8e8;
	&.selected {
		border: 1px solid #a62337;
	}
}
.bg-confirm {
	background: #a62337;
}
</style>
