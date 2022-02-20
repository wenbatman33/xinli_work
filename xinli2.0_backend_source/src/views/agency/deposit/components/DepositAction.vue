<template>
  <!-- Table action start -->
  <TableAction :actions="actions" :dropDownActions="dropDownActions" />
  <!-- Table action end -->

  <!--  Get note modal start-->
  <GetNoteModal v-model:visible="state.showGetNote" :record="record" />
  <!--  Get note modal end-->

  <!--  Balance date modal start-->
  <BalanceDateModal
    v-model:visible="state.showBalanceDate"
    :record="record"
    :payChannelServices="payChannelServices"
    @reload="handleReload"
  />
  <!--  Balance date modal end-->

  <!--  Post note modal start-->
  <PostNoteModal v-model:visible="state.showPostNote" :record="record" @reload="handleReload" />
  <!--  Post note modal end-->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { TableAction } from '/@/components/Table';
  import { postDepositCallback } from '/@/api/cashflow/deposit';
  import { DepositItem } from '/@/api/cashflow/model/depositModel';
  import { GetServiceResponse } from '/@/api/payment/model/payChannelServiceModel';
  import GetNoteModal from './GetNoteModal.vue';
  import BalanceDateModal from './BalanceDateModal.vue';
  import PostNoteModal from './PostNoteModal.vue';

  /**
   * Component state interface
   */
  interface State {
    /** Show get note modal */
    showGetNote: Boolean;

    /** Show balance date modal */
    showBalanceDate: Boolean;

    /** Show post note modal */
    showPostNote: Boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'DepositAction',
    components: {
      TableAction,
      GetNoteModal,
      BalanceDateModal,
      PostNoteModal,
    },
    props: {
      record: {
        type: Object as PropType<DepositItem>,
      },
      payChannelServices: {
        type: Array as PropType<GetServiceResponse[]>,
      },
    },
    emits: ['reload'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        showGetNote: false,
        showBalanceDate: false,
        showPostNote: false,
      });

      // Action types
      const actionType = {
        callback: {
          label: '订单查询',
          onClick: async () => {
            if (props.record?.status === 3) {
              message.success(`${props.record?.id} 订单已完成`);
              return;
            }
            const response = await postDepositCallback({
              id: props.record?.id,
            });
            if (response.success) {
              message.success(`${props.record?.id} 三方回调成功`);
            } else {
              message.warning(`${props.record?.id} 三方回调未完成`);
            }
          },
        },
        balanceDate: {
          label: '修改入帐日期',
          onClick: () => {
            state.showBalanceDate = true;
          },
        },
        getNote: {
          label: '查看纪录',
          onClick: () => {
            state.showGetNote = true;
          },
        },
        postNote: {
          label: '新增备注',
          onClick: () => {
            state.showPostNote = true;
          },
        },
      };

      // Table actions
      const actions = computed(() => {
        if (props.record?.type === 1 && props.record?.status === 1) {
          return [actionType.callback];
        } else if (props.record?.type === 1 && props.record?.status === 2) {
          return [actionType.getNote];
        } else if (props.record?.type === 1 && props.record?.status === 3) {
          return [actionType.balanceDate];
        } else if (props.record?.type === 2 && props.record?.status === 3) {
          return [actionType.balanceDate];
        } else if (props.record?.type === 4 && props.record?.status === 3) {
          return [actionType.getNote];
        } else {
          return [];
        }
      });

      // Table dropdown actions
      const dropDownActions = computed(() => {
        if (props.record?.type === 1 && props.record?.status === 1) {
          return [actionType.getNote, actionType.postNote];
        } else if (props.record?.type === 1 && props.record?.status === 2) {
          return [actionType.postNote];
        } else if (props.record?.type === 1 && props.record?.status === 3) {
          return [actionType.getNote, actionType.postNote];
        } else if (props.record?.type === 2 && props.record?.status === 3) {
          return [actionType.getNote, actionType.postNote];
        } else if (props.record?.type === 4 && props.record?.status === 3) {
          return [actionType.postNote];
        } else {
          return [];
        }
      });

      // Handle reload deposit list
      const handleReload = () => {
        emit('reload');
      };
      return {
        state,
        actions,
        dropDownActions,
        handleReload,
      };
    },
  });
</script>
