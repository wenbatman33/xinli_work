<template>
  <!-- Table action start -->
  <BasicTableAction :actions="actions" :dropDownActions="dropDownActions" />
  <!-- Table action end -->

  <!-- Remain sub modal start -->
  <RemainSubModal
    :record="record"
    v-model:visible="state.showRemainSub"
    @refreshList="handleRefreshList"
  />
  <!-- Remain sub modal end -->

  <!-- Remain sub confirm modal start -->
  <RemainSubConfirmModal
    v-model:visible="state.showRemainSubConfirm"
    @showRemainSubModal="handleShowRemainSubModal"
  />
  <!-- Remain sub confirm modal end -->

  <!-- Remain add modal start -->
  <RemainAddModal
    :record="record"
    v-model:visible="state.showRemainAdd"
    @refreshList="handleRefreshList"
  />
  <!-- Remain add modal end -->

  <!-- Remain add confirm modal start -->
  <RemainAddConfirmModal
    v-model:visible="state.showRemainAddConfirm"
    @showRemainAddModal="handleShowRemainAddModal"
  />
  <!-- Remain add confirm modal end -->

  <!-- Edit modal start -->
  <EditModal
    :record="record"
    :payChannelNameList="payChannelNameList"
    v-model:visible="state.showEdit"
    @refreshList="handleRefreshList"
    @refreshName="handleRefreshName"
  />
  <!-- Edit modal end -->

  <!-- Frozen sub modal start -->
  <FrozenSubModal
    :record="record"
    v-model:visible="state.showFrozenSub"
    @refreshList="handleRefreshList"
  />
  <!-- Frozen sub modal end -->

  <!-- Frozen add modal start -->
  <FrozenAddModal
    :record="record"
    v-model:visible="state.showFrozenAdd"
    @refreshList="handleRefreshList"
  />
  <!-- Frozen add modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { TableAction as BasicTableAction } from '/@/components/Table';
  import { putPayChannel, postPayChannelAp } from '/@/api/payment/payChannel';
  import { PayChannelItem, PayChannelNameItem } from '/@/api/payment/model/payChannelModel';
  import RemainSubModal from './RemainSubModal.vue';
  import RemainSubConfirmModal from './RemainSubConfirmModal.vue';
  import RemainAddModal from './RemainAddModal.vue';
  import RemainAddConfirmModal from './RemainAddConfirmModal.vue';
  import EditModal from './EditModal.vue';
  import FrozenSubModal from './FrozenSubModal.vue';
  import FrozenAddModal from './FrozenAddModal.vue';

  /**
   * Component state interface
   */
  interface State {
    /** Show remain sub modal */
    showRemainSub: boolean;

    /** Show remain sub confirm modal */
    showRemainSubConfirm: boolean;

    /** Show remain add modal */
    showRemainAdd: boolean;

    /** Show remain add confirm modal */
    showRemainAddConfirm: boolean;

    /** Show edit modal */
    showEdit: boolean;

    /** Show frozen add modal */
    showFrozenAdd: boolean;

    /** Show frozen sub modal */
    showFrozenSub: boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'PayChannelAction',
    components: {
      BasicTableAction,
      RemainSubModal,
      RemainSubConfirmModal,
      RemainAddModal,
      RemainAddConfirmModal,
      EditModal,
      FrozenSubModal,
      FrozenAddModal,
    },
    props: {
      record: {
        type: Object as PropType<PayChannelItem>,
      },
      payChannelNameList: {
        type: Array as PropType<Array<PayChannelNameItem>>,
      },
    },
    emits: ['refreshList', 'refreshName'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        showRemainSub: false,
        showRemainSubConfirm: false,
        showRemainAdd: false,
        showRemainAddConfirm: false,
        showEdit: false,
        showFrozenAdd: false,
        showFrozenSub: false,
      });

      // Pay channel name id
      const payChannelNameID = computed(() => {
        const payChannelNameList = props.payChannelNameList || [];
        const payChannelName = payChannelNameList.find((element) => {
          return element.name === props.record?.name;
        });
        return payChannelName?.id || 0;
      });

      // Sn
      const sn = computed(() => {
        return props.record?.sn || '';
      });

      // Action list
      const actions = computed(() => {
        const targetAction = props.record?.status === 2 ? '启用' : '停用';
        const targetStatus = props.record?.status === 2 ? 1 : 2;
        return [
          {
            label: targetAction,
            onClick: async () => {
              // Edit pay channel
              const response = await putPayChannel({
                ...props.record,
                status: targetStatus,
                payChannelNameID: payChannelNameID.value,
              });

              // Validate response
              if (response.success) {
                // Notify success
                message.success(`${sn.value} ${targetAction}成功`);

                // Refresh pay channel list
                emit('refreshList');
              } else {
                // Notify error
                message.success(`${sn.value} ${targetAction}失败`);
              }
            },
          },
        ];
      });

      // Dropdown action list
      const dropDownActions = computed(() => {
        const targetApAction = props.record?.apStatus === 2 ? '启用代付' : '停用代付';
        const targetApStatus = props.record?.apStatus === 2 ? 1 : 2;
        return [
          {
            label: targetApAction,
            onClick: async () => {
              // Validate ap fee
              if (targetApStatus === 1 && !props.record?.apFee && !props.record?.apPerFee) {
                message.error('代付资讯未完整');
                return;
              }

              // Edit pay channel
              const response = await postPayChannelAp({
                id: props.record?.id,
              });

              // Validate response
              if (response.success) {
                // Notify success
                message.success(`${sn.value} ${targetApAction}成功`);

                // Refresh pay channel list
                emit('refreshList');
              } else {
                // Notify error
                message.success(`${sn.value} ${targetApAction}失败`);
              }
            },
          },
          {
            label: '帐务明细',
            onClick: () => {
              console.log(props.record);
              window.open(
                `/finance_report/paychannel_report?payChannel=${props.record?.sn}`,
                '_blank'
              );
            },
          },
          {
            label: '结算',
            onClick: () => {
              if (props.record?.status === 2) {
                state.showRemainSubConfirm = true;
              } else {
                state.showRemainSub = true;
              }
            },
          },
          {
            label: '充值',
            onClick: () => {
              if (props.record?.status === 2) {
                state.showRemainAddConfirm = true;
              } else {
                state.showRemainAdd = true;
              }
            },
          },
          {
            label: '編輯',
            onClick: () => {
              state.showEdit = true;
            },
          },
          {
            label: '冻结',
            onClick: () => {
              state.showFrozenAdd = true;
            },
          },
          {
            label: '解冻',
            onClick: () => {
              state.showFrozenSub = true;
            },
          },
        ];
      });

      // Handle refresh pay channel list
      const handleRefreshList = () => {
        emit('refreshList');
      };

      // Handle refresh name list
      const handleRefreshName = () => {
        emit('refreshName');
      };

      // Handle show remain sub modal
      const handleShowRemainSubModal = () => {
        state.showRemainSub = true;
      };

      // Handle show remain add modal
      const handleShowRemainAddModal = () => {
        state.showRemainAdd = true;
      };
      return {
        state,
        actions,
        dropDownActions,
        handleRefreshList,
        handleRefreshName,
        handleShowRemainSubModal,
        handleShowRemainAddModal,
      };
    },
  });
</script>
