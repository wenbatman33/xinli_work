<template lang="pug">
  .bankManage(v-if="IndexBankCard.length > 0")
    .bankManage__header 银行卡管理
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    .bankManage__title(v-if="IndexBankCard.length !== 0") 默认银行卡
    .bankManage__main
      .bankManage__main__card.default.position-relative(v-for="item in deaultBankCard()")
          .bankManage__main__card--icon
            i.fab.fa-airbnb
          .bankManage__main__card--detail.d-flex.justify-content-around.flex-column
            p {{ filterBankList(item.memberBankCode) }}
            p {{ item.memberBankNo }}
      .bankManage__title(v-if="IndexBankCard.length !== 0") 其他银行卡
      .d-flex.position-relative(v-for="(item, index) in IndexBankCard")
        .bankManage__main__card.position-relative.w-100(@click="edit[index] = $set(edit ,index, !edit[index])")
          .bankManage__main__card--icon(v-if="!edit[index]")
            i.fab.fa-airbnb
          .bankManage__main__card--detail.d-flex.justify-content-around.flex-column
            p {{ filterBankList(item.memberBankCode) }}
            p {{ item.memberBankNo}}
          .bankManage__main__card--arrow
            i.fas.fa-chevron-right
        .d-flex(v-if="edit[index] === true && item.memberStatus.value === 1")
          .bankManage__main__card--button(@click="setCardDefault(item.id, index)") 默認
          .bankManage__main__card--button(@click="setCardStatus(item.id, 0, index)") 停用
        .position-absolute.disabled-bg(v-if="item.memberStatus.value === 0")
          p.d-flex.align-items-center 银行卡已停用
        .d-flex(v-if="item.memberStatus.value === 0")
          .bankManage__main__card--button.disabled(@click="setCardStatus(item.id, 1, index)") 重启
    el-button.bankManage__button(type="text" @click="addBankCard") 添加新银行卡
  .bankManage(v-else)
    .bankManage__header 银行卡管理
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    .flex-grow-1.d-flex.flex-column.justify-content-center.align-items-center
      img.mb-2(:src="noCardImage")
      .text-center.color-gray 您尚未绑定银行卡</br>请点击下方按钮添加
    el-button.bankManage__button(type="text" @click="addBankCard") 添加新银行卡
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      noCardImage: `${window.CDN_ASSETS}/static/img/no-card.png`,
      edit: {},
    };
  },
  methods: {
    addBankCard() {
      this.$store.dispatch('index/setCardName', {
        card: 'bl_AddBankCard',
      });
    },
    filterBankList(bankCode) {
      if (this.IndexBankList) {
        const result = this.IndexBankList.filter(item => item.bankCode === bankCode);
        return result[0].bankName;
      }
    },
    deaultBankCard() {
      if (this.IndexBankCard) {
        const result = this.IndexBankCard.filter(item => item.memberDefaultCard.value === 1);
        return result;
      }
    },
    setCardDefault(id, index) {
      const vm = this;
      const payload = {};
      payload.id = id;
      payload.default_card = 1;
      vm.edit[index] = false;
      vm.$store.dispatch('member/API_MemberModifyBankCard', payload).then((res) => {
        vm.$store.dispatch('member/API_MemberBankCard');
      });
    },
    setCardStatus(id, status, index) {
      const vm = this;
      const payload = {};
      payload.id = id;
      if (status === 0) {
        payload.status = status;
        payload.default_card = status;
      } else {
        payload.status = status;
        vm.edit[index] = false;
      }
      vm.$store.dispatch('member/API_MemberModifyBankCard', payload).then((res) => {
        vm.$store.dispatch('member/API_MemberBankCard');
      });
    },
  },
  computed: {
    ...mapState('member', [
      'IndexBankCard',
      'IndexBankList',
    ]),
  },
  created() {
    this.$store.dispatch('member/API_MemberBankCard');
    this.$store.dispatch('member/API_MemberBankList');
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-button {
  border-radius: 0px;
}

/deep/ .is-disabled {
  background-color: $origin_dark !important;
  color: white !important;
}

.bankManage {
  display: flex;
  flex-direction: column;
  height: 100%;

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
      color: $origin;
      position: absolute;
      right: $width-24;
    }
  }

  &__title {
    padding: $height-24 $width-28;
    color: $origin_darkest;
    font-size: $text-16;
  }

  &__main {
    flex: 1;
    overflow: auto;

    &__card {
      display: flex;
      padding: $height-16 $width-28;
      background-color: $origin_lightest;
      align-items: center;

      &--icon {
        width: $width-60;
        height: $width-60;
        font-size: $text-28;
        border: 1px solid $origin_light;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        margin-right: $width-24;
      }

      &--detail {
        height: $width-60;
        flex: 1;

        p {
          color: $origin_dark;
          font-size: $text-14;
          margin: 0;

          &:first-child {
            font-size: $text-16;
            color: black;
          }
        }
      }

      &--arrow {
        color: #bfc7d9;
        font-size: $text-20;
      }

      &--button {
        padding: 0 $width-24;
        white-space: nowrap;
        display: flex;
        align-items: center;
        background-color: rgb(255, 73, 73);
        font-size: $text-16;
        color: white;

        &:first-child {
          background-color: $navy_light;
        }
      }
    }
  }

  &__button {
    width: 100%;
    display: block;
    text-align: center;
    padding: $width-20 0;
    background-color: $theme;
    color: white;
    font-size: $text-20;
    text-decoration: none;
  }
}

.default {
  background-color: $navy_dark;

  p {
    color: $origin_dark;

    &:first-child {
      color: white;
    }
  }
}

.disabled {
  background-color: rgb(19, 206, 102) !important;
  z-index: 1;
}

.disabled-bg {
  padding: $height-16 $width-60;
  background-color:black;
  opacity: 0.6;
  color: white;
  width: 100vw;

  p {
    height: $width-60;
    margin: 0;
  }
}

.color-gray {
  color: $origin_dark;
}
</style>
