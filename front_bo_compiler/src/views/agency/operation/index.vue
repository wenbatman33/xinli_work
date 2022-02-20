<template lang="pug">
  .container-fluid
    data-filter.commission--filter(ref="dataFilter", :filterList="filterList", :filterShow="filterShow", @change="getData()")
    .d-flex.justify-content-around.align-items-center
      el-input(v-model="account", placeholder="请输入代理帐号", @input="debounceGetData()", clearable)
        el-select(v-model="agencyOption", slot="prepend", style="width: 160px", @change="changeAgencyOption()")
          el-option(label="仅查看一级代理", :value="1")
          el-option(label="查看一、二级代理", :value="2")
          el-option(label="仅查看二级代理", :value="3")
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
      el-table(:data="tableData", border, stripe, @sort-change="sortChange", show-summary, :summary-method="total", max-height="75vh", :height="`${100 + tableData.length * 44}px`")
        el-table-column(label="日期", prop="reportDate", align="center", width="120")
        el-table-column(label="代理帐号", prop="agencyAccount", align="center")
        el-table-column(label="代理名称", prop="agencyName", align="center")
        el-table-column(label="代理类型", prop="agencyType.display", align="center")
        el-table-column(label="代理等级", align="center", width="100", sortable="custom", prop="commission_level")
          span(slot-scope="{ row }") {{ row.agencyLevel }}
        el-table-column(label="注册人数", align="center", width="100", sortable="custom", prop="new_member_count")
          span(slot-scope="{ row }") {{ row.newMemberCount | formatMoney }}
        el-table-column(label="活跃人数", align="center", width="100", sortable="custom", prop="active_member_count")
          span(slot-scope="{ row }") {{ row.activeMemberCount | formatMoney }}
        el-table-column(label="存款金额", align="center", width="100", sortable="custom", prop="deposit_amount")
          span(slot-scope="{ row }") {{ row.depositAmount | formatMoney }}
        el-table-column(label="存款人数", align="center")
          span(slot-scope="{ row }") {{ row.depositPersonCount | formatMoney }}
        el-table-column(label="存款次数", align="center")
          span(slot-scope="{ row }") {{ row.depositCount | formatMoney }}
        el-table-column(label="提款金额", align="center", width="100", sortable="custom", prop="withdraw_amount")
          span(slot-scope="{ row }") {{ row.withdrawAmount | formatMoney }}
        el-table-column(label="提款人数", align="center")
          span(slot-scope="{ row }") {{ row.withdrawPersonCount | formatMoney }}
        el-table-column(label="提款次数", align="center")
          span(slot-scope="{ row }") {{ row.withdrawCount | formatMoney }}
        el-table-column(label="总流水", align="center", width="100", sortable="custom", prop="bet_amount")
          span(slot-scope="{ row }") {{ row.betAmount | formatMoney }}
        el-table-column(label="公司输赢", align="center", width="100", sortable="custom", prop="profit_amount")
          span(slot-scope="{ row }") {{ row.profitAmount | formatMoney }}
        el-table-column(label="公司净盈利", align="center", width="120", sortable="custom", prop="net_profit_amount")
          span(slot-scope="{ row }") {{ row.netProfitAmount | formatMoney }}
        el-table-column(label="总红利", align="center")
          span(slot-scope="{ row }") {{ row.bonusAmount | formatMoney }}
        el-table-column(label="红利人数", align="center")
          span(slot-scope="{ row }") {{ row.bonusCount | formatMoney }}
        el-table-column(label="存提手续费", align="center", width="100")
          span(slot-scope="{ row }") {{ row.feeAmount | formatMoney }}
        el-table-column(label="二级人数", align="center", width="100", sortable="custom", prop="secondary_agency_count")
          span(slot-scope="{ row }") {{ row.secondaryAgencyCount | formatMoney }}
</template>

<script>
import debounce from 'lodash/debounce';
import { getOperationRecordAPI, getOperationRecordSumAPI } from '@/api/agency/record.js';

export default {
  data() {
    return {
      tableData: [],
      tableTotal: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        {
          label: '代理类型',
          model: 'agencyType',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 1: '佣金', 2: '电销' },
          },
        },
      ],
      filterShow: [
        { label: '月份', model: 'date', component: 'filterMonthPicker' },
      ],
      account: '',
      agencyOption: 1
    }
  },
  mounted() {
    const now = new Date();
    this.$set(
      this.$refs.dataFilter.filterData,
      'date',
      `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}`
    );

    this.getData();
    this.debounceGetData = debounce(this.getData, 500);
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      if (APIParams.date) {
        APIParams.date += '-01';
      }

      if (this.account) {
        APIParams.agencyAccount = this.account.trim();
        APIParams.agencyOption = this.agencyOption;
      }

      if (this.dir) {
        APIParams.sort = this.dir;
        APIParams.orderBy = this.sortBy;
      } else {
        APIParams.sort = 'desc';
        APIParams.orderBy = 'id';
      }

      getOperationRecordAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });

      getOperationRecordSumAPI(APIParams).then(response => {
        const total = response.data.data[0];
        this.tableTotal = [
          '合计',
          '',
          '',
          '',
          '',
          this.$options.filters.formatMoney(total.newMemberCountSum),
          this.$options.filters.formatMoney(total.activeMemberCountSum),
          this.$options.filters.formatMoney(total.depositAmountSum),
          '',
          '',
          this.$options.filters.formatMoney(total.withdrawAmountSum),
          '',
          '',
          this.$options.filters.formatMoney(total.betAmountSum),
          this.$options.filters.formatMoney(total.profitAmountSum),
          this.$options.filters.formatMoney(total.netProfitAmountSum),
          this.$options.filters.formatMoney(total.bonusAmountSum),
          '',
          '',
          this.$options.filters.formatMoney(total.secondaryAgencyCountSum)
        ];
      });
    },
    sortChange({ prop, order }) {
      this.sortBy = prop;
      this.dir = { descending: 'desc', ascending: 'asc' }[order] || '';
      this.getData();
    },
    total() {
      return this.tableTotal;
    },
    changeAgencyOption() {
      if (this.account) {
        this.getData();
      }
    }
  }
}
</script>
