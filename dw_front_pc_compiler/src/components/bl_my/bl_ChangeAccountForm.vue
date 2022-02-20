<template lang="pug">
el-form.w-100(:model="changeAccount", ref="changeAccount", :rules="changeAccountRules")
  .row.no-gutters.p-4
    .col-12.my-3
      h3.text-center 帐号管理
      p.my-3.text-center 确保您的资金安全，帐号将是客服确认身份的重要凭证
    .col-12.my-3
      el-form-item.m-0(prop="account")
        el-input(v-model.trim='changeAccount.newAccount', type='text', placeholder='当前帐号')
    .col-12.my-2
      el-form-item
        el-button.w-100(type="primary", @click.prevent='bindingPhone("changeAccount")', :disabled='changeAccountValidate==false') 提交绑定
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    const check_account = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (!(/^[a-zA-Z0-9_]{5,16}$/.test(value))) {
        callback(new Error('请输入5～15字符（A-Z ,a-z,0-9）'));
      } else {
        callback();
      }
    };
    return {
      changeAccountValidate: false,
      changeAccount: {
        newAccount: '',
      },
      changeAccountRules: {
        newAccount: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }, 
          { validator: check_account, trigger: ['blur', 'change'] }, 
          {
            min: 5, max: 15, message: '请输入5～15字符（A-Z ,a-z,0-9）', trigger: 'blur', 
          },
        ],
      },
    };
  },
  computed: {
    ...mapState('member', [
      'PersonalDetail',
    ]),
    ...mapState('member', [
      'memberStatus',
    ]),
  },
  watch: {
    changeAccount: {
      handler(val) {
        const vm = this;
        if (vm.changeAccount.newAccount !== '') {
          this.changeAccountValidate = true;
        } else {
          this.changeAccountValidate = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    bindingPhone(form) {
      const vm = this;
      this.$refs[form].validate((valid) => {
        this.$store.dispatch('member/MemberChangeAccount', vm.changeAccount)
          .then((res) => {
            if (res.status === 200 && res.data.status === 1) {
              vm.$store.dispatch('dialog/closeCommandDialog');
              vm.$store.dispatch('member/PersonalGetData');
              vm.$store.dispatch('member/getMemberDetailData');
              vm.$store.dispatch('member/getMemberProfile');
              vm.$message({ message: '修改成功', type: 'success' });
            }
          });
      });
    },
  },
  mounted() {
    const vm = this;
    vm.changeAccount.newAccount = vm.memberStatus.account || '';
  },
};
</script>
<style lang="scss" scoped>
</style>
