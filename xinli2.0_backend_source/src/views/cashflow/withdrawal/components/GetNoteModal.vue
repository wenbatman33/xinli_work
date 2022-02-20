<template>
  <!-- Get note modal start -->
  <BasicModal
    :visible="visible"
    :footer="null"
    width="50%"
    title="操作记录"
    @update:visible="updateVisible"
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
  <!-- Get note modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, watch } from 'vue';
  import { BasicModal } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getWithdrawalNote } from '/@/api/cashflow/withdrawal';
  import { WithdrawalItem } from '/@/api/cashflow/model/withdrawalModel';
  import { noteColumns } from './tableData';

  /**
   * Component state interface
   */
  interface State {
    /** Create loading */
    loading: Boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'GetNoteModal',
    components: {
      BasicModal,
      BasicTable,
    },
    props: {
      visible: {
        type: Boolean,
      },
      record: {
        type: Object as PropType<WithdrawalItem>,
      },
    },
    emits: ['update:visible'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({
        loading: false,
      });

      // Table title
      const title = computed(() => {
        return `提款单号 TransactionID ：${props.record?.transactionID}`;
      });

      // Table definition
      const [registerTable, { reload }] = useTable({
        title,
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: false,
        canResize: false,
        bordered: true,
        columns: noteColumns,
        pagination: {
          hideOnSinglePage: true,
        },
        api: async () => {
          const response = await getWithdrawalNote({
            id: props.record?.transactionID,
          });
          return response.list || [];
        },
      });

      // Update visible state
      const updateVisible = (visible) => {
        emit('update:visible', visible);
      };

      // Watch visible state changed
      watch(
        () => props.visible,
        (visible) => {
          if (visible) {
            reload();
          }
        }
      );
      return {
        state,
        registerTable,
        updateVisible,
      };
    },
  });
</script>
