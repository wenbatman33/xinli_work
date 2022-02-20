<template>
  <!-- Table action start -->
  <TableAction :actions="actions" :dropDownActions="dropDownActions" />
  <!-- Table action end -->

  <!-- Risk check modal start -->
  <RiskCheckModal v-model:visible="state.showRiskCheck" :record="record" @reload="handleReload" />
  <!-- Risk check modal end -->

  <!-- Get note modal start -->
  <GetNoteModal v-model:visible="state.showGetNote" :record="record" />
  <!-- Get note modal end -->

  <!-- Post note modal start -->
  <PostNoteModal v-model:visible="state.showPostNote" :record="record" />
  <!-- Post note modal end -->

  <!-- Pass modal start -->
  <PassModal v-model:visible="state.showPass" :record="record" @reload="handleReload" />
  <!-- Pass modal end -->

  <!-- Reject modal start -->
  <RejectModal v-model:visible="state.showReject" :record="record" @reload="handleReload" />
  <!-- Reject modal end -->
</template>

<script lang="ts">
  import { defineComponent, reactive, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { ActionItem, TableAction } from '/@/components/Table';
  import { postWithdrawalAudit, postPayoutQuick } from '/@/api/cashflow/withdrawal';
  import { WithdrawalItem } from '/@/api/cashflow/model/withdrawalModel';
  import { useUserStore } from '/@/store/modules/user';
  import RiskCheckModal from './RiskCheckModal.vue';
  import GetNoteModal from './GetNoteModal.vue';
  import PostNoteModal from './PostNoteModal.vue';
  import PassModal from '/@/views/withdrawal/financial_check/components/PassModal.vue';
  import RejectModal from '/@/views/withdrawal/financial_check/components/RejectModal.vue';

  /**
   * Component state interface
   */
  interface State {
    /** Show risk check modal */
    showRiskCheck: boolean;

    /** Show get note modal */
    showGetNote: boolean;

    /** Show post note modal */
    showPostNote: boolean;

    /** Show pass modal */
    showPass: boolean;

    /** Show reject modal */
    showReject: boolean;
  }

  /**
   * Component definition
   */
  export default defineComponent({
    name: 'DepositAction',
    components: {
      TableAction,
      RiskCheckModal,
      GetNoteModal,
      PostNoteModal,
      PassModal,
      RejectModal,
    },
    props: {
      record: {
        type: Object as PropType<WithdrawalItem>,
      },
    },
    emits: ['reload'],
    setup(props, { emit }) {
      // Vue router
      const router = useRouter();

      // User store
      const userStore = useUserStore();

      // Component state
      const state = reactive<State>({
        showRiskCheck: false,
        showGetNote: false,
        showPostNote: false,
        showPass: false,
        showReject: false,
      });

      // Action types
      const actionType: Recordable<ActionItem> = {
        financialReview: {
          label: '審核 review',
          onClick: async () => {
            await postWithdrawalAudit({
              id: props.record?.transactionID,
            });
            const routeLocation = router.resolve({
              path: `/withdrawal/financial/check/${props.record?.transactionID}`,
            });
            window.open(routeLocation.href, '_blank');
            emit('reload');
          },
        },
        riskReview: {
          label: '風控審核',
          onClick: async () => {
            state.showRiskCheck = true;
          },
        },
        autoPay: {
          label: '快速出款AutoPay',
          onClick: async () => {
            await postPayoutQuick({
              id: props.record?.transactionID,
            });
            emit('reload');
          },
        },
        manualPay: {
          label: '手動出款 ManualPay',
          onClick: async () => {
            const routeLocation = router.resolve({
              path: `/withdrawal/payout/${props.record?.transactionID}`,
            });
            window.open(routeLocation.href, '_blank');
          },
        },
        record: {
          label: '查看紀錄 Record',
          onClick: async () => {
            state.showGetNote = true;
          },
        },
        reject: {
          label: '退回Reject',
          onClick: async () => {
            state.showReject = true;
          },
        },
        pass: {
          label: '通過 pass',
          onClick: async () => {
            state.showPass = true;
          },
        },
        remark: {
          label: '新增備註 Remark',
          onClick: async () => {
            state.showPostNote = true;
          },
        },
        paymentDetail: {
          label: '出款單',
          onClick: async () => {
            const routeLocation = router.resolve({
              path: `/withdrawal/payout/${props.record?.transactionID}`,
            });
            window.open(routeLocation.href, '_blank');
          },
        },
        reviewDetail: {
          label: '審核單',
          onClick: async () => {
            const routeLocation = router.resolve({
              path: `/withdrawal/financial/check/${props.record?.transactionID}`,
            });
            window.open(routeLocation.href, '_blank');
          },
        },
        creditDate: {
          label: '修改出帳日期',
          onClick: async () => {},
        },
      };

      // Action list
      const actionList = computed<ActionItem[]>(() => {
        const fnList = userStore.getFnList;
        const fn = (fn: string) => {
          return fnList.find((element) => element === fn) !== undefined;
        };
        const status = props.record?.status?.key || -1;
        const financialCheck = props.record?.financialCheck?.key || -1;
        const riskCheck = props.record?.riskCheck?.key || -1;
        const amount = props.record?.amount || -1;
        const array: ActionItem[] = [];
        if (status === 1) {
          const financialFn =
            fn('__btn_withdrawal_fin') && (financialCheck === 1 || financialCheck === 6);
          const riskFn =
            fn('__btn_withdrawal_risk') &&
            financialCheck !== 1 &&
            financialCheck !== 6 &&
            riskCheck === 1;
          return array
            .concat(financialFn ? actionType.financialReview : [])
            .concat(financialFn ? actionType.reject : [])
            .concat(financialFn ? actionType.pass : [])
            .concat(riskFn ? actionType.riskReview : [])
            .concat(actionType.record)
            .concat(actionType.remark);
        } else if (status === 2) {
          const payFn = fn('__btn_withdrawal_Pay');
          return array
            .concat(payFn && amount <= 40000 ? actionType.autoPay : [])
            .concat(payFn ? actionType.manualPay : [])
            .concat(actionType.record)
            .concat(actionType.remark)
            .concat(actionType.creditDate)
            .concat(actionType.reviewDetail);
        } else if (status === 3) {
          return [actionType.record, actionType.remark, actionType.reviewDetail];
        } else if (status === 4) {
          return [
            actionType.paymentDetail,
            actionType.record,
            actionType.remark,
            actionType.reviewDetail,
          ];
        } else if (status === 5) {
          return [
            actionType.record,
            actionType.remark,
            actionType.reviewDetail,
            actionType.paymentDetail,
          ];
        } else if (status === 6) {
          return [
            actionType.paymentDetail,
            actionType.record,
            actionType.remark,
            actionType.reviewDetail,
          ];
        } else {
          return array;
        }
      });

      // Table actions
      const actions = computed<ActionItem[]>(() => {
        return [actionList.value[0]] || [];
      });

      // Table dropdown actions
      const dropDownActions = computed<ActionItem[]>(() => {
        return actionList.value.slice(1) || [];
      });

      // Handle reload deposit list
      const handleReload = () => {
        emit('reload');
      };
      return {
        state,
        actions,
        dropDownActions,
        handleReload,
      };
    },
  });
</script>
