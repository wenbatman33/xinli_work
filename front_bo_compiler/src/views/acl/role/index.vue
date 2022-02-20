<template lang="pug">
  .container-fluid
    //- Head
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.addGroup", @click="insertDialogVisible = true") 新增群组
    //- User Table
    .row
      el-table(:data="tableData", height="75vh")
        el-table-column(v-if="fieldPerms.groupAuthGroupName", label="群组名", width="120", align="center")
          template(slot-scope="{ row }")
            router-link.links.mt-1(
              :to="{ path:'roleDetail', query: { title: row.groupAuthGroupName, id: row.id } }"
            ) {{ row.groupAuthGroupName }}
        el-table-column(
          v-if="fieldPerms.groupAuthEnableCount || fieldPerms.groupAuthTotalCount",
          align="center",
          fit="true",
          width="200"
        )
          template(slot-scope="{ row }", slot="header")
            span(v-if="fieldPerms.groupAuthEnableCount") 启用人数
            span(v-if="fieldPerms.groupAuthEnableCount && fieldPerms.groupAuthTotalCount") / <br>
            span(v-if="fieldPerms.groupAuthTotalCount") 总人数
          template(slot-scope="{ row }")
            span(v-if="fieldPerms.groupAuthEnableCount") {{ row.groupAuthEnableCount }}
            span(v-if="fieldPerms.groupAuthEnableCount && fieldPerms.groupAuthTotalCount")  /
            span(v-if="fieldPerms.groupAuthTotalCount") {{ row.groupAuthTotalCount }}
        el-table-column(v-if="fieldPerms.groupNoticeList", label="联络人", align="center")
          template(slot-scope="{ row }")
            p(v-for="notice in row.groupNoticeList") {{ notice }}
        el-table-column(v-if="fieldPerms.groupStatus", label="状态", align="center", width="120")
          template(slot-scope="{ row }")
            el-tag(v-if="row.groupStatus.value === 0", type="danger") {{ row.groupStatus.display }}
            el-tag(v-if="row.groupStatus.value === 1", type="success") {{ row.groupStatus.display }}
        el-table-column(v-if="fieldPerms.groupAuthGroupNote", label="群组备注", align="center", width="100")
          template(slot-scope="{ row }")
            line-clamp(:content="row.groupAuthGroupNote")
        el-table-column(v-if="fieldPerms.groupUpdatedAt", prop="groupUpdatedAt", label="最后更新", width="180")
        el-table-column(v-if="fieldPerms.groupAuthGroupName", label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            router-link.links.mt-1(
              :to="{ path:'roleDetail', query: { title: row.groupAuthGroupName, id: row.id } }"
            ) 查看
    .justify-content-end
    //- dialog -- 新增群组 --
    el-dialog(
      v-if="buttonPerms.addGroup"
      title="新增群组",
      :visible.sync="insertDialogVisible",
      width="80%",
      top="10vh",
      :modal-append-to-body="false",
      @closed="resetInsertForm"
    )
      el-form(:model="insertData", ref="insertForm", :rules="rules", status-icon)
        el-form-item(label="群组名称", prop="auth_group_name")
          el-input(v-model="insertData.auth_group_name", maxlength="20", show-word-limit)
        el-form-item(label="群组备注", prop="auth_group_note")
          el-input(
            type="textarea",
            v-model="insertData.auth_group_note",
            :autosize="{ minRows: 6, maxRows: 20}",
            maxlength="200",
            show-word-limit
          )
      .dialog-footer(slot="footer")
        el-button(type="primary" @click="submitInsertForm") 确认新增
</template>

<script>
import { getRolesAPI, addRoleAPI } from '@/api/acl/role';

export default {
  data() {
    return {
      tableData: [],
      insertData: {
        auth_group_name: '',
        auth_group_note: '',
      },
      rules: {
        auth_group_name: [
          { required: true, message: '请输入群组名称' },
          { min: 1, max: 20, message: '长度不可超过 20 字元', trigger: 'blur' }
        ],
        auth_group_note: [
          { max: 200, message: '长度不可超过 200 字元', trigger: 'blur' }
        ],
      },
      insertDialogVisible: false,
      formLabelWidth: '100px',
      filterList: [
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '停用', 1: '启用' },
          },
        },
        { label: '群组名', model: 'auth_group_name', component: 'filterInput', props: { type: 'text' }}
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
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getRolesAPI(APIParams)
      .then(response => {
        this.tableData = response.data.data;
        // todo: API 沒回傳分頁
        // this.dataTotal = response.data.meta.pagination.total;
        // this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    submitInsertForm() {
      this.$refs.insertForm.validate(valid => {
        if (! valid) return false;

        addRoleAPI(this.insertData)
        .then(() => {
          this.$message.success('部门-新增成功');
          this.insertDialogVisible = false;
          this.getData();
          this.resetInsertForm();
        });
      })
    },
    resetInsertForm() {
      this.$refs.insertForm.resetFields();
    }
  }
}
</script>
