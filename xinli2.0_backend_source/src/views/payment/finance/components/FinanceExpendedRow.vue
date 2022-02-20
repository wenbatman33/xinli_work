<template>
  <!-- Channel table start -->
  <BasicTable size="small" @register="registerTable">
    <!-- Table groups column start -->
    <template #groups="{ record: channelRecord }">
      <Tag v-for="(item, index) in channelRecord.groups" :key="index" class="m-1" color="green">
        {{ item }}
      </Tag>
    </template>
    <!-- Table groups column start -->

    <!-- Table status column start -->
    <template #status="{ text }">
      <ChannelStatus :status="text" />
    </template>
    <!-- Table status column end -->

    <!-- Table action column start -->
    <template #action="{ record: channelRecord }">
      <FinanceExpendedAction
        :channelRecord="channelRecord"
        :financeRecord="record"
        @reload="reload"
      />
    </template>
    <!-- Table action column end -->
  </BasicTable>
  <!-- Channel table start -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, h } from 'vue';
  import { Tag } from 'ant-design-vue';
  import { putServiceSort } from '/@/api/payment/payChannelService';
  import { BasicTable, TableActionType, useTable } from '/@/components/Table';
  import { tableExpendedColumns, FinanceRecord } from './tableData';
  import ChannelStatus from './ChannelStatus.vue';
  import SortableWrapper from '/@/components/Sortable/SortableWrapper.vue';
  import FinanceExpendedAction from './FinanceExpendedAction.vue';

  /**
   * Component state interface
   */
  interface State {
    /** Table actions */
    tableAction?: TableActionType;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'FinanceExpendedRow',
    components: {
      Tag,
      BasicTable,
      ChannelStatus,
      FinanceExpendedAction,
    },
    props: {
      record: {
        type: Object as PropType<FinanceRecord>,
      },
    },
    emits: ['reload'],
    setup(props, { emit }) {
      // Component state
      const state = reactive<State>({});

      // Channel data source
      const dataSource = computed(() => {
        return props.record?.services || [];
      });

      // Channel table definition
      const [registerTable, tableAction] = useTable({
        showIndexColumn: false,
        showSummary: false,
        bordered: true,
        canResize: false,
        dataSource,
        columns: tableExpendedColumns,
        rowKey: (row) => {
          return row.id;
        },
        pagination: {
          pageSize: 50,
          hideOnSinglePage: true,
        },
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: {
            customRender: 'action',
          },
        },
        components: {
          body: {
            wrapper: h(SortableWrapper, {
              onEnd: (evt) => {
                const data = dataSource.value;
                const temp = data[evt.oldIndex];
                data.splice(evt.oldIndex, 1);
                data.splice(evt.newIndex, 0, temp);

                state.tableAction?.setTableData(data);

                putServiceSort({
                  id: temp.id,
                  sort: evt.newIndex + 1,
                });
              },
            }),
          },
        },
      });
      state.tableAction = tableAction;

      // Reload finance list
      const reload = () => {
        emit('reload');
      };
      return {
        registerTable,
        reload,
      };
    },
  });
</script>
