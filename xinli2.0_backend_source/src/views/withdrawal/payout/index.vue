<template>
  <Card class="w-full min-h-full flex flex-col items-stretch">
    <!-- Header start -->
    <div class="grid grid-cols-header gap-12px items-center">
      <!-- Title start -->
      <Breadcrumb>
        <span>提款审核</span>
        <span> / </span>
        <span>{{ orderSn }}</span>
      </Breadcrumb>
      <!-- Title end -->

      <!-- Status start -->
      <span>狀態 {{ status }}</span>
      <!-- Status end -->
    </div>
    <!-- Header end -->

    <!-- Withdrawal description start -->
    <Description
      class="mt-4"
      :column="2"
      :schema="withdrawalDescriptionSchemas"
      :data="withdrawalDescription"
    />
    <!-- Withdrawal description end -->

    <!-- Payout info start -->
    <div class="grid grid-cols-payout-info gap-12px items-center mt-4">
      <span class="p-4"> 预计出款 {{ withdrawalAmount }}，目前总计 {{ payoutAmount }} </span>
      <span></span>
      <div
        v-if="state.payoutList.length === 0"
        class="grid grid-cols-payout-limit gap-12px justify-items-stretch items-center p-4 bg-gray"
      >
        <span>系统拆单：每单</span>
        <Input type="number" :value="state.splitAmount" @update:value="handleUpdateSplitAmount" />
        <span>以下</span>
        <a-button type="primary" @click="handleSplit">一键拆单</a-button>
      </div>
    </div>
    <!-- Payout info end -->

    <!-- Payout table start -->
    <BasicTable @register="register">
      <!-- Table toolbar start -->
      <template #toolbar>
        <a-button type="primary" v-if="state.withdrawalData.status?.key !== 5" @click="handleCreate">新增出款</a-button>
      </template>
      <!-- Table toolbar end -->

      <!-- Table delete column start -->
      <template #delete="{ index, record }">
        <Icon
          v-if="!record?.status?.key"
          icon="ion:close-outline"
          class="cursor-pointer"
          @click="handleDelete(index)"
        />
      </template>
      <!-- Table delete column end -->

      <!-- Table amount column start -->
      <template #amount="{ index, record }">
        <Input
          v-if="!record?.status?.key"
          type="number"
          :value="record.amount"
          @update:value="handleUpdateAmount(index, record, $event)"
        />
        <span v-else>{{ toLocaleString(record.amount) }}</span>
      </template>
      <!-- Table amount column end -->

      <!-- Table pay type column start -->
      <template #payType="{ index, record }">
        <Dropdown v-if="!record?.status?.key" :trigger="['click']">
          <a class="ant-dropdown-link">{{
            getPayTypeValue(record?.payType?.key) || '选择出款方式'
          }}</a>
          <template #overlay>
            <Menu
              :multiple="false"
              :selectedKeys="[record?.payType?.key]"
              @click="handleUpdatePayType(index, $event)"
            >
              <MenuItem v-for="item in payTypes" :key="item['key']">
                {{ item['value'] }}
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
        <span v-else-if="record?.payType?.value !== undefined">{{ record.payType.value }}</span>
        <span v-else>-</span>
      </template>
      <!-- Table pay type column end -->

      <!-- Table pay id column start -->
      <template #payID="{ index, record }">
        <Dropdown v-if="!record?.status?.key && record?.payType?.key === 1" :trigger="['click']">
          <a class="ant-dropdown-link">{{ getBankcardValue(record?.payID?.key) || '选择卡号' }}</a>
          <template #overlay>
            <Menu
              :multiple="false"
              :selectedKeys="[record?.payID?.key]"
              @click="handleUpdatePayID(index, record, $event)"
            >
              <MenuItem v-for="item in state.bankcardList" :key="item['ID']">
                {{ item['cardNo'] }}
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
        <Dropdown
          v-else-if="!record?.status?.key && record?.payType?.key === 2"
          :trigger="['click']"
        >
          <a class="ant-dropdown-link">{{
            getPayChannelValue(record?.payID?.key) || '选择商户号'
          }}</a>
          <template #overlay>
            <Menu
              :multiple="false"
              :selectedKeys="[record?.payID?.key]"
              @click="handleUpdatePayID(index, record, $event)"
            >
              <MenuItem v-for="item in state.payChannelList" :key="item['id']">
                {{ item['name'] }} {{ item['sn'] }}
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
        <span v-else-if="record?.payID?.value !== undefined">{{ record.payID.value }}</span>
        <span v-else>-</span>
      </template>
      <!-- Table pay id column end -->

      <!-- Table status column start -->
      <template #status="{ index, record }">
        <div class="flex flex-row justify-center items-center" v-if="record?.status?.key === 1">
          <span style="color: #fcc687">付款中paying</span>
          <Icon
            icon="ion:refresh-outline"
            class="ml-2 cursor-pointer"
            @click="handleCallback(index, record)"
          />
        </div>
        <a-button v-else-if="record?.status?.key === 2" type="primary">失敗</a-button>
        <span v-else-if="record?.status?.key === 3" style="color: #5cb85c">已完成success</span>
        <a-button v-else type="primary" @click="handlePay(index, record)">出款Pay</a-button>
      </template>
      <!-- Table status column end -->
    </BasicTable>
    <!-- Payout table end -->
  </Card>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { Card, Breadcrumb, Input, Dropdown, Menu, message } from 'ant-design-vue';
  import { Description } from '/@/components/Description';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getPayChannel } from '/@/api/payment/payChannel';
  import { getBankCardList } from '/@/api/payment/payBankCard';
  import {
    getWithdrawal,
    getPayoutInfo,
    postWithdrawalCallback,
    postWithdrawalPay,
  } from '/@/api/cashflow/withdrawal';
  import {
    WithdrawalItem,
    PayoutItem,
    GetPayoutInfoResultModel,
    KeyValueItem,
  } from '/@/api/cashflow/model/withdrawalModel';
  import { PayChannelItem } from '/@/api/payment/model/payChannelModel';
  import { GetBankCardsResponse } from '/@/api/payment/model/payBankCardModel';
  import { Icon } from '/@/components/Icon';
  import { withdrawalDescriptionSchemas } from './components/formSchemas';
  import { payoutColumns } from './components/tableData';

  /**
   * Component state interface
   */
  interface State {
    /** Split amount */
    splitAmount: number;

    /** Withdrawal data */
    withdrawalData: WithdrawalItem;

    /** Payout data */
    payoutData: GetPayoutInfoResultModel;

    /** Payout list */
    payoutList: PayoutItem[];

    /** Bankcard list */
    bankcardList: GetBankCardsResponse[];

    /** Pay channel list */
    payChannelList: PayChannelItem[];
  }

  /**
   * Menu item component
   */
  const MenuItem = Menu.Item;

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'Payout',
    components: {
      Card,
      Breadcrumb,
      Input,
      Dropdown,
      Menu,
      MenuItem,
      Description,
      Icon,
      BasicTable,
    },
    setup() {
      // Vue router
      const route = useRoute();

      // Component state
      const state = reactive<State>({
        splitAmount: 0,
        withdrawalData: {},
        payoutData: {},
        payoutList: [],
        bankcardList: [],
        payChannelList: [],
      });

      // Order sn
      const orderSn = computed(() => {
        return String(route.params?.sn);
      });

      // Withdrawal amount
      const withdrawalAmount = computed(() => {
        return state.payoutData.payAmount || 0;
      });

      // Payout amount
      const payoutAmount = computed(() => {
        let total = 0;
        const payoutList = state.payoutList || [];
        payoutList.forEach((element) => {
          if (element.status?.key != 2) {
            const amount = element.amount || 0;
            total += amount;
          }
        });
        return total;
      });

      // Status
      const status = computed(() => {
        if (state.withdrawalData.status?.key === 1) {
          return '待审核';
        } else if (state.withdrawalData.status?.key === 2) {
          return '待出款 Ｗait';
        } else if (state.withdrawalData.status?.key === 3) {
          return '退回';
        } else if (state.withdrawalData.status?.key === 4) {
          return '出款中';
        } else if (state.withdrawalData.status?.key === 5) {
          return '完成';
        } else if (state.withdrawalData.status?.key === 6) {
          return '出款失败';
        } else {
          return '';
        }
      });

      // Withdrawal description
      const withdrawalDescription = computed(() => {
        return {
          transactionID: state.withdrawalData?.transactionID || '',
          lastUpdate: state.withdrawalData?.lastUpdate || '',
          amount: state.withdrawalData?.amount || '',
          status: state.withdrawalData?.status?.value || '',
          member: state.withdrawalData?.member?.value?.account || '',
          bankAccount: state.withdrawalData?.bankAccount || '',
          memberBankNo: state.withdrawalData?.memberBankNo || '',
          bankCode: state.withdrawalData?.bankCode || '',
        };
      });

      // Pay types
      const payTypes = computed<KeyValueItem[]>(() => {
        return [
          {
            key: 1,
            value: '银行卡',
          },
          {
            key: 2,
            value: '三方商户号',
          },
        ];
      });

      // Payout table definitions
      const [register, { updateTableData, setTableData }] = useTable({
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: false,
        bordered: true,
        canResize: false,
        columns: payoutColumns,
        pagination: {
          pageSize: 50,
        },
      });

      // Get withdrawal data
      const getWithdrawalData = async () => {
        const response = await getWithdrawal({
          orderSn: orderSn.value,
        });
        state.withdrawalData = response.list?.[0] || {};
      };

      // Get payout data
      const getPayoutData = async () => {
        const response = await getPayoutInfo({
          orderSn: orderSn.value,
        });
        state.payoutData = response || {};
        const payoutList = state.payoutList || [];
        const newPayoutList = response.payouts || [];
        for (let i = 0; i < newPayoutList.length; i++) {
          const newPayoutItem = newPayoutList[i];

          let existsInList = false;
          for (let j = 0; j < payoutList.length; j++) {
            const payoutItem = payoutList[j];
            if (payoutItem.id === newPayoutItem.id) {
              existsInList = true;
              payoutList.splice(j, 1, newPayoutItem);
              break;
            }
          }
          if (!existsInList) {
            payoutList.push(newPayoutItem);
          }
        }
        state.payoutList = payoutList;
        await setTableData(payoutList);
      };

      // Get bankcard data
      const getBankcardData = async () => {
        const response = await getBankCardList({
          type: 1,
        });
        state.bankcardList = response.list || [];
      };

      // Get pay channel data
      const getPayChannelData = async () => {
        const response = await getPayChannel({
          supplyAp: true,
        });
        state.payChannelList = response.list || [];
      };

      // Get pay type value by key
      const getPayTypeValue = (key) => {
        for (let i = 0; i < payTypes.value.length; i++) {
          const payType = payTypes.value[i];
          if (payType.key == key) {
            return payType.value;
          }
        }
        return '';
      };

      // Get bankcard value by id
      const getBankcardValue = (id) => {
        for (let i = 0; i < state.bankcardList.length; i++) {
          const bankcard = state.bankcardList[i];
          if (bankcard.ID == id) {
            return bankcard.cardNo;
          }
        }
        return '';
      };

      // Get pay channel value by id
      const getPayChannelValue = (id) => {
        for (let i = 0; i < state.payChannelList.length; i++) {
          const payChannel = state.payChannelList[i];
          if (payChannel.id == id) {
            return `${payChannel.name} ${payChannel.sn}`;
          }
        }
        return '';
      };

      // Convert value to locale string
      const toLocaleString = (value?: string | number) => {
        try {
          return Number(value || '0').toLocaleString();
        } catch (e) {
          return value;
        }
      };

      // Handle split button clicked
      const handleSplit = async () => {
        // Validate split amount
        const splitAmount = state.splitAmount || 0;
        if (splitAmount <= 0) {
          message.error('请输入拆单金额');
          return;
        }
        if (splitAmount % 10 === 0) {
          message.error('拆单金额尾数不可为0');
          return;
        }
        if (splitAmount > withdrawalAmount.value) {
          message.error('拆单金额不可大于预计出款金额');
          return;
        }

        // Validate payout list
        if (state.payoutList.length > 0) {
          message.error('已有出款记录无法进行拆单');
          return;
        }

        // Create payout list
        let id = 0;
        let remainAmount = withdrawalAmount.value;
        const payoutList: PayoutItem[] = [];
        while (remainAmount > 0) {
          payoutList.push({
            id: id,
            amount: remainAmount < splitAmount ? remainAmount : splitAmount,
          });
          id += 1;
          remainAmount -= splitAmount;
        }
        state.payoutList = payoutList;
        await setTableData(payoutList);
      };

      // Handle create button clicked
      const handleCreate = async () => {
        let latestId = -1;
        const payoutList = state.payoutList || [];
        payoutList.forEach((element) => {
          const id = element.id !== undefined ? element.id : -1;
          if (id > latestId) {
            latestId = id;
          }
        });
        payoutList.push({
          id: latestId + 1,
        });
        state.payoutList = payoutList;
        await setTableData(payoutList);
      };

      // Handle update split amount input field
      const handleUpdateSplitAmount = (event) => {
        state.splitAmount = Math.abs(Math.floor(Number(event)));
      };

      // Handle delete button clicked
      const handleDelete = async (index) => {
        state.payoutList.splice(index, 1);
        await setTableData(state.payoutList);
      };

      // Handle update amount input field
      const handleUpdateAmount = (index, record, event) => {
        const amount = Math.abs(Math.floor(Number(event)));
        state.payoutList[index].amount = amount;
        updateTableData(index, 'amount', amount);

        if (record?.payType?.key === 2) {
          const payChannelList = state.payChannelList || [];
          const payChannel = payChannelList.find((element) => element.id === record?.payID?.key);
          const amount = record?.amount || 0;
          const apFee = payChannel?.apFee || 0;
          const apPerFee = payChannel?.apPerFee || 0;
          updateTableData(index, 'fee', amount * (apFee / 1000) + apPerFee);
        } else {
          updateTableData(index, 'fee', 0);
        }
      };

      // Handle update pay type input field
      const handleUpdatePayType = (index, event) => {
        const id = event.key || undefined;
        const payType = { key: id };
        state.payoutList[index].payType = payType;
        state.payoutList[index].payID = undefined;
        updateTableData(index, 'payType', payType);
        updateTableData(index, 'payID', undefined);
        updateTableData(index, 'fee', undefined);
      };

      // Handle update pay id input field
      const handleUpdatePayID = (index, record, event) => {
        const id = event.key || undefined;
        const padID = { key: id };
        state.payoutList[index].payID = padID;
        updateTableData(index, 'payID', padID);

        if (record?.payType?.key === 2) {
          const payChannelList = state.payChannelList || [];
          const payChannel = payChannelList.find((element) => element.id === id);
          const amount = record?.amount || 0;
          const apFee = payChannel?.apFee || 0;
          const apPerFee = payChannel?.apPerFee || 0;
          updateTableData(index, 'fee', amount * (apFee / 1000) + apPerFee);
        } else {
          updateTableData(index, 'fee', 0);
        }
      };

      // Handle pay button clicked
      const handlePay = async (_index, record) => {
        // Validate amount
        const amount = record?.amount || 0;
        if (amount <= 0) {
          message.error('请输入出款金额');
          return;
        }

        // Validate pay type
        const payType = record?.payType?.key || 0;
        if (payType <= 0) {
          message.error('请选择出款方式');
          return;
        }

        // Validate pay id
        const payID = record?.payID?.key || 0;
        if (payID <= 0) {
          message.error('请选择商户号/卡号');
          return;
        }

        // Validate total amount
        if (payoutAmount.value > withdrawalAmount.value) {
          message.error('总出款金额超出提单金额');
          return;
        }

        // Retrieve fee
        const fee = record.fee || 0;

        // Post payout
        const response = await postWithdrawalPay({
          orderSN: orderSn.value,
          type: payType,
          id: payID,
          amount,
          fee,
        });

        // Validate response
        if (response.success) {
          getPayoutData();
        }
      };

      // Handle callback button clicked
      const handleCallback = async (_index, record) => {
        const response = await postWithdrawalCallback({
          id: record.id,
        });
        if (response.success) {
          message.success(`${record.id} 三方回调成功`);
        } else {
          message.warning(`${record.id} 三方回调未完成`);
        }
        getPayoutData();
      };

      // On component mounted
      onMounted(() => {
        // Get withdrawal data
        getWithdrawalData();

        // Get payout data
        getPayoutData();

        // Get bankcard data
        getBankcardData();

        // Get pay channel data
        getPayChannelData();
        
      });
      return {
        state,
        orderSn,
        status,
        withdrawalAmount,
        payoutAmount,
        payTypes,
        getPayTypeValue,
        getBankcardValue,
        getPayChannelValue,
        toLocaleString,
        handleSplit,
        handleCreate,
        handleUpdateSplitAmount,
        handleDelete,
        handleUpdateAmount,
        handleUpdatePayType,
        handleUpdatePayID,
        handlePay,
        handleCallback,
        withdrawalDescription,
        withdrawalDescriptionSchemas,
        register,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .grid-cols-header {
    grid-template-columns: 1fr auto;
  }

  .grid-cols-payout-info {
    grid-template-columns: auto 1fr auto;
  }

  .grid-cols-payout-limit {
    grid-template-columns: auto 1fr auto auto;
  }

  .gap-12px {
    grid-gap: 12px;
  }

  .bg-gray {
    background: #fafafa;
  }
</style>
