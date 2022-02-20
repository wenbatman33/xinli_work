<template lang="pug">
  .container-fluid
    .d-flex.justify-content-around.align-items-center
      el-date-picker(
        v-model="timeRange",
        type="daterange",
        value-format="yyyy-MM-dd",
        :clearable="false",
        @change="getData()",
        style="min-width: 300px"
      )
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
    .row
      el-table(:data="tableData", border, stripe, height="85vh")
        el-table-column(label="日期", prop="logCreatedAt", align="center", width="160")
        el-table-column(label="类型", prop="logType", align="center")
        el-table-column(label="金额", align="center", width="120")
          span(slot-scope="{ row }") {{ row.logAmount | formatMoney }}
        el-table-column(label="交易前", align="center", width="120")
          span(slot-scope="{ row }") {{ row.logTransactionBefore | formatMoney }}
        el-table-column(label="交易后", align="center", width="120")
          span(slot-scope="{ row }") {{ row.logTransactionAfter | formatMoney }}
        el-table-column(label="交易对象", prop="logTransactionUnit", align="center")
        el-table-column(label="备注", prop="logNote", align="center", show-overflow-tooltip)
        el-table-column(label="相关单号", prop="logRelationOrderId", align="center")
</template>

<script>
import { getMemberWalletRecordAPI  } from '@/api/record/record.js';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      timeRange: []
    }
  },
  mounted() {
    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-01`;
    this.timeRange = [startDate, endDate];

    this.getData();
  },
  props: ['memberId'],
  methods: {
    getData() {
      getMemberWalletRecordAPI(this.memberId, {
        per_page: this.pageSize,
        page: this.currentPage,
        sdate: this.timeRange[0] + ' 00:00:00',
        edate: this.timeRange[1] + ' 23:59:59',
      }).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    }
  }
}
</script>
