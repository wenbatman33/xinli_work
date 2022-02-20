<template lang="pug">
  #playModal
    .d-block.title.text-center.py-2.mt-4.position-relative
      span 金额设定
    .d-block.my-5.px-5
      label.d-flex.justify-content-center.align-items-center.mb-4(for="first")
        .mr-4(style="white-space: nowrap") 第一設定值
        input#first.w-100.form-input.px-2.py-1(placeholder="请输入金额" v-model.number="form.quick_one")
      label.d-flex.justify-content-center.align-items-center.mb-4(for="second")
        .mr-4(style="white-space: nowrap") 第二設定值
        input#second.w-100.form-input.px-2.py-1(placeholder="请输入金额"  v-model.number="form.quick_two")
      label.d-flex.justify-content-center.align-items-center.mb-4(for="third")
        .mr-4(style="white-space: nowrap") 第三設定值
        input#third.w-100.form-input.px-2.py-1(placeholder="请输入金额"  v-model.number="form.quick_three")
    .d-flex.justify-content-center.mb-4
      button.py-2.mr-2.w-25.reg-button(@click.prevent="submit" :disabled="!formValidate") 提交
      button.py-2.w-25.cancel-button(@click.prevent="closeModal") 取消
</template>

<script>
export default {
  name: 'quickMoneyModal',
  data() {
    return {
      form: {
        quick_one: '',
        quick_two: '',
        quick_three: '',
      },
    };
  },
  computed: {
    formValidate() {
      return this.form.quick_one > 0 && this.form.quick_two > 0 && this.form.quick_three > 0;
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch('admin/setQuickMoneyModal', false);
    },
    async submit() {
      if (this.formValidate) {
        await this.$store.dispatch('admin/memberEdit', this.form).then(() => {
          this.$emit('update');
        });
        this.$store.commit('admin/SET_QUICKMONEYMODAL', false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  background: linear-gradient(to right, rgba(0, 237, 221, 0), #00afaf, rgba(0, 237, 221, 0))
}

.form-input {
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid #8e8e93;
  border-radius: 4px;
  color: white;

  &:focus {
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
  }

  &::placeholder {
    color: #8e8e93;
    font-size: 12px;
  }
}

.reg-button {
  background-color: #00ffeb;
  color: black;
  border: none;
  border-radius: 8px;

  &:disabled {
    background-color: gray;
  }
}

.cancel-button {
  border: 1px solid #00ffeb;
  color: #00ffeb;
  background: transparent;
  border-radius: 8px;
}
</style>
