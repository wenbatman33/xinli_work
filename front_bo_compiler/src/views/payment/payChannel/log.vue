<template lang="pug">
  .container-fluid
    //- 分页 表格上方
    el-card.mb-4
      .d-flex.justify-content-between
        .d-flex.flex-column(v-if="gateData[0] !== undefined")
          div 通道：{{ gateData[0].gateName }}
          div 商户编号：{{ gateData[0].gateSn }}
          div 交易设定：{{ gateData[0].gateFeeType.display }}
        .d-flex.flex-column.justify-content-between
          div
            | 日期：
            el-date-picker(
              v-model="datetime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="開始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
              @change="getData()"
            )
          div(v-if="paymentData[0] !== undefined") 数量：{{ paymentData[0].incomeCount + paymentData[0].expenditureCount }} (收入：{{ paymentData[0].incomeCount}} 支出：{{ paymentData[0].expenditureCount }})
    .d-flex.justify-content-between.align-items-end.mb-4
      el-table(:data="paymentData", :border="true")
        el-table-column(label="收入总额", align="center")
          span(slot-scope="{ row }") {{ row.income | formatMoney }}
        el-table-column(label="支出总额", align="center")
          span(slot-scope="{ row }") {{ row.expenditure | formatMoney }}
        el-table-column(label="手续费总额", align="center")
          span(slot-scope="{ row }") {{ row.fee | formatMoney }}
        el-table-column(label="收支差额", align="center")
          span(slot-scope="{ row }") {{ (row.income - row.expenditure) | formatMoney }}
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
      el-table(:data="tableData", :stripe="true", height="75vh")
        el-table-column(label="交易时间", align="center", width="180")
          template(slot-scope="{ row }")
            span {{ row.succeededAt }}
        el-table-column(label="摘要", align="center", width="120")
          template(slot-scope="{ row }")
            span {{ row.title }}
        el-table-column(label="收入", align="center", width="100")
          template(slot-scope="{ row }")
            span {{ row.income }}
        el-table-column(label="支出", align="center", width="100")
          template(slot-scope="{ row }")
            span {{ row.expenditure }}
        el-table-column(label="手續費", align="center", width="100")
          template(slot-scope="{ row }")
            span {{ row.fee }}
        el-table-column(label="备注", align="center")
          template(slot-scope="{ row }")
            span {{ row.remark }}
        el-table-column(label="来源", prop="source", align="center", width="80")
        el-table-column(label="操作人", align="center", width="80")
          template(slot-scope="{ row }")
            span {{ row.editor }}
</template>

<script>
import {
  getChannelAPI,
  getPayChannelTransLogAPI,
  getPayChannelStatisticAPI
} from '@/api/payment/payChannel';

export default {
  data() {
    return {
      datetime: [],
      gateData: [],
      paymentData: [],
      tableData: [],
      start_time: null,
      end_time: null,
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  methods: {
    getData() {

      getPayChannelStatisticAPI(this.$route.query.id, {
        params: {
          created_at_from: this.datetime[0],
          created_at_to: this.datetime[1],
        }
      }).then((res) => {
        this.paymentData = [];
        this.paymentData.push(res.data.data);
      });

      getPayChannelTransLogAPI(this.$route.query.id, {
        params: {
          per_page: this.pageSize,
          page: this.currentPage,
          created_at_from: this.datetime[0],
          created_at_to: this.datetime[1],
        }
      }).then((response) => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
  },
  mounted() {
    getChannelAPI(this.$route.query.id).then((res) => {
      this.gateData = res.data.data;
    });
  },
  created() {
    const now = new Date();
    const fullDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.start_time = fullDate + ' 00:00:00';
    this.end_time = fullDate + ' 23:59:59';
    this.datetime = [this.start_time, this.end_time];
    this.getData();
  },
}
</script>

<style lang="scss">
.el-cascader {
  display: block;
}
</style>
