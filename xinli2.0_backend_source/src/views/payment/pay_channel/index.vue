<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <!-- Pay channel table start -->
    <BasicTable size="small" @register="registerTable">
      <!-- Table toolbar start -->
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增商户号</a-button>
      </template>
      <!-- Table toolbar end -->

      <!-- Table sn column start -->
      <template #sn="{ record }">
        <PayChannelSn
          :record="record"
          :payChannelNameList="state.payChannelNameList"
          @refreshList="handleRefreshList"
          @refreshName="handleRefreshName"
        />
      </template>
      <!-- Table sn column end -->

      <!-- Table deposit ratio column start -->
      <template #depositRatio="{ record }">
        <PayChannelDepositRatio :record="record" />
      </template>
      <!-- Table deposit ration column end -->

      <!-- Table service count column start -->
      <template #payChannelServiceCount="{ record }">
        <PayChannelServiceCount :record="record" />
      </template>
      <!-- Table service count column end -->

      <!-- Table status column start -->
      <template #status="{ text }">
        <PayChannelStatus :status="text" />
      </template>
      <!-- Table status column end -->

      <!-- Table ap status column start -->
      <template #apStatus="{ record }">
        <PayChannelApStatus :record="record" />
      </template>
      <!-- Table ap status column end -->

      <!-- Table action column start -->
      <template #action="{ record }">
        <PayChannelAction
          :record="record"
          :payChannelNameList="state.payChannelNameList"
          @refreshList="handleRefreshList"
          @refreshName="handleRefreshName"
        />
      </template>
      <!-- Table action column end -->
    </BasicTable>
    <!-- Pay channel table end -->

    <!-- Create modal start -->
    <CreateModal
      :payChannelNameList="state.payChannelNameList"
      v-model:visible="state.showCreate"
      @refreshList="handleRefreshList"
      @refreshName="handleRefreshName"
    />
    <!-- Create modal end -->
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted, computed } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { FormProps } from '/@/components/Form';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getPayChannelName, getPayChannel } from '/@/api/payment/payChannel';
  import { GetPayChannelParams, PayChannelNameItem } from '/@/api/payment/model/payChannelModel';
  import { payChannelSchemas } from './components/formSchemas';
  import { payChannelColumns } from './components/tableData';
  import PayChannelSn from './components/PayChannelSn.vue';
  import PayChannelDepositRatio from './components/PayChannelDepositRatio.vue';
  import PayChannelServiceCount from './components/PayChannelServiceCount.vue';
  import PayChannelStatus from './components/PayChannelStatus.vue';
  import PayChannelApStatus from './components/PayChannelApStatus.vue';
  import PayChannelAction from './components/PayChannelAction.vue';
  import CreateModal from './components/CreateModal.vue';

  /**
   * Component state interface
   */
  interface State {
    /** Show create modal */
    showCreate: boolean;

    /** Pay channel name list */
    payChannelNameList: PayChannelNameItem[];
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'PayChannel',
    components: {
      PageWrapper,
      BasicTable,
      PayChannelSn,
      PayChannelDepositRatio,
      PayChannelServiceCount,
      PayChannelStatus,
      PayChannelApStatus,
      PayChannelAction,
      CreateModal,
    },
    setup() {
      // Component state
      const state = reactive<State>({
        showCreate: false,
        payChannelNameList: [],
      });

      // Form config
      const formConfig = computed<FormProps>(() => {
        return {
          showResetButton: false,
          showAdvancedButton: false,
          autoSubmitOnEnter: true,
          schemas: payChannelSchemas(state.payChannelNameList),
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
        };
      });

      // Data table definition
      const [registerTable, { reload }] = useTable({
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: true,
        bordered: true,
        columns: payChannelColumns,
        formConfig: formConfig,
        pagination: {
          pageSize: 50,
        },
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: {
            customRender: 'action',
          },
        },
        api: async (args: GetPayChannelParams) => {
          const query = Object.assign({}, args);
          Object.keys(query).forEach((key) => {
            if (query[key] === undefined || query[key] === '' || query[key] === 0) {
              delete query[key];
            }
          });
          const response = await getPayChannel(query);
          return response?.list || [];
        },
      });

      // Initial pay channel name
      const initPayChannelName = async () => {
        // Fetch pay channel name list
        const response = await getPayChannelName();

        // Update pay channel name list
        state.payChannelNameList = response?.list || [];
      };

      // Handle create button clicked
      const handleCreate = () => {
        state.showCreate = true;
      };

      // Handle refresh list
      const handleRefreshList = () => {
        reload();
      };

      // Handle refresh name
      const handleRefreshName = () => {
        initPayChannelName();
      };

      // On component mounted
      onMounted(() => {
        initPayChannelName();
        reload();
      });
      return {
        state,
        registerTable,
        handleCreate,
        handleRefreshList,
        handleRefreshName,
      };
    },
  });
</script>
