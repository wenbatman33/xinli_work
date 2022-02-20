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
      el-table(:data="tableData", border, stripe, height="75vh")
        el-table-column(v-if="buttonPerms.addAndEditAccount", align="center", width="160")
          template(slot="header")
            el-button.w-100(type="primary", @click="addAccount()") 新增科目
          template(slot-scope="{ row }")
            template(v-if="row.edit")
              el-button(type="success", icon="el-icon-check", @click="handleConfirm(row)")
              el-button(icon="el-icon-close", @click="handleCancel(row)")
            el-button.w-75(v-else, icon="el-icon-edit", @click="editAccount(row)")
        el-table-column(v-if="fieldPerms.accTitleName", label="科目名称", align="center", width="200")
          template(slot-scope="{ row }")
            el-input(v-if="row.edit", v-model="row.name", maxlength="12", show-word-limit)
            span(v-else) {{ row.accTitleName }}
        el-table-column(v-if="fieldPerms.accTitleType", label="类别", align="center", width="160")
          template(slot-scope="{ row }")
            el-radio-group(v-if="row.edit", v-model="row.type", size="medium")
              el-radio-button(:label="0") 支出
              el-radio-button(:label="1") 收入
            span(v-else) {{ row.accTitleType.display }}
        el-table-column(v-if="fieldPerms.accTitleReferId", label="是否关连订单", align="center", width="150")
          template(slot-scope="{ row }")
            el-radio-group(v-if="row.edit", v-model="row.refer_id", size="medium")
              el-radio-button(:label="0") 否
              el-radio-button(:label="1") 是
            span(v-else) {{ row.accTitleReferId.display }}
        el-table-column(v-if="fieldPerms.accTitleRequired", label="说明是否必填", align="center", width="150")
          template(slot-scope="{ row }")
            el-radio-group(v-if="row.edit", v-model="row.required", size="medium")
              el-radio-button(:label="0") 否
              el-radio-button(:label="1") 是
            span(v-else) {{ row.accTitleRequired.display }}
        el-table-column(v-if="fieldPerms.accTitleStatus", label="状态", align="center", width="160")
          template(slot-scope="{ row }")
            el-radio-group(v-if="row.edit", v-model="row.status", size="medium")
              el-radio-button(:label="0") 关闭
              el-radio-button(:label="1") 启用
            span(v-else) {{ row.accTitleStatus.display }}
        el-table-column(v-if="fieldPerms.accTitleNote", label="备注", align="center", show-overflow-tooltip)
          template(slot-scope="{ row }")
            el-input(v-if="row.edit", v-model="row.note")
            span(v-else) {{ row.accTitleNote }}
        el-table-column(v-if="buttonPerms.paymentAccountHasLogNeedId", align="center", width="40")
          i.el-icon-time(slot-scope="{ row }", @click="openUpdateLog(row.id)")
    //- 修改记录
    el-drawer(title="修改记录", :visible.sync="updateLogVisible", :destroyOnClose="true", direction="rtl", size="60%")
      UpdateLog(:tableId="updateLogId")
</template>

<script>
import { getAccountListAPI, addAccountAPI, editAccountAPI } from '@/api/payment/account';
import UpdateLog from '@/components/UpdateLog';

export default {
  components: { UpdateLog },
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      updateLogVisible: false,
      updateLogId: null,
      filterList: [
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '关闭', 1: '启用' },
          },
        },
        {
          label: '類别',
          model: 'type',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '支出', 1: '收入' },
          },
        },
        {
          label: '是否关连订单',
          model: 'refer_id',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '否', 1: '是' },
          },
        },
        {
          label: '说明是否必填',
          model: 'required',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '否', 1: '是' },
          },
        },
        { label: '科目名称', model: 'name', component: 'filterInput', props: { type: 'text' }},
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
        page: this.currentPage,
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getAccountListAPI(APIParams).then(response => {
        this.tableData = response.data.data.map(this.initAccount);
      });
    },
    initAccount(account) {
      this.$set(account, 'edit', false);
      this.$set(account, 'name', account.accTitleName);
      this.$set(account, 'type', account.accTitleType ? account.accTitleType.value : 0);
      this.$set(account, 'refer_id', account.accTitleReferId ? account.accTitleReferId.value : 1);
      this.$set(account, 'required', account.accTitleRequired ? account.accTitleRequired.value : 1);
      this.$set(account, 'status', account.accTitleStatus ? account.accTitleStatus.value : 1);
      this.$set(account, 'note', account.accTitleNote);

      return account;
    },
    addAccount() {
      if (this.tableData[0].id) {
        this.tableData.unshift({
          edit: true,
          name: '',
          type: 0,
          refer_id: 1,
          required: 1,
          status: 1,
          note: ''
        });
      }
    },
    editAccount(row) {
      row.edit = true;
    },
    handleCancel(row) {
      if (row.id) {
        row.edit = false;
        this.initAccount(row);
      } else {
        this.tableData.shift();
      }
    },
    handleConfirm(row) {
      if (row.name === '') {
        this.$message.error('科目名称为必填');
        return;
      }

      row.id ? this.handleUpdate(row.id, row) : this.handleCreate(row);
    },
    handleCreate(row) {
      addAccountAPI(row).then(() => {
        this.$message.success('科目 - 新增成功');
        this.getData();
      });
    },
    handleUpdate(id, row) {
      editAccountAPI(id, row).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(account => account.id === response.data.data[0].id),
          this.initAccount(response.data.data[0])
        );
        this.$message.success('科目 - 修改成功');
      });
    },
    openUpdateLog(id) {
      this.updateLogId = id;
      this.updateLogVisible = true;
    }
  }
}
</script>
