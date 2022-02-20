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
    //- User Table
    .row
      el-table(:data="tableData", height="75vh")
        el-table-column(v-if="fieldPerms.userAccount", prop="userAccount", label="帐号", width="120", align="center")
        el-table-column(v-if="fieldPerms.userEmail", label="Email", align="center", fit="true", width="200")
          template(slot-scope="{ row }")
            router-link(
              v-if="fieldPerms.userAccount",
              :to="{ path: 'roleUserDetailTabs', query: { title: row.userAccount, id: row.id }}"
            ) {{ row.userEmail }}
            span(v-else) {{ row.userEmail }}
        el-table-column(v-if="fieldPerms.groupAuthGroupName", prop="groupAuthGroupName", label="群组", align="center")
        el-table-column(v-if="fieldPerms.userDeptGroupName", prop="userDeptGroupName", label="部门", align="center")
        el-table-column(v-if="fieldPerms.userJobGroupName", prop="userJobGroupName", label="职称", align="center")
        el-table-column(v-if="fieldPerms.userStatus", label="状态", align="center", width="120")
          template(slot-scope="{ row }")
            el-tag(v-if="row.userStatus.value === 0", type="danger") {{ row.userStatus.display }}
            el-tag(v-if="row.userStatus.value === 1", type="success") {{ row.userStatus.display }}
            el-tag(v-if="row.userStatus.value === 2", type="warning") {{ row.userStatus.display }}
            el-tag(v-if="row.userStatus.value === 3", type="info") {{ row.userStatus.display }}
        el-table-column(v-if="fieldPerms.userLastLoginAt", prop="userLastLoginAt", label="最后登入", width="180")
        el-table-column(v-if="fieldPerms.userUpdatedAt", prop="userUpdatedAt", label="最后更新", width="180")
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              el-link.mx-1.text-success(
                v-if="fieldPerms.userStatus && row.userStatus.value === 1",
                type="primary",
                @click="showAddToGroupForm(row)"
              ) 加入
              el-link
                router-link.links.mx-1(
                  :to="{ path:'roleUserDetailTabs', query: { title: row.userAccount, id: row.id } }"
                ) 查看
    //- dialog -- 会员状态 --
    el-dialog(
      :title="addToGroupTitle",
      :visible.sync="addToGroupVisible",
      width="50%",
      top="10vh",
      :modal-append-to-body="false",
      @closed="$refs.addToGroupForm.resetFields(); addToGroupData.id = ''; addToGroupTitle = ''"
    )
      el-form(:model="addToGroupData", ref="addToGroupForm", label-width="100px", status-icon)
        el-form-item(label="备注", prop="note", :rules="[{ required: true, message: '备注为必填' }]")
          el-input(v-model="addToGroupData.note")
      .dialog-footer(slot="footer")
        el-button(type="primary" @click="submitAddToGroupForm") 送出
</template>

<script>
import { getUsersByOtherGroupAPI, editUserAPI } from '@/api/acl/account';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      addToGroupVisible: false,
      addToGroupTitle: '',
      addToGroupData: {
        id: '',
        admin_auth_group_id: '',
        note: ''
      },
      filterList: [
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '停用', 1: '启用', 2: '待审核', 3: '审核退回' },
          },
        },
        { label: '帐号', model: 'account', component: 'filterInput', props: { type: 'text' }},
        { label: '信箱', model: 'email', component: 'filterInput', props: { type: 'email' }}
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
        page: this.currentPage,
        except_admin_auth_group_id: this.$route.query.id
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getUsersByOtherGroupAPI(APIParams)
      .then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    showAddToGroupForm(user) {
      this.addToGroupVisible = true;
      this.addToGroupData.id = user.id;
      if (user) {
        this.addToGroupTitle = `将 ${user.userAccount} 从 [${user.groupAuthGroupName}] 移至 [${this.$route.query.title}]`;
      } else {
        this.addToGroupTitle = `将 ${user.userAccount} 加入至 [${this.$route.query.title}]`;
      }
    },
    submitAddToGroupForm() {
      this.$refs.addToGroupForm.validate(valid => {
        if (! valid) return;
        this.addToGroupData.admin_auth_group_id = this.$route.query.id;
        editUserAPI(this.addToGroupData).then(() => {
          this.$message.success('加入群组成功');
          this.addToGroupVisible = false;
          this.$refs.addToGroupForm.resetFields();
          this.getData();
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
