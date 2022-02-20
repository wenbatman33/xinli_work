<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.sportAddInbox", @click="$router.push('/sportInboxEdit?title=新信件')") 新信件
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
      el-table(:data="tableData", height="75vh")
        el-table-column(label="编号", prop="id", align="center")
        el-table-column(v-if="fieldPerms.memberUserAccount", label="会员帐号", align="center", width="160")
          template(slot-scope="{ row }")
            router-link(:to="{ path: '/memberDetail', query: { title: row.memberUserAccount , id: row.memberId } }")
              | {{ row.memberUserAccount }}
        el-table-column(v-if="fieldPerms.inboxPEType", label="类型", align="center", width="120")
          template(slot-scope="{ row }")
            | {{ row.inboxPEType.display }}
        el-table-column(v-if="fieldPerms.inboxPETitle", prop="inboxPETitle", label="标题", align="center")
        el-table-column(v-if="fieldPerms.inboxPEContent", label="内容", align="center", width="120")
          template(slot-scope="{ row }")
            line-clamp(:content="row.inboxPEContent")
        el-table-column(v-if="fieldPerms.inboxPECreatedUser", label="发送人", align="center")
          template(slot-scope="{ row }")
            | {{ row.inboxPECreatedUser.display || '--' }}
        el-table-column(v-if="fieldPerms.inboxPEScheduledAt", label="设定发送时间", align="center", width="180")
          template(slot-scope="{ row }")
            | {{ row.inboxPEScheduledAt }}
        el-table-column(v-if="fieldPerms.inboxPESendAt", label="实际发送时间", align="center", width="180")
          template(slot-scope="{ row }")
            | {{ row.inboxPESendAt }}
        el-table-column(v-if="fieldPerms.inboxPEStatus", label="状态", align="center")
          template(slot-scope="{ row }")
            el-tag(v-if="row.inboxPEStatus.value === 0", type="danger") {{ row.inboxPEStatus.display }}
            el-tag(v-if="row.inboxPEStatus.value === 1", type="success") {{ row.inboxPEStatus.display }}
            el-tag(v-if="row.inboxPEStatus.value === 1001", type="warning") {{ row.inboxPEStatus.display }}
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left(v-if="row.inboxPEStatus && (row.inboxPEStatus.value === 0 || row.inboxPEStatus.value === 1001 )")
              el-link(v-if="buttonPerms.sportEditInbox")
                router-link.links.mx-1(
                  :to="{ path:'sportInboxEdit', query: { title: `${row.id} - ${row.inboxPETitle || '站内信'}`, id: row.id } }"
                ) 编辑
              el-link.text-danger(v-if="buttonPerms.sportDeleteInbox", @click="deleteInbox(row)") 删除
</template>

<script>
import { getInboxesAPI, deleteInboxAPI, getInboxTypesAPI } from '@/api/site/inbox';

export default {
  data() {
    return {
      periods: {},
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        { label: '标题', model: 'title', component: 'filterInput', props: { type: 'text' }},
        { label: '会员帐号', model: 'account', component: 'filterInput', props: { type: 'text' }},
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '未读', 1: '已读', 1001: '待发送' },
          },
        },
        {
          label: '類型',
          model: 'inbox_type',
          component: 'filterSelect',
          props: {
            options: {},
          },
        },
      ]
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    getInboxTypesAPI().then(response => {
      this.filterList.find(filter => filter.model === 'inbox_type').props.options = response.data.data;
    })
    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        platform: 2
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getInboxesAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    deleteInbox(inbox) {
      this.$swal({
        title: '确定删除？',
        text: `您即将删除 ${inbox.id} - ${inbox.inboxPETitle || '站内信'}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认删除！',
        cancelButtonText: '取消'
      })
        .then(result => {
          if (result.value) {
            return deleteInboxAPI(inbox.id);
          }

          return Promise.reject();
        })
        .then(() => {
          this.getData();
          this.$message.success('站内信 - 删除成功！');
        })
        .catch(() => {})
    }
  }
}
</script>
