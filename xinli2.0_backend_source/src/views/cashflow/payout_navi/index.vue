<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <div class="w-full flex flex-col items-stretch">
        <!-- Title start -->
        <span class="text-right">{{ title }}</span>
        <!-- Title end -->

        <!-- Subtitle start -->
        <span class="text-right">{{ subtitle }}</span>
        <!-- Subtitle end -->

        <!-- Payout navi table start -->
        <BasicTable size="small" @register="registerTable">
          <!-- Table paying column start -->
          <template #paying="{ text }">
            <PayoutNaviPaying :paying="text" />
          </template>
          <!-- Table paying column end -->

          <!-- Table status column start -->
          <template #status="{ record }">
            <PayoutNaviStatus :id="record.id" :status="record.status" @reload="reload" />
          </template>
          <!-- Table status column end -->
        </BasicTable>
        <!-- Payout navi table end -->
      </div>
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, h } from 'vue';
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useLocale } from '/@/locales/useLocale';
  import { BasicTable, useTable } from '/@/components/Table';
  import { payoutNaviColumns } from './components/tableData';
  import { getPayoutNavi, putPayoutNaviSort } from '/@/api/cashflow/withdrawal';
  import PayoutNaviPaying from './components/PayoutNaviPaying.vue';
  import PayoutNaviStatus from './components/PayoutNaviStatus.vue';
  import SortableWrapper from '/@/components/Sortable/SortableWrapper.vue';
  import moment, { Moment } from 'moment';

  /**
   * Component state interface
   */
  interface State {
    /**
     * Update at
     */
    updateAt?: Moment;

    /**
     * Available count
     */
    availableCount: number;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'PayoutNavi',
    components: {
      ConfigProvider,
      AppProvider,
      BasicTable,
      PayoutNaviPaying,
      PayoutNaviStatus,
    },
    setup() {
      // support Multi-language
      const { getAntdLocale } = useLocale();

      // Component state
      const state = reactive<State>({
        availableCount: 0,
      });

      // Title
      const title = computed(() => {
        if (state.updateAt) {
          return `上次更新时间：${state.updateAt.format('HH:mm:ss')}`;
        } else {
          return '上次更新时间：';
        }
      });

      // Subtitle
      const subtitle = computed(() => {
        return `等待配线出款数：${state.availableCount}`;
      });

      // Table definition
      const [registerTable, { getDataSource, setTableData, reload }] = useTable({
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: false,
        bordered: true,
        columns: payoutNaviColumns,
        rowKey: (row) => {
          return row.id;
        },
        pagination: {
          pageSize: 50,
          hideOnSinglePage: true,
          showSizeChanger: false,
          showQuickJumper: false,
        },
        components: {
          body: {
            wrapper: h(SortableWrapper, {
              onEnd: (evt) => {
                const dataSource = getDataSource() || [];
                const oldSort = dataSource[evt.oldIndex].sort;
                const newSort = dataSource[evt.newIndex].sort;
                dataSource[evt.oldIndex].sort = newSort;
                dataSource[evt.newIndex].sort = oldSort;

                const oldItem = dataSource[evt.oldIndex];
                dataSource.splice(evt.oldIndex, 1);
                dataSource.splice(evt.newIndex, 0, oldItem);

                setTableData(dataSource);

                putPayoutNaviSort({
                  id: oldItem.id,
                  sort: newSort,
                });

                state.updateAt = moment();
              },
            }),
          },
        },
        api: async () => {
          const response = await getPayoutNavi();
          const list = response?.list || [];
          state.updateAt = moment();
          state.availableCount = list.reduce((pre, curr) => {
            if (curr.paying === true) {
              return pre;
            } else {
              return pre + 1;
            }
          }, 0);
          return list;
        },
      });
      return {
        getAntdLocale,
        title,
        subtitle,
        reload,
        registerTable,
      };
    },
  });
</script>

<style lang="scss" scoped>
  ::v-deep(.ant-table-column-title) {
    white-space: pre-wrap !important;
  }
</style>
