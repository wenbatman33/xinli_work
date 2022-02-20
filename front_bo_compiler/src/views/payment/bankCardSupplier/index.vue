<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(@click="addBankCardSupplier()") 新增卡商
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
        el-table-column(prop="supplier_code", label="卡商代号", width="", align="center")
        el-table-column(prop="supplier_contact_person", label="联络人", width="", align="center")
        el-table-column(prop="supplier_contact_info", label="联络方式", width="", align="center")
        el-table-column(prop="card_count", label="卡片数", width="", align="center")
        el-table-column(prop="card_lock_count", label="冻结卡数", width="", align="center")
        el-table-column(prop="card_lock_amount", label="冻结金额", width="", align="center")
        el-table-column(prop="remark", label="备注", width="", align="center")
        el-table-column(prop="status.display", label="状态", width="", align="center")
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            router-link.links.mt-1(
              :to="{ path:'bankCardSupplierDetail', query: { title: `卡商管理 - ${row.supplier_code}`, id: row.id } }"
            ) 查看

    el-dialog(:visible.sync="dialogVisible", title='新增卡商')
      el-form(:model="formData", ref="form", label-width="100px", :rules="rules")
        el-form-item(label="卡商代号", prop="supplier_code")
          el-input(type="text", v-model="formData.supplier_code")
        el-form-item(label="联络人", prop="supplier_contact_person")
          el-input(type="text", v-model="formData.supplier_contact_person")
        el-form-item(label="联络方式", prop="supplier_contact_info")
          el-input(type="text", v-model="formData.supplier_contact_info")
        el-form-item(label="备注")
          el-input(type="textarea", v-model="formData.remark", :autosize="{ minRows: 5, maxRows: 6}")
        el-form-item(label="上架")
          el-switch(
            v-model="formData.status",
            :inactive-value="0",
            inactive-text="停用",
            :active-value="1",
            active-text="启用")
        el-form-item(size="large")
          el-button(type="primary", @click="submitBankCardSupplier", icon="el-icon-check") 储存
</template>

<script>
import { getBankCardSupplierAPI, addBankCardSupplieAPI } from '@/api/payment/bankCardSupplier';

export default {
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  data() {
    return {
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      dialogVisible: false,
      filterList: [
        { label: '卡商代号', model: 'supplier_code', component: 'filterInput', props: { type: 'text' }},
        { label: '联络人', model: 'supplier_contact_person', component: 'filterInput', props: { type: 'text' }},
        { label: '状态', model: 'status', component: 'filterSelect', props: { options: {  0: '不启用', 1: '启用' } }},
      ],
      tableData: [],
      formData: {
        supplier_code: '',
        supplier_contact_person: '',
        supplier_contact_info: '',
        remark: '',
        status: 0
      },
      rules: {
        supplier_code: [
          { required: true, message: '卡商代号为必填' }
        ],
        supplier_contact_person: [
          { required: true, message: '联络人为必填' }
        ],
        supplier_contact_info: [
          { required: true, message: '联络方式为必填' }
        ],
      },
    }
  },
  created () {
    this.getData()
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
      getBankCardSupplierAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    addBankCardSupplier(){
      this.dialogVisible = true
    },
    submitBankCardSupplier(){
      this.$refs.form.validate(valid => {
        if (valid) {
          addBankCardSupplieAPI(this.formData).then(() => {
            this.$message.success('新增成功！');
            this.dialogVisible = false
            this.getData()
          });
        }
      });
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
