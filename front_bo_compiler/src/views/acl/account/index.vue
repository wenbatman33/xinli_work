<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.accountAddUser", @click="insertUserDialogVisible = true") 新增使用者
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
        el-table-column(v-if="fieldPerms.userDeptGroupName", prop="userDeptGroupName", label="部门", align="center")
        el-table-column(v-if="fieldPerms.userJobGroupName", prop="userJobGroupName", label="职称", align="center")
        el-table-column(v-if="fieldPerms.userStatus", label="状态", align="center", width="120")
          template(slot-scope="{ row }")
            el-tag(v-if="row.userStatus.value === 0", type="danger") {{ row.userStatus.display }}
            el-tag(v-if="row.userStatus.value === 1", type="success") {{ row.userStatus.display }}
            el-tag(v-if="row.userStatus.value === 2", type="warning") {{ row.userStatus.display }}
            el-tag(v-if="row.userStatus.value === 3", type="info") {{ row.userStatus.display }}
        el-table-column(v-if="fieldPerms.groupAuthGroupName", prop="groupAuthGroupName", label="群组", width="90", show-overflow-tooltip=true, align="center")
        el-table-column(v-if="fieldPerms.userLastLoginAt", prop="userLastLoginAt", label="最后登入", align="center", width="180")
        el-table-column(v-if="fieldPerms.userUpdatedAt", prop="userUpdatedAt", label="最后更新", align="center", width="180")
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              template(v-if="fieldPerms.userStatus")
                el-link.mx-1.text-success(
                  v-if="buttonPerms.accountEnableUser && (row.userStatus.value === 0 || row.userStatus.value === 2)",
                  type="primary",
                  @click="showEditStatus(row.id, 1, row.userAccount)"
                ) 启用
                el-link.mx-1(
                  v-if="buttonPerms.accountDisableUser && row.userStatus.value === 1",
                  type="primary",
                  @click="showEditStatus(row.id, 0, row.userAccount)"
                ) 停用
                el-link.mx-1.text-danger(
                  v-if="buttonPerms.accountRejectUser && row.userStatus.value === 2"
                  type="primary",
                  @click="showEditStatus(row.id, 3, row.userAccount)"
                ) 审核退回
              el-link
                router-link.links.mx-1(
                  v-if="fieldPerms.userAccount",
                  :to="{ path:'roleUserDetailTabs', query: { title: row.userAccount, id: row.id } }"
                ) 查看
    //- dialog -- 新增使用者 --
    el-dialog(
      title="新增使用者",
      :visible.sync="insertUserDialogVisible",
      width="80%",
      top="10vh"
      :modal-append-to-body="false",
      @closed="resetInsertForm"
    )
      el-form(:model="insertData", ref="insertForm", label-width="100px", :rules="rules", status-icon)
        el-form-item(label="帐号", prop="account")
          el-input(v-model="insertData.account")
        el-form-item(label="密码", prop="password")
          el-input(v-model="insertData.password")
        el-form-item(label="Email", prop="email")
          el-input(v-model="insertData.email")
        el-form-item(label="部门", prop="admin_dept_group_id")
          el-select(
            v-if="! addDepartmentVisible",
            v-model="insertData.admin_dept_group_id",
            :filterable="true",
            no-match-text="无符合项目"
          )
            el-option(
              v-for="(department, index) in enableDepartments",
              :key="department.id",
              :label="department.userDeptGroupName",
              :value="department.id"
            )
          el-col(v-else, :span="9")
            el-form-item
              el-input(
                v-model="addDepartmentData",
                prefix-icon="el-icon-edit",
                ref="addDepartmentInput",
                placeholder="部门名称"
              )
                template(slot="append")
                  el-button(icon="el-icon-close", @click="addDepartmentInputClose")
          el-button.ml-2(
            v-if="! addDepartmentVisible",
            icon="el-icon-edit",
            size="medium",
            circle,
            @click="addDepartmentInputOpen"
          )
          el-button.ml-2(v-else, @click="addDepartment", type="success", size="medium", icon="el-icon-check")
        el-form-item(label="职称", prop="admin_job_group_id")
          el-select(
            v-if="! addJobVisible"
            v-model="insertData.admin_job_group_id",
            :filterable="true",
            no-match-text="无符合项目"
          )
            el-option(
              v-for="(job, index) in enableJobs",
              :key="job.id",
              :label="job.userJobGroupName",
              :value="job.id"
            )
          el-col(v-else, :span="9")
            el-form-item
              el-input(
                v-model="addJobData",
                prefix-icon="el-icon-edit",
                ref="addJobInput",
                placeholder="职称名称"
              )
                template(slot="append")
                  el-button(icon="el-icon-close", @click="addJobInputClose")
          el-button.ml-2(
            v-if="! addJobVisible",
            icon="el-icon-edit",
            size="medium",
            circle,
            @click="addJobInputOpen"
          )
          el-button.ml-2(v-else, @click="addJob", type="success", size="medium", icon="el-icon-check")
        el-form-item(label="群组", prop="admin_auth_group_id")
          el-select(v-model="insertData.admin_auth_group_id", :filterable="true", no-match-text="无符合项目")
            el-option(
              v-for="(group, index) in enableGroups",
              :key="group.id",
              :label="group.groupAuthGroupName",
              :value="group.id"
            )
        el-form-item(label="备注", prop="note")
          el-input(type="textarea", v-model="insertData.note", :autosize="{ minRows: 2, maxRows: 6}")
      .dialog-footer(slot="footer")
        el-button(type="primary" @click="submitInsertForm") 确认新增
    //- dialog -- 會員狀態 --
    el-dialog(
      :title="editStatusTitle",
      :visible.sync="editStatusVisible",
      width="50%",
      top="10vh",
      :modal-append-to-body="false",
      @closed="$refs.editStatusForm.resetFields()"
    )
      el-form(:model="editStatusData", ref="editStatusForm", label-width="100px", status-icon)
        el-form-item(label="备注", prop="note", :rules="[{ required: true, message: '备注为必填' }]")
          el-input(v-model="editStatusData.note")
      .dialog-footer(slot="footer")
        el-button(type="primary" @click="submitEditUserStatusForm") 送出
