<template lang="pug">
.app-container
  //- search
  .row.py-1.d-flex.flex-row.mt-2
    .col-sm-auto.p-1
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
      el-table-column(prop="sn",fixed="left" label="商戶號" width="220px")
      el-table-column(prop="name", label="姓名")
      el-table-column(prop="status", label="状态")
        template(slot-scope="{row}")
          el-tag(:type="row.status===0?'danger':'success'") {{options.status[row.status]}}
      el-table-column(prop="amount", label="订单金额")
      el-table-column(prop="updated_at", label="最后更新时间")
      el-table-column(prop="merchant_fee_amount", label="平台手续费")
      el-table-column(prop='id', label='操作' fixed="right" width="160px")
        template(slot-scope="{row}")
          el-link.ml-2(type="primary" size="small" @click="openOrderNotifyDialog(row)" :loading="loading") 回调订单状态
</template>
<script>
import { getMerchant } from '@/api/member'
import Pagination from '@/components/Pagination'

export default {
  name: 'Oder',
  components: { Pagination },
  data () {
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
        order_sn: '',
        status: ''
      },
      updateTime: [],
      options: {
        status: { 0: '停用', 1: '啟用' }
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
      getMerchant(Object.assign(postData, this.listQuery)).then(res => {
        this.listData = res.data
        if (res.meta) { this.listTotal = res.meta.pagination.total }
        this.listLoading = false
      })
    }
  }
}
</script>
