<template lang="pug">
  .app-container
    //- search
    .row.py-1.d-flex.flex-row.mt-2
      .col-sm-auto.p-1
        .search-title 搜寻帐号
        el-input(size="medium", v-model="search.account", clearable="", placeholder="请输入搜寻帐号")
      .col-sm-auto.p-1
        .search-title 狀態
        el-select(v-model="search.status" , size="medium",  clearable="", placeholder="全部")
          el-option(v-for="(value, key)  in options.status", :key="key", :label="value", :value="key")
      .col-sm-auto.p-1
        .search-title
        el-button(@click="listQuery.page=1;getData()", size="medium", type="primary") 搜寻
      .col.py-1.d-inline-flex.justify-content-end.align-self-start.mb-1.mr-3
        el-button(type="primary",size="medium"  @click="openCreateDialog()") 新增使用者
    .py-2
    //- table
    .row.py-2
      el-table( :data="listData",v-loading="listLoading" ,border,:stripe="true",fit,highlight-current-row)
        el-table-column(prop="account", label="使用者帐号")
        el-table-column(prop="name", label="姓名")
        el-table-column(prop="note", label="备注")
        el-table-column(prop="status", label="状态")
          template(slot-scope="{row}")
            el-tag(:type="row.status.value===1?'success':'danger'") {{options.status[row.status.value]}}
        el-table-column(prop="register_at", label="建立时间")
        el-table-column(prop='id', label='操作' width="230px")
          template(slot-scope="{row}")
            el-link.ml-2(type="primary" size="small" @click="openUpdateDialog(row)" :loading="loading") 编辑
            el-link.ml-2(v-if="row.status.value===0" type="danger" size="small" @click="updateMemberStatus(row.id)" :loading="loading") 启用
            el-link.ml-2(v-if="row.status.value===1" type="primary" size="small" @click="updateMemberStatus(row.id)" :loading="loading") 停用

    .row.d-flex.justify-content-center
      pagination(v-show="listTotal>0" :total="listTotal" :page.sync="listQuery.page",:limit.sync="listQuery.per_page", @pagination="getData")
    //-  dialog create
    el-dialog(title="新增使用者" :visible.sync="dialogs.create" width="800px",:close-on-click-modal="false",:close-on-press-escape="false" )
      el-form.form-container(ref="formCreate" :model="forms.create" :rules="rules.create" label-width="100px" )
        el-form-item(label="帐号" prop="account")
          el-input(v-model="forms.create.account",size="small",placeholder="请输入帐号")
        el-form-item(label="密码" prop="password")
          el-input(v-model="forms.create.password",size="small",placeholder="请输入默认密码" type="password")
        el-form-item(label="Email" prop="email")
          el-input(v-model="forms.create.email",size="small",placeholder="请输入Email")
        el-form-item(label="真实姓名" prop="name")
          el-input(v-model="forms.create.name",size="small",placeholder="请输入真实姓名")
        el-form-item(label="备注" prop="note")
          el-input(v-model="forms.create.note",size="small",placeholder="请输入真实姓名",type="textarea",:rows="10" )
      .dialog-footer(slot="footer")
        el-button(@click="dialogs.create = false" :loading="loading") 取 消
        el-button(type="primary" :loading="loading" @click="formCreateSubmit()") 确 定
    //-  dialog update
    el-dialog(title="编辑使用者" :visible.sync="dialogs.update" width="800px",:close-on-click-modal="false",:close-on-press-escape="false" )
      el-form.form-container(ref="formUpdate" :model="forms.update" :rules="rules.update" label-width="100px" )
        el-form-item(label="帐号" prop="account")
          el-input(v-model="forms.update.account",size="small",placeholder="请输入帐号")
        el-form-item(label="密码" prop="password")
          el-input(v-model="forms.update.password",size="small",placeholder="请输入默认密码" type="password")
        el-form-item(label="Email" prop="email")
          el-input(v-model="forms.update.email",size="small",placeholder="请输入Email")
        el-form-item(label="真实姓名" prop="name")
          el-input(v-model="forms.update.name",size="small",placeholder="请输入真实姓名")
        el-form-item(label="备注" prop="note")
          el-input(v-model="forms.update.note",size="small",placeholder="请输入真实姓名",type="textarea",:rows="10" )
      .dialog-footer(slot="footer")
        el-button(@click="dialogs.update = false" :loading="loading") 取 消
        el-button(type="primary" :loading="loading" @click="formUpdateSubmit()") 确 定
