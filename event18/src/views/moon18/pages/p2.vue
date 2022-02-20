<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  tgMenu
  .row.no-gutters.content.py-3
    .col.px-lg-5.py-md-5.px-2.py-2
      .row.no-gutters.eventpage.px-3.py-3.d-flex.flex-column.justify-content-center.text-center
        .col-12.eventtitl.py-md-5.py-3
          ||
          span.px-3 申请吃机金
          ||
        .col-12.eventcaption.pt-md-0.pt-2
          p {{UserName}} 您好
        .col-12.eventcontent.py-md-4.py-2
          .row.no-gutters.d-flex.justify-content-center
            .col-md-3.col-12
              el-form(:model="InviteForm")
                el-form-item.col-12(prop="InviteCode")
                  el-input(type='text'
                            v-model.trim='InviteForm.InviteCode'
                            placeholder='请输入邀请码')
        .col-12.pb-md-5.py-3
          button.btn.px-4.py-2(type="button" @click.prevent="sendCode") 确认申请
  .row.no-gutters.notes.py-md-5.py-2.px-3.d-flex.flex-column.justify-content-center.text-center
    .col-12.py-5
      span.notestitle 温馨小贴士
    .col-md-8.offset-md-2.col-12.pb-4.pl-3.text-left
      ol
        li 活动期间首储后，请于 2018/9/30 前点击「 确认申请 」按钮进行申请，一旦申请即无法取消，逾期未申请将视同放弃。
        li 首笔储值资格判定以系统入账时间为主。
        li 资料填写完毕后吃机金将于 48 小时内派发至中心钱包内，请务必确认填写正确的推荐人邀请码。
        li 活动吃机金一经申请之后不得取消，每位新首笔存款用户仅可申请一次活动吃机金。
  tgFooter
  //- el-dialog(width="50%",:visible.sync="dialogVisible",append-to-body)
  //-   .row.no-gutters.eventpage.px-3.py-3.d-flex.flex-column.justify-content-center.text-center
  //-     h1(v-if='success_message') {{success_message}}
  //-     h1(v-if='error_message') {{error_message}}
</template>
<script>
import axios from 'axios';
import router from '../router/router';
import tgHeader from '@/views/moon18/components/tgHeader.vue';
import tgBanner from '@/views/moon18/components/tgBanner.vue';
import tgMenu from '@/views/moon18/components/tgMenu.vue';
import tgFooter from '@/views/moon18/components/tgFooter.vue';
import { mapState } from 'vuex';


export default {
  components: {
    tgHeader,
    tgBanner,
    tgMenu,
    tgFooter,
  },
  data() {
    return {
      Logined: false,
      dialogVisible: false,
      error_message: '',
      success_message: '',
      InviteCode: '',
      InviteForm: {
        InviteCode: '',
      },
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  methods: {
    showSuccess_message(msg) {
      this.dialogVisible = true;
      this.error_message = '';
      this.success_message = msg;
    },
    showError_message(msg) {
      this.dialogVisible = true;
      this.error_message = msg;
      this.success_message = '';
    },
    sendCode() {
      const paylod = {};
      const vm = this;
      paylod.InviteCode = this.InviteForm.InviteCode;
      paylod.UserId = this.UserId;
      axios.post(`${process.env.VUE_APP_APIHOST}/Event001/SignUp/`, paylod)
        .then((res) => {
          console.log(res);
          if (res.data.status === 1) {
            vm.$message({ message: '申请成功！', type: 'success' });
          } else {
            vm.$message({ message: res.data.error_message, type: 'error' });
          }
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
  },
  mounted() {
  },
};
</script>
