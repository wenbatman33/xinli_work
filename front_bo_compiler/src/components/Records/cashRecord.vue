<template lang="pug">
  .container-fluid
    //- 玩家資金
    member-wallet(
      :wallet="memberInfo.backentMemberWallet",
      :limitation="memberInfo.backendMemberLimitation",
      :account="memberInfo.memberUserAccount",
    )
    .d-flex.justify-content-between.align-items-center.my-3
      el-date-picker(
        v-model="dateTime",
        type="daterange",
        value-format="yyyy-MM-dd",
        :clearable="false",
        @change="getData()",
      )
    el-tabs(type="border-card", v-model="active")
      el-tab-pane(v-for="(label, name) in tabs", :key="name", :label="label", :name="name")
      keep-alive(:exclude="exclude")
        component(
          ref="tab",
          :is="active",
          :memberId="memberInfo.id",
          :dateTime="dateTime",
          :fieldPerms="fieldPerms",
          :permission="permission"
        )
</template>

<script>
import memberWallet from '@/views/member/member/_wallet.vue';

export default {
  components: {
    memberWallet,
    overview: () => import('./cashTabs/overview.vue'),
    deposit: () => import('./cashTabs/deposit.vue'),
    withdrawal: () => import('./cashTabs/withdrawal.vue'),
    realPromotion: () => import('./cashTabs/realPromotion.vue'),
    virtualPromotion: () => import('./cashTabs/virtualPromotion.vue'),
  },
  data() {
    return {
      dateTime: [],
      tabs: {
        overview: '资金概况',
      },
      active: 'overview',
      exclude: [],
      permission: [],
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms', 'memberInfo', 'date'],
  created() {
    this.checkPermissions();
    if (this.date) {
      this.dateTime = this.date;
    } else {
      const now = new Date();
      this.dateTime = [`${now.getFullYear()}-01-01`, `${now.getFullYear()}-12-31`]
    }
  },
  methods: {
    getData() {
      this.exclude = Object.keys(this.tabs);
      this.$nextTick(() => {
        this.$refs.tab.init();
        this.exclude = [];
      });
    },

    checkPermissions() {
      if (this.checkCanShowDepositRecord()) {
        this.tabs.deposit = '存款记录';
        this.permission.push('deposit')
      }

      if (this.checkCanShowWithdrawalRecord()) {
        this.tabs.withdrawal = '提款记录';
        this.permission.push('withdraw')
      }

      if (this.checkCanShowVirtualPromotionRecord()) {
        this.tabs.virtualPromotion = '虚拟优惠记录';
        this.permission.push('promotionVirtual')
      }

      if (this.checkCanShowRealPromotionRecord()) {
        this.tabs.realPromotion = '实体优惠记录';
        this.permission.push('promotionReal')
      }
    },

    checkCanShowDepositRecord() {
      return this.buttonPerms.memberDetailDepositRecord
        || this.buttonPerms.checkWithdrawOrderDepositRecord
        || this.buttonPerms.riskCheckWithdrawOrderDepositRecord;
    },

    checkCanShowWithdrawalRecord() {
      return this.buttonPerms.memberDetailWithdrawRecord
        || this.buttonPerms.checkWithdrawOrderWithdrawRecord
        || this.buttonPerms.riskCheckWithdrawOrderWithdrawRecord;
    },

    checkCanShowVirtualPromotionRecord() {
      return this.buttonPerms.memberDetailVirtualPromotionRecord
        || this.buttonPerms.checkWithdrawOrderVirtualPromotionRecord
        || this.buttonPerms.riskCheckWithdrawOrderVirtualPromotionRecord;
    },

    checkCanShowRealPromotionRecord() {
      return this.buttonPerms.memberDetailRealPromotionRecord
        || this.buttonPerms.checkWithdrawOrderRealPromotionRecord
        || this.buttonPerms.riskCheckWithdrawOrderRealPromotionRecord;
    },
  },
}
</script>
