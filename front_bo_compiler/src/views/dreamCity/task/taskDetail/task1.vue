<template lang="pug">
  //- 活动1 完善资料
  el-form(label-width="auto")
    el-form-item(label="需完善项目")
      span 完善后可获得梦基金
    el-form-item(label="姓名")
      el-input(v-model="name", type="number")
    el-form-item(label="生日")
      el-input(v-model="birthday", type="number")
    el-form-item(label="手机")
      el-input(v-model="phone", type="number")
    el-form-item(label="邮箱")
      el-input(v-model="mail", type="number")
    el-form-item(label="银行卡")
      el-input(v-model="bank_card", type="number")
    .text-right
      el-button(@click="$emit('close')") 取消
      el-button(type="primary", @click="editDetail") 确认
</template>

<script>
export default {
  data() {
    return {
      name: 0,
      birthday: 0,
      mail: 0,
      phone: 0,
      bank_card: 0
    }
  },
  created() {
    axios.get('/Task/PersonInfo').then(response => {
      Object.keys(response.data.data[0]).map(key => {
        this[key] = response.data.data[0][key];
      });
    })
  },
  methods: {
    editDetail() {
      Object.keys(this._data).map(key => this._data[key] = +this._data[key]);
      axios.patch('/Task/PersonInfo', this._data).then(() => {
        this.$message.success('成功修改完善资料可获得梦基金量！');
        this.$emit('close');
      });
    }
  }
}
</script>
