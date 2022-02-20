<template lang="pug">
  .container-fluid
    .d-flex.justify-content-around
      el-date-picker(
        v-model="timeRange",
        type="daterange",
        value-format="yyyy-MM-dd",
        :clearable="false",
        @change="getData()",
        style="min-width: 300px"
      )
      el-select.ml-3(v-model="status", @input="getData()", style="min-width: 140px")
        el-option(value="all", label="不限状态")
        el-option(:value="0", label="备货中")
        el-option(:value="1", label="已完成")
      el-input.ml-3(v-model="orderId", placeholder="请输入订单号", @input="debounceGetData()")
      el-input.ml-3(v-model="account", placeholder="请输入会员帐号", @input="debounceGetData()")
    .justify-content-end
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
      el-table(:data="tableData", border, stripe, show-summary, :summary-method="getSummaries", max-height="75vh", :height="`${90 + tableData.length * 46}px`")
        el-table-column(label="订单时间", prop="createdAt", align="center", width="180")
        el-table-column(label="会员帐号", align="center")
          template(slot-scope="{ row }")
            member-display(
              :memberName="row.memberAccount",
              :memberId="row.memberId",
              :groups="row.memberGroup"
            )
        el-table-column(label="订单号" align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openDetail(row.orderId)") {{ row.orderId }}
        el-table-column(label="数量", prop="quantity", align="center", width="100")
        el-table-column(label="完成时间", prop="successAt", align="center", width="180")
        el-table-column(label="商品状态", prop="status", align="center", width="100")
    //- detail lialog
    el-dialog(:visible.sync="dialogVisible")
      detail(v-if="dialogVisible", :orderId="dialogOrderId")
</template>

<script>
import debounce from 'lodash/debounce';
import { getGoodsBuyersAPI } from '@/api/dreamCity/goods';
import detail from '../order/_detail.vue';

export default {
  components: { detail },
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      account: '',
      timeRange: [],
      status: 'all',
      orderId: '',
      dialogVisible: false,
      dialogOrderId: ''
    }
  },
  created() {
    if (! this.$route.query.id) {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
      return this.$message.error('无此活动');
    }

    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    now.setDate(now.getDate() - 30);
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.timeRange = [startDate, endDate];

    this.getData();
    this.debounceGetData = debounce(this.getData, 500);
  },
  methods: {
    getData() {
      const params = {}
      const paramsTemp = {
        goods_id: this.$route.query.id,
        per_page: this.pageSize,
        page: this.currentPage,
        sdate: this.timeRange[0],
        edate: this.timeRange[1],
        account: this.account,
        order_id: this.orderId,
        status: this.status
      }

      Object.keys(paramsTemp).map(key => {
        if (paramsTemp[key] === 'all') return;
        if (paramsTemp[key] === 0 || paramsTemp[key]) {
          params[key] = paramsTemp[key];
        }
      })

      getGoodsBuyersAPI(params)
      .then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    getSummaries({ columns, data }) {
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
        } else if (column.label === '数量') {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            const sum = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);

            sums[index] = this.$options.filters.formatMoney(sum);
          } else {
            sums[index] = '';
          }
        } else {
          sums[index] = '';
        }
      });

      return sums;
    },
    openDetail(orderId) {
      this.dialogOrderId = orderId;
      this.dialogVisible = true;
    }
  }
}
</script>
