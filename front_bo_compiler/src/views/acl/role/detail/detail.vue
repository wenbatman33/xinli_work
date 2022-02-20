<template lang="pug">
  .container-fluid
    //- 群组资料 修改
    .alert.alert-dark(v-if="editGroupVisible")
      .position-absolute(style="top: 0 ;right: 10px")
        el-link.mx-3(:underline="false")
          i.el-icon-close(@click="editGroupVisible = false; editGroupData = {}")
        el-link(:underline="false")
          i.el-icon-check(@click="submitEditGroup()")
      .d-flex.flex-row
        el-form(:model="editGroupData", :inline="true", size="mini", ref="editGroupForm")
          el-form-item(
            v-if="fieldPerms.groupAuthGroupName",
            label="群组名",
            prop="auth_group_name",
            :rules="[{ required: true, message: '群组名为必填' }]"
          )
            el-input(v-model="editGroupData.auth_group_name")
          el-form-item(label="备注", prop="auth_group_note")
            el-input(v-model="editGroupData.auth_group_note")
          el-form-item(v-if="fieldPerms.groupStatus")
            el-switch(
              v-model="editGroupData.status",
              active-text="启用",
              :active-value="1",
              inactive-text="停用",
              :inactive-value="0",
              inactive-color="red"
            )
          el-row
          el-form-item(v-if="fieldPerms.groupNoticeList", label="群组联络人")
            el-select.notice-witdh(
              v-model="editGroupData.notice_list",
              multiple,
              allow-create,
              filterable,
              no-data-text="请输入联络人",
              default-first-option,
              width="500px"
            )
    //- 群组资料 显示
    .alert.alert-secondary(v-else)
      .position-absolute(v-if="buttonPerms.editGroup",style="top: 0 ;right: 10px")
        el-link(:underline="false")
          i.el-icon-edit(@click="editGroup()")
      .d-flex.flex-row
        .mx-3(v-if="fieldPerms.groupAuthGroupName") 群组名: {{ group.groupAuthGroupName }}
        .mx-3(v-if="fieldPerms.groupAuthGroupNote && group.groupAuthGroupNote")
          span 备注: {{ group.groupAuthGroupNote }}
        el-switch.mx-3(
          v-if="fieldPerms.groupStatus",
          v-model="group.groupStatus.value",
          disabled,
          active-text="启用",
          :active-value="1",
          inactive-text="停用",
          :inactive-value="0",
          inactive-color="red"
        )
      .d-flex.flex-row(v-if="fieldPerms.groupNoticeList && group.groupNoticeList && group.groupNoticeList.length > 0")
        .mx-3 群组联络人:
        div.mx-1(v-for="notice in group.groupNoticeList") {{ notice }}
    //- 过滤资料
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.cloneGroup", @click="insertDialogVisible = true") 复制群组权限
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
      el-table(:data="tableData", height="65vh")
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
        el-table-column(v-if="fieldPerms.userLastLoginAt", prop="userLastLoginAt", label="最后登入", width="180")
        el-table-column(v-if="fieldPerms.userUpdatedAt", prop="userUpdatedAt", label="最后更新", width="180")
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              template(v-if="fieldPerms.userStatus")
                template(v-if="buttonPerms.changeUserStatus")
                  el-link.mx-1.text-success(
                    v-if="row.userStatus.value === 0 || row.userStatus.value === 2",
                    @click="showEditStatus(row.id, 1, row.userAccount)"
                  ) 启用
                  el-link.mx-1(
                    v-if="row.userStatus.value === 1",
                    @click="showEditStatus(row.id, 0, row.userAccount)"
                  ) 停用
                  el-link.mx-1.text-danger(
                    v-if="row.userStatus.value === 2",
                    @click="showEditStatus(row.id, 3, row.userAccount)"
                  ) 审核退回
                template(v-if="buttonPerms.changeGroup")
                  el-link.mx-1(v-if="row.userStatus.value < 2 ", @click="changeGroup(row)") 转移群组
              el-link
                router-link.links.mx-1(
                  :to="{ path:'roleUserDetailTabs', query: { title: row.userAccount, id: row.id } }"
                ) 查看
    //- dialog -- 复制群组权限 --
    el-dialog(
      title="复制群组权限",
      :visible.sync="insertDialogVisible",
      width="40%",
      top="10vh"
      :modal-append-to-body="false",
      @closed="resetInsertForm"
    )
      el-form(:model="insertData", ref="insertForm", label-width="100px", status-icon)
        el-form-item(label="新群组名称", prop="auth_group_name", :rules="[{required: true, message: '名称必填'}]")
          el-input(v-model="insertData.auth_group_name")
      .dialog-footer(slot="footer")
        el-button(type="primary" @click="submitInsertForm") 确认新增
    //- dialog -- 会员状态 --
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
    //- dialog -- 转移群组 --
    el-dialog(
      :title="changeGroupTitle",
      :visible.sync="changeGroupVisible",
      width="50%",
      top="10vh",
      :modal-append-to-body="false",
      @closed="$refs.changeGroupForm.resetFields()"
    )
      el-form(:model="changeGroupData", ref="changeGroupForm", label-width="100px", status-icon)
        el-form-item(
          v-if="fieldPerms.groupStatus && fieldPerms.groupAuthGroupName",
          label="群组",
          prop="admin_auth_group_id"
        )
          el-select(
            v-if="! addGroupVisible",
            v-model="changeGroupData.admin_auth_group_id",
            :filterable="true",
            no-match-text="无符合项目"
          )
            el-option(
              v-for="(group, index) in groups",
              :key="group.id",
              :disabled="! group.groupStatus.value",
              :label="group.groupAuthGroupName",
              :value="group.id"
            )
          el-col(v-else, :span="12")
            el-form-item
              el-input(
                v-model="addGroupData",
                prefix-icon="el-icon-edit",
                ref="addGroupInput",
                placeholder="群组名称"
              )
                template(slot="append")
                  el-button(icon="el-icon-close", @click="addGroupInputClose")
          el-button.ml-2(
            v-if="! addGroupVisible",
            icon="el-icon-edit",
            size="medium",
            circle,
            @click="addGroupInputOpen"
          )
          el-button.ml-2(v-else, @click="addGroup", type="success", size="medium", icon="el-icon-check")
        el-form-item(label="备注", prop="note", :rules="[{ required: true, message: '备注为必填' }]")
          el-input(v-model="changeGroupData.note")
      .dialog-footer(slot="footer")
        el-button(type="primary" @click="submitChangeGroupForm") 送出
