<template lang='pug'>
	.memberdeposit_info
		.bankcard_note 已完成订单，请尽快通过网银转账至下列账户，完成存款。
		.bankcard
			.bankcard_caption
				img(:src='"/static/img/bank_logo/"+step2Response.bankCode+"-full.svg"')
			.bankcard_content
				ul
					li 姓名：
					li
						span {{step2Response.name}}
						.bankcard_copy( v-clipboard:copy='step2Response.name', v-clipboard:success='onCopy', v-clipboard:error='onError') 复制文字
					li 卡号：
					li
						span {{step2Response.bankAccount}}
						.bankcard_copy( v-clipboard:copy='step2Response.bankAccount', v-clipboard:success='onCopy', v-clipboard:error='onError') 复制文字
					li 金额：
					li
						span {{step2Response.Amount}}
						.bankcard_copy( v-clipboard:copy='step2Response.Amount', v-clipboard:success='onCopy', v-clipboard:error='onError') 复制文字
					li 附言：
					li
						span {{step2Response.remark}}
						.bankcard_copy( v-clipboard:copy='step2Response.remark', v-clipboard:success='onCopy', v-clipboard:error='onError') 复制文字
				form
					button.bankcard_btn(type="button" pain @click="gotoRecords") 完成支付，查看纪录
					button.bankcard_btn(type="button" @click="gotoStep1") 继续存款
		.bankcard_note
			ol
				li 若您无同行卡，请使用「跨行转账」并选择「加急」，方便系统及时到账。
				li 每次存款时，请务必在《备注》中填写「附言」的六位数字。
				li 每次存款时，若填写的存款金额与实际存款金额不一致，将无法到账。
				li 请使用本人真实姓名进行存款，若使用他人银行卡且未正确填写「附言」，系统将无法到账，请立即联系 在线客服。
				li 每次存款前，请先至本页面获取最新卡号，切勿自行存款至旧卡号。若存款至旧卡号，本公司将无法查收，恕不负责！
</template>
<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  props: ['step2Response'],
  methods: {
    gotoStep1() {
      this.$emit('gotoStep1');
    },
    gotoRecords() {
      this.$emit('cashierDialog_1_Hide');
      router.push({
        name: 'records',
        query: {
          type: 2,
        },
        params: {
          switch: 1,
        },
      });
    },
    onCopy(e) {
      this.$message({
        showClose: true,
        message: `已复制: ${e.text}`,
        type: 'success',
        duration: 1500,
        center: true,
      });
    },
    onError(e) {
      this.$message({
        showClose: true,
        message: '复制失败',
        type: 'error',
        duration: 1500,
        center: true,
      });
    },
  },
  // mounted() {
  //   this.step2Response.fullIcon = `/static/img/bank_logo/${this.step2Response.bankCode}-full.svg`;
  // },
};
</script>
<style lang="scss" scoped>

</style>
