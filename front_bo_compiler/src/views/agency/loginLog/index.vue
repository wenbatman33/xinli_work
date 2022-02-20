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
      el-input.ml-3(v-model="account", placeholder="请输入代理帐号", @input="debounceGetData()")
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
      el-table(:data="tableData", border, stripe, height="78vh")
        el-table-column(label="代理编号", prop="memberId", align="center")
        el-table-column(label="代理帐号", prop="memberUserAccount", align="center")
        el-table-column(label="代理名称", prop="loginLogRealname", align="center")
        el-table-column(label="登入IP", prop="loginLogIp", align="center")
        el-table-column(label="位置", prop="loginLogLogIn", align="center")
        el-table-column(label="登入状态", align="center")
          template(slot-scope="{ row }")
            el-tag(v-if="row.loginLogLogSuccess", type="success") 成功
            el-tag(v-else, type="danger") 失败
        el-table-column(label="登入时间", prop="loginLogSignAt", align="center")
</template>

<script>
import debounce from 'lodash/debounce';
import { getAgencyLoginLogAPI } from '@/api/agency/agency';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      account: '',
      timeRange: [],
    }
  },
  created() {
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
      getAgencyLoginLogAPI({
        per_page: this.pageSize,
        page: this.currentPage,
        start_time: this.timeRange[0] + ' 00:00:00',
        end_time: this.timeRange[1] + ' 23:59:59',
        account: this.account
      }).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    }
  }
}
</script>
