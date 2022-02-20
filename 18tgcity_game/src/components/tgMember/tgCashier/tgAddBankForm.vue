<template lang='pug'>
  div.w-100
    el-form(:model="addBankForm"  :rules="addBankFormRules" ref="addBankForm" @keyup.enter.prevent='submit')
      .col-12.mt-3.mb-3
        h4 添加银行卡
      .col-12.mt-3.mb-3
        h6 开户人资料
      el-form-item.col-12(prop="AccountName")
        el-input(type='text'
                  v-model.trim='addBankForm.AccountName'
                  placeholder='开户名称'
                  :disabled="true")
      .col-12.mt-3.mb-3
        h6 银行卡资料
      el-form-item.col-12(prop="AccountNo")
        el-input(type='number'
                  v-model.trim='addBankForm.AccountNo'
                  placeholder='银行卡号')
      el-form-item.col-12(v-if='BankList' prop="AccountBank")
        el-select.w-100(:value='addBankForm.AccountBank' placeholder='开户行' @change='onSelectedBank')
          el-option(v-for='(item, key) in BankList' :key='key' :label='item.BankName' :value='key')
      el-form-item.col-12(prop="Province")
        el-select.w-100(:value='addBankForm.Province' placeholder='省份' @change='onSelectedProvince')
          el-option(v-for='(item, key) in ProvinceList' :key='key' :label='item' :value='key')
      el-form-item.col-12(prop="City")
        el-select.w-100(:value='addBankForm.City'  placeholder='城市' @change='onSelectedCity')
          el-option(v-for='(item, key) in CityList' :key='key' :label='item' :value='key')
      el-form-item.col-12(prop="State")
        el-select.w-100(:value='addBankForm.State'  placeholder='区县' @change='onSelectedState')
          el-option(v-for='(item, key) in StateList' :key='key' :label='item' :value='key')
      el-form-item.col-12.text-right
        el-button(type="primary" @click.prevent="submit('addBankForm')") 提交
</template>
<script>
import axios from 'axios';
import router from '@/router/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    const checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输手机号码'));
      } else if (!(/^(\+86+(13|14|15|16|18|19)\d{9}|\+8869+\d{8}){1}$/.test(value))) {
        callback(new Error('请确认手机号码'));
      } else {
        callback();
      }
    };
    const checkAccountName = (rule, value, callback) => {
      if (value !== this.MemberData.RealName) {
        callback(new Error('开户名称需与会员真实名字一致'));
      } else {
        callback();
      }
    };
    return {
      StateList: [],
      ProvinceList: [],
      CityList: [],
      BankList: [],
      addBankForm: {
        AccountName: this.UserName,
        AccountNo: '',
        AccountBank: '',
        Province: '',
        State: '',
        City: '',
      },
      addBankFormRules: {
        AccountName: [{ required: true, message: '请先完善个人资料', trigger: ['blur', 'onload'] }, { validator: checkAccountName, trigger: 'blur' }],
        AccountNo: [{ required: true, message: '请输开户名称', trigger: 'blur' }],
        AccountBank: [{ required: true, message: '请选开户行', trigger: 'change' }],
        Province: [{ required: true, message: '省份', trigger: 'change' }],
        City: [{ required: true, message: '城市', trigger: 'change' }],
        State: [{ message: '区县', trigger: 'change' }],
        Phone: [{ required: true, message: '请输入手机号码', trigger: ['blur', 'change'] }, { validator: checkPhone, trigger: ['blur', 'change'] }],
      },
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
      'MemberData',
    ]),
  },
  methods: {
    onSelectedInit(key) {
      this.member.Province = key;
      this.CityList = this.CityListJson[key];
    },
    onSelectedBank(key) {
      this.addBankForm.AccountBank = key;
    },
    onSelectedProvince(key) {
      this.addBankForm.City = '';
      this.addBankForm.State = '';
      this.addBankForm.Province = key;
      this.CityList = this.CityListJson[key];
    },
    onSelectedCity(key) {
      this.addBankForm.City = key;
      this.StateList = this.StateListJson[key];
    },
    onSelectedState(key) {
      this.addBankForm.State = key;
      // console.log(key)
    },
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.addBank();
          return true;
        }
        return false;
      });
    },
    addBank() {
      let paylod = {};
      const vm = this;
      paylod = this.addBankForm;
      paylod.UserId = this.UserId;
      axios.post(`${process.env.VUE_APP_APIHOST}/Member_All/MemberBankManage/Add`, paylod)
        .then((res) => {
          if (res.data.status === 1) {
            vm.getBankList();
            vm.$emit('reInit');
            vm.$message({ message: '已添加新银行卡', type: 'success' });
            vm.addBankFinish();
          } else {
            vm.$message({ message: res.data.error_message, type: 'error' });
            vm.addBankFinish();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addBankFinish() {
      this.$emit('addBankFinishEmitHandle');
    },
    getBankList() {
      const payload = {};
      payload.UserId = this.UserId;
      this.$store.dispatch('member/MemberBankList', payload);
    },
    resetGetCashierChannel() {
      const payload = { Device: '1' };
      const vm = this;
      axios.post(`${process.env.VUE_APP_APIHOST}/Payment/GetCashierChannel/`, payload)
        .then((res) => {
          console.log('resetGetCashierChannel');
          console.log(res);
          if (res.data.status === 1) {
            vm.CashierChannelList = res.data.data;
          } else {
            vm.$message({
              showClose: true,
              message: res.data.error_message,
              type: 'error',
              duration: 1500,
              center: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    const vm = this;
    this.addBankForm.AccountName = this.MemberData.RealName;
    axios.get('/static/getCountry.json', '')
      .then((res) => {
        vm.ProvinceList = res.data.province;
        vm.CityListJson = res.data.city;
        vm.StateListJson = res.data.area;
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(`${process.env.VUE_APP_APIHOST}/Payment/GetUserBankList/`, '')
      .then((res) => {
        vm.BankList = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang='scss' scoped>
.el-form-item_error{
  input{
    border: 1px solid #dc3545;
  }
}
</style>
