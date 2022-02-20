<template lang="pug">
  .app-container
    //- search
    .row.py-1.d-flex.flex-row.mt-2
      .col-sm-auto.p-1
        .search-title 代理搜寻
        el-input(size="medium", v-model="search.account", clearable="", placeholder="请输入代理帐号")
      .col-sm-auto.p-1
        .search-title 代理层级
        el-select(v-model="search.identity" , size="medium",  clearable="", placeholder="全部")
          el-option(v-for="(value, key)  in options.identity", :key="key", :label="value", :value="key")
      .col-sm-auto.p-1
        .search-title 代理状态
        el-select(v-model="search.status" , size="medium",  clearable="", placeholder="全部" style="width:100px;")
          el-option(v-for="(value, key)  in options.status", :key="key", :label="value", :value="key")
      .col-sm-auto.p-1
        .search-title 是否凍結
        el-select(v-model="search.frozen" , size="medium",  clearable="", placeholder="全部" style="width:100px;")
          el-option(v-for="(value, key)  in options.frozen", :key="key", :label="value", :value="key")
      .col-sm-auto.p-1
        .search-title 上级代理搜寻
        el-input(size="medium", v-model="search.parent_account", clearable="", placeholder="请输入上级代理帐号")
      .col-sm-auto.p-1
        .search-title
        el-button(@click="listQuery.page=1;getData()", size="medium", type="primary") 搜寻
      .col.py-1.flex-column.d-inline-flex.justify-content-end.align-self-start.mb-1.mr-3
        .search-title
        el-button(type="primary",size="medium"  @click="openCreate(userInfo)") 新增总代理
    .py-2
    //- table
    .row.py-2
      el-table( :data="listData",v-loading="listLoading", :stripe="true",fit,highlight-current-row)
        el-table-column(prop="account", label="代理帐号" )
        el-table-column(prop="name", label="代理姓名")
        el-table-column(prop="fee", label="分润比例")
          template(slot-scope="{row}") {{row.fee*1000}}‰
        el-table-column(prop="note", label="备注")
        el-table-column(prop="identity", label="代理层级")
          template(slot-scope="{row}") {{row.identity.string}}
        el-table-column(prop="parent", label="上级代理")
        el-table-column(prop="slave_distributor_count", label="二级代理数量" width="110px")
        el-table-column(prop="trader_count", label="交易员数量" width="100px")
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
            el-link.ml-2(v-if="row.identity.value===2" type="primary" size="small" @click="openCreate(row)" :loading="loading") 新增代理
            el-link.ml-2(v-if="row.identity.value===3" type="primary" size="small" @click="openCreate(row)" :loading="loading") 新增交易员
            br
            el-link.ml-2(v-if="row.frozen.value===0" type="primary" size="small" @click="openIncrementDialog(row)" :loading="loading") 点数上分｜
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
    //-  dialog increment 上分
    el-dialog(:title="'总代理点数'" :visible.sync="dialogs.increment" width="800px",:close-on-click-modal="false",:close-on-press-escape="false" )
      el-form.form-container(ref="formIncrement" :model="forms.increment" :rules="incrementRules" label-width="100px" )
        el-form-item(label="阶层" )
          | {{incrementData.title}}
        el-form-item(v-if="incrementData.parentTitle" :label="incrementData.parentTitle")
          | {{incrementData.parent}}
        el-form-item(label="帳號")
          | {{incrementData.account}}
        el-form-item(v-if='incrementData.point_info', label="目前點數")
          | {{incrementData.point_info.point}}
        el-form-item(label="點數" prop="point")
          el-input(v-model="forms.increment.point",size="small",placeholder="请输入點數" )
      .dialog-footer(slot="footer")
        el-button(@click="dialogs.increment = false" :loading="loading") 取 消
        el-button(type="primary" :loading="loading" @click="formIncrementSubmit()") 确 定
</template>
<script>
import { getMemberList, updateMemberFrozen, updateMember, createMasterDistributor, createSlaveDistributor, createTrader, updateMemberIncrement } from '@/api/member'
import { validPhone } from '@/utils/validate'
import Pagination from '@/components/Pagination'

export default {
  name: 'Distributor',
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
        update: false,
        increment: false
      },
      createData: {},
      updateData: {},
      incrementData: {},
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
        },
        increment: {
          point: '',
          parent_id: ''
        }
      },
      rules: {
        phone: [{ required: true, message: '请输入手机号码', trigger: ['blur', 'change'], validator: validatePhone }],
        fee: [{ required: true, message: '请输入分润', trigger: ['blur', 'change'] }]
      },
      incrementRules: {
        point: [{ required: true, message: '请输入点数', trigger: ['blur', 'change'] }],
        parent_id: [{ required: true, message: '请输上级代理', trigger: ['blur', 'change'] }]
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
      }
      if (this.search.identity === '') {
        postData.identity = '2,3'
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
      const des = '提醒您！执行' + status + '将会连动下级人员状态变更为' + status

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
    },
    openIncrementDialog(row) {
      if (this.$refs.formIncrement) this.$refs.formIncrement.resetFields()
      this.incrementData = row
      switch (row.identity.value) {
        case 2:
          this.incrementData.title = '总代理'
          this.incrementData.parentTitle = ''
          this.forms.increment.parent_id = 0
          break
        case 3:
          this.incrementData.title = '代理'
          this.incrementData.parentTitle = '总代理'
          this.forms.increment.parent_id = row.id
          break
        case 4:
          this.incrementData.title = '交易员'
          this.incrementData.parentTitle = '代理'
          this.forms.increment.parent_id = row.id
          break
      }
      this.dialogs.increment = true
    },
    formIncrementSubmit() {
      this.$refs.formIncrement.validate(valid => {
        if (valid) {
          this.loading = true
          const postData = this.forms.increment
          updateMemberIncrement(this.incrementData.id, postData)
            .then(res => {
              if (res.debug) {
                this.$message.error({ message: '上分失败:' + res.debug[0], duration: 1500 })
                this.loading = false
                return false
              }
              this.$message({ message: '上分成功', type: 'success', duration: 1500 })
              this.loading = false
              this.dialogs.increment = false
              this.getData()
            })
            .catch(() => {
              this.loading = false
            })
        }
      })
    }
  }
}
</script>
