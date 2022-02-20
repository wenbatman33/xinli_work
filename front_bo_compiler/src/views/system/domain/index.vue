<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.mx-2(@click="add") 新增网域
    .justify-content-end
      el-pagination(
        :background="true",
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
      el-table(:data="tableData", border, stripe, height="70vh")
        el-table-column(label="编号", prop="id", align="center", width="60")
        el-table-column(label="网域显示名称", prop="name", align="center")
        el-table-column(label="网域名称", prop="domainName", align="center", min-width="200")
        el-table-column(label="使用状态", prop="domainStatus.display", align="center")
        el-table-column(label="网域类型", prop="domainType.display", align="center")
        el-table-column(label="使用专案名称", prop="projectName", align="center")
        el-table-column(label="备注", prop="note", align="center", show-overflow-tooltip)
        el-table-column(label="操作", align="center", width="60")
          el-link.mx-1.text-primary(slot-scope="{ row }", @click="edit(row)") 编辑
    //- form dialog
    el-dialog(:visible.sync="formVisible", :title="formTitle")
      el-form(:model="form", :rules="rules", ref="form", label-width="auto")
        el-form-item(label="网域显示名称", prop="name")
          el-input(v-model="form.name")
        el-form-item(label="网域名称", prop="domain_name")
          el-input(v-model="form.domain_name")
        el-form-item(label="网域状态")
          el-select(v-model="form.status")
            el-option(label="使用中网域", :value="0")
            el-option(label="备用网域", :value="1")
            el-option(label="库存网域", :value="2")
            el-option(label="停用网域", :value="3")
        el-form-item(label="使用类型")
          el-select(v-model="form.type")
            el-option(label="主推", :value="0")
            el-option(label="次推", :value="1")
            el-option(label="主推Portal", :value="2")
            el-option(label="次推Portal", :value="3")
            el-option(label="游戏厂商页", :value="4")
            el-option(label="API Proxy", :value="5")
            el-option(label="静态页", :value="6")
            el-option(label="API", :value="7")
            el-option(label="管理后台", :value="8")
            el-option(label="活动页", :value="9")
        el-form-item(label="使用专案")
          el-input(v-model="form.project")
        el-form-item(label="備註")
          el-input(type="textarea", v-model="form.note", :autosize="{ minRows: 6, maxRows: 10 }")
      .text-right.mt-3
        el-button(@click="formVisible = false") 取消
        el-button(type="primary", @click="handleSubmit()") 确认
</template>

<script>
import { getDomainsAPI, addDomainAPI, editDomainAPI } from '@/api/system/domain.js';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        {
          label: '网域状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '使用中网域', 1: '备用网域', 2: '库存网域', 3: '停用网域' },
          },
        },
        {
          label: '网域类型',
          model: 'type',
          component: 'filterSelect',
          props: {
            options: {
              'all': '全部',
              0: '主推',
              1: '次推',
              2: '主推Portal',
              3: '次推Portal',
              4: '游戏厂商页',
              5: 'API Proxy',
              6: '静态页',
              7: 'API',
              8: '管理后台',
              9: '活动页'
            },
          },
        },
        { label: '显示名称', model: 'name', component: 'filterInput', props: { type: 'text' }},
        { label: '网域名称', model: 'domain_name', component: 'filterInput', props: { type: 'text' }},
        { label: '专案名称', model: 'project', component: 'filterInput', props: { type: 'text' }},
      ],
      formVisible: false,
      formTitle: '新增网域',
      form: {
        name: '',
        domain_name: '',
        project: '',
        status: 0,
        type: 0,
        note: ''
      },
      rules: {
        name: [
          { required: true, message: '显示名称为必填', trigger: 'submit' }
        ],
        domain_name: [
          { required: true, message: '网域名称为必填', trigger: 'submit' }
        ]
      }
    }
  },
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

      getDomainsAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    add() {
      this.formTitle = '新增网域';
      this.form.id = 0;
      this.form.name = '';
      this.form.domain_name = '';
      this.form.project = '';
      this.form.status = 0;
      this.form.type = 0;
      this.form.note = '';
      this.formVisible = true;
    },
    edit(domain) {
      this.formTitle = '编辑网域';
      this.form.id = domain.id;
      this.form.name = domain.name;
      this.form.domain_name = domain.domainName;
      this.form.project = domain.project;
      this.form.status = domain.domainStatus.value;
      this.form.type = domain.domainType.value;
      this.form.note = domain.note;
      this.formVisible = true;
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.id ? this.handleEdit() : this.handleAdd();
        }
      });
    },
    handleAdd() {
      addDomainAPI(this.form).then(() => {
        this.getData();
        this.$message.success('新增网域成功');
        this.formVisible = false;
      });
    },
    handleEdit() {
      editDomainAPI(this.form.id, this.form).then(() => {
        this.getData();
        this.$message.success('编辑网域成功');
        this.formVisible = false;
      });
    }
  }
}
</script>
