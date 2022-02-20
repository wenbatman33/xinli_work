<template lang="pug">
  .container-fluid
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
      el-table(:data="tableData", height="85vh")
        el-table-column(v-if="fieldPerms.memberGroupListMember", label="玩家帐号", align="center")
          template(slot-scope="{ row }")
            span(v-if="row.memberGroupListMember.display === 'NotExistsAccount'") 无此玩家
            router-link(
              v-else-if="buttonPerms.showMemberGroupTypeListMemberInGroupList"
              :to="{ path: '/memberDetail', query: { title: row.memberGroupListMember.display, id: row.memberGroupListMember.value } }"
            ) {{ row.memberGroupListMember.display }}
            span(v-else) {{ row.memberGroupListMember.display }}
        el-table-column(v-if="fieldPerms.memberGroupListEditedUser", label="操作人", align="center")
          template(slot-scope="{ row }")
            span {{ row.memberGroupListEditedUser.display }}
        el-table-column(
          v-if="fieldPerms.memberGroupListUpdatedAt",
          prop="memberGroupListUpdatedAt",
          label="更新时间",
          align="center",
          width="180"
        )
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              el-link(v-if="buttonPerms.showMemberGroupTypeListMemberInGroupList")
                //- router-link.links.mx-1(
                //-   :to="{ path:'memberGroupTypeList', query: { title: `${row.memberGroupTypeName} - 名单`, id: row.id } }"
                //- )

              el-link.text-primary.mx-1(
                v-if="buttonPerms.deleteMemberGroupMemberInGroupList",
                @click="deleteMemberGroupMember(row)"
              ) 移除
</template>

<script>
import { getMemberGroupGroupMemberAPI, deleteMemberGroupMemberAPI } from '@/api/member/memberGroup';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getMemberGroupGroupMemberAPI(this.$route.query.id).then(response => {
        this.tableData = response.data.data;
        // todo: API 沒回傳分頁
        // this.dataTotal = response.data.meta.pagination.total;
        // this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    deleteMemberGroupMember(member) {
      this.$swal({
        title: '确定移除？',
        text: `
        是否确定将 ${member.memberGroupListMember ? member.memberGroupListMember.display : '该会员'}
        移出 ${member.memberGroupListGroup ? member.memberGroupListGroup.display : '该群组'}?
        `,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认移除！',
        cancelButtonText: '取消'
      })
        .then(result => {
          if (result.value) {
            return deleteMemberGroupMemberAPI(member.id);
          }

          return Promise.reject();
        })
        .then(() => {
          this.getData();
          this.$message.success('移除成功！');
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
