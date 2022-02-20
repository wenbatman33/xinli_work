<template lang="pug">
.app-container
  //- search
  .row.py-1.d-flex.flex-row.mt-2
    .col-sm-auto.p-1
      .search-title 建立时间
      el-date-picker(
        ref="createdTime"
        v-model="createdTime"
        size="medium",
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss",
        :picker-options="pickerOptions",
        :default-time='["00:00:00", "23:59:59"]',
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right")
    .col-sm-auto.p-1
      .search-title 订单编号
      el-input(size="medium", v-model="search.order_sn", clearable="", placeholder="请输入订单编号")
    .col-sm-auto.p-1
      .search-title 交易员搜寻
      el-input(size="medium", v-model="search.trader_account", clearable="", placeholder="请输入交易员帐号")
    .col-sm-auto.p-1
      .search-title 状态
      el-select(v-model="search.status" , size="medium",  clearable="", placeholder="全部" style="width:100px;")
        el-option(v-for="(value, key)  in options.status", :key="key", :label="value", :value="key")
    .col-sm-auto.p-1
      .search-title 平台来源
      el-input(size="medium", v-model="search.merchant_id", clearable="", placeholder="请输入平台来源")
    .col-sm-auto.p-1
      .search-title 最后更新时间
      el-date-picker(
        v-model="updateTime"
        size="medium",
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss",
        :picker-options="pickerOptions",
        :default-time='["00:00:00", "23:59:59"]',
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right")
    .col-sm-auto.p-1
      .search-title
      el-button(@click="listQuery.page=1;getData()", size="medium", type="primary") 搜寻
    el-divider
  .row.py-2
    el-table( :data="listData",v-loading="listLoading", :stripe="true",fit,highlight-current-row)
      el-table-column(prop="order_sn",fixed="left" label="订单单号" width="220px")
      el-table-column(prop="id", label="id")
      el-table-column(prop="merchant_order_sn", label="平台单号")
      el-table-column(prop="pay_channel_order_sn", label="渠道单号")
      el-table-column(prop="created_at", label="建立时间")
      el-table-column(prop="amount", label="订单金额")
      el-table-column(prop="status", label="状态")
        template(slot-scope="{row}")
          el-tag(:type="row.status.value===0?'danger':'success'") {{row.status.string}}
      el-table-column(prop="merchant", label="来源商户")
      el-table-column(prop="trader", label="交易员帐号")
      el-table-column(prop="pay_channel", label="渠道线路")
      el-table-column(prop="bank_card", label="户名")
      el-table-column(prop="updated_at", label="最后更新时间")
      el-table-column(prop="editor", label="执行人")
      el-table-column(prop="merchant_fee_amount", label="平台手续费")
      el-table-column(prop="pay_channel_fee_amount", label="交易手续费")
      el-table-column(prop='id', label='操作' fixed="right" width="160px")
        template(slot-scope="{row}")
          p.m-0
            el-link.ml-2(type="primary" size="small" @click="openOrderLogDialog(row)" :loading="loading") 订单记录
          p.m-0(v-if="checkIsHEPay(row)")
            el-link.ml-2(type="primary" size="small" @click="openOrderEditDialog(row)" :loading="loading") 修改订单
          p.m-0(v-if="checkIsHEPay(row)")
            el-link.ml-2(type="primary" size="small" @click="submitOrderNotify(row)" :loading="loading") 回调订单状态
  .row.d-flex.justify-content-center
    pagination(v-show="listTotal>0" :total="listTotal" :page.sync="listQuery.page",:limit.sync="listQuery.per_page", @pagination="getData")
  el-dialog(title="修改订单" :visible.sync="dialogs.orderEdit" width="900px",:close-on-click-modal="false",:close-on-press-escape="false" )
    .row.py-1
      .col-6
        .search-title 建立时间
        b {{editRowItem.created_at}}
      .col-6
        .search-title 来源商户
        b {{editRowItem.merchant}}
    .row.py-1.d-flex.flex-row.mt-2
      .col-6
        .search-title 订单单号
        b {{editRowItem.order_sn}}
      .col-6
        .search-title 渠道单号
        b {{editRowItem.pay_channel_order_sn}}
    el-form(ref="formOrderEdit" :model="forms.orderEdit" :rules="rules" )
      hr
      .row.d-flex.flex-row
        .col-6
          el-form-item(label="状态" prop="status")
            el-select(v-if='forms.orderEdit.status', v-model="forms.orderEdit.status" , size="medium", placeholder="全部" style="width:100px;")
              el-option(v-for="(value, key)  in options.status", :key="key", :label="value", :value="key")
        .col-6
          el-form-item(label="订单金额" prop="amount")
            el-input(size="medium", v-model="forms.orderEdit.amount", clearable="", placeholder="请输入订单金额"  style="width:200px;")
      .row.d-flex.flex-row
        .col-6
          el-form-item(label="交易员" prop="member_id")
            el-select(
              v-model="forms.orderEdit.member_id"
              reserve-keyword
              placeholder="请输入交易员"
              @change='selectedHandle')
              el-option(v-for="item in traderList"
                :key="item.id"
                :label="item.account"
                :value="item.id")
        .col-6(v-if='forms.orderEdit.member_id')
          el-form-item(label="银行卡号/渠道" prop="member_bankcard_id")
            el-select(
              v-model="forms.orderEdit.member_bankcard_id"
              reserve-keyword
              placeholder="请选择银行卡号")
              el-option(v-for="bankItem in traderBankcardsList"
                :key="bankItem.id"
                :label="bankItem.bankcard_no"
                :value="bankItem.id")
      .row.d-flex.flex-row
        .col-12
          el-form-item(label="备注" prop="note")
            el-input(
              v-model="forms.orderEdit.note"
              type="textarea"
              placeholder="请输入备注内容"
              maxlength="30"
              show-word-limit)
      .row.py-1.d-flex.flex-row.mt-2
        .col-12.text-center
          el-button(@click="oderSubmit(editRowItem)", size="medium", type="primary") 修改
  el-dialog(v-if='orderLog', title="订单记录" :visible.sync="dialogs.orderLog" width="800px",:close-on-click-modal="false",:close-on-press-escape="false" )
    .row.py-1
      .col-6
        .search-title 建立时间
        b {{orderLog.created_at}}
      .col-6
        .search-title 来源商户
        b {{orderLog.merchant}}
    .row.py-1
      .col-6
        .search-title 订单单号
        b {{orderLog.order_sn}}
      .col-6
        .search-title 渠道单号
        b {{orderLog.pay_channel_order_sn}}
    .row.py-1
      .col-6
        .search-title 状态
        b(v-if='orderLog.status') {{orderLog.status.string}}
      .col-6
        .search-title 交易员
        b {{orderLog.trader}}
    .row.py-1
      .col-6
        .search-title 订单金额
        b {{orderLog.amount}}
      .col-6
        .search-title 银行号/渠道
        b {{orderLog.merchant_order_sn}}
    div(v-if='orderLog.logs.length>0')
      hr
      h6 操作纪录
      el-table(:data="orderLog.logs", :stripe="true",fit,highlight-current-row)
        el-table-column(prop="created_at" label="时间" width="220px")
        el-table-column(prop="editor", label="操作人")
        el-table-column(prop="trader_status.string", label="操作内容")
        el-table-column(prop="status.string", label="操作后订单状态")
        el-table-column(prop="note", label="备注")
</template>
<script>
import { getMemberList, getOderList, getOderNotify, oderEdit } from '@/api/member'
import Pagination from '@/components/Pagination'

export default {
  name: 'Oder',
  components: { Pagination },
  data () {
    const vm = this
    return {
      userInfo: this.$store.getters.userInfo,
      loading: false,
      dialogs: {
        orderEdit: false,
        orderLog: false
      },
      traderList: [],
      traderBankcardsList: [],
      editRowItem: [],
      editFrom: {},
      listData: [],
      listTotal: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        per_page: 40
      },
      createdTime: [
        new Date(vm.$dayjs().subtract(1, 'week').startOf('day').valueOf()),
        // new Date(vm.$dayjs().startOf('day').valueOf()),
        new Date(vm.$dayjs().endOf('day').valueOf())
      ],
      updateTime: [],
      orderLog: '',
      search: {
        created_start: '',
        created_end: '',
        trader_account: '',
        order_sn: '',
        status: '',
        merchant_id: '',
        updated_start: '',
        updated_end: ''
      },
      options: {
        status: { 0: '失败', 1: '完成', 2: '處理中' }
      },
      forms: {
        orderEdit: {
          status: '',
          member_id: '',
          amount: '',
          member_bankcard_id: '',
          note: ''
        }
      },
      rules: {
        status: [{ required: true, message: '请输入手机号码', trigger: ['blur', 'change'] }],
        amount: [{ required: true, message: '请输入订单金额', trigger: ['blur', 'change'] }],
        member_id: [{ required: true, message: '请输入交易员', trigger: ['blur', 'change'] }],
        member_bankcard_id: [{ required: true, message: '请选择银行卡号', trigger: ['blur', 'change'] }]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date(vm.$dayjs().startOf('day').valueOf())
            const start = new Date(vm.$dayjs().subtract(1, 'week').startOf('day').valueOf())
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date(vm.$dayjs().startOf('day').valueOf())
            const start = new Date(vm.$dayjs().subtract(1, 'month').startOf('day').valueOf())
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date(vm.$dayjs().startOf('day').valueOf())
            const start = new Date(vm.$dayjs().subtract(3, 'month').startOf('day').valueOf())
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {
    this.search.created_start = this.$dayjs(this.createdTime[0]).format('YYYY-MM-DD HH:mm:ss')
    this.search.created_end = this.$dayjs(this.createdTime[1]).format('YYYY-MM-DD HH:mm:ss')
    // 先取所有交易員列表
    const payload = { status: 1, identity: 4, page: 1, per_page: 99999 }
    getMemberList(payload).then((res) => {
      this.loading = false
      this.traderList = res.data
    })
    this.getData()
  },
  methods: {
    getData () {
      this.listLoading = true
      const postData = {}
      this.search.created_start = this.$dayjs(this.createdTime[0]).format('YYYY-MM-DD HH:mm:ss')
      this.search.created_end = this.$dayjs(this.createdTime[1]).format('YYYY-MM-DD HH:mm:ss')
      postData.created_start = this.search.created_start
      postData.created_end = this.search.created_end
      if (this.search.trader_account) postData.trader_account = this.search.trader_account
      if (this.search.order_sn) postData.order_sn = this.search.order_sn
      if (this.search.merchant_id) postData.merchant_id = this.search.merchant_id
      if (this.search.status) postData.status = this.search.status
      if (this.updateTime) {
        this.search.updated_start = this.$dayjs(this.updateTime[0]).format('YYYY-MM-DD HH:mm:ss')
        this.search.updated_end = this.$dayjs(this.updateTime[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      getOderList(Object.assign(postData, this.listQuery)).then(res => {
        this.listData = res.data
        if (res.meta) { this.listTotal = res.meta.pagination.total }
        this.listLoading = false
      })
    },
    checkIsHEPay(row) {
      return row.pay_channel.indexOf('HEPay') >= 0
    },
    openOrderLogDialog(row) {
      this.orderLog = row
      this.dialogs.orderLog = true
    },
    // 開啟修改訂單
    openOrderEditDialog(row) {
      if (this.$refs.formOrderEdit) this.$refs.formOrderEdit.resetFields()
      this.dialogs.orderEdit = true
      const { amount, member_bankcard_id } = row
      const status = String(row.status.value)
      const note = (row.logs.length > 0) ? row.logs[0].note : ''
      this.editRowItem = JSON.parse(JSON.stringify(row))
      this.forms.orderEdit = { status, amount, member_bankcard_id, note }
      this.editRowItem.status = row.status.value.toString()
    },
    selectedHandle(e) {
      const trader = this.traderList.filter(item => item.id === e)
      this.traderBankcardsList = JSON.parse(JSON.stringify(trader[0].bankcards))
    },
    oderSubmit(row) {
      this.$refs.formOrderEdit.validate(valid => {
        if (valid) {
          this.$confirm('提醒您！修改订单后交易手续费金额会重新计算', '确认修改订单？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            oderEdit(row.id, this.forms.orderEdit)
              .then(res => {
                if (res.debug) {
                  this.$message({ message: '修改成功', type: 'success' })
                } else {
                  this.$message({ message: res.message, type: 'error' })
                }
              })
              .catch(() => { })
          })
        }
      })
    },
    submitOrderNotify(row) {
      getOderNotify(row.id).then(res => {
        this.$message({ message: '回调成功', type: 'success' })
      })
    }
  }
}
</script>
