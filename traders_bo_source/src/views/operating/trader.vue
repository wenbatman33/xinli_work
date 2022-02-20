<template lang="pug">
  .app-container
    //- search
    .row.py-1.d-flex.flex-row.mt-2
      .col-sm-auto.p-1
        .search-title 交易员搜寻
        el-input(size="medium", v-model="search.account", clearable="", placeholder="请输入交易員帐号")
      .col-sm-auto.p-1
        .search-title 代理状态
        el-select(v-model="search.status" , size="medium",  clearable="", placeholder="全部" style="width:100px;")
          el-option(v-for="(value, key)  in options.status", :key="key", :label="value", :value="key")
      .col-sm-auto.p-1
        .search-title 是否凍結
        el-select(v-model="search.frozen" , size="medium",  clearable="", placeholder="全部" style="width:100px;")
          el-option(v-for="(value, key)  in options.frozen", :key="key", :label="value", :value="key")
      .col-sm-auto.p-1
        .search-title 状态
        el-select(v-model="search.status" , size="medium",  clearable="", placeholder="全部" style="width:100px;")
          el-option(v-for="(value, key)  in options.status", :key="key", :label="value", :value="key")
      .col-sm-auto.p-1
        .search-title 上级代理搜寻
        el-input(size="medium", v-model="search.parent_account", clearable="", placeholder="请输入上级代理帐号")
      .col-sm-auto.p-1
        .search-title
        el-button(@click="listQuery.page=1; getData()", size="medium", type="primary") 搜寻
    .py-2
    //- table
    .row.py-2
      el-table( :data="listData",v-loading="listLoading", :stripe="true",fit,highlight-current-row)
        el-table-column(prop="account", label="交易员帐号" )
        el-table-column(prop="name", label="交易员姓名")
        el-table-column(prop="fee", label="分润比例")
          template(slot-scope="{row}") {{row.fee*1000}}‰
        el-table-column(prop="parent", label="上级代理")
        el-table-column(prop="frozen", label="是否凍結")
          template(slot-scope="{row}")
            el-tag(:type="row.frozen.value===0?'success':'danger'") {{row.frozen.string}}
        el-table-column(prop="status", label="状态")
          template(slot-scope="{row}")
            el-tag(:type="row.status.value===0?'danger':'success'") {{row.status.string}}
        el-table-column(prop="register_at", label="启用时间")
        el-table-column(prop='id', label='操作' fixed="right" width="230px")
          template(slot-scope="{row}")
            el-link.ml-2(type="primary" size="small" @click="openUpdateDialog(row)" :loading="loading") 修改资料
            span ｜
            el-link.ml-2(v-if="row.frozen.value===1" type="danger" size="small" @click="updateMemberFrozenHandle(row.id, row.account, row.frozen.value)" :loading="loading") 启用
            el-link.ml-2(v-if="row.frozen.value===0" type="primary" size="small" @click="updateMemberFrozenHandle(row.id, row.account, row.frozen.value)" :loading="loading") 冻结

    .row.d-flex.justify-content-center
      pagination(v-show="listTotal>0" :total="listTotal" :page.sync="listQuery.page",:limit.sync="listQuery.per_page", @pagination="getData")
    //-  dialog create
    el-dialog(:title="'新增'+createData.title" :visible.sync="dialogs.create" width="800px",:close-on-click-modal="false",:close-on-press-escape="false" )
      el-form.form-container(ref="formCreate" :model="forms.create" :rules="rules" label-width="100px" )
        el-form-item(label="阶层" )
          | {{createData.title}}
        el-form-item(label="手机号码" prop="phone")
          el-input(v-model="forms.create.phone",size="small",placeholder="请输入手机号码" )
        el-form-item(label="分润 ‰" prop="fee")
          .text-danger(v-if='createData.feelimit') 最高{{createData.feelimit}}‰
          el-input(v-model="forms.create.fee",size="small",placeholder="请输入分润")
        el-form-item(label="备注" prop="note")
          el-input(v-model="forms.create.note",size="small",placeholder="请输入备注",type="textarea",:rows="5" )
      .dialog-footer(slot="footer")
        el-button(@click="dialogs.create = false" :loading="loading") 取 消
        el-button(type="primary" :loading="loading" @click="formCreateSubmit()") 确 定
    //-  dialog update
    el-dialog(:title="'修改'+updateData.title" :visible.sync="dialogs.update" width="800px",:close-on-click-modal="false",:close-on-press-escape="false" )
      el-form.form-container(ref="formUpdate" :model="forms.update" :rules="rules" label-width="100px" )
        el-form-item(label="阶层" )
          | {{updateData.title}}
        el-form-item(v-if="updateData.parentTitle" :label="updateData.parentTitle")
          | {{updateData.parent}}
        el-form-item(label="手机号码" prop="phone")
          el-input(v-model="forms.update.phone",size="small",placeholder="请输入手机号码" )
        el-form-item(label="分润 ‰" prop="fee")
          el-input(v-model="forms.update.fee",size="small",placeholder="请输入分润" type="number")
        el-form-item(label="备注" prop="note")
          el-input(v-model="forms.update.note",size="small",placeholder="请输入备注",type="textarea",:rows="5" )
        el-form-item(label="帐号" )
          | {{updateData.account}}
        el-form-item(label="真实姓名" prop="name")
          el-input(v-model="forms.update.name",size="small",placeholder="请输入name" )
      .dialog-footer(slot="footer")
        el-button(@click="dialogs.update = false" :loading="loading") 取 消
        el-button(type="primary" :loading="loading" @click="formUpdateSubmit()") 确 定