</template>
<script>
import { getMemberList, createOperator, updateMemberStatus, updateMember } from '@/api/member'
import { validPassword, validAccount } from '@/utils/validate'
import Pagination from '@/components/Pagination'

export default {
  name: 'SystemIndex',
  components: { Pagination },
  data () {
    const validatePassword = (rule, value, callback) => {
      if (value === '' || value && !validPassword(value)) {
        callback(new Error('请输入8～20位数的字母和数字组成、不含特殊符号'))
      } else {
        callback()
      }
    }
    const validateAccount = (rule, value, callback) => {
      if (value === '' || value && !validAccount(value)) {
        callback(new Error('请输入8～16位数的字母和数字组成、不含特殊符号'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      listData: [],
      listTotal: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        per_page: 40
      },
      search: {
        identity: 1,
        account: '',
        status: ''
      },
      options: {
        status: { 0: '關閉', 1: '启用' }
      },
      dialogs: {
        create: false,
        update: false
      },
      updateData: {},
      forms: {
        create: {
          account: '',
          password: '',
          email: '',
          name: '',
          note: ''
        },
        update: {
          id: '',
          account: '',
          password: '',
          email: '',
          name: '',
          note: ''
        }
      },
      rules: {
        create: {
          password: [{ required: true, trigger: ['blur', 'change'], validator: validatePassword }],
          account: [{ required: true, trigger: ['blur', 'change'], validator: validateAccount }],
          email: [{ required: true, message: '请输入Email', trigger: ['blur', 'change'] }],
          name: [{ required: true, message: '请输入真实姓名', trigger: ['blur', 'change'] }]
        },
        update: {
          account: [{ required: true, trigger: ['blur', 'change'], validator: validateAccount }],
          email: [{ required: true, message: '请输入Email', trigger: ['blur', 'change'] }],
          name: [{ required: true, message: '请输入真实姓名', trigger: ['blur', 'change'] }]
        }
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData () {
      this.listLoading = true
      const postData = {}
      if (this.search.account) postData.account = this.search.account
      if (this.search.status) postData.status = this.search.status
      postData.identity = this.search.identity
      getMemberList(Object.assign(postData, this.listQuery)).then(res => {
        this.listData = res.data
        if (res.meta) { this.listTotal = res.meta.pagination.total }
        this.listLoading = false
      })
    },
    openCreateDialog() {
      if (this.$refs.formCreate) this.$refs.formCreate.resetFields()
      this.dialogs.create = true
    },
    formCreateSubmit() {
      this.$refs.formCreate.validate(valid => {
        if (valid) {
          this.loading = true
          createOperator(this.forms.create)
            .then(res => {
              if (res.debug) {
                this.$message.error({ message: '新增失敗:' + res.debug[0], duration: 1500 })
                this.loading = false
                return false
              }
              this.$message({ message: '新增成功', type: 'success', duration: 1500 })
              this.loading = false
              this.dialogs.create = false
              this.getData()
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    },
    openUpdateDialog(row) {
      this.forms.update.id = row.id
      this.forms.update.account = row.account
      this.forms.update.password = ''
      this.forms.update.email = row.email
      this.forms.update.name = row.name
      this.forms.update.note = row.note
      this.dialogs.update = true
    },
    formUpdateSubmit() {
      this.$refs.formUpdate.validate(valid => {
        if (valid) {
          this.loading = true
          const postData = {}
          postData.account = this.forms.update.account
          postData.email = this.forms.update.email
          postData.name = this.forms.update.name
          postData.note = this.forms.update.note

          if (this.forms.update.password)postData.password = this.forms.update.password
          updateMember(this.forms.update.id, postData)
            .then(res => {
              if (res.debug) {
                this.$message.error({ message: '更新失敗:' + res.debug[0], duration: 1500 })
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
    updateMemberStatus(id) {
      this.loading = true
      return new Promise(() => {
        updateMemberStatus(id)
          .then(res => {
            if (res.debug) {
              this.$message.error({ message: '更新失敗:' + res.debug[0], duration: 1500 })
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
    }
  }
}
</script>
