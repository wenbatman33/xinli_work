<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.addPaymentGroup", @click="dialog.visible = true") 新增群组
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
        el-table-column(v-if="fieldPerms.GPMerchantName", label="群组名称", align="center")
          template(slot-scope="{ row }")
            router-link(
              :to="{ path: '/paymentGroupDetail', query: { title: row.GPMerchantName, id: row.id } }"
            ) {{ row.GPMerchantName }}
        el-table-column(v-if="fieldPerms.GPMerchantCount", prop="GPMerchantCount", label="通道数", align="center")
        el-table-column(v-if="fieldPerms.GPMerchantMembers", prop="GPMerchantMembers", label="会员数", align="center")
        el-table-column(v-if="fieldPerms.GPMerchantLimitString", prop="GPMerchantLimitString", label="单笔限额", align="center")
        el-table-column(
          v-if="fieldPerms.GPMerchantNote",
          prop="GPMerchantNote",
          label="备注",
          align="center",
          show-overflow-tooltip
        )
        el-table-column(v-if="buttonPerms.editPaymentGroupt", label="管理", width="100", align="center")
          template(slot-scope="{ row }")
            el-link.text-primary(type="primary", @click="editPaymentGroup(row)") 编辑
    //- dialog
    el-dialog(:visible.sync="dialog.visible", :title="dialog.title", @closed="dialogClose", @open="dialogOpen")
      el-form(:model="formData", ref="form", label-width="100px", :rules="rules", status-icon)
        el-form-item(label="群组名称", prop="name")
          el-input(v-model="formData.name", placeholder="请输入群组名称", maxlength="20", show-word-limit)
        el-form-item(label="备注", prop="note")
          el-input(
            type="textarea",
            v-model="formData.note",
            :autosize="{ minRows: 6, maxRows: 20}",
            maxlength="200",
            show-word-limit
          )
        el-form-item(label="单笔限额", required)
          el-col(:span="11")
            el-form-item(prop="lower_limit")
              el-input(type="number", v-model.number="formData.lower_limit", min="0")
          el-col.text-center(:span="2") ~
          el-col(:span="11")
            el-form-item(prop="up_limit")
              el-input(type="number", v-model.number="formData.up_limit", min="0")
        el-form-item
          el-button(@click="handleSubmit()") 储存
</template>

<script>
import { getPaymentGroupsAPI, addPaymentGroupAPI, editPaymentGroupAPI } from '@/api/payment/paymentGroup';

export default {
  data() {
    const checkLowerLimit = (rule, value, callback) => {
      if (value > this.formData.up_limit) {
        callback(new Error('下限不得超过上限'));
      }

      callback();
    }

    const checkUpLimit = (rule, value, callback) => {
      if (value < this.formData.lower_limit) {
        callback(new Error('上限不得低于下限'));
      }

      callback();
    }

    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      dialog: {
        visible: false,
        title: '新增群组'
      },
      formData: {
        id: 0,
        name: '',
        note: '',
        lower_limit: 0,
        up_limit: 0,
      },
      rules: {
        name: [
          { required: true, message: '群组名称为必填', trigger: 'submit' },
          { max: 20, message: '群组名称最多20个字元' }
        ],
        note: [
          { max: 200, message: '群组名称最多200个字元' }
        ],
        lower_limit: [
          { required: true, message: '单笔下限为必填' },
          { type: 'number', message: '单笔下限为数字值'},
          { validator: checkLowerLimit, trigger: 'submit' }
        ],
        up_limit: [
          { required: true, message: '单笔上限为必填' },
          { type: 'number', message: '单笔上限为数字值'},
          { validator: checkUpLimit, trigger: 'submit' }
        ]
      },
      filterList: [
        {
          label: '群组名称',
          model: 'name',
          component: 'filterInput',
          props: { type: 'text' }
        },

      ]
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

      getPaymentGroupsAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    editPaymentGroup(row) {
      this.formData.id = row.id;
      this.formData.name = row.GPMerchantName;
      this.formData.note = row.GPMerchantNote;
      this.formData.lower_limit = row.GPMerchantLowerLimit;
      this.formData.up_limit = row.GPMerchantUpLimit;

      this.dialog.visible = true;
      this.dialog.title = `编辑群组 - ${row.GPMerchantName}`;
    },
    dialogOpen() {
      if (this.$refs.form) {
        this.$refs.form.clearValidate();
      }
    },
    dialogClose() {
      this.formData.id = 0;
      this.formData.name = '';
      this.formData.note = '';
      this.formData.lower_limit = 0;
      this.formData.up_limit = 0;
      this.dialog.title = '新增群组';
      this.$refs.form.clearValidate();
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formData.id ? this.handleUpdate() : this.handleCreate();
        }
      })
    },
    handleCreate() {
      addPaymentGroupAPI(this.formData).then(() => {
        this.$message.success('三方金流群组 - 新增成功');
        this.dialog.visible = false;
        this.getData();
      });
    },
    handleUpdate() {
      editPaymentGroupAPI(this.formData.id, this.formData).then(response => {
        this.$message.success('三方金流群组 - 编辑成功');
        this.dialog.visible = false;
        this.$set(
          this.tableData,
          this.tableData.findIndex(group => group.id === response.data.data[0].id),
          response.data.data[0]
        );
      });
    }
  }
}
</script>
