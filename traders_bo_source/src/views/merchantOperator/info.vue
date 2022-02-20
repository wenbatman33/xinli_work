<template lang="pug">
.app-container
  .row.py-2
    .col-12
      small.text-muted MD5 KEY
      h5 {{formData.md5}}
  .row.py-2
    .col-6
      small.text-muted 商户号
      h5 {{formData.sn}}
    .col-6
      small.text-muted MD5 KEY
      h5 {{formData.name}}
  .row.py-2
    .col-12
      small.text-muted 结算手续费
      h5 结算金额 ×
        strong.px-5.py-2.mx-3.bg-light {{formData.settle_fee*1000}}
        | ‰
        span.mx-5 +
        span 单笔
        strong.px-5.py-2.mx-3.bg-light {{formData.settle_sub_fee}}
  .row.py-2
    .col-12
      small.text-muted 代收手续费
      h5 订单金额 ×
        strong.px-5.py-2.mx-3.bg-light {{formData.fee*1000}}
        | ‰
        span.mx-5 +
        span 单笔
        strong.px-5.py-2.mx-3.bg-light {{formData.sub_fee}}
  .row.py-2
    .col-12
      small.text-muted 代收单笔限额
      h5 订单金额 ×
        strong.px-5.py-2.mx-3.bg-light {{formData.lower_limit}}
        | ～
        strong.px-5.py-2.mx-3.bg-light {{formData.upper_limit}}
  .row.py-2
    .col-12
      small.text-muted IP 白名单
      p
        el-input.mr-2(v-for='(item, key) in formData.ips', v-model='formData.ips[key]',placeholder="请输入IP白名单", pattern="^([0-9]{1,3}\.){3}[0-9]{1,3}$", style='width:150px')
        el-button.mr-2(@click='addIP') +
        el-button.mr-2(@click='popIP') -
  .row.py-2
    .col-12
      el-button(type="primary" :loading="loading" @click="formIncrementSubmit()") 确定修改
</template>
<script>
import { getMerchantInfo, patchMerchantIps } from '@/api/member'
import Pagination from '@/components/Pagination'

export default {
  name: 'Oder',
  components: { Pagination },
  data () {
    return {
      loading: false,
      formData: [],
      listTotal: 0
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData () {
      getMerchantInfo().then(res => {
        this.formData = res.data[0]
        if (res.meta) { this.listTotal = res.meta.pagination.total }
        this.listLoading = false
      })
    },
    addIP() {
      this.formData.ips.push('')
    },
    popIP() {
      if (this.formData.ips.length > 1) this.formData.ips.pop()
    },
    formIncrementSubmit() {
      const obj = { ips: this.formData.ips }
      console.log(obj)
      patchMerchantIps(obj)
        .then(res => {
          this.$message({ message: '修改成功', type: 'success', duration: 1500 })
          this.getData()
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
