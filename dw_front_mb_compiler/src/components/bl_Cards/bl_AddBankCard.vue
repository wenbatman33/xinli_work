<template lang="pug">
  .bankManage
    .bankManage__header
      i.fas.fa-chevron-left(@click="back")
      p 添加银行卡
      i.fas.i.fa.fa-headphones(onclick="LC_API.open_chat_window()")
    .bankManage__main
      .bankManage__main__remind 银行卡户名需与真实姓名一致，才能成功进行取款。
      el-form(v-model="addBankForm")
        el-form-item
          el-input.bankManage__main__input(
            placeholder='开户名',
            v-model="addBankForm.bank_account",
            :disabled="IndexPersonal.memberRealname !== null"
          )
        el-form-item
          el-select.w-100.bankManage__main__input(
            v-model="addBankForm.bank_code",
            placeholder='请选择开户行'
          )
            el-option(v-for="item in IndexBankList" :label="item.bankName" :value="item.bankCode")
        el-form-item
          .d-flex
            el-select.bankManage__main__input(v-model="addBankForm.provinceValue" placeholder='省')
              el-option(
                v-for="(item, index) in IndexProvinceList",
                :key="index" :label="item[0].province" :value="index"
              )
            el-select.bankManage__main__input.ml-1.mr-1(v-model="addBankForm.city" placeholder='市')
              el-option(
                v-for="(item, index) in IndexCityList",
                :key="item.id" :label="item.name" :value="item.name"
              )
            el-input.bankManage__main__input(v-model="addBankForm.branch" placeholder='分行')
        el-form-item
          el-input.bankManage__main__input(placeholder='输入您的卡号' v-model="addBankForm.bank_no")
    el-button.bankManage__button(type="text" @click="submit") 提交绑定
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      addBankForm: {
        bank_account: '',
        bank_code: '',
        bank_no: '',
        province: '',
        provinceValue: '',
        city: '',
        branch: '',
      },
      IndexCityList: [],
    };
  },
  methods: {
    back() {
      this.$store.dispatch('index/setCardName', {
        card: 'bl_BankManage',
      });
    },
    submit() {
      this.$store.dispatch('member/API_MemberAddBankCard', this.addBankForm).then((res) => {
        if (res.status === 200 && res.data.status === 1) {
          this.$message({ message: '银行卡添加成功', type: 'success' });
        }
        this.$store.dispatch('index/setCardOpen', false);
        this.$store.dispatch('member/API_MemberBankCard');
      }).catch((err) => {
        this.$message({ message: err.response.data.message, type: 'error' });
      });
    },
  },
  computed: {
    ...mapState('member', [
      'IndexBankList',
      'IndexProvinceList',
      'IndexPersonal',
    ]),
  },
  watch: {
    'addBankForm.provinceValue': {
      handler(val) {
        this.IndexCityList = this.IndexProvinceList[val];
        this.addBankForm.province = this.IndexProvinceList[val][0].province;
        this.addBankForm.city = '';
      },
    },
  },
  created() {
    const vm = this;
    this.$store.dispatch('member/API_MemberBankList');
    this.$store.dispatch('member/API_ProvinceList');
    this.$store.dispatch('member/API_MemberPersonal').then((res) => {
      if (res.data.data[0].memberRealname !== null) {
        this.addBankForm.bank_account = res.data.data[0].memberRealname;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-form-item {
  margin: 0;
}

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
    padding: $width-24;
    border-bottom: 1px solid $origin-light;
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: 0;
    }

    i {
      color: $origin;
    }
  }

  &__main {
    padding: $width-28 $width-24;
    flex: 1;
    overflow: auto;

    &__remind {
      font-size: $text-16;
      color: $origin_darkest;
      margin-bottom: $height-40;
    }

    &__input {
      color: $origin;
      border: 1px solid $origin;
      border-radius: 4px;
      margin-bottom: $height-40;
      font-size: $text-16;
      position: relative;

      /deep/ input {
        border: none;
        font-size: $text-16;
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
    font-size: $text-20;
    text-decoration: none;
  }
}

.error {
  position: absolute;
  background-color: black;
  color: white;
  opacity: 0.7;
  padding: 8px 16px;
  border-radius: 5px;
  top: -15px;
  font-size: 14px;
  line-height: normal;
}
</style>
