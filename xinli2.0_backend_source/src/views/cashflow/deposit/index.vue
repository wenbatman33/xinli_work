<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <!-- Deposit table start -->
    <BasicTable size="small" @register="registerTable">
      <!-- Table toolbar start -->
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增存款单</a-button>
      </template>
      <!-- Table toolbar end -->

      <!-- Form date template start -->
      <template #form-date="{ values, schema }">
        <div class="flex flex-row items-center">
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.start])"
            @update:value="setFieldValue(schema.componentProps.start, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.start])"
            @update:value="setFieldValue(schema.componentProps.start, $event)"
          />
          <span class="flex-shrink-0 px-4">～</span>
          <DatePicker
            format="YYYY/MM/DD"
            :value="convertMoment(values[schema.componentProps.end])"
            @update:value="setFieldValue(schema.componentProps.end, $event)"
          />
          <TimePicker
            format="HH:mm"
            :value="convertMoment(values[schema.componentProps.end])"
            @update:value="setFieldValue(schema.componentProps.end, $event)"
          />
        </div>
      </template>
      <!-- Form date template end -->

      <!-- Form balance date template start -->
      <template #form-balanceDate="{ field, values }">
        <DatePicker
          format="YYYY/MM/DD"
          :value="convertMoment(values[field])"
          @update:value="setFieldValue(field, $event)"
          @clear="console.log('clear')"
        />
      </template>
      <!-- Form balance date template end -->

      <!-- Table id column start -->
      <template #id="{ text }">
        <DepositId :id="text" />
      </template>
      <!-- Table id column end -->

      <!-- Table status column start -->
      <template #status="{ text }">
        <DepositStatus :status="text" />
      </template>
      <!-- Table status column end -->

      <!-- Table pay group column start -->
      <template #payGroup="{ text }">
        <DepositPayGroup :payGroupId="text" :payGroups="state.payGroups" />
      </template>
      <!-- Table pay group column end -->

      <!-- Table bankcard group column start -->
      <template #bankcardGroup="{ text }">
        <DepositBankcardGroup :bankcardGroupId="text" :bankcardGroups="state.bankcardGroups" />
      </template>
      <!-- Table bankcard group column end -->

      <!-- Table member account column start -->
      <template #memberAccount="{ record }">
        <DepositMemberAccount :record="record" />
      </template>
      <!-- Table member account column end -->

      <!-- Table payment column start -->
      <template #payment="{ text }">
        <DepositPayment :payment="text" :methods="state.methods" />
      </template>
      <!-- Table payment column start -->

      <!-- Table action column start -->
      <template #action="{ record }">
        <DepositAction
          :record="record"
          :payChannelServices="state.payChannelServices"
          @reload="reload"
        />
      </template>
      <!-- Table action column end -->
    </BasicTable>
    <!-- Deposit table end -->

    <!-- Create modal start -->
    <CreateModal
      v-model:visible="state.showCreate"
      :payChannelServices="state.payChannelServices"
      @reload="reload"
    />
    <!-- Create modal end -->
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, onMounted } from 'vue';
  import { DatePicker, TimePicker } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, FormProps, useTable } from '/@/components/Table';
  import { getDeposit } from '/@/api/cashflow/deposit';
  import { getPayGroups } from '/@/api/payment/payGroup';
  import { getService, getServiceDropdown } from '/@/api/payment/payChannelService';
  import { getPayChannel, getPayChannelName } from '/@/api/payment/payChannel';
  import { GetServiceResponse, DropdownItem } from '/@/api/payment/model/payChannelServiceModel';
  import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';
  import { PayChannelItem, PayChannelNameItem } from '/@/api/payment/model/payChannelModel';
  import { depositColumns } from './components/tableData';
  import { depositSchemas } from './components/formSchemas';
  import CreateModal from './components/CreateModal.vue';
  import DepositId from './components/DepositId.vue';
  import DepositStatus from './components/DepositStatus.vue';
  import DepositPayGroup from './components/DepositPayGroup.vue';
  import DepositBankcardGroup from './components/DepositBankcardGroup.vue';
  import DepositMemberAccount from './components/DepositMemberAccount.vue';
  import DepositPayment from './components/DepositPayment.vue';
  import DepositAction from './components/DepositAction.vue';
  import moment from 'moment';

  /**
   * Component state interface
   */
  interface State {
    /** Show create modal */
    showCreate: Boolean;

    /** 資料筆數 */
    count: number;

    /** 訂單總金額 */
    amount?: number;

    /** 訂單總手續費 */
    fee?: number;

    /** 存款方式列表 */
    methods: DropdownItem[];

    /** 三方金流群組列表 */
    payGroups: GetPayGroupsResponse[];

    /** 存款卡金流群組列表 */
    bankcardGroups: GetPayGroupsResponse[];

    /** 商戶號列表 */
    payChannels: PayChannelItem[];

    /** 商戶列表 */
    payChannelNames: PayChannelNameItem[];

    /** 線路列表 */
    payChannelServices: GetServiceResponse[];
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'Deposit',
    components: {
      PageWrapper,
      BasicTable,
      DatePicker,
      TimePicker,
      CreateModal,
      DepositId,
      DepositStatus,
      DepositPayGroup,
      DepositBankcardGroup,
      DepositMemberAccount,
      DepositPayment,
      DepositAction,
    },
    setup() {
      // Component state
      const state = reactive<State>({
        showCreate: false,
        count: 0,
        amount: 0,
        fee: 0,
        methods: [],
        payGroups: [],
        bankcardGroups: [],
        payChannels: [],
        payChannelNames: [],
        payChannelServices: [],
      });

      // Title
      const title = computed<string>(() => {
        return `Records共计${state.count}笔，订单金额Total Amount ${state.amount}；交易手续费Fee ${state.fee}`;
      });

      // Form config
      const formConfig = computed<FormProps>(() => {
        return {
          showResetButton: false,
          showAdvancedButton: true,
          autoSubmitOnEnter: true,
          autoAdvancedLine: 1,
          schemas: depositSchemas(
            state.methods,
            state.payGroups,
            state.bankcardGroups,
            state.payChannels,
            state.payChannelNames
          ),
          baseColProps: {
            style: {
              padding: '0px 4px',
            },
          },
        };
      });

      // Table definition
      const [registerTable, { getForm, reload }] = useTable({
        title,
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: true,
        bordered: true,
        columns: depositColumns,
        pagination: {
          pageSize: 50,
        },
        actionColumn: {
          width: 160,
          title: '操作\nAction',
          dataIndex: 'action',
          slots: {
            customRender: 'action',
          },
        },
        formConfig,
        api: async (arg) => {
          const query = Object.assign({}, arg);
          Object.keys(query).forEach((key) => {
            if (query[key] === undefined || query[key] === '' || query[key] === Number.MIN_VALUE) {
              delete query[key];
            }
          });
          const response = await getDeposit(query);
          state.count = response.count || 0;
          state.amount = response.amount || 0;
          state.fee = response.fee || 0;
          return response.list || [];
        },
      });

      // Handle create button clicked
      const handleCreate = () => {
        state.showCreate = true;
      };

      // Convert string to moment
      const convertMoment = (str?: string) => {
        if (str === '') {
          return undefined;
        }
        if (str === undefined) {
          return undefined;
        }
        try {
          return moment(str);
        } catch (e) {
          return undefined;
        }
      };

      // Set field value
      const setFieldValue = (field: string, value: any) => {
        if (!value) {
          getForm().setFieldsValue({ [`${field}`]: undefined });
          return;
        }
        let str;
        const fieldValue = getForm().getFieldsValue()[field];
        if (field === 'updateAtStart' && !fieldValue && value.set && value.format) {
          str = value
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
            .format('YYYY-MM-DD HH:mm:ss');
        } else if (field === 'updateAtEnd' && !fieldValue && value.set && value.format) {
          str = value
            .set('hour', 23)
            .set('minute', 59)
            .set('second', 59)
            .format('YYYY-MM-DD HH:mm:ss');
        } else if (field === 'balanceDate' && !fieldValue && value.set && value.format) {
          str = value.set('hour', 0).set('minute', 0).set('second', 0).format('YYYY-MM-DD');
        } else if (value.format) {
          str = value.format('YYYY-MM-DD HH:mm:ss');
        } else {
          str = value.toString();
        }
        getForm().setFieldsValue({ [`${field}`]: str });
      };

      // On component mounted
      onMounted(() => {
        // Init methods
        getServiceDropdown().then((response) => {
          state.methods = response.serviceCode || [];
        });

        // Init pay groups
        getPayGroups({ type: 1 }).then((response: any) => {
          state.payGroups = response.list || [];
        });

        // Init bankcard groups
        getPayGroups({ type: 2 }).then((response: any) => {
          state.bankcardGroups = response.list || [];
        });

        // Init pay channels
        getPayChannel().then((response) => {
          state.payChannels = response.list || [];
        });

        // Init pay channel names
        getPayChannelName().then((response) => {
          state.payChannelNames = response.list || [];
        });

        // Init pay channel services
        getService().then((response: any) => {
          state.payChannelServices = response.list || [];
        });
      });
      return {
        state,
        reload,
        registerTable,
        handleCreate,
        convertMoment,
        setFieldValue,
      };
    },
  });
</script>

<style lang="scss" scoped>
  ::v-deep(.ant-table-column-title) {
    white-space: pre-wrap !important;
  }
</style>