</template>
<script>
import { getMemberList, updateMemberFrozen, updateMember, createMasterDistributor, createSlaveDistributor, createTrader } from '@/api/member'
import { validPhone } from '@/utils/validate'
import Pagination from '@/components/Pagination'

export default {
  name: 'Trader',
  components: { Pagination },
  data () {
    const validatePhone = (rule, value, callback) => {
      if (value === '' || value && !validPhone(value)) {
        callback(new Error('请输入正确手机号码'))
      } else {
        callback()
      }
    }
    return {
      userInfo: this.$store.getters.userInfo,
      loading: false,
      listData: [],
      listTotal: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        per_page: 40
      },
      search: {
        identity: '',
        account: '',
        parent_account: '',
        status: '',
        frozen: ''
      },
      options: {
        identity: { 2: '总代理', 3: '代理' },
        status: { 0: '关闭', 1: '启用' },
        frozen: { 0: '正常', 1: '冻结' }
      },
      dialogs: {
        create: false,
        update: false
      },
      createData: {},
      updateData: {},
      forms: {
        create: {
          phone: '',
          fee: '',
          note: '',
          parent_id: 0
        },
        update: {
          phone: '',
          fee: '',
          note: '',
          name: ''
        }
      },
      rules: {
        phone: [{ required: true, message: '请输入手机号码', trigger: ['blur', 'change'], validator: validatePhone }],
        fee: [{ required: true, message: '请输入分润', trigger: ['blur', 'change'] }]
      }
    }
  },
  mounted() {
    const vm = this
    if (this.$route.query) {
      const { account, identity, status, frozen, parent_account } = this.$route.query
      const temp = { account, identity, status, frozen, parent_account }
      Object.keys(temp).map(function(key, index) {
        if (temp[key] !== undefined) vm.search[key] = temp[key]
      })
    }
    this.getData()
  },
  methods: {
    getData () {
      this.listLoading = true
      const postData = {}
      if (this.search.account) postData.account = this.search.account
      if (this.search.status) postData.status = this.search.status
      if (this.search.frozen) postData.frozen = this.search.frozen
      if (this.search.parent_account !== '') {
        postData.parent_account = this.search.parent_account
        this.search.account = ''
        this.search.identity = '4'
      }
      if (this.search.identity === '') {
        postData.identity = '4'
      } else {
        postData.identity = this.search.identity
      }

      getMemberList(Object.assign(postData, this.listQuery)).then(res => {
        this.listData = res.data
        if (res.meta) { this.listTotal = res.meta.pagination.total }
        this.listLoading = false
      })
    },
    openCreate(row) {
      this.createData = {}
      if (this.$refs.formCreate) this.$refs.formCreate.resetFields()
      this.createData.type = row.identity.value + 1

      switch (this.createData.type) {
        case 2:
          this.createData.title = '总代理'
          this.forms.create.parent_id = 0
          this.createData.feelimit = ''
          break
        case 3:
          this.createData.title = '代理'
          this.createData.feelimit = 5
          this.forms.create.parent_id = row.id
          break
        case 4:
          this.createData.title = '交易员'
          this.forms.create.parent_id = row.id
          this.createData.feelimit = 3
          break
      }
      this.dialogs.create = true
    },
    formCreateSubmit() {
      this.$refs.formCreate.validate(valid => {
        if (valid) {
          this.loading = true
          switch (this.createData.type) {
            case 2:
              createMasterDistributor(this.forms.create)
                .then(res => {
                  if (res.debug) {
                    this.$message.error({ message: '新增' + this.createData.title + '失败:' + res.debug[0], duration: 1500 })
                    this.loading = false
                    return false
                  }
                  this.$message({ message: '新增' + this.createData.title + '成功', type: 'success', duration: 1500 })
                  this.loading = false
                  this.dialogs.create = false
                  this.getData()
                })
                .catch(() => {
                  this.loading = false
                })
              break
            case 3:
              createSlaveDistributor(this.forms.create)
                .then(res => {
                  if (res.debug) {
                    this.$message.error({ message: '新增代理失败:' + res.debug[0], duration: 1500 })
                    this.loading = false
                    return false
                  }
                  this.loading = false
                  this.dialogs.create = false
                  this.getData()
                })
                .catch(() => {
                  this.loading = false
                })
              break
            case 4:
              createTrader(this.forms.create)
                .then(res => {
                  if (res.debug) {
                    this.$message.error({ message: '新增交易员失败:' + res.debug[0], duration: 1500 })
                    this.loading = false
                    return false
                  }
                  this.$message({ message: '新增交易员成功', type: 'success', duration: 1500 })
                  this.loading = false
                  this.dialogs.create = false
                  this.getData()
                })
                .catch(() => {
                  this.loading = false
                })
              break
          }
        }
      })
    },
    openUpdateDialog(row) {
      this.updateData = {}
      this.updateData = row
      this.forms.update.phone = row.phone
      this.forms.update.fee = row.fee * 1000
      this.forms.update.name = row.name
      this.forms.update.note = row.note
      switch (row.identity.value) {
        case 2:
          this.updateData.title = '总代理'
          this.updateData.parentTitle = ''
          this.forms.update.parent_id = 0
          break
        case 3:
          this.updateData.title = '代理'
          this.updateData.parentTitle = '总代理'
          this.forms.update.parent_id = row.id
          break
        case 4:
          this.updateData.title = '交易员'
          this.updateData.parentTitle = '代理'
          this.forms.update.parent_id = row.id
          break
      }
      this.dialogs.update = true
    },
    formUpdateSubmit() {
      this.$refs.formUpdate.validate(valid => {
        if (valid) {
          this.loading = true
          const postData = this.forms.update
          postData.fee = postData.fee / 1000
          updateMember(this.updateData.id, postData)
            .then(res => {
              if (res.debug) {
                this.$message.error({ message: '更新失败:' + res.debug[0], duration: 1500 })
                this.loading = false
                return false
              }
              this.$message({ message: '更新成功', type: 'success', duration: 1500 })
              this.loading = false
              this.dialogs.update = false
              this.getData()
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    updateMemberFrozenHandle(id, account, frozenValue) {
      const status = (frozenValue === 1) ? '启用 ' : '冻结 '
      const title = '是否' + status + ' ' + account
      const des = '提醒您！执行' + status + ', ' + account + ' 状态变更为' + status

      this.$confirm(des, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loading = true
        return new Promise(() => {
          updateMemberFrozen(id)
            .then(res => {
              if (res.debug) {
                this.$message.error({ message: '更新失败:' + res.debug[0], duration: 1500 })
                this.loading = false
                return false
              }
              this.$message({ message: '更新成功', type: 'success', duration: 1500 })
              this.loading = false
              this.getData()
            })
            .catch(() => {
              this.loading = false
            })
        })
      })
    }
  }
}
</script>
