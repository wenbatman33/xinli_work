<template lang="pug">
  //- 活动3 每日分享
  el-form(label-width="auto")
    el-form-item(label="每日分享一次可获得梦基金")
      el-input(v-model="point", type="number")
    el-form-item(label="每日分享上限次数")
      el-input(v-model="count_limit", type="number")
    .text-right
      el-button(@click="$emit('close')") 取消
      el-button(type="primary", @click="editDetail") 确认
</template>

<script>
export default {
  data() {
    return {
      point: 0,
      count_limit: 0
    }
  },
  created() {
    axios.get('/Task/Share').then(response => {
      this.point = response.data.data[0].point;
      this.count_limit = response.data.data[0].countLimit;
    })
  },
  methods: {
    editDetail() {
      Object.keys(this._data).map(key => this._data[key] = +this._data[key]);
      axios.patch('/Task/Share', this._data).then(() => {
        this.$message.success('成功修改每日分享可获得梦基金量！');
        this.$emit('close');
      });
    }
  }
}
</script>
