<template lang="pug">
  //- 活动4 每日红包
  .container-fluid.text-center
    .row.my-3
      .col-3 发红包时段
      .col-3 红包总数量
      .col-3 发放总金额
      .col-3 单包红包金额上限
    .row.my-3
      .col-3 02:30 ~ 02:40
      el-input.col-3(type="number", v-model="total_count1")
      el-input.col-3(type="number", v-model="total_amount1")
      el-input.col-3(type="number", v-model="max_amount1")
    .row.my-3
      .col-3 15:30 ~ 15:40
      el-input.col-3(type="number", v-model="total_count2")
      el-input.col-3(type="number", v-model="total_amount2")
      el-input.col-3(type="number", v-model="max_amount2")
    .row.my-3
      .col-3 19:30 ~ 19:40
      el-input.col-3(type="number", v-model="total_count3")
      el-input.col-3(type="number", v-model="total_amount3")
      el-input.col-3(type="number", v-model="max_amount3")
    .row.my-3
      .col-3 23:30 ~ 23:40
      el-input.col-3(type="number", v-model="total_count4")
      el-input.col-3(type="number", v-model="total_amount4")
      el-input.col-3(type="number", v-model="max_amount4", @keyup.enter.native="editDetail")
    .alert.alert-secondary.text-left
      .text-danger 提醒:<br>系统会随机配置每个红包金额，最低1元 ～ 设定的金额上限<br>
        | 当红包金额末两位相同，系统自动乘以2倍发给用户
    .text-right
      el-button(@click="$emit('close')") 取消
      el-button(type="primary", @click="editDetail") 确认
</template>

<script>
export default {
  data() {
    return {
      max_amount1: 1,
      max_amount2: 1,
      max_amount3: 1,
      max_amount4: 1,
      total_amount1: 0,
      total_amount2: 0,
      total_amount3: 0,
      total_amount4: 0,
      total_count1: 0,
      total_count2: 0,
      total_count3: 0,
      total_count4: 0
    }
  },
  created() {
    axios.get('/Task/Bonus').then(response => {
      Object.keys(response.data.data[0]).map(key => {
        this[key] = response.data.data[0][key];
      });
    })
  },
  methods: {
    editDetail() {
      Object.keys(this._data).map(key => this._data[key] = +this._data[key]);
      if ([this.max_amount1, this.max_amount2, this.max_amount3, this.max_amount4].some(max_amount => max_amount < 1)) {
        return this.$message.error('单包红包金额最低为1元');
      }

      axios.patch('/Task/Bonus', this._data).then(() => {
        this.$message.success('成功修改每日红包可获得梦基金量！');
        this.$emit('close');
      });
    }
  }
}
</script>
