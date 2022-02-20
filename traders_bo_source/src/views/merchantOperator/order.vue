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
      .search-title 状态
      el-select(v-model="search.status" , size="medium",  clearable="", placeholder="全部" style="width:100px;")
        el-option(v-for="(value, key)  in options.status", :key="key", :label="value", :value="key")
    .col-sm-auto.p-1
      .search-title
      el-button(@click="listQuery.page=1;getData()", size="medium", type="primary") 搜寻
    el-divider
  .row.py-2
    el-table( :data="listData",v-loading="listLoading", :stripe="true",fit,highlight-current-row)
      el-table-column(prop="order_sn",fixed="left" label="订单单号" width="220px")
      el-table-column(prop="created_at", label="建立时间")
      el-table-column(prop="amount", align="right", label="订单金额")
      el-table-column(prop="status", label="状态")
        template(slot-scope="{row}")
          el-tag(v-if='row.status===""') {{filterOptionStatus(row.status)}}
          el-tag(v-if='row.status===0', type="danger") {{filterOptionStatus(row.status)}}
          el-tag(v-if='row.status===1', type="success") {{filterOptionStatus(row.status)}}
          el-tag(v-if='row.status===2', type="info") {{filterOptionStatus(row.status)}}
          el-tag(v-if='row.status===3', type="danger")  {{filterOptionStatus(row.status)}}
      el-table-column(prop="updated_at", label="最后更新时间")
      el-table-column(prop="merchant_fee_amount", align="right", label="平台手续费")
      el-table-column(prop='id', label='操作' fixed="right" width="160px")
        template(slot-scope="{row}")
          el-link.ml-2(type="primary" size="small" @click="submitMerchantNotify(row)" :loading="loading") 回调订单状态
</template>
<script>
import { getMerchantOrder, getMerchantNotify } from '@/api/member'
import Pagination from '@/components/Pagination'

export default {
  name: 'Oder',
  components: { Pagination },
  data () {
    const vm = this
    return {
      loading: false,
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
      search: {
        created_start: '',
        created_end: '',
        order_sn: '',
        status: ''
      },
      updateTime: [],
      options: {
        status: { 0: '失败', 1: '完成', 2: '处理中', 3: '取消' }
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            console.log(picker)
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
    this.getData()
  },
  methods: {
    getData () {
      this.listLoading = true
      this.search.created_start = this.$dayjs(this.createdTime[0]).format('YYYY-MM-DD HH:mm:ss')
      this.search.created_end = this.$dayjs(this.createdTime[1]).format('YYYY-MM-DD HH:mm:ss')
      const { created_start, created_end, order_sn, status } = this.search
      const { page, per_page } = this.listQuery
      getMerchantOrder({ created_start, created_end, order_sn, status, page, per_page }).then(res => {
        this.listData = res
        if (res.meta) { this.listTotal = res.meta.pagination.total }
        this.listLoading = false
      })
    },
    filterOptionStatus(value) {
      const temp = Object.keys(this.options.status).filter(item => Number(item) === Number(value))
      return this.options.status[temp]
    },
    submitMerchantNotify(row) {
      getMerchantNotify(row.id).then(res => {
        this.$message({ message: '回调成功', type: 'success' })
      })
    }
  }
}
</script>
