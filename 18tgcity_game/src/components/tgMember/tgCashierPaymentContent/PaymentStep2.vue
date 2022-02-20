<template lang='pug'>
  div.mt-3.mb-3
    p 已完成订单，请尽快通过网银转帐至下列帐户，完成存款。
    div.d-flex.flex-row.my-3
      .bankCard
        .title.p-2
          h4
            img.mx-2(:src='step2Response.BankIcon')
            | {{step2Response.bankName}}
        .content.p-3
          p.my-3
            span.contentTitle.mx-2 姓名:
            span {{step2Response.name}}
            span.copyBtn.float-right(:data-clipboard-text="step2Response.name") 复制文字
          p.my-3
            span.contentTitle.mx-2 卡号:
            span {{step2Response.bankAccount}}
            span.copyBtn.float-right(:data-clipboard-text='step2Response.bankAccount') 复制文字
          p.my-3
            span.contentTitle.mx-2 金额:
            span {{step2Response.Amount}}
            span.copyBtn.float-right(:data-clipboard-text='step2Response.Amount') 复制文字
          p.my-3
            span.contentTitle.mx-2 附言:
            span {{step2Response.remark}}
            span.copyBtn.float-right(:data-clipboard-text='step2Response.remark') 复制文字
      .bankCardDetailMsg.px-3
        p
          img(src='/static/img/bankMsg.jpg')
        p.text-danger.text-center 务必填写正确附言才能秒存秒到哦！
    div.my-5.text-center
      el-button(pain @click="gotoRecords") 完成支付，查看纪录
      el-button(type="primary" @click="gotoStep1") 继续存款
    div.d-flex.flex-column.my-3
      hr.w-100
      small
        | 1、若您无同行卡，请使用「跨行转账」并选择「加急」，方便系统及时到账。
        br
        | 2、每次存款时，请务必在《备注》中填写「附言」的六位数字。
        br
        | 3、每次存款时，若填写的存款金额与实际存款金额不一致，将无法到账。
        br
        | 4、请使用本人真实姓名进行存款，若使用他人银行卡且未正确填写「附言」，系统将无法到账，请立即联系 在线客服。
        br
        | 5、每次存款前，请先至本页面获取最新卡号，切勿自行存款至旧卡号。若存款至旧卡号，本公司将无法查收，恕不负责！
</template>
<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
import Clipboard from 'clipboard';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props: ['step2Response'],
  methods: {
    gotoStep1() {
      this.$emit('gotoStep1');
    },
    gotoRecords() {
      this.$emit('cashierDialog_1_Hide');
      router.push('/member/records/sum?type=2');
    },
  },
  mounted() {
    const clipboard = new Clipboard('.copyBtn');
  },
};
</script>
<style lang="scss" scoped>
.bankCard{
  width: 455px;
  height: 262px;
  border-radius: 28px;
  background-color: #ffffff;
  border: solid 1px #d9d9d9;
  overflow: hidden;
  .title{
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-radius: 28px 28px 0 0;
    color: #fff;
    background-image: linear-gradient(to left, #0088da, #0050b3);
    h4{
      line-height: 60px;
    }
  }
}
hr{
  border: solid 1px #e8e8e8;
}
.content{
  height: 180px;
  span{
    font-size: 14px;
  }
}
.contentTitle{
  color: #bfbfbf;
}
.copyBtn{
  cursor: pointer;
  color: #1890ff;
}
</style>
