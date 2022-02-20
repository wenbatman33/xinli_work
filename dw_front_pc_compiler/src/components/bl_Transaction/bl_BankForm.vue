<template lang="pug">
el-form.w-100(:model="addBankForm", ref="addBankForm", :rules="addBankFormRules")
  .row.no-gutters.p-4
    .col-12.my-3
      h3.text-center 添加银行卡
      p.my-3.text-center 银行卡户名需与真实姓名一致，才能成功进行取款。 
    .col-12.my-3
      el-form-item.m-0(prop="bank_account")
        el-input(v-model.trim='addBankForm.bank_account', type='text', placeholder='开户名', :disabled='PersonalDetail.memberRealname!==null')
    .col-12.my-3
      el-form-item.m-0(prop="bankCodeMappingList")
        el-select.w-100(v-model="addBankForm.bank_code" placeholder="请选择开户行")
          el-option(v-for="item in bankCodeMappingList", :key="item.bankCode", :label="item.bankName",:value="item.bankCode")
    .col-12.my-3
      el-form-item.m-0
        .row.no-gutters
          el-select.col-4.pr-3(v-model='addBankForm.provinceValue' placeholder='省份', @change='onSelectedProvince')
            el-option(v-for='(item, key) in ProvinceList' :key='key' :label='item[0].province' :value='key')
          el-select.col-4.pr-3(v-model='addBankForm.cityValue' placeholder='城市', @change='onSelectedCity')
            el-option(v-for='(item, key) in CityList' :key='key' :label='item.name' :value='key')
          el-input.col-4(v-model.trim='addBankForm.branch', type='text', placeholder='分行')
    .col-12.my-3
      el-form-item.m-0(prop="bank_no")
        el-input.ime-disabled(v-model.trim='addBankForm.bank_no', @input='handleInput', type='text', placeholder='输入您的银行卡号', autocapitalize="on")
    .col-12.my-2
      el-form-item
        el-button.w-100(type="primary", @click.prevent='addBank()', :disabled='submitButtonEnabled==false') 提交绑定
</template>
<script>
import router from '@/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

let loop;
export default {
  data() {
    return {
      submitButtonEnabled: false,
      showVerify: false,
      addBankForm: {
        bank_account: '',
        bank_code: '',
        bank_no: '',
        province: '',
        city: '',
        provinceValue: '',
        cityValue: '',
        branch: '',
      },
      addBankFormRules: {
        bank_account: [{ required: true, message: '请输开户名称', trigger: 'blur' }],
        bank_code: [{ required: true, message: '请选开户行', trigger: 'change' }],
        province: [{ required: true, message: '省份', trigger: 'change' }],
        city: [{ required: true, message: '城市', trigger: 'change' }],
        branch: [{ required: true, message: '请选开户分行', trigger: 'change' }],
        bank_no: [{ required: true, message: '请输入银行卡号', trigger: ['blur', 'change'] }],
      },
      ProvinceList: [],
      CityList: [],
    };
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
      'memberStatus',
    ]),
    ...mapState('wallet', [
      'bankCodeMappingList',
    ]),
    
  },
  watch: {
    // 侦听表单验证是否完成 返回至memberFormValidate
    addBankForm: {
      handler(val) {
        const vm = this;
        if (vm.addBankForm.bank_account !== '' &&
          vm.addBankForm.bank_code !== '' &&
          vm.addBankForm.province !== '' &&
          vm.addBankForm.city !== '' &&
          vm.addBankForm.branch !== '' &&
          vm.addBankForm.bank_no !== '') {
          this.submitButtonEnabled = true;
        } else {
          this.submitButtonEnabled = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    init() {
      const vm = this;
      this.$store.dispatch('wallet/getBankCodeMappingList');
      this.$axios({
        method: 'get',
        url: '/static/js/city.json',
        baseURL: '/',
      })
        .then((res) => {
          vm.addBankForm.bank_account = vm.PersonalDetail.memberRealname;
          vm.ProvinceList = res.data;
          if (!vm.memberStatus.phone) {
            // vm.$store.dispatch('dialog/closeCommandDialog');
            vm.$message({ message: '请先绑定您的手机', type: 'error' });
            vm.$store.dispatch('dialog/closeCommandDialog_level2')
              .then((res) => {
                vm.$store.dispatch('dialog/openCommandDialog', { component: 'bl_BindingPhoneForm' });
              });
            // router.push({ path: '/my/detail' });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addBank() {
      const vm = this;
      this.$axios.post('/api/Member/BankCard', vm.addBankForm)
        .then((res) => {
          if (res.status === 200 && res.data.status === 1) {
            vm.$message({ message: '添加银行卡成功', type: 'success' });
            vm.$store.dispatch('dialog/closeCommandDialog_level2');
            vm.$store.dispatch('wallet/getMemberBankCard');
            vm.$store.dispatch('member/PersonalGetData');
          }
        });
    },
    onSelectedProvince(key) {
      this.addBankForm.city = '';
      this.addBankForm.cityValue = '';
      this.addBankForm.province = this.ProvinceList[key][0].province;
      this.CityList = this.ProvinceList[key];
    },
    onSelectedCity(key) {
      this.addBankForm.city = this.CityList[key].name;
    },
    handleInput(e) {
      // 限定数字
      // 限定数字和小数点
      // value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,‘‘)
      this.addBankForm.bank_no = e.replace(/[^\d]/g, '');
      // this.addBankForm.bank_no = e.replace(/[\u4e00-\u9fa5\u3105-\u3129\u02CA\u02C7\u02CB\u02D9]+/g, '');
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.ime-disabled{
  input{
    ime-mode: disabled!important;
  }
}
</style>
