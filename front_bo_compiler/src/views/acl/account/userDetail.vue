<template lang="pug">
  el-card(shadow="hover")
    el-form(ref="form", :model="user", label-width="150px", :rules="rules")
      el-form-item(v-if="fieldPerms.userAccount", label="帐号")
        el-input(v-model="user.userAccount", readonly)
      el-form-item(v-if="fieldPerms.userEmail", label="email")
        el-input(v-model="user.userEmail")
      el-form-item(label="密码")
        el-button(type="info", @click="sendResetPasswordMail()") 发送重置密码信
      el-form-item(v-if="fieldPerms.userDeptGroupName", label="部门")
        el-select(
          v-model="user.admin_dept_group_id",
          :filterable="true",
          no-match-text="无符合项目"
        )
          el-option(
            v-for="(department, index) in departments",
            :key="department.id",
            :label="department.userDeptGroupName",
            :value="department.id",
            :disabled="fieldPerms.userDeptStatus && ! department.userDeptStatus.value"
          )
      el-form-item(v-if="fieldPerms.userJobGroupName", label="职称")
        el-select(
          v-model="user.admin_job_group_id",
          :filterable="true",
          no-match-text="无符合项目"
        )
          el-option(
            v-for="(job, index) in jobs",
            :key="job.id",
            :label="job.userJobGroupName",
            :value="job.id",
            :disabled="! job.userJobStatus.value"
          )
      el-form-item(v-if="fieldPerms.groupAuthGroupName", label="群组")
        el-select(
          v-model="user.admin_auth_group_id",
          :filterable="true",
          no-match-text="无符合项目"
        )
          el-option(
            v-for="(group, index) in groups",
            :key="group.id",
            :label="group.groupAuthGroupName",
            :value="group.id",
            :disabled="! group.groupStatus.value"
          )
      el-form-item(v-if="fieldPerms.userStatus", label="使用者状态")
        div(v-if="originalUser.userStatus.value === 2")
          el-tag(type="warning").mr-2 待审核
          el-button.clear-focus(
            v-if="buttonPerms.enableUser"
            type="success",
            size="mini",
            icon="el-icon-check",
            :plain="user.userStatus.value !== 1"
            @click="user.userStatus.value === 1 ? user.userStatus.value = 2 : user.userStatus.value = 1"
          ) 启用
          el-button.clear-focus(
            v-if="buttonPerms.rejectUser"
            type="danger",
            size="mini",
            icon="el-icon-close",
            :plain="user.userStatus.value !== 3"
            @click="user.userStatus.value === 3 ? user.userStatus.value = 2 : user.userStatus.value = 3"
          ) 退回
        el-tag(v-else-if="originalUser.userStatus.value === 3", type="info") {{ originalUser.userStatus.display }}
        template(v-esle)
          el-switch(
            v-if="buttonPerms.enableUser && buttonPerms.disableUser",
            v-model="user.userStatus.value",
            :inactive-value="0",
            inactive-text="停用",
            :active-value="1",
            active-text="启用",
          )
      el-form-item(label="备注", prop="note")
        el-input(type="textarea", v-model="user.note", :autosize="{ minRows: 2, maxRows: 6 }")
      el-form-item(size="large")
        el-button(type="primary", @click="submitEditUser", icon="el-icon-check") 储存
</template>

<script>
import { getUserAPI, editUserAPI } from '@/api/acl/account';
import { getDepartmentsAPI } from '@/api/acl/department';
import { getJobsAPI } from '@/api/acl/job';
import { getGroupsAPI } from '@/api/acl/group';
import cloneDeep from 'lodash/cloneDeep';
import { sendResetPasswordMailByAdminAPI } from '@/api/auth.js';

export default {
  data() {
    return {
      originalUser: {
        userStatus: {
          value: ''
        }
      },
      user: {
        id: '',
        userEmail: '',
        userAccount: '',
        admin_dept_group_id: '',
        admin_job_group_id: '',
        admin_auth_group_id: '',
        userStatus: {
          display: '',
          value: ''
        },
        note: ''
      },
      departments: [],
      jobs: [],
      groups: [],
      rules: {
        note: [{ required: true, message: '请填写备注', trigger: 'submit' }]
      },
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    const departments = getDepartmentsAPI();
    const jobs = getJobsAPI();
    const groups = getGroupsAPI();
    const user = getUserAPI(this.$route.query.id);

    Promise.all([departments, jobs, groups, user]).then(response => {
      this.departments = response[0].data.data;
      this.jobs = response[1].data.data;
      this.groups = response[2].data.data;
      this.userInit(response[3].data.data[0]);
    })
  },
  methods: {
    userInit(user) {
      this.originalUser = user;
      this.user = cloneDeep(this.originalUser);
    },
    submitEditUser() {
      this.$refs.form.validate(valid => {
        if (! valid) return false;

        const editData = {
          id: this.originalUser.id,
          note: this.user.note
        };

        const checkField = {
          userEmail: 'email',
          admin_dept_group_id: 'admin_dept_group_id',
          admin_job_group_id: 'admin_job_group_id',
          admin_auth_group_id: 'admin_auth_group_id',
        }

        Object.keys(checkField).forEach(key => {
          if (this.user[key] !== this.originalUser[key]) editData[checkField[key]] = this.user[key];
        })

        if (this.fieldPerms.userStatus && this.user.userStatus.value !== this.originalUser.userStatus.value) {
          editData['status'] = this.user.userStatus.value;
        }

        if (Object.keys(editData).length <= 2) {
          this.$message.warning('无修改, 未送出此次请求！')
          return false;
        }

        editUserAPI(editData).then(response => {
          this.userInit(response.data.data[0]);
          this.$message.success('修改成功！');
        });
      })
    },
    sendResetPasswordMail() {
      this.$swal({
        title: '系统提示',
        text: '是否要寄出重置密码信？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          return sendResetPasswordMailByAdminAPI({
            memberId: this.$route.query.id,
            addr: window.location.origin + '/ResetPass?key='
          });
        }

        return Promise.reject();
      })
      .then(() => {
        this.$swal('成功！', '重置密码信已成功寄出', 'success');
      }).catch(error => {
        if (error) {
          this.$swal('寄送失败，请重试！若无法解决请洽相关人员。' , 'error');
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.item {
  font-size: 1.2em;
  margin-bottom: 16px;
}

.clear-focus.el-button.is-plain:focus {
  &.el-button--danger {
    background: #fef0f0;
    border-color: #fbc4c4;
    color: #F56C6C;
  }

  &.el-button--success {
    background: #f0f9eb;
    border-color: #c2e7b0;
    color: #67C23A;
  }
}
</style>
