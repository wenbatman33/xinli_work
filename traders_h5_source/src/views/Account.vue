<template lang='pug'>
.w-full.h-screen(v-if='MemberInfo && MemberData')
  .headerBar
    p.text-center 帐号设置
    .backBtn(@click='$router.back(-1)')
      span.mx-2
        i.fas.fa-angle-left
      span Back
  .container.mx-auto.floatCard
    .w-full
      .formData.p-5
        el-form.mt-3(:model='formData', ref='formData',:rules='formDataRules', @submit.native.prevent='submit("formData")')
          el-form-item(prop='name')
            el-input.loginInput(v-model='formData.name'  placeholder='输入姓名', prefix-icon='el-icon-user')
          el-form-item(prop='email')
            el-input.loginInput(v-model='formData.email' placeholder='输入信箱' prefix-icon='el-icon-message')
          .w-full.my-5
            p.text-left.text-sm.text-gray-500.my-4  行动电话
            p.text-left.my-3 {{MemberInfo.phone}}
            p.text-left.text-sm.text-gray-500 登入帐号
            p.text-left.my-3 {{MemberInfo.account}}
            p.text-left.text-sm.text-gray-500 密码
            p.text-left.my-3 
              router-link(to='/restpassword')
                el-button(type='primary', round) 修改密码
          el-form-item.my-1
            el-button.w-full(type='primary', native-type='submit' round) 确认
</template>

<script>
import RandomText from '@/components/RandomText/RandomText.vue';
import { mapState } from 'vuex';
import { MemberProfileAPI } from '@/api';


export default {
  computed: {
    ...mapState('member', ['MemberLogined', 'MemberData', 'MemberInfo']),
  },
  components: {
    RandomText,
  },
  watch: {
    MemberInfo() {
      this.getStoreMemberInfo();
    },
    formData: {
      handler(val) {
        const vm = this;
        if (vm.formData.name !== '' &&
          vm.formData.mail !== '' &&
          vm.formData.phone !== '' &&
          vm.formData.Code !== '') {
          this.formDataValidate = true;
        } else {
          this.formDataValidate = false;
        }
      }, 
      deep: true,
    },
  },
  data() {
    return {
      formDataValidate: false,
      formDataRules: {
        name: [
          {
            required: true, message: '请输入真实姓名', trigger: ['blur', 'change'], 
          },
        ],
        email: [
          {
            required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'], 
          },
        ],
      },
      formData: {
        name: '',
        email: '',
      },
    };
  },
  methods: {
    getStoreMemberInfo() {
      if (this.MemberInfo) {
        this.formData.name = this.MemberInfo.name;
        this.formData.email = this.MemberInfo.email;
      }
    },
    submit() {
      MemberProfileAPI(this.formData)
        .then((res) => {
          console.log(res);
          this.$message({
            message: '修改成功',
            type: 'success',
          });
          this.$store.dispatch('member/Member');
          this.$store.dispatch('member/checkMemberInfo');
          this.$router.push('/');
        });
    },
  },
  mounted() {
    this.getStoreMemberInfo();
  },
};
</script>
<style lang='scss' scoped>
.floatCard{
  min-height: 180px;
  background: #FFFFFF;
  box-shadow: 0px 10px 20px rgba(31, 32, 65, 0.05);
  border-radius: 4px;
}
</style>