</template>

<script>
import { getUsersByGroupAPI, editUserAPI } from '@/api/acl/account';
import { getGroupAPI, getGroupsAPI, addGroupAPI, editGroupAPI } from '@/api/acl/group';
import { getPermissionByGroupAPI, updatePermissionByGroupAPI } from '@/api/acl/permission';

export default {
  data() {
    return {
      editGroupVisible: false,
      editGroupData: {
        groupStatus: {
          value: 0
        }
      },
      group: {
        groupStatus: {
          value: 0
        }
      },
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      stateNote: [],
      currentPage: 1,
      insertData: {
        auth_group_name: '',
      },
      rules: {
        account: [
          { required: true, message: '请输入帐号' },
          { min: 5, max: 16, message: '长度限制为 5 - 16 个字元', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 8, max: 20, message: '长度限制为 8 - 20 个字元', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入Email' },
          { type: 'email', message: 'Email格式不正确', trigger: 'blur' }
        ]
      },
      insertDialogVisible: false,
      changeGroupVisible: false,
      groups: [],
      addGroupVisible: false,
      addGroupData: '',
      changeGroupTitle: '',
      changeGroupData: {
        id: '',
        admin_auth_group_id: '',
        note: ''
      },
      editStatusVisible: false,
      editStatusTitle: '',
      editStatusData: {
        id: '',
        status: '',
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
    this.getGroup();
    this.getData();
    getGroupsAPI().then(response => {
      this.groups = response.data.data;
    });
  },
  methods: {
    getGroup() {
      getGroupAPI(this.$route.query.id).then(response => {
        this.group = response.data.data[0];
      });
    },
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        admin_auth_group_id: this.group.id || this.$route.query.id
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getUsersByGroupAPI(APIParams)
      .then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    addGroupInputOpen() {
      this.addGroupVisible = true;
      this.$nextTick(() => {
        this.$refs.addGroupInput.focus();
      })
    },
    addGroupInputClose() {
      this.addGroupVisible = false;
      this.addGroupData = '';
    },
    addGroup() {
      if (this.addGroupData === '') {
        this.$message.warning('群组名称不得为空')
        this.$refs.addGroupInput.focus();
        return false;
      }

      addGroupAPI({ auth_group_name: this.addGroupData })
        .then(response => {
          let newGroup = response.data.data[0];

          this.groups.push(newGroup);
          this.changeGroupData.admin_auth_group_id = newGroup.id
          this.$message.success('群组-新增成功')
          this.addGroupInputClose();
        });
    },
    submitInsertForm() {
      this.insertData['auth_group_note'] = `${this.group.groupAuthGroupName} - 复制`;
      Promise.all([addGroupAPI(this.insertData), getPermissionByGroupAPI(this.$route.query.id)])
        .then(([newGroupResponse, permissionResponse]) => {
          let newGroup = newGroupResponse.data.data[0];
          editGroupAPI({ id: newGroup.id, mask_off: this.group.mask_off });
          updatePermissionByGroupAPI(newGroup.id, { func_hide_info: permissionResponse.data.data });
          this.insertDialogVisible = false;
          this.resetInsertForm();
          this.$message.success('群组-复制成功');
          this.$router.push({
            path: 'roleDetail',
            query: { title: newGroup.groupAuthGroupName, id: newGroup.id }
          });
        });
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
    changeGroup(user) {
      this.changeGroupVisible = true;
      this.changeGroupData.admin_auth_group_id = user.groupAuthGroupId;
      this.changeGroupData.id = user.id;
    },
    submitChangeGroupForm() {
      this.$refs.changeGroupForm.validate(valid => {
        if (! valid) return;
        if (this.changeGroupData.admin_auth_group_id === parseInt(this.group.id)) {
          this.$message.warning('无修改, 未送出此次请求！')
          return false;
        }

        editUserAPI(this.changeGroupData).then(() => {
          this.$message.success('群组转移成功');
          this.changeGroupVisible = false;
          this.$refs.changeGroupForm.resetFields();
          this.getData();
        })
      });
    },
    editGroup() {
      this.editGroupData = {
        id: this.group.id,
        auth_group_name: this.group.groupAuthGroupName,
        auth_group_note: this.group.groupAuthGroupNote,
        notice_list: this.group.groupNoticeList,
        status: this.group.groupStatus ? this.group.groupStatus.value : undefined
      }
      this.editGroupVisible = true;
    },
    submitEditGroup() {
      this.$refs.editGroupForm.validate(valid => {
        if (! valid) return;

        editGroupAPI(this.editGroupData).then(() => {
          this.getGroup();
          // todo: 改群组名称后 tab 有误
          // this.$router.push({ query: { title: 123 } })
          this.editGroupVisible = false;
          this.$message.success('群组资料修改成功');
        })
      })
    }
  }
}
</script>

<style lang="scss">
.notice-witdh {
  input {
    width: 500px;
  }
}
</style>
