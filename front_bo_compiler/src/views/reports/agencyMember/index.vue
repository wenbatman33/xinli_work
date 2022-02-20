<template lang="pug">
  .container-fluid
    data-filter.commission--filter(ref="dataFilter", :filterList="filterList", :filterShow="filterShow", @change="getData()")
    .d-flex.justify-content-around.align-items-center
      el-radio-group(v-model="type", @change="getData()")
        el-radio-button(:label="1") 月报
        el-radio-button(:label="2") 日报
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
      el-table(:data="tableData", border, stripe, @sort-change="sortChange", height="75vh")
        el-table-column(label="日期", prop="date", align="center", width="120")
        el-table-column(label="会员帐号", align="center")
          template(slot-scope="{ row }")
            member-display(
              :memberName="row.memberAccount",
              :memberId="row.memberId",
              :groups="row.memberGroup"
            )
        el-table-column(label="会员姓名", prop="memberName", align="center")
        el-table-column(label="代理帐号", prop="agencyAccount", align="center")
        el-table-column(label="活跃状态", align="center")
          template(slot-scope="{ row }")
            span(v-if="row.isActive") 活跃
            span(v-else) 非活跃
        el-table-column(label="存款次数", align="center")
          span(slot-scope="{ row }") {{ row.depositCount | formatMoney }}
        el-table-column(label="存款金额", align="center", width="100", sortable="custom", prop="2")
          span(slot-scope="{ row }") {{ row.depositAmount | formatMoney }}
        el-table-column(label="存款手续费", align="center", width="100")
          span(slot-scope="{ row }") {{ row.depositFeeAmount | formatMoney }}
        el-table-column(label="提款次数", align="center")
          span(slot-scope="{ row }") {{ row.withdrawCount | formatMoney }}
        el-table-column(label="提款金额", align="center", width="100", sortable="custom", prop="3")
          span(slot-scope="{ row }") {{ row.withdrawAmount | formatMoney }}
        el-table-column(label="提款手续费", align="center", width="100")
          span(slot-scope="{ row }") {{ row.withdrawFeeAmount | formatMoney }}
        el-table-column(label="总流水", align="center", width="100", sortable="custom", prop="1")
          span(slot-scope="{ row }") {{ row.betAmount | formatMoney }}
        el-table-column(label="公司输赢", align="center", width="100", sortable="custom", prop="4")
          span(slot-scope="{ row }", :class="row.profitAmount < 0 ? 'text-danger' : ''")
            | {{ row.profitAmount | formatMoney }}
        el-table-column(label="总红利", align="center", sortable="custom", prop="5", width="100")
          span(slot-scope="{ row }") {{ row.bonusAmount | formatMoney }}
        el-table-column(label="操作", align="center")
          el-link.text-primary(slot-scope="{ row }", @click="showWalletLog(row)") 流水记录
    //- 流水记录 dialog
    el-dialog(:visible.sync="dialogVisible")
      el-table(:data="dialogData", border, stripe)
        el-table-column(label="平台", prop="gameGroup", align="center")
        el-table-column(label="流水", align="center")
          span(slot-scope="{ row }") {{ row.betAmount | formatMoney }}
        el-table-column(label="公司输赢", align="center")
          span(slot-scope="{ row }", :class="row.winAmount < 0 ? 'text-danger' : ''")
            | {{ row.winAmount | formatMoney }}
</template>

<script>
import { getAgencyMemberAPI, getAgencyMemberWalletAPI } from '@/api/reports/agency';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        { label: '会员帐号', model: 'member_account', component: 'filterInput', props: { type: 'text' }},
        { label: '代理帳號', model: 'agency_account', component: 'filterInput', props: { type: 'text' }},
      ],
      filterShow: [
        { label: '月份', model: 'date', component: 'filterMonthPicker' },
      ],
      type: 1,
      dialogVisible: false,
      dialogData: []
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
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        sort: this.dir || 2,
        order_by: +this.sortBy || 1,
        type: this.type || 1
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      if (APIParams.date) {
        APIParams.date += '-01';
      }

      getAgencyMemberAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    sortChange({ prop, order }) {
      this.sortBy = prop;
      this.dir = { descending: 2, ascending: 1 }[order] || 1;
      this.getData();
    },
    showWalletLog(row) {
      const APIParams = {
        member_id: row.memberId,
      };

      if (row.date.split('-').length === 2) {
        const date = new Date(row.date);
        date.setMonth(date.getMonth() + 1)
        date.setDate(0);
        APIParams.start_time = `${row.date}-01`;
        APIParams.end_time = `${row.date}-${date.getDate()}`
      } else {
        APIParams.start_time = row.date;
        APIParams.end_time = row.date;
      }

      getAgencyMemberWalletAPI(APIParams).then(response => {
        this.dialogData = response.data.data;
        this.dialogVisible = true;
      })
    }
  }
}
</script>
