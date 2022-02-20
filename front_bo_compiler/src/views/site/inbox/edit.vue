<template lang="pug">
  #inbox__edit.container-fluid
    el-form(:model="formData", ref="form", label-width="160px", :rules="rules", status-icon)
      el-form-item.m-0(v-if="formData.id", label="代号")
        | {{ formData.id }}
      el-form-item(label="类型", prop="inbox_type")
          el-select(v-model="formData.inbox_type")
            el-option(v-for="(type, key) in inboxTypes", :key="key", :label="type", :value="key >> 0")
      el-form-item(label="发送时间", prop="scheduled_at")
        el-date-picker(
          ref="inbox__datetimepick"
          v-model="formData.scheduled_at",
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss",
          placeholder="请选择发送时间",
          :clearable="false",
          :editable="false"
        )
      template(v-if="id === 0")
        el-form-item(label="发送对象", prop="target")
          el-radio-group(v-model="formData.target")
            el-radio-button(label="typeAndGroup") 使用者 群组/分类
            el-radio-button(label="account") 使用者帐号
        el-form-item(v-if="formData.target === 'typeAndGroup'", label="使用者 群组/分类", prop="typeAndGroup")
          el-cascader(
            v-model="formData.typeAndGroup",
            :props="{ multiple: true, checkStrictly: true }",
            :options="memberGroupFullList",
            popper-class="inbox__edit--cascader"
          )
      el-form-item(v-if="formData.target === 'account'", label="使用者帐号", prop="account")
        el-select(
          v-model="formData.account",
          filterable,
          remote,
          reserve-keyword,
          placeholder="请输入帐号",
          :remote-method="searchMemberAccount",
          :loading="loading"
        )
          el-option(v-for="member in memberList" :key="member", :value="member")
      el-form-item(label="标题", prop="title")
        el-input(v-model="formData.title", maxlength="20", show-word-limit, placeholder="请输入标题")
      el-form-item(label="内文", prop="content")
        ckeditor(v-model="formData.content")
      el-form-item
        el-button(@click="handleSubmit()") 储存
</template>

<script>
import { getInboxAPI, getInboxTypesAPI, addInboxAPI, editInboxAPI } from '@/api/site/inbox';
import { getMemeberGroupFullListAPI } from '@/api/member/memberGroup';
import { searchMemberAPI } from '@/api/member/member';
import ckeditor from '@/components/CKEditor';

export default {
  components: { ckeditor },
  data() {
    const targetValid = (rule, value, callback) => {
      if (this.formData.target === rule.field && value.length === 0) {
        callback(new Error('必须选择发送对象'));
      }

      callback();
    }

    return {
      inboxTypes: {},
      memberGroupFullList: [],
      memberList: [],
      id: 0,
      loading: false,
      formData: {
        inbox_type: 1,
        scheduled_at: '',
        target: 'typeAndGroup',
        typeAndGroup: [],
        account: '',
        title: '',
        content: ''
      },
      rules: {
        scheduled_at: [
          { required: true, message: '请选择发送时间' }
        ],
        title: [
          { required: true, message: '标题为必填' },
          { max: 20, message: '长度限制不得超过 14 个字元', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内文为必填' },
        ],
        typeAndGroup: [
          { validator: targetValid, required: true, trigger: 'submit' }
        ],
        account: [
          { validator: targetValid, trigger: 'submit' }
        ]
      }
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    getInboxTypesAPI().then(response => {
      this.inboxTypes = response.data.data;
    });

    getMemeberGroupFullListAPI().then(response => {
      this.memberGroupFullList = response.data.data;
    });

    if (this.$route.query.id) {
      getInboxAPI(this.$route.query.id).then(response => {
        this.initInbox(response.data.data[0]);
      })
    }
  },
  mounted () {
    // https://github.com/ElemeFE/element/blob/dev/packages/date-picker/src/panel/date.vue
    // line: 369
    // 註解有寫到將來可能會棄用此功能
    const picker = this.$refs.inbox__datetimepick;
    picker.panel.methods.changeToNow = () => {
      let now = new Date();
      now.setMinutes(now.getMinutes() + (10 - (now.getMinutes() % 10)));
      now.setSeconds(0);

      picker.emitInput(new Date(now));
      picker.handleClose();
    }
  },
  methods: {
    initInbox(inbox) {
      this.id = inbox.id;
      this.formData.inbox_type = inbox.inboxType ? inbox.inboxType.value : 1;
      this.formData.scheduled_at = inbox.inboxScheduledAt;
      this.formData.target = 'account';
      this.formData.account = inbox.memberAccount;
      this.formData.title = inbox.inboxTitle;
      this.formData.content = inbox.inboxContent;
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = {
            type_id: '',
            group_id: '',
            platform: 1,
            account: this.formData.target === 'account' ? this.formData.account : '',
            inbox_type: this.formData.inbox_type,
            title: this.formData.title,
            content: this.formData.content,
            scheduled_at: this.formData.scheduled_at
          }

          if (this.formData.target === 'typeAndGroup') {
            const parseTypeAndGroup = this.formData.typeAndGroup.reduce((accumulator, item) => {

              item[1] ? accumulator.group_id.push(item[1]) : accumulator.type_id.push(item[0]);

              return accumulator
            }, { group_id: [], type_id: [] })

            data.type_id = parseTypeAndGroup.type_id.join();
            data.group_id = parseTypeAndGroup.group_id.join();
          }

          this.id === 0 ? this.handleCreate(data) : this.handleUpdate(this.id, data);
        }
      })
    },
    handleCreate(data) {
      addInboxAPI(data).then(() => {
        this.$message.success('站内信 - 新增成功');
        this.$refs.form.resetFields();
      });
    },
    handleUpdate(id, data) {
      editInboxAPI(id, data).then(response => {
        this.$message.success('站内信 - 修改成功！');
        this.initInbox(response.data.data[0]);
      });
    },
    searchMemberAccount(keyword) {
      if (keyword !== '') {
        this.loading = true;

        searchMemberAPI(keyword).then(response => {
          this.memberList = response.data.data;
        }).finally(() => {
          this.loading = false;
        });
      } else {
        this.memberList = [];
      }
    }
  }
}
</script>

<style lang="scss">
.el-cascader {
  display: block;
}

.inbox__edit--cascader {
  .el-cascader-node.is-active {
    color: unset;
    font-weight: unset;
  }
}
</style>

