<template>
  <div style="width: 1920px" class="min-h-full grid grid-cols-root items-stretch">
    <!-- Page content start -->
    <Card class="flex flex-col items-stretch">
      <!-- Header start -->
      <div class="grid grid-cols-header gap-12px">
        <!-- Title start -->
        <Breadcrumb>
          <span>提款审核</span>
          <span> / </span>
          <span>{{ title }}</span>
        </Breadcrumb>
        <!-- Title end -->

        <!-- Reject start -->
        <a-button v-if="showRejectButton" type="primary" @click="handleReject">退回</a-button>
        <!-- Reject end -->

        <!-- Submit risk start -->
        <a-button v-if="showSubmitRiskButton" type="primary" @click="handleSubmitRisk">
          通过并提交风控
        </a-button>
        <!-- Submit risk end -->

        <!-- Pass start -->
        <a-button v-if="showPassButton" type="primary" @click="handlePass">通过</a-button>
        <!-- Pass end -->

        <!-- log start -->
        <div class="checkLog" v-if="state.withdrawalData.status?.key !== 1">
          <a href="#" class="absolute right-4" @click.prevent="showLogs">查看全部</a>
          <template v-for="(li, index) in state.withdrawalData.checkNote">
            <p v-if="index < 2">{{ li }}</p>
          </template>
        </div>
        <!-- log end -->
      </div>
      <!-- Header end -->

      <!-- Info start -->
      <div class="mt-4 grid grid-cols-2 gap-12px">
        <!-- Withdrawal description start -->
        <Description
          :column="2"
          :schema="withdrawalDescriptionSchemas"
          :data="state.withdrawalData"
        />
        <!-- Withdrawal description end -->

        <!-- Member description start -->
        <Description :column="3" :schema="memberInfoDescriptionSchemas" :data="memberInfoWithGroup" />
        <!-- Member description end -->
      </div>
      <!-- Info end -->

      <!-- Stake form start -->
      <div class="py-4">
        <BasicForm @register="registerStakeForm">
          <!-- Form date field start -->
          <template #date="{ values, schema }">
            <div class="flex flex-row items-center">
              <DatePicker
                format="YYYY/MM/DD"
                :allowClear="false"
                :value="convertMoment(values[schema.componentProps.start])"
                @update:value="setStakeFieldValue(schema.componentProps.start, $event)"
              />
              <TimePicker
                format="HH:mm"
                :allowClear="false"
                :value="convertMoment(values[schema.componentProps.start])"
                @update:value="setStakeFieldValue(schema.componentProps.start, $event)"
              />
              <span class="flex-shrink-0 px-4">～</span>
              <DatePicker
                format="YYYY/MM/DD"
                :allowClear="false"
                :value="convertMoment(values[schema.componentProps.end])"
                @update:value="setStakeFieldValue(schema.componentProps.end, $event)"
              />
              <TimePicker
                format="HH:mm"
                :allowClear="false"
                :value="convertMoment(values[schema.componentProps.end])"
                @update:value="setStakeFieldValue(schema.componentProps.end, $event)"
              />
            </div>
          </template>
          <!-- Form date field end -->

          <!-- Form span field start -->
          <template #span="{ field, values }">
            <span>{{ values[field] }}</span>
          </template>
          <!-- Form span field end -->
        </BasicForm>
      </div>
      <!-- Stake form end -->

      <!-- Promote info start -->
      <div class="grid grid-cols-promote items-center gap-12px">
        <!-- Promote list start -->
        <Card class="bg-promote">
          <div class="flex flex-col items-stretch">
            <span>存款红利领取</span>
            <a href="#" @click.prevent="openWindow('/promotion/list?ID=' + li.promotionID)" v-for="li in state.promotionMemberWithdraw" :key="li.promotionID">{{li.promotionName}}</a>
          </div>
        </Card>
        <!-- Promote list end -->

        <!-- Promote rule start -->
        <Card class="bg-promote">
          <div class="flex flex-col items-stretch">
            <span>游戏限制</span>
            <span>$Game1、$Game2</span>
          </div>
        </Card>
        <!-- Promote rule end -->
      </div>
      <!-- Promote info end -->

      <!-- Stake info start -->
      <div class="grid grid-cols-promote gap-12px">
        <!-- Wallet log start -->
        <BasicTable @register="registerWalletLogTable">
          <!-- Table in-out column start -->
          <template #inOut="{ text }">
            <WalletLogInOut :inOut="text" :inOutTypeList="state.inOutTypeList" />
          </template>
          <!-- Table in-out column end -->

          <!-- Table type column start -->
          <template #type="{ text }">
            <WalletLogType :type="text" :useTypeList="state.useTypeList" />
          </template>
          <!-- Table type column end -->

          <!-- Table note column start -->
          <template #note="{ text, record }">
            <WalletLogNote :note="text" :refID="record.refID" />
          </template>
          <!-- Table note column end -->
        </BasicTable>
        <!-- Wallet log end -->

        <!-- Stake detail start -->
        <BasicTable @register="registerStakeDetailTable" @fetch-success="onFetchSuccess" />
        <!-- Stake detail end -->
      </div>
      <!-- Stake info end -->
    </Card>
    <!-- Page content end -->

    <!-- Withdrawal list start -->
    <Card>
      <div class="flex flex-col items-stretch">
        <!-- Title start -->
        <Breadcrumb>
          <span>提款单</span>
        </Breadcrumb>
        <!-- Title start -->

        <!-- Stake detail start -->
        <BasicTable @register="registerWithdrawalListTable">
          <!-- Table member column start -->
          <template #member="{ text }">
            <WithdrawalMember :member="text" />
          </template>
          <!-- Table member column end -->

          <!-- Table member column start -->
          <template #amount="{ text, record }">
            <a :href="`/withdrawal/financial/check/${record.transactionID}`">{{ text }}</a>
          </template>
          <!-- Table member column end -->

          <!-- Table status column start -->
          <template #status="{ text }">
            <WithdrawalStatus :status="text" />
          </template>
          <!-- Table status column end -->
        </BasicTable>
        <!-- Stake detail end -->
      </div>
    </Card>
    <!-- Withdrawal list end -->

    <!-- Reject modal start -->
    <RejectModal
      v-model:visible="state.showRejectModal"
      :record="state.withdrawalData"
      @reload="handleReload"
    />
    <!-- Reject modal end -->

    <!-- Submit risk modal start -->
    <SubmitRiskModal
      v-model:visible="state.showSubmitRiskModal"
      :record="state.withdrawalData"
      @reload="handleReload"
    />
    <!-- Submit risk modal end -->

    <!-- Pass modal start -->
    <PassModal
      v-model:visible="state.showPassModal"
      :record="state.withdrawalData"
      @reload="handleReload"
    />
    <!-- Pass modal end -->

    <!-- Reviewing modal start -->
    <ReviewingModal v-model:visible="state.showReviewingModal" :record="state.withdrawalData" />

    <LogModal @register="logModalRegister" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, computed, onMounted, nextTick } from 'vue';
  import { useRoute } from 'vue-router';
  import { Card, Breadcrumb, DatePicker, TimePicker } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { BasicForm, useForm } from '/@/components/Form';
  import { BasicTable, useTable } from '/@/components/Table';
  import { Description } from '/@/components/Description';
  import { WalletLog } from '/@/api/member/member';
  import { getUseType, getInOutType } from '/@/api/money/money';
  import { UseType, InOutType } from '/@/api/money/model/moneyModel';
  import { getWithdrawal, getMemberInfo, getStake } from '/@/api/cashflow/withdrawal';
  import { getPromotionmMemberWithdraw } from '/@/api/promotion/member';
  import type { promotionList } from '/@/api/promotion/model/memberModel';
  import { WithdrawalItem, GetMemberInfoRsultModel, GetStakeParams } from '/@/api/cashflow/model/withdrawalModel';
  import WithdrawalMember from '/@/views/cashflow/withdrawal/components/WithdrawalMember.vue';
  import WithdrawalStatus from '/@/views/cashflow/withdrawal/components/WithdrawalStatus.vue';
  import {
    withdrawalDescriptionSchemas,
    memberInfoDescriptionSchemas,
    stakeSchemas,
    withdrawalSchemas,
  } from './components/formSchemas';
  import { walletLogColumns, stakeDetailColumns, withdrawalColumns } from './components/tableData';
  import WalletLogType from './components/WalletLogType.vue';
  import WalletLogInOut from './components/WalletLogInOut.vue';
  import WalletLogNote from './components/WalletLogNote.vue';
  import RejectModal from './components/RejectModal.vue';
  import SubmitRiskModal from './components/SubmitRiskModal.vue';
  import PassModal from './components/PassModal.vue';
  import ReviewingModal from './components/ReviewingModal.vue';
  import moment from 'moment';
  import { useModal } from '/@/components/Modal';
  import LogModal from './components/LogModal.vue';
  import { openWindow } from '/@/utils';

  /**
   * Component state interface
   */
  interface State {
    /** Show reject modal */
    showRejectModal: boolean;

    /** Show submit risk modal */
    showSubmitRiskModal: boolean;

    /** Show pass modal */
    showPassModal: boolean;

    /** Show reviewing modal */
    showReviewingModal: boolean;

    /** Reviewing modal shown */
    reviewingModalShown: boolean;

    /** Member Info */
    memberInfo: GetMemberInfoRsultModel;

    /** Withdrawal data */
    withdrawalData: WithdrawalItem;

    /** Use type list */
    useTypeList: UseType[];

    /** In-out type list */
    inOutTypeList: InOutType[];

    promotionMemberWithdraw: promotionList[];
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'FinancialCheck',
    components: {
    Card,
    Breadcrumb,
    DatePicker,
    TimePicker,
    Description,
    BasicForm,
    BasicTable,
    WithdrawalMember,
    WithdrawalStatus,
    WalletLogType,
    WalletLogInOut,
    WalletLogNote,
    RejectModal,
    SubmitRiskModal,
    PassModal,
    ReviewingModal,
    LogModal
},
    setup() {
      // Vue router
      const route = useRoute();

      // User store
      const userStore = useUserStore();

      // Component state
      const state = reactive<State>({
        showRejectModal: false,
        showSubmitRiskModal: false,
        showPassModal: false,
        showReviewingModal: false,
        reviewingModalShown: false,
        memberInfo: {},
        withdrawalData: {},
        useTypeList: [],
        inOutTypeList: [],
        promotionMemberWithdraw: [],
      });

      // Order sn
      const orderSn = computed(() => {
        return String(route.params?.sn);
      });

      // Title
      const title = computed(() => {
        return state.withdrawalData?.transactionID || '';
      });

      // Show reject button
      const showRejectButton = computed(() => {
        return (
          state.withdrawalData.status?.key === 1
        );
      });

      // Show submit risk button
      const showSubmitRiskButton = computed(() => {
        return (
          state.withdrawalData.status?.key === 1
        );
      });

      // Show pass button
      const showPassButton = computed(() => {
        return (
          state.withdrawalData.status?.key === 1 &&
          state.withdrawalData.riskCheck?.key === 4
        );
      });

      // bankGroup & third party group
      const memberInfoWithGroup = computed(() => {
        return Object.assign(state.memberInfo, {
          bankGroup: state.withdrawalData.bankGroup,
          thirdGroup: state.withdrawalData.thirdGroup,
        });
      });

      // Stake form definitions
      const [registerStakeForm, { setFieldsValue: setStakeField }] = useForm({
        labelWidth: 'auto',
        showActionButtonGroup: false,
        schemas: stakeSchemas,
      });

      // Wallet log table definitions
      const [registerWalletLogTable, { reload: reloadWalletLog }] = useTable({
        title: '资金纪录',
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: false,
        bordered: true,
        canResize: false,
        columns: computed(() => {
          return walletLogColumns(state.useTypeList, state.inOutTypeList);
        }),
        pagination: {
          pageSize: 50,
        },
        api: async () => {
          const memberId = state.withdrawalData?.member?.key || 0;
          if (!memberId) {
            return [];
          }
          const response = await WalletLog({
            memberID: memberId,
          });
          return response?.list || [];
        },
      });

      // Stake detail table definitions
      const [registerStakeDetailTable, { reload: reloadStake, expandAll }] = useTable({
        title: '流水详情 Stake Detail',
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: false,
        bordered: true,
        canResize: false,
        immediate: false,
        isTreeTable: true,
        columns: stakeDetailColumns,
        rowClassName: (record) => {
          return record.warning === true ? 'red' : '';
        },
        // rowClassName: ({record}) => { console.log(record); return (record.warning === true ? 'red' : 'blue')},
        pagination: {
          pageSize: 50,
        },
        api: async () => {
          const member = state.memberInfo;
          // console.log(state.withdrawalData);
          //注意載入順序，一定機率會出現member沒有key的情況
          const params:GetStakeParams = {
            id: state.withdrawalData?.member?.key,
            startTime: moment(member.turnoverDurationStart).format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment(member.turnoverDurationEnd).format('YYYY-MM-DD HH:mm:ss'),
          };
          const response = await getStake(params);
          //轉換成树形结构
          response.list.forEach((item) => {
            item.children = item.list;
          });
          return response?.list || [];
        },
      });

      const onFetchSuccess = ()=>{
        //讀取完資料後展開樹形結構
        nextTick(expandAll);
      }

      // Withdrawal list table definitions
      const [
        registerWithdrawalListTable,
        { getForm: getWithdrawalListForm, reload: reloadWithdrawalList },
      ] = useTable({
        showIndexColumn: false,
        showTableSetting: true,
        useSearchForm: true,
        bordered: true,
        canResize: false,
        columns: withdrawalColumns,
        immediate: false,
        formConfig: {
          showResetButton: false,
          showAdvancedButton: true,
          autoSubmitOnEnter: true,
          autoAdvancedLine: 1,
          schemas: withdrawalSchemas,
          baseRowStyle: {
            alignItems: 'center',
          },
        },
        pagination: {
          pageSize: 50,
        },
        api: async (arg) => {
          // if (!arg.memberAccount) {
          //   return [];
          // }
          const query = Object.assign({}, arg);
          Object.keys(query).forEach((key) => {
            if (query[key] === undefined || query[key] === '' || query[key] === Number.MIN_VALUE) {
              delete query[key];
            }
          });
          const response = await getWithdrawal(query);
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

      // Set stake form date field value
      const setStakeFieldValue = (field: string, value: any) => {
        if (!value) {
          setStakeField({ [`${field}`]: undefined });
          return;
        }
        let str;
        if (value.format) {
          str = value.format('YYYY-MM-DD HH:mm:ss');
        } else {
          str = value.toString();
        }
        setStakeField({ [`${field}`]: str });
      };

      // Get withdrawal data
      const getWithdrawalData = async () => {
        // Get withdrawal
        const response = await getWithdrawal({
          orderSn: orderSn.value,
        });
        state.withdrawalData = response.list?.[0] || {};
        // Show reviewing model
        if (!state.reviewingModalShown) {
          if (state.withdrawalData?.financialCheck?.key == 6) {
            if (userStore.userInfo?.name != state.withdrawalData?.updatedBy) {
              state.showReviewingModal = true;
              state.reviewingModalShown = true;
            }
          }
        }

        // Get withdraw list and wallet log
        // const memberAccount = state.withdrawalData?.member?.value?.account || '';
        // await getWithdrawalListForm().setFieldsValue({ initial: true });
        // await getWithdrawalListForm().setFieldsValue({ memberAccount });
        // await reloadWithdrawalList();
        await reloadWalletLog();
      };

      // Get member info
      const getMemberInfoData = async () => {
        // Get member info
        const response = await getMemberInfo({
          id: orderSn.value,
        });
        state.memberInfo = response || {};
        await getPromotionData();
        // Update stack field
        await reloadStake();
        await setStakeField({
          intervalStart: moment(response?.turnoverDurationStart || '').format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          intervalEnd: moment(response?.turnoverDurationEnd || '').format('YYYY-MM-DD HH:mm:ss'),
          required: 0,
          current: 0,
          gap: 0,
        });
      };

      // Get promotion info
      const getPromotionData = async () => {
        // Get member info
        const response = await getPromotionmMemberWithdraw({
          memberID: state.withdrawalData.member?.key,
          startTime: moment(state.memberInfo.turnoverDurationStart || '').format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment(state.memberInfo.turnoverDurationEnd || '').format('YYYY-MM-DD HH:mm:ss'),
          promotionCondType: 1,
          status: 4,
        });
        state.promotionMemberWithdraw = response.list || {};
      };

      // Handle reject button click
      const handleReject = () => {
        state.showRejectModal = true;
      };

      // Handle submit risk button click
      const handleSubmitRisk = () => {
        state.showSubmitRiskModal = true;
      };

      // Handle pass button click
      const handlePass = () => {
        state.showPassModal = true;
      };

      // Handle reload data
      const handleReload = () => {
        // Get withdrawal data
        getWithdrawalData();
      };

      const [logModalRegister, { openModal: openLogModal }] = useModal();
      const showLogs = () => {
        openLogModal(true, {
          record: state.withdrawalData.checkNote,
        })
      }

      // On component mounted
      onMounted(() => {
        // Get withdrawal data
        getWithdrawalData();

        // Get member info data
        getMemberInfoData();

        // Get use type
        getUseType().then((response) => {
          state.useTypeList = response.list || [];
        });

        // Get in-out type
        getInOutType().then((response) => {
          state.inOutTypeList = response.list || [];
        });

        document.body.style.setProperty('overflow-x', 'auto', 'important');
      });
      return {
        state,
        title,
        showRejectButton,
        showSubmitRiskButton,
        showPassButton,
        withdrawalDescriptionSchemas,
        memberInfoDescriptionSchemas,
        registerStakeForm,
        registerWalletLogTable,
        registerStakeDetailTable,
        registerWithdrawalListTable,
        convertMoment,
        setStakeFieldValue,
        handleReject,
        handleSubmitRisk,
        handlePass,
        handleReload,
        onFetchSuccess,
        showLogs,
        logModalRegister,
        openWindow,
        memberInfoWithGroup,
      };
    },
  });
</script>

<style lang="scss" scoped>
  ::v-deep(.ant-form-item) {
    margin-bottom: 0 !important;
  }

  ::v-deep(.ant-table-column-title) {
    white-space: pre-wrap !important;
  }

  ::v-deep(.red) {
    color: red;
  }

  .grid-cols-root {
    grid-template-columns: 1fr 450px;
  }

  .grid-cols-header {
    grid-template-columns: 1fr auto auto auto;
  }

  .grid-cols-promote {
    grid-template-columns: 1fr 470px;
  }

  .gap-12px {
    grid-gap: 12px;
  }

  .bg-promote {
    background-color: #f0f0f0;
  }

  .checkLog{
    background: #eee;
    position: relative;
    padding-right: 8rem;
    padding-left: 2rem;
    p{
      list-style: disc;
      margin: .5rem 0;
      max-width: 42rem;
      position: relative;
      color: #000;
      &:before{
        content: '。';
        position: absolute;
        left: -1rem;
        top: -.3rem;
      }
    }
  }
</style>
