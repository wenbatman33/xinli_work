<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", :filterShow="filterShow", @change="getData()")
    //- 分页 表格上方
    .justify-content-end
      el-pagination(
        :background="true",
        :hide-on-single-page="true",
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
      el-table(:data="loginLogList", style="width: 100%")
        el-table-column(v-if="fieldPerms.memberUserAccount", label="帐号", align="center")
          template(slot-scope="{ row }")
            router-link(:to="{ path: '/memberDetail', query: { title: row.memberUserAccount, id: row.memberId } }")
              | {{ row.memberUserAccount }}
        el-table-column(v-if="fieldPerms.loginLogRealname", prop="loginLogRealname", label="玩家姓名", align="center")
        el-table-column(v-if="fieldPerms.loginLogLastLoginAt", prop="loginLogLastLoginAt", label="登入时间", align="center", width="160")
        el-table-column(v-if="fieldPerms.loginLogLogIn", prop="loginLogLogIn", label="登入地点", align="center")
        el-table-column(v-if="fieldPerms.loginLogIp", prop="loginLogIp", label="IP", align="center")
        el-table-column(v-if="fieldPerms.loginLogFinger", prop="loginLogFinger", label="装置", align="center")
        el-table-column(v-if="fieldPerms.loginLogDevice", prop="loginLogDevice", label="设备", align="center")
        el-table-column(v-if="fieldPerms.loginLogBrowser", prop="loginLogBrowser", label="浏览器", align="center")
        el-table-column(v-if="fieldPerms.loginLogSignAt", prop="loginLogSignAt", label="注册时间", align="center")
        el-table-column(v-if="fieldPerms.loginLogVersion", prop="loginLogVersion", label="版本", align="center")
        el-table-column(v-if="fieldPerms.loginLogRefer", prop="loginLogRefer", label="域名", align="center")
        el-table-column(v-if="fieldPerms.loginLogLogSuccess", label="结果", align="center")
          el-tag(slot-scope="{ row }", :type="row.loginLogLogSuccess ? 'success' : 'danger'") {{ row.loginLogLogSuccess ? '成功' : '失败' }}
</template>

<script>
import { getMemberLoginLogAPI } from '@/api/member/member';

export default {
  data() {
    return {
      loginLogList:[],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        { label: 'IP', model: 'ip', component: 'filterInput', props: { type: 'text' }},
        { label: '登入地点', model: 'location', component: 'filterInput', props: { type: 'text' }},
        { label: '装置', model: 'finger', component: 'filterInput', props: { type: 'text' }},
        { label: '设备', model: 'device', component: 'filterInput', props: { type: 'text' }},
        { label: '最后登入纪录', model: 'last', component: 'filterCheckbox', props: { type: 'text' }}
      ],
      filterShow: [
        { label: '玩家帐号', model: 'account', component: 'filterInput', props: { type: 'text' } },
      ],
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getMemberLoginLogAPI(APIParams).then(response => {
        this.dataTotal = response.data.meta.pagination.total
        this.currentPage = response.data.meta.pagination.current_page
        this.loginLogList = response.data.data
      })
    },
  },
  mounted() {
    if (this.$route.query.account) {
      this.$set(this.$refs.dataFilter.filterData, 'account', this.$route.query.account);
    }

    if (this.$route.query.IP) {
      this.filterShow.push(
        ...this.filterList.splice(this.filterList.findIndex(item => item.model === 'ip'), 1)
      )
      this.$set(this.$refs.dataFilter.filterData, 'ip', this.$route.query.IP);
    }

    if (this.$route.query.finger) {
      this.filterShow.push(
        ...this.filterList.splice(this.filterList.findIndex(item => item.model === 'finger'), 1)
      )
      this.$set(this.$refs.dataFilter.filterData, 'finger', this.$route.query.finger);
    }
    this.getData();
  }
}
</script>
