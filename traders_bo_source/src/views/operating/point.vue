<template lang="pug">
.app-container
  //- search
  .row.py-1.d-flex.flex-row.mt-2
    .col-sm-auto.p-1
      .search-title 时间
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
      .search-title 帳號
      el-input(size="medium", v-model="search.account", clearable="", placeholder="请输入订单编号")
    .col-sm-auto.p-1
      .search-title 類型
      el-select(v-model="search.trans_type" , size="medium",  clearable="", placeholder="全部" style="width:100px;")
        el-option(v-for="(value, key)  in options.trans_type", :key="key", :label="value", :value="key")
    .col-sm-auto.p-1
      .search-title
      el-button(@click="listQuery.page=1;getData()", size="medium", type="primary") 搜寻
    el-divider
  .row.py-2
    el-table(:data="listData",v-loading="listLoading", :stripe="true",fit,highlight-current-row)
      el-table-column(prop="created_at", label="建立时间")
      el-table-column(prop="refer_type", label="類型")
      el-table-column(prop="member", label="帳號")
        template(slot-scope="{row}")
          router-link(v-if='row.identity ==="總代理"', :to="'/operating/distributor?account='+row.member+'&identity=2'", :style='{"color": "#409EFF"}') {{row.member}}
          router-link(v-if='row.identity ==="二級代理"', :to="'/operating/distributor?account='+row.member+'&identity=3'", :style='{"color": "#409EFF"}') {{row.member}}
          router-link(v-if='row.identity ==="交易員"', :to="'/operating/trader?account='+row.member", :style='{"color": "#409EFF"}') {{row.member}}
      el-table-column(prop="identity", label="身份")
      el-table-column(prop="point", label="交易点数")
      el-table-column(prop="order.string", label="关联订单")
      el-table-column(prop="trading", label="交易对象")
      el-table-column(prop="note", label="备注")
      el-table-column(prop="editor", label="操作人")
        template(slot-scope="{row}")
          p(v-if='row.editor==="System"') -
          router-link(v-else, :to="'/operating/trader?account='+row.editor", :style='{"color": "#409EFF"}') {{row.editor}}
  .row.d-flex.justify-content-center
    pagination(v-show="listTotal>0" :total="listTotal" :page.sync="listQuery.page",:limit.sync="listQuery.per_page", @pagination="getData")

</template>
<script>
import { getPoint } from '@/api/member'
import Pagination from '@/components/Pagination'

export default {
  name: 'Oder',
  components: { Pagination },
  data () {
    const vm = this
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
      createdTime: [
        new Date(vm.$dayjs().subtract(1, 'week').startOf('day').valueOf()),
        // new Date(vm.$dayjs().startOf('day').valueOf()),
        new Date(vm.$dayjs().endOf('day').valueOf())
      ],
      search: {
        created_start: '',
        created_end: '',
        account: '',
        order_sn: '',
        trans_type: ''
      },
      options: {
        trans_type: { 0: '轉入', 1: '完成', 2: '轉出' }
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
    this.getData()
  },
  methods: {
    getData () {
      this.listLoading = true
      this.search.created_start = this.$dayjs(this.createdTime[0]).format('YYYY-MM-DD HH:mm:ss')
      this.search.created_end = this.$dayjs(this.createdTime[1]).format('YYYY-MM-DD HH:mm:ss')
      const { created_start, created_end, account, order_sn, trans_type } = this.search
      const { page, per_page } = this.listQuery
      getPoint({ created_start, created_end, account, order_sn, trans_type, page, per_page }).then(res => {
        this.listData = res.data
        if (res.meta) { this.listTotal = res.meta.pagination.total }
        this.listLoading = false
      })
    }
  }
}
</script>
