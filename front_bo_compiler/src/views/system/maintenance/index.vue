<template lang="pug">
  .container-fluid
    el-form(:model="currentData", ref="form", :rules="rules", label-width="80px")
      .row(v-if='responseReturnBack')
        .col-12
          p 全站维护管理
          el-form-item(label="狀態", prop="all_status")
            el-switch(
              v-model="currentData.all_status",
              active-text="启用",
              :active-value="1",
              inactive-text="停用",
              :inactive-value="0",
            )

          el-form-item(label="时间")
            el-col(:span="6")
              el-form-item.w-100(prop="all_start_time")
                el-date-picker.w-100(v-model="currentData.all_start_time", type="datetime", value-format="yyyy-MM-dd HH:mm:ss", placeholder="选择开始日期")
            el-col(:span="1")
              p.text-center 至
            el-col(:span="6")
              el-form-item.w-100(prop="all_end_time")
                el-date-picker.w-100(v-model="currentData.all_end_time", type="datetime", value-format="yyyy-MM-dd HH:mm:ss", placeholder="选择结束日期")
          el-form-item(label="装置", prop="all_device")
            el-checkbox-group(v-model="currentData.all_device")
              el-checkbox(v-for="(device, key) in devices", :key="key", :label="key") {{ device }}

          el-form-item(label="事由", prop="all_reason")
            el-input(v-model="currentData.all_reason", type="textarea", :autosize="{ minRows: 5, maxRows: 6}")
        el-divider
        .col-12
          p 存提维护管理
          el-form-item(label="狀態", prop="payment_status")
            el-switch(
              v-model="currentData.payment_status",
              active-text="启用",
              :active-value="1",
              inactive-text="停用",
              :inactive-value="0",
            )

          el-form-item(label="时间")
            el-col(:span="6")
              el-form-item.w-100(prop="payment_start_time")
                el-date-picker.w-100(v-model="currentData.payment_start_time", type="datetime", value-format="yyyy-MM-dd HH:mm:ss", placeholder="选择开始日期")
            el-col(:span="1")
              p.text-center 至
            el-col(:span="6")
              el-form-item.w-100(prop="payment_end_time")
                el-date-picker.w-100(v-model="currentData.payment_end_time", type="datetime", value-format="yyyy-MM-dd HH:mm:ss", placeholder="选择结束日期")
          el-form-item(label="事由", prop="payment_reason")
            el-input(v-model="currentData.payment_reason", type="textarea", :autosize="{ minRows: 5, maxRows: 6}")

          el-form-item
            el-button(type="primary" @click="submitInsertForm") 储存
</template>

<script>
import { getMaintenanceAPI, editMaintenanceAPI } from '@/api/system/maintenance';

export default {
  data() {
    return {
      responseReturnBack: false,
      devices: {
        1: 'iOS',
        2: 'Android',
        3: 'WebPC',
        4: 'WebMobile'
      },
      rules: {
        all_start_time: [
          { required: true, message: '选择开始日期', trigger: 'blur' }
        ],
        all_end_time: [
          { required: true, message: '选择结束日期', trigger: 'blur' }
        ],
        all_device: [
          { type: 'array', required: true, message: '请至少选择一个装置', trigger: 'blur' }
        ],
        payment_start_time: [
          { required: true, message: '选择开始日期', trigger: 'blur' }
        ],
        payment_end_time: [
          { required: true, message: '选择结束日期', trigger: 'blur' }
        ],
      },
      currentData:{
        all_start_time: '',
        all_end_time: '',
        all_device: [],
        all_reason: '',
        all_status: 0,
        payment_start_time: '',
        payment_end_time: '',
        payment_reason: '',
        payment_status: 0
      },
      formData:{
        all: {
          start_time: '',
          end_time: '',
          device: [],
          reason: '',
          status: 0
        },
        payment: {
          start_time: '',
          end_time: '',
          reason: '',
          status: 0
        }
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData (){
      getMaintenanceAPI().then(response => {
        if(response.data.data.length>0){
          this.currentData.all_start_time = response.data.data[0].maintenanceStartTime
          this.currentData.all_end_time = response.data.data[0].maintenanceEndTime
          this.currentData.all_device = response.data.data[0].maintenanceDeviceIds
          this.currentData.all_reason = response.data.data[0].maintenanceReason
          this.currentData.all_status = response.data.data[0].maintenanceStatus.value

          this.currentData.payment_start_time = response.data.data[1].maintenanceStartTime
          this.currentData.payment_end_time = response.data.data[1].maintenanceEndTime
          this.currentData.payment_reason = response.data.data[1].maintenanceReason
          this.currentData.payment_status = response.data.data[1].maintenanceStatus.value
        }

        this.responseReturnBack = true;
      });
    },
    submitInsertForm(){
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formData.all.start_time = this.currentData.all_start_time
          this.formData.all.end_time = this.currentData.all_end_time
          this.formData.all.device = this.currentData.all_device
          this.formData.all.reason = this.currentData.all_reason
          this.formData.all.status = this.currentData.all_status

          this.formData.payment.start_time = this.currentData.payment_start_time
          this.formData.payment.end_time = this.currentData.payment_end_time
          this.formData.payment.reason = this.currentData.payment_reason
          this.formData.payment.status = this.currentData.payment_status

          editMaintenanceAPI(this.formData).then(() => {
            this.$message.success('储存成功！');
          });
        }
      });

    }
  }
}
</script>

<style lang="scss" scoped>

.maintenanceBlock{
  border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>
