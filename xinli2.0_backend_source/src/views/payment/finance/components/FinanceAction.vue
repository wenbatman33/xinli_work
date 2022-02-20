<template>
  <!-- Table action start -->
  <TableAction
    v-if="!record.isExpandRow"
    :actions="actions"
    :dropDownActions="dropDownActions"
    @reload="reload"
  />
  <!-- Table action end -->

  <!-- Add modal start -->
  <AddModal
    v-model:visible="state.showAdd"
    :record="record"
    :serviceCodes="serviceCodes"
    :payGroups="payGroups"
    :bankcardGroups="bankcardGroups"
    @reload="reload"
  />
  <!-- Add modal end -->

  <!-- Delete modal start -->
  <DeleteModal v-model:visible="state.showDelete" :record="record" @reload="reload" />
  <!-- Delete modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { putFinanceEdit } from '/@/api/payment/finance';
  import { DropdownItem } from '/@/api/payment/model/payChannelServiceModel';
  import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';
  import { TableAction } from '/@/components/Table';
  import { FinanceRecord } from './tableData';
  import AddModal from './AddModal.vue';
  import DeleteModal from './DeleteModal.vue';

  /**
   * Component state interface
   */
  interface State {
    /** Show add modal */
    showAdd: boolean;

    /** Show delete modal */
    showDelete: boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'FinanceAction',
    components: {
      TableAction,
      AddModal,
      DeleteModal,
    },
    props: {
      record: {
        type: Object as PropType<FinanceRecord>,
      },
      serviceCodes: {
        type: Array as PropType<DropdownItem[]>,
      },
      payGroups: {
        type: Array as PropType<GetPayGroupsResponse[]>,
      },
      bankcardGroups: {
        type: Array as PropType<GetPayGroupsResponse[]>,
      },
    },
    emits: ['reload', 'edit'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        showAdd: false,
        showDelete: false,
      });

      // Name
      const name = computed(() => {
        return props.record?.name || '';
      });

      // Action list
      const actions = computed(() => {
        const targetAction = props.record?.status === 2 ? '开启' : '关闭';
        const targetStatus = props.record?.status === 2 ? 1 : 2;
        return [
          {
            label: targetAction,
            onClick: async () => {
              // Put finance
              const params = props.record || {status: ''};
              params.status = targetStatus;
              const response = await putFinanceEdit(params);

              // Validate response
              if (response.success) {
                // Notify success
                message.success(`${name.value} ${targetAction}成功`);

                // Refresh finance list
                emit('reload');
              } else {
                // Success callback
                message.error(`${name.value} ${targetAction}失败`);
              }
            },
          },
        ];
      });

      // Dropdown action list
      const dropDownActions = computed(() => {
        const targetAction = props.record?.maintain === 2 ? '开启维护' : '停用维护';
        const targetMaintain = props.record?.maintain === 2 ? 1 : 2;
        return [
          {
            label: targetAction,
            onClick: async () => {
              // Put finance
              const params = props.record || {maintain: ''};
              params.maintain = targetMaintain;
              const response = await putFinanceEdit(params);

              // Validate response
              if (response.success) {
                // Notify success
                message.success(`${name.value} ${targetAction}成功`);

                // Refresh finance list
                emit('reload');
              } else {
                // Success callback
                message.error(`${name.value} ${targetAction}失败`);
              }
            },
          },
          {
            label: '加入线路',
            onClick: async () => {
              state.showAdd = true;
            },
          },
          {
            label: '编辑 ',
            onClick: () => {
              emit('edit', props.record);
            },
          },
          {
            label: '删除',
            onClick: () => {
              state.showDelete = true;
            },
          },
        ];
      });

      // Reload finance list
      const reload = () => {
        emit('reload');
      };
      return {
        state,
        actions,
        dropDownActions,
        reload,
      };
    },
  });
</script>
