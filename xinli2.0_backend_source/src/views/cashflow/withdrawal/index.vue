<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <!-- Withdrawal table start -->
    <BasicTable size="small" @register="registerTable">
      <!-- Toolbar template start -->
      <template #toolbar>
        {{ title }}
      </template>
      <!-- Toolbar template end -->

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

      <!-- Form credit date template start -->
      <template #form-creditDate="{ field, values }">
        <DatePicker
          format="YYYY/MM/DD"
          :value="convertMoment(values[field])"
          @update:value="setFieldValue(field, $event)"
          @clear="console.log('clear')"
        />
      </template>
      <!-- Form credit date template end -->

      <!-- Table status column start -->
      <template #status="{ text }">
        <WithdrawalStatus :status="text" />
      </template>
      <!-- Table status column end -->

      <!-- Table member column start -->
      <template #member="{ text }">
        <WithdrawalMember :member="text" />
      </template>
      <!-- Table member column end -->

      <!-- Table financial check column start -->
      <template #financialCheck="{ text }">
        <WithdrawalFinancialCheck :financialCheck="text" />
      </template>
      <!-- Table financial check column end -->

      <!-- Table risk check column start -->
      <template #riskCheck="{ text }">
        <WithdrawalRiskCheck :riskCheck="text" />
      </template>
      <!-- Table risk check column end -->

      <!-- Table action column start -->
      <template #action="{ record }">
        <WithdrawalAction :record="record" @reload="reload" />
      </template>
      <!-- Table action column end -->
    </BasicTable>
    <!-- Withdrawal table end -->
  </PageWrapper>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, onMounted } from 'vue';
  import { DatePicker, TimePicker } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, FormProps, useTable } from '/@/components/Table';
  import { getPayGroups } from '/@/api/payment/payGroup';
  import { getWithdrawal } from '/@/api/cashflow/withdrawal';
  import { getBankCardDropdown } from '/@/api/payment/payBankCard';
  import { BankList } from '/@/api/payment/model/payBankCardModel';
  import { GetPayGroupsResponse } from '/@/api/payment/model/payGroupModel';
  import { withdrawalColumns } from './components/tableData';
  import { withdrawalSchemas } from './components/formSchemas';
  import WithdrawalStatus from './components/WithdrawalStatus.vue';
  import WithdrawalMember from './components/WithdrawalMember.vue';
  import WithdrawalFinancialCheck from './components/WithdrawalFinancialCheck.vue';
  import WithdrawalRiskCheck from './components/WithdrawalRiskCheck.vue';
  import WithdrawalAction from './components/WithdrawalAction.vue';
  import moment from 'moment';

  /**
   * Component state interface
   */
  interface State {
    /** 資料筆數 */
    count: number;

    /** 訂單總金額 */
    amount?: number;

    /** 訂單總手續費 */
    fee?: number;

    /** 銀行列表 */
    banks: BankList[];

    /** 三方金流群組列表 */
    payGroups: GetPayGroupsResponse[];

    /** 存款卡金流群組列表 */
    bankcardGroups: GetPayGroupsResponse[];
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'Withdrawal',
    components: {
      PageWrapper,
      BasicTable,
      DatePicker,
      TimePicker,
      WithdrawalStatus,
      WithdrawalMember,
      WithdrawalFinancialCheck,
      WithdrawalRiskCheck,
      WithdrawalAction,
    },
    setup() {
      // Component state
      const state = reactive<State>({
        count: 0,
        amount: 0,
        fee: 0,
        banks: [],
        payGroups: [],
        bankcardGroups: [],
      });

      // Title
      const title = computed<string>(() => {
        return `共计${state.count}笔，订单金额 ${state.amount}；交易手续费 ${state.fee}`;
      });

      // Form config
      const formConfig = computed<FormProps>(() => {
        return {
          showResetButton: false,
          showAdvancedButton: true,
          autoSubmitOnEnter: true,
          autoAdvancedLine: 1,
          schemas: withdrawalSchemas(state.banks, state.payGroups, state.bankcardGroups),
          baseColProps: {
            style: {
              padding: '0px 4px',
            },
          },
        };
      });

      // Table definition
      const [registerTable, { getForm, reload }] = useTable({
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: true,
        bordered: true,
        columns: withdrawalColumns,
        formConfig,
        pagination: {
          pageSize: 50,
        },
        actionColumn: {
          width: 160,
          title: 'Action',
          dataIndex: 'action',
          slots: {
            customRender: 'action',
          },
        },
        api: async (arg) => {
          const query = Object.assign({}, arg);
          Object.keys(query).forEach((key) => {
            if (query[key] === undefined || query[key] === '' || query[key] === Number.MIN_VALUE) {
              delete query[key];
            }
          });
          const response = await getWithdrawal(query);
          state.count = response.count || 0;
          state.amount = response.amount || 0;
          state.fee = response.fee || 0;
          return response.list || [];
        },
      });

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
        } else if (field === 'creditDate' && !fieldValue && value.set && value.format) {
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
        // Init banks
        getBankCardDropdown().then((response) => {
          state.banks = response.banks || [];
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
        title,
        reload,
        registerTable,
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
