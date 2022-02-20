<template lang="pug">
  .container-fluid
    el-form(:model="insertData", ref="insertForm", label-width="100px", :rules="rules", status-icon)
      el-form-item(label="显示装置", prop="device")
        el-checkbox-group(v-model="insertData.device")
          el-checkbox(v-for="(device, key) in devices", :key="key", :label="key") {{ device }}
      el-form-item(label="上下架日期", prop="time")
        el-date-picker(
          v-model="insertData.time",
          type='datetimerange',
          value-format="yyyy-MM-dd HH:mm:ss",
          start-placeholder='开始日期',
          end-placeholder='结束日期',
          :default-time="['00:00:00', '23:59:59']"
        )
      el-form-item(label="标题", prop="title")
        el-input(v-model="insertData.title", maxlength="15", show-word-limit, placeholder="请输入标题")
      el-form-item(label="内文", prop="content")
        ckeditor(v-model="insertData.content")
      el-form-item(label="是否置顶", prop="top")
        el-checkbox(v-model="insertData.top", :true-label="1", :false-label="0") 置顶
      el-form-item(label="状态", prop="status")
        el-switch(
          v-model="insertData.status",
          active-text="启用",
          :active-value="1",
          inactive-text="停用",
          :inactive-value="0",
          inactive-color="red"
        )
      el-button(@click="handleSubmit()") 储存
</template>

<script>
import ckeditor from '@/components/CKEditor';
import { mapState } from 'vuex';
import { addNewsAPI, getNewsAPI, editNewsAPI } from '@/api/site/news';

export default {
  components: { ckeditor },
  data() {
    return {
      insertData: {
        device: [],
        time: [],
        title: '',
        content: '',
        top: 0,
        status: 0
      },
      rules: {
        device: [
          { type: 'array', required: true, message: '请自少选取一种设备' }
        ],
        title: [
          { required: true, message: '标题为必填' },
          { max: 15, message: '标题最多 15 字元' }
        ],
        content: [
          { required: true, message: '内文为必填' }
        ],
        time: [
          { required: true, message: '上下架时间必须选择' }
        ]
      },
    }
  },
  computed: {
    ...mapState('common', [
      'devices'
    ])
  },
  created() {
    if (this.$route.query.id) {
      getNewsAPI(this.$route.query.id).then(response => {
        const news = response.data.data[0];
        this.insertData.device = news.newsDevice ? news.newsDevice.value.split(',') : [];
        this.insertData.time = [news.newsTimeStart, news.newsTimeEnd];
        this.insertData.title = news.newsTitle;
        this.insertData.content = news.newsContent;
        this.insertData.top = news.newsTop ? news.newsTop.value : 0;
        this.insertData.status = news.newsStatus ? news.newsStatus.value : 0;
      })
    }
  },
  methods: {
    handleSubmit(changeTop = false) {
      this.$refs.insertForm.validate(valid => {
        if (valid) {
          const data = {
            platform: 1,
            device: this.insertData.device.join(),
            time_start: this.insertData.time[0],
            time_end: this.insertData.time[1],
            title: this.insertData.title,
            content: this.insertData.content,
            top: this.insertData.top,
            status: this.insertData.status,
            checktop: changeTop ? 1 : 0
          }

          if (this.$route.query.id) {
            this.handleUpdate(this.$route.query.id, data);
          } else {
            this.handleCreate(data);
          }

        }
      })
    },
    handleCreate(data) {
      addNewsAPI(data).then(() => {
        this.$message.success('公告 - 新增成功！');
        this.$refs.insertForm.resetFields();
      }).catch(error => {
        this.handleError(error);
      })
    },
    handleUpdate(id, data) {
      editNewsAPI(id, data).then(() => {
        this.$message.success('公告 - 修改成功！');
      }).catch(error => {
        this.handleError(error);
      })
    },
    handleError(error) {
      if (error.response.data.code === 3003) {
        this.confirmChangeTop(error);
      }
    },
    confirmChangeTop(error) {
      this.$swal({
        title: '确定更换置顶？',
        text: error.response.data.message,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(result => {
        if (result.value) {
          this.handleSubmit(true);
        } else {
          this.$swal('已取消', '您的提交并未送出', 'error')
        }
      }).catch(() => {});
    }
  }
}
</script>
