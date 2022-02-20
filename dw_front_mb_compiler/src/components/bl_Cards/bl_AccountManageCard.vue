<template lang="pug">
  .accountManage
    .accountManage__header 帐号管理
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    el-form.accountManage__main
      .accountManage__main__remind 提示：请输入 5 ~ 15 位英文或数字，<span>每个帐号仅提供一次修改帐号的机会</span>。
      el-form-item
        el-input.accountManage__main__input(v-model="IndexDetail.account" disabled)
      el-form-item
        el-input.accountManage__main__input(v-model.trim="newAccount" placeholder="请输入新帐号")
    el-button.accountManage__button(type="text" @click="submit" :disabled="newAccount === ''") 提交绑定
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      newAccount: '',
    };
  },
  methods: {
    submit() {
      this.$store.dispatch('member/API_MemberChangeAccount', {
        newAccount: this.newAccount,
      }).then((res) => {
        console.log(res);
        if (res.status === 200 && res.data.status === 1) {
          this.$store.dispatch('index/setCardOpen', false);
          this.$store.dispatch('member/API_MemberDetail');
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  computed: {
    ...mapState('member', [
      'IndexDetail',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.accountManage {

  /deep/ .el-form-item {
    margin: 0;
  }

  &__header {
    font-size: $text-20;
    font-weight: bold;
    color: $card-title;
    padding: $width-24 0;
    border-bottom: 1px solid $origin-light;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      position: absolute;
      right: $width-24;
      color: $origin;
    }
  }

  &__main {
    padding: $width-28 $width-24 0;

    &__remind {
      font-size: $text-16;
      color: $origin_darkest;
      margin-bottom: $height-40;

      span {
        color: rgb(255, 73, 73);
      }
    }

    &__input {
      color: $origin;
      border: 1px solid $origin;
      border-radius: 4px;
      margin-bottom: $height-40;
      font-size: $text-16;

      /deep/ input {
        border: none;
      }

      ::placeholder {
        color: $origin;
      }
    }

    &__verifyBtn {
      position: absolute;
      right: $width-12;
      color: $theme;
      font-size: $text-14;
    }
  }

  &__button {
    width: 100%;
    display: block;
    text-align: center;
    padding: $width-20 0;
    background-color: $theme;
    color: white;
    position: absolute;
    bottom: 0;
    font-size: $text-20;
    text-decoration: none;
  }
}

/deep/ .el-button {
  border-radius: 0px;
}

/deep/ .is-disabled {
  background-color: $origin_dark !important;
  color: white !important;
}
</style>
