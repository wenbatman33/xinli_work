<template lang='pug'>
	.memberwithdrawal
		.memberwithdrawal_note 提示 : 取款前请先添加银行卡，成功取款后我们将款项打至您填写的这张卡上，银行卡户名与真实姓名一致才能取款成功。
		.memberwithdrawal_amount(v-if='JSON.stringify(BankList)!="{}"')
			.memberwithdrawal_caption 银行户名
				span {{MemberData.RealName}}
			h1 提款金额
			ul
				li
					input#withdrawalamount.withdrawalamount(v-validate='"required|decimal:2"' name="Amount" data-vv-as='提款金额' v-model="cashierForm.Amount" placeholder="输入提款金额" type="number")
				.error(v-show='errors.has("Amount")')  {{ errors.first('Amount') }}
			h1 选择已绑定银行卡
			.memberwithdrawal_bank(v-if='MemberBankList.length > 0') 
				label.bank_icon
					img(:src='filtersBankIcon(selectedBank.AccountBank)') 
				select#choosebank.choosebank(v-validate='"required"' name="UserBankSn" data-vv-as='银行卡' v-if='MemberBankList' v-model="cashierForm.UserBankSn" @change='optionChange')
					//- option(v-for='(item, index) in MemberBankList' :key='index' :label='filtersBankName(item.AccountBank) + " " + maskAccountNo(item.AccountNo)' :value="item.Sn") {{ filtersBankName(item.AccountBank) + " " + maskAccountNo(item.AccountNo) }}
					option(v-for='(item, index) in MemberBankList' :key='index' :label='filtersBankName(item.AccountBank) + " " + maskAccountNo(item.AccountNo)' :value="item.Sn") {{ filtersBankName(item.AccountBank) + " " + item.AccountNo }}
			.error(v-show='errors.has("UserBankSn")')  {{ errors.first('UserBankSn') }}
			form
				router-link.memberwithdrawal_addbank(to="/member/cashieraddbank") 添加银行卡
			form
				el-button.memberwithdrawal_btn(@click='submit' :loading="submitLoading") 提交
</template>
<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
// import tgAddBankForm from '@/components/tgMember/tgCashier/tgAddBankForm'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    // tgAddBankForm
  },
  data() {
    return {
      disabled: true,
      addBankFormDialog: false,
      BankList: {},
      cashierForm: {
        Amount: '',
        UserBankSn: '',
      },
      cashierFormRules: {
        Amount: [{ required: true, message: '请输入提交提款 ', trigger: 'blur' }],
        UserBankSn: [{ required: true, message: '请选择银行卡 ', trigger: 'blur' }],
      },
      selectedBank: '',
      submitLoading: false,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
      'MemberBankList',
    ]),
  },
  methods: {
    optionChange() {
      if (this.cashierForm.UserBankSn) {
        let option = {};
        option = this.MemberBankList.find(item => item.Sn === this.cashierForm.UserBankSn);
        this.selectedBank = option;
      }
    },
    submit() {
      this.$validator.validate().then((result) => {
        if (!result) {
          this.showeErorMsg = true;
        } else {
          this.submitLoading = true;
          let paylod = {};
          const vm = this;
          paylod = this.cashierForm;
          paylod.UserId = this.UserId;
          axios.post(`${process.env.VUE_APP_APIHOST}/Payment/PayoutOrder/`, paylod)
            .then((res) => {
              if (res.data.status === 1) {
                vm.PayoutOK();
              } else {
                vm.$message({
                  message: res.data.error_message,
                  type: 'error',
                  duration: 1500,
                  center: true,
                });
                vm.submitLoading = false;
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }        
      });
    },
    PayoutOK() {
      this.$emit('cashierDialog_2_Hide');
      this.$message({
        message: '提款正处理中',
        type: 'success',
        center: true,
      });
      setTimeout(() => {
        router.push({
          name: 'records',
          query: {
            type: 3,
          },
          params: {
            switch: 1,
          },
        });
      }, 3000);
    },
    filtersBankName(value) {
      const filtered = Object.keys(this.BankList)
        .filter(key => value === key)
        .reduce((obj, key) => {
          obj[key] = this.BankList[key];
          return obj[key].BankName;
        }, {});
      return filtered;
    },
    filtersBankIcon(value) {
      const filtered = Object.keys(this.BankList)
        .filter(key => value === key)
        .reduce((obj, key) => {
          obj[key] = this.BankList[key];
          return obj[key].BankIcon;
        }, {});
      return filtered;
    },
    getBankList() {
      const vm = this;
      const payload = {};
      payload.UserId = this.UserId;
      this.$store.dispatch('member/MemberBankList', payload)
        .then((res) => {
          if (res.data.data.length > 0) {
            vm.cashierForm.UserBankSn = res.data.data[0].Sn; // 預選
            vm.optionChange();
          }
        });
    },
    maskAccountNo(value) {
      const mask = (cc, num = 4, mask = '*') => (`${cc}`).slice(0, -num).replace(/./g, mask) + (`${cc}`).slice(-num);
      return mask(value, 5);
    },
  },
  mounted() {
    const vm = this; 
    const data = {};
    const token = jwtDecode(window.localStorage.JWT_TOKEN);
    data.UserName = token.username;
    data.Type = 'Detail';
    this.getBankList();
    axios.get(`${process.env.VUE_APP_APIHOST}/Payment/GetUserBankList/`, '')
      .then((res) => {
        // console.log(res)
        if (res.data.status === 1) {
          vm.BankList = res.data.data;
        } else {
          vm.$message({
            showClose: true,
            message: res.data.error_message,
            type: 'error',
            duration: 1500,
            center: true,
            onClose() {
              router.push('/member/account/1');
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang="scss">
</style>
