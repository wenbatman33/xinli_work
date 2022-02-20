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
      el-table(:data="tableData", height="calc(100vh - 260px)", ref="table")
        el-table-column(label="编号", prop="id", align="center")
        el-table-column(v-if="fieldPerms.memberUserAccount", label="帐号", align="center", width="160")
          template(slot-scope="{ row }")
            router-link(:to="{ path: '/memberDetail', query: { title: row.memberUserAccount, id: row.id } }")
              | {{ row.memberUserAccount }}
        el-table-column(v-if="fieldPerms.backendMemberRealname", prop="backendMemberRealname", label="姓名", align="center", width="120")
        el-table-column(v-if="fieldPerms.backendMemberGroupList", label="群组", align="center", width="200")
          template(slot-scope="{ row }")
            el-tooltip(v-if="row.backendMemberGroupList.length > 3")
              div(slot="content")
                el-tag.m-1(v-for="group in row.backendMemberGroupList", :key="group.id") {{ group.memberGroupGroupName }}
              el-badge.mt-2(:value="row.backendMemberGroupList.length", type="warning")
                el-tag {{ row.backendMemberGroupList[0] && row.backendMemberGroupList[0].memberGroupGroupName }}
            el-tag.m-1(v-else, v-for="group in row.backendMemberGroupList", :key="group.id") {{ group.memberGroupGroupName }}
        el-table-column(v-if="fieldPerms.backendMemberIp", prop="backendMemberIp", label="最后登入IP", align="center", width="120")
        el-table-column(v-if="fieldPerms.backendMemberSignupIp", prop="backendMemberSignupIp", label="注册IP", align="center", width="120")
        el-table-column(v-if="fieldPerms.memberAgency", prop="memberAgency", label="代理来源", align="center", width="160")
        el-table-column(v-if="fieldPerms.backendMemberLastLoginAt", prop="backendMemberLastLoginAt", label="最后登入", align="center", width="180", show-overflow-tooltip)
        el-table-column(v-if="fieldPerms.backendMemberFinger", prop="backendMemberFinger", label="装置", align="center", width="120")
        el-table-column(v-if="fieldPerms.backendMemberSignupFinger", prop="backendMemberSignupFinger", label="注册装置", align="center", width="120")
        el-table-column(v-if="fieldPerms.backendMemberLastLoginDevice", prop="backendMemberLastLoginDevice", label="设备", align="center", width="120")
        el-table-column(v-if="fieldPerms.backendMemberLastLoginBrowser", prop="backendMemberLastLoginBrowser", label="浏览器", align="center", width="80")
        el-table-column(v-if="fieldPerms.backendMemberMemberNote", label="备注", align="center", width="220")
          template(slot-scope="{ row }")
            .member--note(v-for="note in row.backendMemberMemberNote", :key="note.id")
              .member--note--type {{ note.memberNoteType.display[0] }}
              .member--note--content
                .member--note--datetime {{ note.memberNoteCreatedAt }}
                line-clamp(:content="note.memberNoteNote")
</template>

<script>
import { getMembersAPI } from '@/api/member/member';

export default {
  data() {
    return {
      periods: {},
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        { label: '姓名', model: 'realname', component: 'filterInput', props: { type: 'text' }},
        { label: '注册IP', model: 'signup_ip', component: 'filterInput', props: { type: 'text' }},
        { label: '注册装置', model: 'signup_finger', component: 'filterInput', props: { type: 'text' }},
        { label: '注册日期', model: 'time', component: 'filterDatePicker', props: { type: 'datetimerange' }},
        { label: '游戏帐号', model: 'gameAccount', component: 'filterInput', props: { type: 'text' }},
        { label: '手机号', model: 'phone', component: 'filterInput', props: { type: 'text' }},
        { label: '邮箱', model: 'email', component: 'filterInput', props: { type: 'text' }},
        { label: '代理来源', model: 'agency', component: 'filterInput', props: { type: 'text' }},
      ],
      filterShow: [
        { label: '帐号', model: 'account', component: 'filterInput', props: { type: 'text' }},
      ],
      scroll: 0,
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  mounted() {
    this.getData();

    const tableDOM = this.$refs.table.bodyWrapper;

    tableDOM.addEventListener('scroll', () => {
      const y = tableDOM.scrollTop;

      if (y === 0 && this.scroll < 10) {
        setTimeout(() => {
          tableDOM.scrollTo({ top: this.scroll });
        }, 0)
      } else {
        this.scroll = y;
      }
    })
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

      if (APIParams.time) {
        APIParams.start_time = APIParams.time[0];
        APIParams.end_time = APIParams.time[1];
        delete APIParams.time;
      }

      getMembersAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
  }
}
</script>
