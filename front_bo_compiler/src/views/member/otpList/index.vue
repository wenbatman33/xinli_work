<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
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
      el-table(:data="otpList", style="width: 100%")
        el-table-column(v-if="fieldPerms.memberUserAccount", label="帐号", width="150", align="center")
          template(slot-scope="{ row }")
            router-link(:to="{ path: '/memberDetail', query: { title: row.memberUserAccount, id: row.memberId } }")
              | {{ row.memberUserAccount }}
        el-table-column(v-if="fieldPerms.backendOtpLogType", prop="backendOtpLogType.display", label="验证项目", width="", align="center")
        el-table-column(v-if="fieldPerms.backendOtpLogSuccess", prop="backendOtpLogSuccess.display", label="验证状态", width="", align="center")
        el-table-column(v-if="fieldPerms.backendOtpSignData", prop="backendOtpSignData", label="验证资料", width="", align="center")
        el-table-column(v-if="fieldPerms.backendOtpOtp", prop="backendOtpOtp", label="验证码", width="", align="center")
        el-table-column(v-if="fieldPerms.backendOtpSignUpRef", prop="backendOtpSignUpRef.display", label="来源", width="", align="center")
        el-table-column(v-if="fieldPerms.backendOtpCreatedAt", prop="backendOtpCreatedAt", label="发送时间", width="", align="center")
        el-table-column(v-if="fieldPerms.backendOtpSuccessTime", prop="backendOtpSuccessTime", label="异动时间", width="", align="center")
</template>

<script>
import { getMemberOtpListAPI } from '@/api/member/member';

export default {
  data() {
    return {
      otpList:[],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        { label: '玩家帐号', model: 'account', component: 'filterInput', props: { type: 'text' }},
        { label: '验证资料', model: 'sign_data', component: 'filterInput', props: { type: 'text' }},
        { label: '验证码', model: 'otp', component: 'filterInput', props: { type: 'text' }},
        // { label: '发送时间', model: 'created_at', component: 'filterDatePicker', props: { type: 'datetimerange' } }
      ],
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getMemberOtpListAPI(APIParams).then(response => {
        this.dataTotal = response.data.meta.pagination.total
        this.currentPage = response.data.meta.pagination.current_page
        this.otpList=response.data.data
      })
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
