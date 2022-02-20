<template lang="pug">
//- 限時任務物件
.limit-task-item.flex.items-center.justify-between.shadow.rounded-md.px-6.py-4.my-1
    //- 任務資訊
    .flex.flex-col.mr-2
        //- 任務時間
        .task-date.text-xs {{ data?.today }} {{ data?.start_time }}-{{ data?.end_time }}

        //- 任務名稱
        .task-name.text-sm.font-bold.mt-1 {{ data?.name }}

        //- 任務說明
        .task-explanation.text-xs.mt-1 {{ data?.explanation }}

        //- 任務獎勵
        .task-gift.text-xs.break-all.mt-1
            template(v-for='(item, index) in data?.gift_list || []')
                span {{ item?.giftname }}
                span  x{{ item?.quantity }}
                span(v-if='index !== data.gift_list.length - 1') 、

    //- 領取按鈕
    receive-button(v-if='data.status === 1', :loading='loading', @click='clickReceive')

    //- 未完成按鈕
    navigation-button(v-if='data.status === 0', text='未完成', @click='clickNavigate')
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
.limit-task-item {
    .task-date {
        color: #969696;
    }
    .task-name {
        color: #A62337;
    }
    .task-explanation {
        color: #969696;
    }
    .task-gift {
        color: #DF2F4A;
    }
}
</style>