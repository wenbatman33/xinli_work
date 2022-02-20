<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable
      size="small"
      :dataSource="state.agencyGroupsList"
      @register="agencyGroupTable"
      :loading="loading"
    >
      <template #toolbar v-if="hasPermission(['btn_rankSetting_add'])">
        <a-button type="primary" @click="handleActiveAdd">新增佣金群组</a-button>
      </template>
      <template #minProfit_S="{ record }">
        {{ record.rankContent[0].minProfit?.toLocaleString() }}
      </template>
      <template #minProfit_A="{ record }">
        {{ record.rankContent[1].minProfit?.toLocaleString() }}
      </template>
      <template #minProfit_B="{ record }">
        {{ record.rankContent[2].minProfit?.toLocaleString() }}
      </template>
      <template #minProfit_C="{ record }">
        {{ record.rankContent[3].minProfit?.toLocaleString() }}
      </template>
      <template #minProfit_D="{ record }">
        {{ record.rankContent[4].minProfit?.toLocaleString() }}
      </template>
      <template #minProfit_E="{ record }">
        {{ record.rankContent[5].minProfit?.toLocaleString() }}
      </template>
      <template #minProfit_F="{ record }">
        {{ record.rankContent[6].minProfit?.toLocaleString() }}
      </template>
      <template #commissionPercent_S="{ record }">
        {{ `${record.rankContent[0].commissionPercent}%` }}
      </template>
      <template #commissionPercent_A="{ record }">
        {{ `${record.rankContent[1].commissionPercent}%` }}
      </template>
      <template #commissionPercent_B="{ record }">
        {{ `${record.rankContent[2].commissionPercent}%` }}
      </template>
      <template #commissionPercent_C="{ record }">
        {{ `${record.rankContent[3].commissionPercent}%` }}
      </template>
      <template #commissionPercent_D="{ record }">
        {{ `${record.rankContent[4].commissionPercent}%` }}
      </template>
      <template #commissionPercent_E="{ record }">
        {{ `${record.rankContent[5].commissionPercent}%` }}
      </template>
      <template #commissionPercent_F="{ record }">
        {{ `${record.rankContent[6].commissionPercent}%` }}
      </template>
      <template #action="{ record }" v-if="hasPermission(['btn_rankSetting_edit'])">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: () => handleActive(record),
            },
          ]"
        />
      </template>
    </BasicTable>

    <AgencyModel @register="addAgencyModel" :minHeight="100" @reload="reloadEmit" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive, onMounted, ref } from 'vue';
  import { useGlobSetting } from '/@/hooks/setting';
  import { useModal } from '/@/components/Modal';
  import AgencyModel from './components/AgencyModel.vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { tableColumns } from './components/tableData';
  import { getAgencyListTypeItem } from '/@/api/agency/model/agencyModel';
  import { getAgencyRankSettingList, getAgencyRankSettingOption } from '/@/api/agency/agency';
  import { usePermission } from '/@/hooks/web/usePermission';
  interface State {
    loading: boolean;
    searching: boolean;
    agencyGroupsList: any;
    agencyTypeList: getAgencyListTypeItem[];
  }
  export default defineComponent({
    components: {
      AgencyModel,
      PageWrapper,
      BasicTable,
      TableAction,
    },
    setup() {
      const [addAgencyModel, { openModal: openAgencyModel }] = useModal();
      const globSetting = useGlobSetting();
      const apiUrl = globSetting.apiUrl;
      const loading = ref(false);
      const { hasPermission } = usePermission();
      // Component state
      const state = reactive<State>({
        loading: false,
        searching: false,
        agencyGroupsList: [],
        agencyTypeList: [],
      });
      const fetchagencyGroupOption = async () => {
        const data = await getAgencyRankSettingOption();
        state.agencyTypeList = data?.list || [];
      };

      // Data table definition
      const [agencyGroupTable, { reload }] = useTable({
        api: async (args: Object) => {
          try {
            const query = Object.assign({}, args);
            Object.keys(query).forEach((key) => {
              if (query[key] === undefined || query[key] === '') {
                delete query[key];
              }
            });
            const response = await getAgencyRankSettingList(query);
            //默认分层资料
            state.agencyGroupsList = response?.list || [];
            return response?.list || [];
          } catch (e) {
            // Exception handle by http utils
          } finally {
            // Revert loading state
            loading.value = false;
          }
        },
        showIndexColumn: false,
        columns: tableColumns,
        useSearchForm: false,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: {
            customRender: 'action',
          },
        },
      });

      // Handle active button clicked
      const handleActive = (record: Recordable) =>
        openAgencyModel(true, {
          record,
          mode: 'Edit',
        });

      const handleActiveAdd = () =>
        openAgencyModel(true, {
          mode: 'Create',
          record: state.agencyGroupsList[0],
        });

      onMounted(() => {
        fetchagencyGroupOption();
      });

      const reloadEmit = () => {
        reload();
      };

      return {
        addAgencyModel,
        hasPermission,
        tableColumns,
        state,
        agencyGroupTable,
        handleActive,
        apiUrl,
        reloadEmit,
        loading,
        handleActiveAdd,
      };
    },
  });
</script>
<style lang="less" scoped>
  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(1)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #ce2a2a;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(2)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #ff8219;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(3)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #fb0;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(4)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #a22db9;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(5)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #6e3fe7;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(6)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #2577e0;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(7)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #00b1a3;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(8)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #ce2a2a;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(9)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #ff8219;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(10)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #fb0;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(11)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #a22db9;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(12)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #6e3fe7;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(13)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #2577e0;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(14)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #00b1a3;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(15)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #ce2a2a;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(16)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #ff8219;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(17)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #fb0;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(18)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #a22db9;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(19)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #6e3fe7;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(20)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #2577e0;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis:nth-of-type(21)) {
    .ant-table-header-column {
      .ant-table-column-title {
        display: block;
        color: #00b1a3;
      }
    }
  }

  ::v-deep(.ant-table-align-center.ant-table-row-cell-ellipsis.ant-table-row-cell-break-word) {
    .ant-table-header-column:nth-of-type(1) {
      .ant-table-column-title {
        display: block;
        color: #000;
      }
    }
  }
</style>
