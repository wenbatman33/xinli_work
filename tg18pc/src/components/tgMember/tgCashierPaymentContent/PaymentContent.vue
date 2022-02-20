<template lang='pug'>
  div.mt-3.mb-3
    el-form(:model="depositForm", :rules="depositFormRules", label-width="80px", ref="depositForm")
      .col-12(v-if='ProductTag==="UnionPay" && Info.Bank !=="" ')
        el-form-item(v-if='ProductTag=="UnionPay"', label="支援銀行") 
          el-tag.mx-1(type='success' v-for='(item, key) in SupportBankCode', :key='key') {{item.BankName}}
      el-form-item.col-12(label="存款金额", prop="Amount")
        el-input(type='number', v-model="depositForm.Amount",min=100, max=3000,placeholder="请输入存款金额")
      el-form-item.col-12(v-if='ProductTag==="ALIPAY"', prop='ALIPAYChecked')
        el-checkbox-group(v-model='depositForm.ALIPAYChecked')
          el-checkbox(label="" name='ALIPAYChecked')
            span.text-danger 我会在存款时填写附言
      .col-12(v-if='ProductTag==="UnionPay" && Info.Bank !=="" ')
        el-form-item(v-if='ProductTag=="UnionPay"', label="选择银行", prop="UserBankSn")
          el-radio-group(v-model="depositForm.UserBankSn")
            el-radio(v-for='(item, key) in Info.UserBank', :key='key', :label="item.Sn", border="")
              img(:src='item.BankData.BankIcon', width='16')
              |  {{item.BankData.BankName}} {{maskAccountNo(item.AccountNo)}}
              span 1111
            el-button(type="primary", @click.prevent="addBankForm", plain) 添加新银行卡
      .col-12(v-if='ProductTag!=="UnionPay" && Info.Bank !=="" ')
        el-form-item(label="选择银行", prop="BankCode")
          el-radio-group(v-model="depositForm.BankCode")
            el-radio(v-for='(item, key) in SupportBankCode', :key='key', :label="key", border="")
              img(:src='item.BankIcon', width='16')
              |  {{item.BankName}} {{key}}
              span 222
      el-form-item.col-12(label=" ")
        el-button(type="primary", @click.prevent="submit('depositForm')", :loading="submitLoading") 立即存款
</template>
<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

let popup;
export default {
  props: ['ProductTag', 'SupportBankCode', 'Info', 'Another', 'rangeMin', 'rangeMax'],
  data() {
    const checkAmount = (rule, value, callback) => { 
      if (!value) {
        callback(new Error('存款金额不能为空'));
      } 
      setTimeout(() => {
        if (value < Number(this.rangeMin) || value > Number(this.rangeMax)) {
          callback(new Error('须符合单笔限额'));
        } 
        callback();
      }, 500);
    };
    return {
      nextStep: '',
      BankList: '',
      isALIPAY: this.ProductTag === 'ALIPAY',
      submitLoading: false,
      depositForm: {
        Amount: '',
        BankCode: '',
        UserBankSn: '',
        ALIPAYChecked: [],
      },
      depositFormRules: {
        // Amount: [{ required: true, message: '请输入存款金额 ', trigger: 'blur' }],
        Amount: [{ validator: checkAmount, trigger: ['blur', 'change'] }],
        ALIPAYChecked: [{
          type: 'array', required: false, message: '请勾选填写附言信息', trigger: 'change', 
        }],
        BankCode: [{ message: '请選擇银行卡 ', trigger: 'blur' }],
      },
    };
  },
  watch: {
    ProductTag(val, oldVal) {
      if (val === 'ALIPAY') {
        this.depositFormRules.ALIPAYChecked[0].required = true;
      } else {
        this.depositFormRules.ALIPAYChecked[0].required = false;
      }
    },
    Info(val) {
      // 預設選擇銀行
      if (val.UserBank) {
        this.depositForm.UserBankSn = val.UserBank[0].Sn;
      } else {
        this.depositForm.UserBankSn = null;
      }
    },
    SupportBankCode(val) {
      // 預設選擇銀行
      if (Object.keys(this.SupportBankCode)[0]) {
        const BankCode = Object.keys(this.SupportBankCode)[0];
        this.depositForm.BankCode = BankCode;
      } else {
        this.depositForm.BankCode = null;
      }
    },
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
    step1() {
      const vm = this;
      axios.get(`${process.env.VUE_APP_APIHOST}/Payment/GetUserBankList/`, '')
        .then((res) => {
          vm.BankList = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    filtersBankIcon(value) {
      const vm = this;
      const bankArray = Object.values(this.BankList);
      // let bankArray = Object.keys(this.BankList).map(i => { this.banklist[i]})
      const result = bankArray.filter(bankArray => bankArray.BankName === value);
      const icon = Object(result[0]).BankIcon;
      return icon;
    },
    maskAccountNo(value) {
      const mask = (cc, num = 4, mask = '*') => (`${cc}`).slice(0, -num).replace(/./g, mask) + (`${cc}`).slice(-num);
      return mask(value, 5);
    },
    getBankList() {
      const payload = {};
      payload.UserId = this.UserId;
      this.$store.dispatch('member/MemberBankList', payload);
    },
    openLoadingPage() {
      popup = window.open('/loading.html', 'payment');
    },
    locationLoadingPage(url) {
      popup.location = url;
    },
    closeLoadingPage() {
      // popup.close()
      popup = window.open('', 'payment').window.close();
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const vm = this;
          const payload = this.depositForm;
          payload.UserId = this.UserId;
          payload.ProductTag = this.ProductTag;
          vm.submitLoading = true;
          const APIPath = `${process.env.VUE_APP_APIHOST}/Payment/${this.Info.Path}`;
          // if (this.Another === '1') {
          //   vm.openLoadingPage();
          // }
          axios.post(APIPath, payload)
            .then((res) => {
              vm.submitLoading = false;
              if (res.data.status === 1) {
                if (res.data.data.PayUrl) {
                  vm.openLoadingPage();
                  vm.locationLoadingPage(res.data.data.PayUrl);
                } else {
                  // ////////////////////////////
                  vm.checkstep2Type(res.data.data);
                  // ////////////////////////////
                  vm.closeLoadingPage();
                }
              } else {
                // vm.closeLoadingPage();
                // console.log(res);
                vm.$message({ message: res.data.error_message, type: 'error' });
              }
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
        this.nextStep = '3';
        this.gotoStep2(this.nextStep, res);
      } else {
        this.nextStep = '2';
        this.gotoStep2(this.nextStep, res);
      }
    },
    gotoStep2(str, res) {
      this.$emit('gotoStep2', str, res);
    },
    addBankForm() {
      this.$emit('showAddBankForm');
    },
  },
  mounted() {
    this.step1();
    this.getBankList();
    // 預設選擇銀行
    const BankCode = Object.keys(this.SupportBankCode)[0];
    this.depositForm.BankCode = BankCode;
  },
};
</script>
<style lang="scss" scoped>
.el-radio.is-bordered{
  margin-left: 0 !important;
  margin-right: 10px !important;
}
</style>
