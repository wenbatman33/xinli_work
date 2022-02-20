<template lang='pug'>
.memberdeposit_info
	ul
		div(v-if='CashierChannelList.ProductTag==="UnionPay" && CashierChannelList.Info.Bank !=="" ')
			span 支援銀行
			.bank_name(v-for='(item, index) in CashierChannelList.SupportBankCode' type='success') {{item.BankName}}
		span 存款金额：单笔限额 {{ CashierChannelList.SingleMin | commaFormat }} ~ {{ CashierChannelList.SingleMax | commaFormat }} {{CashierChannelList.Message}}
		li
			input#depositamount.depositamount(v-validate="AmountValidate" v-model="depositForm.Amount" name="Amount" data-vv-as="存款金额" placeholder="输入存款金额" type="number")
		.error(v-show='errors.has("Amount")')  {{ errors.first('Amount') }}
		span(v-if='CashierChannelList.Info.Bank != ""') 选择银行
		li(v-if='CashierChannelList.ProductTag == "UnionPay" && CashierChannelList.Info.Bank != ""' label="选择银行"  prop="UserBankSn") 
			label.bank_icon
				img(:src='selectedBank.BankIcon') 
			select#choosebank.choosebank(v-validate='' name="bank" data-vv-as="选择银行" v-model="depositForm.UserBankSn" @change='optionChangeMemberBank')
				//- option(v-for='(item, index) in CashierChannelList.Info.UserBank' :key='index' :label='item.BankData.BankName + " " + maskAccountNo(item.AccountNo)' :value="item.Sn") {{ item.BankData.BankName + " " + maskAccountNo(item.AccountNo) }}
				option(v-for='(item, index) in CashierChannelList.Info.UserBank' :key='index' :label='item.BankData.BankName + " " + maskAccountNo(item.AccountNo)' :value="item.Sn") {{ item.BankData.BankName + " " + item.AccountNo }}
		li(v-if='CashierChannelList.ProductTag != "UnionPay" && CashierChannelList.Info.Bank != ""' label="选择银行"  prop="BankCode") 
			label.bank_icon
				img(:src='selectedBank.BankIcon') 
			select#choosebank.choosebank(v-validate='' name="bank2" data-vv-as="选择银行" v-model="depositForm.BankCode" @change='optionChangeAllBank')
				option(v-for='(item, index) in CashierChannelList.SupportBankCode' :key='index' :label="item.BankName" :value="index") {{ item.BankName }}
		.cashire_check
			span(v-if='CashierChannelList.ProductTag=="ALIPAY"')
				input#check.check(v-model='ALIPAYcheck' type="checkbox")
				| 我会在存款时填写附言
		.error(v-if='showeErorMsg') {{ errorMsg }}
		.error(v-show='errors.has("bank")')  {{ errors.first('bank') }}
		.error(v-show='errors.has("bank2")')  {{ errors.first('bank2') }}

	form
		router-link.memberwithdrawal_addbank(v-if='CashierChannelList.ProductTag=="UnionPay"' to="/member/cashieraddbank") 添加银行卡
	form
		el-button.memberdeposit_btn(@click='submit' :loading="submitLoading") 立即存款
	//- .Info.Bank = 1 是需要帶銀行帶碼, .Info.Bank = 2 是要帶卡號流水, .Info.Bank = 空的 不需要銀行資料
</template>
<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

