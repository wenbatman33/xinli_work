<template lang='pug'>
	.memberdeposit_info
		.bankqrcode_caption 请使扫描二维码完成支付
		.bankqrcode
			.bankqrcode_content
				.bankqrcode_img
					// img(src="/static/img/qrcode.png")
					img(:src='step2Response.base64ImgString')
				ul
					li
						h1 有效时间：
						h2 {{timeText}} 
					li
						h1 存款金额：
						h3 {{step2Response.Amount}}
					li
						h1 交易单号：
						h2 {{step2Response.OrderId}}
					// li
						h1 戶名：
						h2 王小明
					// li
						h1 卡號：
						h2 123456789
			form
				button.proceed_btn(type="button" @click="gotoStep1") 继续存款
				button.bankcard_btn(type="button" pain @click="gotoRecords") 完成支付，查看纪录
</template>
<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props: ['step2Response'],
  data() {
    return {
      intervalid: '',
      timeText: '',
      minute: '',
      second: '',
    };
  },
  methods: {
    gotoStep1() {
      this.$emit('gotoStep1');
    },
    gotoRecords() {
      this.$emit('cashierDialog_1_Hide');
      router.push('/member/records?type=2');
    },
  },
  mounted() {
    const minute = Math.floor(this.step2Response.Deadline / 60);
    const second = this.step2Response.Deadline % 60;
    this.timeText = `${minute} 分 ${second} 秒`;

    const vm = this;    
    this.intervalid = setInterval(() => {
      vm.step2Response.Deadline -= 1;
      const minute = Math.floor(vm.step2Response.Deadline / 60);
      const second = vm.step2Response.Deadline % 60;
      vm.timeText = `${minute} 分 ${second} 秒`;
				
      if (vm.step2Response.Deadline === 0) {
        vm.timeText = '已过期';
        clearInterval(vm.intervalid);
      }
    }, 1000);
  },
};
</script>
<style lang="scss" scoped>

</style>
