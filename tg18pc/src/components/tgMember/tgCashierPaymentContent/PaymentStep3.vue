<template lang='pug'>
  div.my-3
    div.my-3.py-3.text-center.qrcodeWarp
      p.my-5
        img.qrcode(:src='step2Response.base64ImgString')
      p.my-3
        span.contentTitle.mx-2 有效时间:
        span.text-danger(v-if='countTime<=0') 已逾期
        span(v-else) {{countTime | formatSecond}}

      p.my-3
        span.contentTitle.mx-2 存款金额:
        span.text-danger {{step2Response.Amount}}
      p.my-3
        span.contentTitle.mx-2 交易单号:
        span {{step2Response.OrderId}}
    div.my-2.text-center
      el-button(pain @click="gotoRecords") 完成支付，查看纪录
      el-button(type="primary" @click="gotoStep1") 继续存款

</template>
<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

let Timer;
export default {
  props: ['step2Response'],
  data() {
    return {
      countTime: this.step2Response.Deadline,
    };
  },
  mounted() {
    const vm = this;
    Timer = setInterval(vm.countDown, 1000);
  },
  beforeDestroy() {
    clearInterval(Timer);
  },
  methods: {
    gotoStep1() {
      this.$emit('gotoStep1');
    },
    gotoRecords() {
      this.$emit('cashierDialog_1_Hide');
      router.push('/member/records/sum?type=2');
    },
    countDown() {
      this.countTime -= 1;
      if (this.countTime <= 0) {
        clearInterval(Timer);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.qrcodeWarp{
  min-height: 300px;
  background-color: #F9F9F9;
  border: solid 1px #d9d9d9;
}
.qrcode{
  width: 200px;
  border: 10px solid #fff;
}
</style>
