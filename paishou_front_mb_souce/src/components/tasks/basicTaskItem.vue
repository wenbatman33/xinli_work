<template lang="pug">
//- 新手任務
.basic-task-item.flex.items-center.justify-between.shadow.rounded-md.px-6.py-4.my-1
    //- 任務資訊
    .flex.flex-col
        //- 任務名稱
        .task-name.text-sm.font-bold {{ data?.name }}

        //- 任務獎勵
        .text-xs.mt-1
            //- 獎勵名稱
            span.bonus-name {{ data?.bonus_type_name }}

            //- 獎勵數量
            span.bonus-quantity  +{{ data?.quantity }}

    //- 領取按鈕
    receive-button(v-if='data.status === 1', :loading='loading', @click='clickReceive')

    //- 去完成按鈕
    navigation-button(v-if='data.status === 0', text='去完成', @click='clickNavigate')
</template>
<script>
import { deepLink } from '@/utils';
import receiveButton from '@/components/tasks/receiveButton.vue';
import navigationButton from '@/components/tasks/navigationButton.vue';

export default {
    components: {
        receiveButton,
        navigationButton,
    },
    props: {
        data: Object,
        loading: Boolean,
    },
    emits: ['click-receive'],
    setup(props, { emit }) {
        // 點擊領取按鈕
        const clickReceive = () => {
            emit('click-receive', props.data);
        };

		// 點擊未完成按鈕
		const clickNavigate = () => {
			deepLink(props.data?.link || '');
		};
        return {
            clickReceive,
            clickNavigate,
        };
    }
}
</script>
<style lang="scss">
.basic-task-item {
    .task-name {
        color: #191919;
    }
    .bonus-name {
        color: #AFAFAF;
    }
    .bonus-quantity {
        color: #F2994A;
    }
}
</style>