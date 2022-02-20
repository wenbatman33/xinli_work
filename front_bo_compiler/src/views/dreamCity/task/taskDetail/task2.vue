<template lang="pug">
  //- 活动2 每日签到
  el-form(label-width="auto", label-position="left")
    el-form-item(label="每日签到可获得梦基金")
      el-input(v-model="formData.point", type="number")
    el-form-item(label="每月免费补签次数", error="*隔月归0重新计算")
      el-input(v-model="formData.freeCount", type="number")
    //- MARK: 目前只有免费补签
    //- el-form-item(label="现金补签金额")
    //-   el-input(v-model="formData.cash", type="number")
    el-form-item(label="附加条件")
      el-switch(v-model="extraSwitch", inactive-color="red")
    template(v-if="extraSwitch")
      el-form-item(label="每月累积签到3天    额外再获得")
        el-input(v-model="formData.day3", type="number")
      el-form-item(label="每月累积签到7天    额外再获得")
        el-input(v-model="formData.day7", type="number")
      el-form-item(label="每月累积签到14天    额外再获得")
        el-input(v-model="formData.day14", type="number")
      el-form-item(label="每月累积签到21天    额外再获得")
        el-input(v-model="formData.day21", type="number")
      el-form-item(label="每月累积签到28天    额外再获得")
        el-input(v-model="formData.day28", type="number")
    .text-right
      el-button(@click="$emit('close')") 取消
      el-button(type="primary", @click="editDetail") 确认
</template>

<script>
export default {
  data() {
    return {
      extraSwitch: false,
      formData: {
        cash: 0,
        freeCount: 0,
        point: 0,
        day3: 0,
        day7: 0,
        day14: 0,
        day21: 0,
        day28: 0,
      }
    }
  },
  created() {
    axios.get('/Task/Signature').then(response => {
      Object.keys(response.data.data[0]).map(key => {
        this.formData[key] = response.data.data[0][key];
      });

      if (this.formData.day3 + this.formData.day7 + this.formData.day14 + this.formData.day21 + this.formData.day28) {
        this.extraSwitch = true;
      }
    })
  },
  methods: {
    editDetail() {
      axios.patch('/Task/Signature', {
        cash: 0, // 目前无现金补签
        free_count: +this.formData.freeCount,
        point: +this.formData.point,
        day3: this.extraSwitch ? +this.formData.day3 : 0,
        day7: this.extraSwitch ? +this.formData.day7 : 0,
        day14: this.extraSwitch ? +this.formData.day14 : 0,
        day21: this.extraSwitch ? +this.formData.day21 : 0,
        day28: this.extraSwitch ? +this.formData.day28 : 0,
      })
      .then(() => {
        this.$message.success('成功修改每日登入可获得梦基金量！');
        this.$emit('close');
      });
    }
  }
}
</script>
