<template lang="pug">
.container-fluid.row.no-gutters
    el-main.bg.col-12
      .logo
        img.pl-5.pt-5(src="/static/img/logo.svg")
      div.row.no-gutters.align-items-center
        el-form.col-sm-10.col-md-6.offset-sm-1.offset-md-3(v-if='successMsg==false' :model="unsubscribeForm"  :rules="unsubscribeFormRules" ref="unsubscribeForm" @keyup.enter.prevent='submit')
          el-card.box-card.text-center
            div.row.no-gutters.text-center
              el-form-item.col-12(prop="Email")
                el-input.mt-4(type='text'
                                  v-model.trim='unsubscribeForm.Email'
                                  placeholder='请您的输入邮箱'
                                  name='email')
            el-button.col-8.mt-4.mb-3(type='primary',@click.prevent='submit("unsubscribeForm")') 取消订阅
        el-card.box-card.col-sm-10.col-md-6.offset-sm-1.offset-md-3(v-if='successMsg')
          div.row.no-gutters.justify-content-center
            h1 成功取消订阅
    el-footer.footer.col-12
      span Copyright © 2018 18老虎城
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      successMsg: false,
      unsubscribeForm: {
        Email: '',
      },
      unsubscribeFormRules: {
        Email: [{
          required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'],
        }],
      },
    };
  },
  methods: {
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const vm = this;
          const payload = {};
          payload.Email = this.unsubscribeForm.Email;
          axios.post(`${process.env.VUE_APP_APIHOST}/Verification/CancelMail`, payload)
            .then((res) => {
              if (res.data.status === 1) {
                vm.successMsg = true;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.bg {
  height: 95vh;
  background-image: linear-gradient(286deg, #0088da, #0050b3);
}
.logo {
  height: 30vh;
}
.box-card {
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  border-bottom: 6px #fadb14 solid;
}
.box-card .el-card__header {
  border-bottom: 0px;
}
.footer {
  background-image: #fff;
  text-align: center;
  font-size: 13px;
  line-height: 5vh;
  color: #606266;
}
</style>
