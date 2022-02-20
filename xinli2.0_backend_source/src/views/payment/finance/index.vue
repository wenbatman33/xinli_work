<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <!-- Finance table start -->
    <BasicTable size="small" @register="registerTable">
      <!-- Table toolbar start -->
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增显示项目</a-button>
      </template>
      <!-- Table toolbar end -->

      <!-- Table action column start -->
      <template #action="{ record }">
        <FinanceAction
          :record="record"
          :serviceCodes="state.serviceCodes"
          :payGroups="state.payGroups"
          :bankcardGroups="state.bankcardGroups"
          @reload="reload"
          @edit="handleEdit"
        />
      </template>
      <!-- Table action column end -->
    </BasicTable>
    <!-- Finance table end -->

    <!-- Create modal start -->
    <CreateModal @register="CreateModalRegister" @reload="reload" />
    <!-- Create modal end -->
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, computed, onMounted, h } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, TableActionType, useTable } from '/@/components/Table';
  import { getPayGroups } from '/@/api/payment/payGroup';
  import { getFinance, putFinanceSort } from '/@/api/payment/finance';
  import { getServiceDropdown } from '/@/api/payment/payChannelService';
  import { DropdownItem } from '/@/api/payment/model/payChannelServiceModel';
  import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';
  import { FinanceRecord, financeColumns } from './components/tableData';
  import { financeSchemas } from './components/formSchemas';
  import SortableWrapper from '/@/components/Sortable/SortableWrapper.vue';
  import FinanceAction from './components/FinanceAction.vue';
  import CreateModal from './components/CreateModal.vue';
  import { useModal } from '/@/components/Modal';

  /**
   * Component state interface
   */
  interface State {

    /** Expanded ids */
    expandedIds: Number[];

    /** Table actions */
    tableAction?: TableActionType;

    /** 支付方式列表 */
    serviceCodes: DropdownItem[];

    /** 三方金流群組列表 */
    payGroups: GetPayGroupsResponse[];

    /** 存款卡金流群組列表 */
    bankcardGroups: GetPayGroupsResponse[];

    /** Sort order of weight column */
    weightSortOrder?: 'descend' | 'ascend';

    /** Sort order of update column */
    updateSortOrder?: 'descend' | 'ascend';
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'Finance',
    components: {
      PageWrapper,
      BasicTable,
      FinanceAction,
      CreateModal,
    },
    setup() {
      // Component state
      const state = reactive<State>({
        expandedIds: [],
        serviceCodes: [],
        payGroups: [],
        bankcardGroups: [],
        weightSortOrder: 'ascend',
      });

      // Find target id expanded status
      const isExpanded = (id) => {
        return state.expandedIds.find((element) => element === id) !== undefined;
      };

      // Compute data source with expand status
      const computeDataSource = (dataSource: FinanceRecord[]): FinanceRecord[] => {
        const filterDataSource = dataSource.filter((element) => {
          return !element.isExpandRow;
        });
        return filterDataSource.flatMap((element) => {
          const expanded = isExpanded(element.id);
          const rows: FinanceRecord[] = [];
          for (let i = 0; i < (expanded ? 2 : 1); i++) {
            rows.push({
              id: element.id,
              name: element.name,
              note: element.note,
              currency: element.currency,
              nums: element.nums,
              status: element.status,
              maintain: element.maintain,
              icon: element.icon,
              isRecommend: element.isRecommend,
              needRealName: element.needRealName,
              tooltip: element.tooltip,
              hasDoc: element.hasDoc,
              docTitle: element.docTitle,
              docURL: element.docURL,
              updatedAt: element.updatedAt,
              updatedUser: element.updatedUser,
              services: element.services,
              weight: element.weight,
              isExpandRow: i === 1,
              expanded,
            });
          }
          return rows;
        });
      };

      const [CreateModalRegister, { openModal: openCreateModal }] = useModal();

      // Table columns
      const columns = computed(() => {
        // Handle expand button clicked
        const handleExpand = (id) => {
          const expanded = isExpanded(id);
          if (expanded) {
            state.expandedIds = state.expandedIds.filter((element) => element !== id);
          } else {
            state.expandedIds.push(id);
          }
          const dataSource = state.tableAction?.getDataSource<FinanceRecord>() || [];
          const computedDataSource = computeDataSource(dataSource);
          state.tableAction?.setTableData(computedDataSource);
        };

        // Handle reload
        const handleReload = () => {
          state.tableAction?.reload();
        };

        // Return finance table columns
        return financeColumns(
          handleExpand,
          handleReload,
          state.weightSortOrder,
          state.updateSortOrder
        );
      });

      // Finance table definition
      const [registerTable, tableAction] = useTable({
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: true,
        bordered: true,
        columns,
        rowKey: (row) => {
          return `${row.id}${row.isExpandRow}`;
        },
        sortFn: ({ field, order }) => {
          if (field === 'updatedAt' && order) {
            state.weightSortOrder = undefined;
            state.updateSortOrder = order;
            return {
              field: 'updatedAt',
              order,
            };
          } else {
            state.weightSortOrder = 'ascend';
            state.updateSortOrder = undefined;
            return {
              field: 'weight',
              order: 'ascend',
            };
          }
        },
        formConfig: {
          showResetButton: false,
          showAdvancedButton: false,
          schemas: financeSchemas,
          autoSubmitOnEnter: true,
          baseColProps: {
            style: {
              width: 'auto',
              padding: '0px 4px',
            },
            flex: 'auto',
          },
          labelCol: {
            style: {
              width: 'auto',
              padding: '0px 8px',
            },
          },
        },
        pagination: {
          pageSize: 50,
        },
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          slots: {
            customRender: 'action',
          },
        },
        components: {
          body: {
            wrapper: h(SortableWrapper, {
              onStart: () => {
                state.expandedIds = [];
                const dataSource = state.tableAction?.getDataSource<FinanceRecord>() || [];
                const computedDataSource = computeDataSource(dataSource);
                state.tableAction?.setTableData(computedDataSource);
              },
              onEnd: (evt) => {
                const dataSource = state.tableAction?.getDataSource<FinanceRecord>() || [];
                dataSource[evt.oldIndex].weight = evt.newIndex;
                dataSource[evt.newIndex].weight = evt.oldIndex;

                const temp = dataSource[evt.oldIndex];
                dataSource.splice(evt.oldIndex, 1);
                dataSource.splice(evt.newIndex, 0, temp);

                const computedDataSource = computeDataSource(dataSource);
                state.tableAction?.setTableData(computedDataSource);

                putFinanceSort({
                  id: temp.id,
                  sort: evt.newIndex + 1,
                });
              },
            }),
          },
        },
        api: async (arg) => {
          const query = Object.assign({}, arg);
          Object.keys(query).forEach((key) => {
            if (query[key] === undefined || query[key] === '' || query[key] === 0) {
              delete query[key];
            }
          });
          const response = await getFinance(query);
          const list = response?.list || [];
          const dataSource = list.map<FinanceRecord>((element, index) => {
            return {
              ...element,
              isExpandRow: false,
              expanded: false,
              weight: index,
            };
          });
          return computeDataSource(dataSource);
        },
      });
      state.tableAction = tableAction;

      // Reload table data
      const reload = () => {
        tableAction.reload();
      };

      // Handle create button clicked
      const handleCreate = () => {
        openCreateModal(true, {
          record: false,
        });
      };
      const handleEdit = (record) => {
        openCreateModal(true, {
          record,
        });
      }

      // On component mounted
      onMounted(async () => {
        // Init methods
        getServiceDropdown().then((response) => {
          state.serviceCodes = response.serviceCode || [];
        });

        // Init pay groups
        getPayGroups({ type: 1 }).then((response: any) => {
          state.payGroups = response.list || [];
        });

        // Init bankcard groups
        getPayGroups({ type: 2 }).then((response: any) => {
          state.bankcardGroups = response.list || [];
        });
      });
      return {
        state,
        registerTable,
        reload,
        handleCreate,
        handleEdit,
        CreateModalRegister,
        openCreateModal
      };
    },
  });
</script>
