<template lang="pug">
  .container-fluid
    .d-flex.justify-content-between.align-items-center
      el-select(v-model="status", @change="getData()")
        el-option(v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value")
      div
        span.mx-3 优惠总额：{{ total.promotionSumBonus | formatMoney }}
        span.mx-3 最高金额：{{ total.promotionMaxBonus | formatMoney }}
        span.mx-3 优惠笔数：{{ total.promotionCompletedCnt || 0 }}
        span.mx-3 平均金额：{{ total.promotionAvgBonus | formatMoney }}
      el-pagination(
        :background="true",
        :pager-count="5",
        layout="sizes, prev, pager, next, jumper, total",
        :page-sizes="[20, 50, 100, 200, 300, 400, 500]",
        :page-size="pageSize",
        :total="dataTotal",
        :current-page.sync="currentPage",
        @current-change="getData",
        @size-change="size => { pageSize = size; getData() }"
      )
    el-table(:data="tableData" height="calc(100vh - 580px)")
      el-table-column(v-if="fieldPerms.promotionType.display" label="类型", prop="promotionType.display", align="center")
      el-table-column(v-if="fieldPerms.promotionTitle" label="来源", prop="promotionTitle", align="center")
      el-table-column(v-if="fieldPerms.promotionDetailStatus" label="状态", prop="promotionDetailStatus.display", align="center")
      el-table-column(v-if="fieldPerms.promotionBonus" label="金额", align="center")
        span(slot-scope="{ row }") {{ row.promotionBonus | formatMoney }}
      el-table-column(v-if="fieldPerms.promotionWithdrawLimit" label="流水倍数", prop="promotionWithdrawLimit", align="center")
      el-table-column(v-if="fieldPerms.promotionWithdrawBetamount" label="流水限制", prop="promotionWithdrawBetamount", align="center")
      el-table-column(v-if="fieldPerms.promotionDetailUpdatedAt" label="更新日期", prop="promotionDetailUpdatedAt", align="center")
      el-table-column(v-if="fieldPerms.promotionDetailNote" label="備註", prop="promotionDetailNote", align="center")
</template>

<script>
import { getMemberCashRecordPromotionAPI, getMemberCashRecordPromotionSumAPI } from '@/api/record/record';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      total: {},
      status: '1,2',
      statusOption: [
        {
          value: '1,2',
          label: '全部'
        },
        {
          value: 1,
          label: '红利'
        },
        {
          value: 2,
          label: '返水'
        },
      ],
    }
  },
  props: ['fieldPerms', 'memberId', 'dateTime'],
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getTotal();
      this.getData();
    },

    getData() {
      getMemberCashRecordPromotionAPI(this.memberId, {
        memberId: this.memberId,
        promotion_type: this.status,
        dateStart: this.dateTime[0],
        dateEnd: this.dateTime[1],
        page: this.currentPage,
        perPage: this.pageSize,
      }).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      }).catch(() => {});
    },

    getTotal() {
      getMemberCashRecordPromotionSumAPI(this.memberId, {
        memberId: this.memberId,
        promotion_type: this.status,
        dateStart: this.dateTime[0],
        dateEnd: this.dateTime[1],
      }).then(response => {
        this.total = response.data.data[0];
      }).catch(() => {});
    },
  },
}
</script>

