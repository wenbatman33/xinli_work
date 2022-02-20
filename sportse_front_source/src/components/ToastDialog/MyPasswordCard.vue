<template lang='pug'>
.container.p-3.h-100
  .row.h-100
    .col-12
      el-form.mt-3.h-100.d-flex.flex-column(:model='memberForm', ref='memberForm', :rules="memberFormRules", @submit.native.prevent='changForm("memberForm")')
        .flex-grow-1
          el-form-item(prop="password_old")
            el-input.loginInput(v-model.trim='memberForm.password_old', :type='showPassword_1 ? "text" : "password"', placeholder='請輸入舊密碼')
            .showPassword(@click='showPassword_1 =! showPassword_1')
              i.fas.fa-eye-slash(v-if='showPassword_1')
              i.fas.fa-eye(v-else)
          el-form-item(prop="password")
            el-input.loginInput(v-model.trim='memberForm.password', :type='showPassword_2 ? "text" : "password"', placeholder='新密碼8~20字母或下劃線和數字')
            .showPassword(@click='showPassword_2 =! showPassword_2')
              i.fas.fa-eye-slash(v-if='showPassword_2')
              i.fas.fa-eye(v-else)
          el-form-item(prop="password_confirmation")
            el-input.loginInput(v-model.trim='memberForm.password_confirmation', :type='showPassword_3 ? "text" : "password"', placeholder='請再次輸入新密碼')
            .showPassword(@click='showPassword_3 =! showPassword_3')
              i.fas.fa-eye-slash(v-if='showPassword_3')
              i.fas.fa-eye(v-else)
        .py-3
          el-form-item.my-1
            el-button.w-100(type='primary', native-type='submit', :disabled='memberFormValidate===false' ) 確認提交
</template>

<script>
import { mapState } from 'vuex';

export default {
  phone: 'MyPasswordCard',
  computed: {
    ...mapState('member', [
      'PersonalDetail',
    ]),
  },
  watch: {
    memberForm: {
      handler(val) {
        const vm = this;
        if (
          vm.memberForm.password_old !== '' &&
          vm.memberForm.password !== '' &&
          vm.memberForm.password_confirmation !== '' 
        ) {
          this.$refs.memberForm.validate((valid) => {
            if (valid) {
              vm.memberFormValidate = true;
            } else {
              vm.memberFormValidate = false;
            }
          });
        } else {
          this.memberFormValidate = false;
        }
      },
      deep: true,
    },
  },
  data() {
    const check_Pass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请輸入8~20位半形英文、数字或特殊符号'));
      } else if (!(/^[a-zA-Z0-9_!@#$%^&*\-+=;:,.?~]{8,20}$/.test(value))) {
        callback(new Error('请输入8～20位密码，包含半形英文、数字或_!@#$%^&*-+=;:,.?~'));
      } else {
        if (this.memberForm.ckPassword !== '') {
          this.$refs.memberForm.validateField('ckPassword');
        }
        callback();
      }
    };
    return {
      memberFormValidate: false,
      showPassword_1: false,
      showPassword_2: false,
      showPassword_3: false,
      memberForm: {
        password_old: '',
        password: '',
        password_confirmation: '',
      },
      memberFormRules: {
        password_old: [
          { required: true, message: '請輸入8~20位半形英文、數字或特殊符號', trigger: ['blur', 'change'] },
          { validator: check_Pass, trigger: ['blur', 'change'] }, 
          {
            min: 8, max: 20, message: '請輸入8～20位密碼，包含半形英文、數字或_!@#$%^&*-+=;:,.?~', trigger: ['blur', 'change'], 
          },
        ],
        password: [
          { required: true, message: '請輸入8~20位半形英文、數字或特殊符號', trigger: ['blur', 'change'] },
          { validator: check_Pass, trigger: ['blur', 'change'] }, 
          {
            min: 8, max: 20, message: '請輸入8～20位密碼，包含半形英文、數字或_!@#$%^&*-+=;:,.?~', trigger: ['blur', 'change'], 
          },
        ],
        password_confirmation: [
          { required: true, message: '請輸入8~20位半形英文、數字或特殊符號', trigger: ['blur', 'change'] },
          { validator: check_Pass, trigger: ['blur', 'change'] }, 
          {
            min: 8, max: 20, message: '請輸入8～20位密碼，包含半形英文、數字或_!@#$%^&*-+=;:,.?~', trigger: ['blur', 'change'], 
          },
        ],
      },
    };
  },
  methods: {
    changForm(form) {
      const vm = this;
      if (this.memberFormValidate) {
        this.$refs[form].validate((valid) => {
          this.$store.dispatch('member/chaengPassword', this[form])
            .then((res) => {
              vm.$message({ message: '修改密碼成功', type: 'success', showClose: true });
              this.$store.dispatch('dialog/closeToastDialog');
            });
        });
      }
    },
  },
  mounted() {
    
  },
};
</script>
<style lang="scss" scoped>
.showPassword{
  cursor: pointer;
  position: absolute;
  top: 4px;
  right: 10px;
  font-size: 13px;
  color: #ccc;
}
</style>
