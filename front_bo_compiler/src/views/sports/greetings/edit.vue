<template lang="pug">
  .container-fluid
    el-form(:model="formData", ref="form", label-width="100px", :rules="rules", status-icon)
      el-form-item.m-0(v-if="formData.id", label="代号")
        | {{ formData.id }}
      el-form-item(label="项目", prop="period")
          el-select(v-model="formData.period")
            el-option(v-for="(period, key) in periods", :key="key", :label="period.display", :value="key >> 0")
          b.mx-3 {{ periods[formData.period].period }}
      el-form-item(label="文案", prop="content")
        el-input(
          type="textarea",
          v-model="formData.content",
          :autosize="{ minRows: 3, maxRows: 6}",
          maxlength="14",
          show-word-limit
        )
      el-form-item(label="上下架日期", prop="time")
        el-checkbox(v-model="formData.has_limit", label="设定", border)
        el-date-picker.mx-1(
          v-if="formData.has_limit"
          v-model="formData.time",
          type='datetimerange',
          value-format="yyyy-MM-dd HH:mm:ss",
          start-placeholder='开始日期',
          end-placeholder='结束日期',
          :default-time="['00:00:00', '23:59:59']"
        )
      el-form-item(label="状态", prop="status")
        el-switch(
          v-model="formData.status",
          active-text="启用",
          :active-value="1",
          inactive-text="停用",
          :inactive-value="0",
          inactive-color="red"
        )
      el-form-item
        el-button(@click="handleSubmit()") 储存
</template>

<script>
import { getPeriodsAPI, addGreetingsAPI, getGreetingsAPI, editGreetingsAPI } from '@/api/site/greetings';

export default {
  data() {
    const greetingsDateValid = (rule, value, callback) => {
      if (this.formData.has_limit && value.length === 0) {
        callback(new Error('请选择日期'));
      }

      callback();
    }

    return {
      periods: {
        5: {
          period: ''
        }
      },
      id: 0,
      formData: {
        period: 5,
        content: '',
        has_limit: false,
        time: [],
        status: false
      },
      rules: {
        content: [
          { required: true, message: '文案为必填' },
          { max: 14, message: '长度限制不得超过 14 个字元', trigger: 'blur' }
        ],
        time: [
          { validator: greetingsDateValid, trigger: 'submit' }
        ],
      }
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    getPeriodsAPI().then(response => {
      this.periods = response.data.data;
    });

    if (this.$route.query.id) {
      getGreetingsAPI(this.$route.query.id).then(response => {
        this.initGreetings(response.data.data[0]);
      })
    }
  },
  methods: {
    initGreetings(greetings) {
      this.id = greetings.id;
      this.formData.period = greetings.greetPeriod ? greetings.greetPeriod.value : 5;
      this.formData.content = greetings.greetContent;
      this.$set(this.formData, 'has_limit', greetings.greetHasLimit ? Boolean(greetings.greetHasLimit.value) : false);
      this.formData.time = greetings.greetStartDate ? [greetings.greetStartDate, greetings.greetEndDate] : [];
      this.formData.status = greetings.greetStatus ? greetings.greetStatus.value : 0;
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = {
            platform: 2,
            period: this.formData.period,
            content: this.formData.content,
            has_limit: this.formData.has_limit,
            status: this.formData.status
          }

          if (data.has_limit) {
            data.start_date = this.formData.time[0];
            data.end_date = this.formData.time[1];
          }

          this.id === 0 ? this.handleCreate(data) : this.handleUpdate(this.id, data);
        }
      })
    },
    handleCreate(data) {
      addGreetingsAPI(data).then(() => {
        this.$message.success('欢迎词 - 新增成功！');
        this.$refs.form.resetFields();
        this.formData.has_limit = false;
      });
    },
    handleUpdate(id, data) {
      editGreetingsAPI(id, data).then(response => {
        this.$message.success('欢迎词 - 修改成功！');
        this.initGreetings(response.data.data[0]);
      });
    },
  }
}
</script>
