<template lang='pug'>
  el-form(:model="cashierForm"  :rules="cashierFormRules" label-width="80px" ref="cashierForm" @keyup.enter.prevent='submit')
    .row.m-1
      .col-12.mt-3.mb-5
        el-alert(title='提示：取款前请添加银行卡,银行户名与帐户设置中的真实姓名一致才能成功提款。', type='success', :closable='false')
      el-form-item.col-12(label="银行户名")
        el-input(v-model="MemberData.RealName" auto-complete="off" :disabled="true")
      el-form-item.col-12(label="提款金额" prop="Amount")
        el-input(type='number', v-model="cashierForm.Amount" placeholder="输入提款金额" )
      el-form-item.col-12(label="选择银行" v-if='JSON.stringify(BankList)!="{}"' prop="UserBankSn")
        el-radio-group(v-if='MemberBankList' v-model="cashierForm.UserBankSn")
          el-radio(v-for='(item, index) in MemberBankList' v-model="cashierForm.UserBankSn" :key='index' :label="item.Sn"  border="")
            img(:src='filtersBankIcon(item.AccountBank)' width='16')
            | {{filtersBankName(item.AccountBank)}} {{maskAccountNo(item.AccountNo)}}
          el-button(type="primary" @click.prevent="addBankForm" plain) 添加新银行卡
      el-form-item.col-12(label=" ")
        el-button(type="primary" @click.prevent="submit('cashierForm')" :loading="submitLoading") 提交
    el-dialog(:visible.sync='addBankFormDialog', width='36%' append-to-body)
      tgAddBankForm(@addBankFinishEmitHandle='addBankFinishEmitHandle')
</template>
<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
import tgAddBankForm from '@/components/tgMember/tgCashier/tgAddBankForm.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    tgAddBankForm,
  },
  data() {
    return {
      disabled: true,
      addBankFormDialog: false,
      submitLoading: false,
      BankList: {},
      cashierForm: {
        Amount: '',
        UserBankSn: '',
      },
      cashierFormRules: {
        Amount: [{ required: true, message: '请输入提交提款 ', trigger: 'blur' }],
        UserBankSn: [{ required: true, message: '请選擇银行卡 ', trigger: 'blur' }],
      },
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
    submit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let payload = {};
          const vm = this;
          payload = this.cashierForm;
          payload.UserId = this.UserId;
          vm.submitLoading = true;
          axios.post(`${process.env.VUE_APP_APIHOST}/Payment/PayoutOrder/`, payload)
            .then((res) => {
              vm.submitLoading = false;
              if (res.data.status === 1) {
                vm.PayoutOK();
              } else {
                vm.$message({ message: res.data.error_message, type: 'error' });
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
      });
      setTimeout(() => {
        router.push({
          path: '/member/records/sum',
          query: {
            type: 3,
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
    maskAccountNo(value) {
      const mask = (cc, num = 4, mask = '*') => (`${cc}`).slice(0, -num).replace(/./g, mask) + (`${cc}`).slice(-num);
      return mask(value, 5);
    },
    addBankForm() {
      this.addBankFormDialog = true;
    },
    addBankFinishEmitHandle() {
      const vm = this;
      this.addBankFormDialog = false;
      setTimeout(() => {
        vm.getBankList();
      }, 500);
    },
    getBankList() {
      const payload = {};
      payload.UserId = this.UserId;
      this.$store.dispatch('member/MemberBankList', payload);
    },
  },
  mounted() {
    const vm = this;
    const data = {};
    const token = jwtDecode(window.localStorage.JWT_TOKEN);
    data.UserName = token.username;
    data.Type = 'Detail';
    axios.get(`${process.env.VUE_APP_APIHOST}/Payment/GetUserBankList/`, '')
      .then((res) => {
        console.log(res);
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
<style lang="scss" scoped>
.el-radio.is-bordered{
  margin-left: 0 !important;
  margin-right: 10px !important;
}
</style>