</template>

<script>
import { getDepartmentsAPI, addDepartmentAPI } from '@/api/acl/department';
import { getUsersAPI, addUserAPI, editUserAPI } from '@/api/acl/account';
import { getJobsAPI, addJobAPI } from '@/api/acl/job';
import { getGroupsAPI } from '@/api/acl/group';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      insertData: {
        account: '',
        password: '',
        email: '',
        admin_dept_group_id: '',
        admin_job_group_id: '',
        admin_auth_group_id: '',
        note: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入帐号' },
          { min: 5, max: 16, message: '长度限制为 5 - 16 个字元', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 8, max: 20, message: '长度限制为 8 - 20 个字元', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_!@#$%^&*-+=;:,.?~]{8,20}$/, message: '含有非法字元', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入Email' },
          { type: 'email', message: 'Email格式不正确', trigger: 'blur' }
        ],
        admin_dept_group_id: [
          { required: true, message: '请选择部门', trigger: 'submit' }
        ],
        admin_job_group_id: [
          { required: true, message: '请选择职称', trigger: 'submit' }
        ],
        admin_auth_group_id: [
          { required: true, message: '请选择群组', trigger: 'submit' },
        ]
      },
      departments: [],
      jobs: [],
      groups: [],
      insertUserDialogVisible: false,
      editStatusVisible: false,
      editStatusTitle: '',
      editStatusData: {
        id: '',
        status: '',
        note: ''
      },
      addDepartmentVisible: false,
      addDepartmentData: '',
      addJobVisible: false,
      addJobData: '',
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
  computed: {
    enableJobs() {
      if (! this.fieldPerms.userJobStatus) return [];
      return this.jobs.filter(job => job.userJobStatus.value === 1);
    },
    enableDepartments() {
      if (! this.fieldPerms.userDeptStatus) return [];
      return this.departments.filter(department => department.userDeptStatus.value === 1);
    },
    enableGroups() {
      if (! this.fieldPerms.groupStatus) return [];
      return this.groups.filter(group => group.groupStatus.value === 1);
    }
  },
  created() {
    this.getData();
    getDepartmentsAPI().then(response => {
      this.departments = response.data.data;
    });
    getJobsAPI().then(response => {
      this.jobs = response.data.data;
    });
    getGroupsAPI().then(response => {
      this.groups = response.data.data;
    });
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

      getUsersAPI(APIParams)
      .then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    submitInsertForm() {
      this.$refs.insertForm.validate(valid => {
        if (! valid) return false;

        addUserAPI(this.insertData)
        .then(() => {
          this.$message.success('会员-新增成功');
          this.insertUserDialogVisible = false;
          this.currentPage = 1;
          this.getData();
          this.resetInsertForm();
        });
      })
    },
    resetInsertForm() {
      this.$refs.insertForm.resetFields();
    },
    showEditStatus(userId, status, account) {
      this.editStatusVisible = true;
      this.editStatusTitle = `${account} - ${['停用', '启用', '', '审核退回'][status]}`;
      this.editStatusData.status = status;
      this.editStatusData.id = userId;
    },
    submitEditUserStatusForm() {
      this.$refs.editStatusForm.validate(valid => {
        if (! valid) return;

        editUserAPI(this.editStatusData).then(response => {
          let responseUser = response.data.data[0];
          this.tableData.find(user => user.id === responseUser.id).userStatus = responseUser.userStatus;
          this.$message.success('状态修改成功');
          this.editStatusVisible = false;
          this.$refs.editStatusForm.resetFields();
        })
      })
    },
    addDepartmentInputOpen() {
      this.addDepartmentVisible = true;
      this.$nextTick(() => {
        this.$refs.addDepartmentInput.focus();
      })
    },
    addDepartmentInputClose() {
      this.addDepartmentVisible = false;
      this.addDepartmentData = '';
    },
    addDepartment() {
      if (this.addDepartmentData === '') {
        this.$message.warning('部门名称不得为空')
        this.$refs.addDepartmentInput.focus();
        return false;
      }

      addDepartmentAPI({ dept_group_name: this.addDepartmentData })
        .then(response => {
          let newDepartment = response.data.data[0];

          this.departments.push(newDepartment);
          this.insertData.admin_dept_group_id = newDepartment.id
          this.$message.success('部门-新增成功')
          this.addDepartmentInputClose();
        });
    },
    addJobInputOpen() {
      this.addJobVisible = true;
      this.$nextTick(() => {
        this.$refs.addJobInput.focus();
      })
    },
    addJobInputClose() {
      this.addJobVisible = false;
      this.addJobData = '';
    },
    addJob() {
      if (this.addJobData === '') {
        this.$message.warning('职称名称不得为空')
        this.$refs.addJobInput.focus();
        return;
      }

      addJobAPI({ job_group_name: this.addJobData })
        .then(response => {
          let newJob = response.data.data[0];

          this.jobs.push(newJob);
          this.insertData.admin_job_group_id = newJob.id
          this.$message.success('职称-新增成功')
          this.addJobInputClose();
        });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