function openWindow(url) {
  const createA = document.createElement('a');
  const createAText = document.createTextNode('theCounter');
  createA.setAttribute('href', URL);
  createA.setAttribute('target', '_blank');
  createA.appendChild(createAText);
  document.body.appendChild(createA).click();
}
export default {
  props: ['CashierChannelList', 'ProductTag', 'SupportBankCode', 'Info', 'Another'],
  data() {
    return {
      errorMsg: '',
      showeErorMsg: false,
      nextStep: '',
      BankList: '',
      depositForm: {
        Amount: '',
        BankCode: '',
        UserBankSn: '',
      },
      selectedBank: '',
      submitLoading: false,
      ALIPAYcheck: '',
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
      'MemberBankList',
    ]),
    AmountValidate(){
      return `required|decimal:2|min_value:${this.CashierChannelList.SingleMin}|max_value:${this.CashierChannelList.SingleMax}`
    }
  },
  watch: {
    CashierChannelList(val, oldVal) {
      this.choiceBank();
    },
  },
  methods: {
    test() {
      this.submitLoading = true;
    },
    maskAccountNo(value) {
      const mask = (cc, num = 4, mask = '*') => (`${cc}`).slice(0, -num).replace(/./g, mask) + (`${cc}`).slice(-num);
      return mask(value, 5);
    },
    optionChangeMemberBank() {
      if (this.depositForm.UserBankSn) {
        let option = {};
        option = this.CashierChannelList.Info.UserBank.find(item => item.Sn === this.depositForm.UserBankSn);
        this.selectedBank = option.BankData;
      }
    },
    optionChangeAllBank() {
      if (this.depositForm.BankCode) {
        this.selectedBank = this.CashierChannelList.SupportBankCode[this.depositForm.BankCode];
      }
    },
    step1() {
      const vm = this;
      axios.get(`${process.env.VUE_APP_APIHOST}/Payment/GetUserBankList/`, '')
        .then((res) => {
          vm.BankList = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.choiceBank();        
    },
    choiceBank() {
      if (this.CashierChannelList.ProductTag === 'UnionPay') {
        if (this.CashierChannelList.Info.UserBank != null) {
          this.depositForm.UserBankSn = this.CashierChannelList.Info.UserBank[0].Sn; // 預選
          this.optionChangeMemberBank();
        }
      } else {
        const temp = Object.keys(this.CashierChannelList.SupportBankCode)[0];
        this.depositForm.BankCode = temp;
        this.optionChangeAllBank();
      } 
    },
    filtersBankIcon(value) {
      const vm = this;
      const bankArray = Object.values(this.BankList);
      // let bankArray = Object.keys(this.BankList).map(i => { this.banklist[i]})
      const result = bankArray.filter(bankArray => bankArray.BankName === value);
      const icon = Object(result[0]).BankIcon;
      return icon;
    },
    getBankList() {
      const vm = this;
      const payload = {};
      payload.UserId = this.UserId;
      this.$store.dispatch('member/MemberBankList', payload);
    },
    submit() {
      const vm = this;
      this.showeErorMsg = false;
      if (this.CashierChannelList.ProductTag === 'ALIPAY') {
        if (this.ALIPAYcheck !== true) {
          this.errorMsg = '请勾选填写附言信息';
          this.showeErorMsg = true;
        } else {
          this.submitData();
        }
      } else {
        this.submitData();
      }
    },
    submitData() {
      const vm = this;
      this.$validator.validate().then((result) => {
        if (result) {
          this.submitLoading = true;
          const payload = this.depositForm;
          payload.UserId = this.UserId;
          payload.ProductTag = this.CashierChannelList.ProductTag;
          const APIPath = `${process.env.VUE_APP_APIHOST}/Payment/${this.CashierChannelList.Info.Path}`;
          let popup = '';
          if (this.CashierChannelList.Another === '1') {
            popup = window.open('/loading.html', 'payment');
          }
          axios.post(APIPath, payload)
            .then((res) => {
              // console.log(res)
              if (res.data.status === 1) {
                if (res.data.data.PayUrl) {
                  popup.location = res.data.data.PayUrl;
                } else {
                  // ////////////////////////////
                  vm.checkstep2Type(res.data.data);
                  // ////////////////////////////
                  if (typeof popup !== 'undefined') {
                    popup.close();
                  }
                }
              } else {
                if (typeof popup !== 'undefined') {
                  popup.close();
                }
                vm.$message({ message: res.data.error_message, type: 'error', center: true });
              }
              vm.submitLoading = false;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    backStep1() {
      this.depositForm.Amount = '';
      this.depositForm.BankCode = '';
      this.depositForm.UserBankSn = '';
    },
    checkstep2Type(res) {
      if (res.base64ImgString) {
        this.nextStep = '2_1';
        this.gotoStep2(this.nextStep, res);
      } else { 
        this.nextStep = '2'; 
        this.gotoStep2(this.nextStep, res);
      }
    },
    gotoStep2(str, res) {
      this.$emit('gotoStep2', str, res);
    },
  },
  mounted() {
    this.step1();
    this.getBankList();
    console.log(this.CashierChannelList);
  },
};
</script>
<style lang="scss" scoped>
.el-radio.is-bordered{
	margin-left: 0 !important;
	margin-right: 10px !important;
}
</style>
