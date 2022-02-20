<template lang="pug">
  .d-flex.flex-wrap(style="height: calc(100vh - 520px)")
    //- 存款
    el-card.w-50(v-if="permission.includes('deposit')")
      .d-flex
        h5 存款记录
        .mx-2 存款总额：{{ depositSum.paymentSumAmount | formatMoney }}
        .mx-2 最高金额：{{ depositSum.paymentMaxAmount | formatMoney }}
        .mx-2 存款次数：{{ depositSum.paymentCompletedCnt }}
        .mx-2 平均金额：{{ depositSum.paymentAvgAmount | formatMoney }}
      el-table(:data="deposit")
        el-table-column(v-if="fieldPerms.transDepAllStatus" label="状态", prop="transDepAllStatus.display", align="center")
        el-table-column(v-if="fieldPerms.transDepAllSuccessTime" label="交易时间", prop="transDepAllSuccessTime", align="center")
        el-table-column(v-if="fieldPerms.transDepAllAmount" label="交易金额", align="center")
          span(slot-scope="{ row }") {{ row.transDepAllAmount | formatMoney }}
    //- 提款
    el-card.w-50(v-if="permission.includes('withdraw')")
      .d-flex
        h5 提款记录
        .mx-2 提款总额：{{ withdrawSum.paymentSumAmount | formatMoney }}
        .mx-2 最高金额：{{ withdrawSum.paymentMaxAmount | formatMoney }}
        .mx-2 提款次数：{{ withdrawSum.paymentCompletedCnt }}
        .mx-2 平均金额：{{ withdrawSum.paymentAvgAmount | formatMoney }}
      el-table(:data="withdraw")
        el-table-column(v-if="fieldPerms.transDepAllStatus" label="状态", prop="transDepAllStatus.display", align="center")
        el-table-column(v-if="fieldPerms.transDepAllSuccessTime" label="交易時間", prop="transDepAllSuccessTime", align="center")
        el-table-column(v-if="fieldPerms.transDepAllAmount" label="金額", prop="transDepAllAmount", align="center")
          span(slot-scope="{ row }") {{ row.transDepAllAmount | formatMoney }}
    //- 虚拟优惠
    el-card.w-50(v-if="permission.includes('promotionVirtual')")
      .d-flex
        h5 虚拟优惠记录
        .mx-2 优惠总额：{{ promotionVirtualSum.promotionSumBonus | formatMoney }}
        .mx-2 最高金额：{{ promotionVirtualSum.promotionMaxBonus | formatMoney }}
        .mx-2 优惠笔数：{{ promotionVirtualSum.promotionCompletedCnt || 0 }}
        .mx-2 平均金额：{{ promotionVirtualSum.promotionAvgBonus | formatMoney }}
      el-table(:data="promotionVirtual")
        el-table-column(v-if="fieldPerms.promotionDetailStatus" label="状态", prop="promotionDetailStatus.display", align="center")
        el-table-column(v-if="fieldPerms.promotionDetailUpdatedAt" label="更新日期", prop="promotionDetailUpdatedAt", align="center")
        el-table-column(v-if="fieldPerms.promotionBonus" label="金额", align="center")
          span(slot-scope="{ row }") {{ row.promotionBonus | formatMoney }}
    //- 实体优惠
    el-card.w-50(v-if="permission.includes('promotionReal')")
      .d-flex
        h5 实体优惠记录
        .mx-2 优惠总额：{{ promotionRealSum.promotionSumBonus | formatMoney }}
        .mx-2 最高金额：{{ promotionRealSum.promotionMaxBonus | formatMoney }}
        .mx-2 优惠笔数：{{ promotionRealSum.promotionCompletedCnt || 0 }}
        .mx-2 平均金额：{{ promotionRealSum.promotionAvgBonus | formatMoney }}
      el-table(:data="promotionReal")
        el-table-column(v-if="fieldPerms.promotionDetailStatus" label="状态", prop="promotionDetailStatus.display", align="center")
        el-table-column(v-if="fieldPerms.promotionBonus" label="奖励", prop="promotionBonus", align="center")
        el-table-column(v-if="fieldPerms.promotionDetailUpdatedAt" label="更新日期", prop="promotionDetailUpdatedAt", align="center")
</template>

<script>
import { getCashOverviewAPI } from '@/api/record/record';

export default {
  data() {
    return {
      deposit: [],
      depositSum: [],
      withdraw: [],
      withdrawSum: [],
      promotionVirtual: [],
      promotionVirtualSum: [],
      promotionReal: [],
      promotionRealSum: [],
    }
  },
  props: ['fieldPerms', 'memberId', 'dateTime', 'permission'],
  created() {
    this.init();
  },
  methods: {
    init() {
      getCashOverviewAPI({
        memberId: this.memberId,
        dateStart: this.dateTime[0],
        dateEnd: this.dateTime[1],
      }).then(response => {
        this.permission.map(scope => {
          this[scope] = JSON.parse(response.data[scope].data).data;
          this[`${scope}Sum`] = JSON.parse(response.data[`${scope}Sum`].data).data[0];
        });
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
