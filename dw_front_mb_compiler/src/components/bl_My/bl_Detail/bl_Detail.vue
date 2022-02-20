<template lang="pug">
  .security(v-if="IndexBankList.length > 0")
    .security__header(:style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}")
      router-link(to="/my")
        i.fas.fa-chevron-left
      p 安全中心
    .security__main
      .security__card(@click="setCardOpen('bl_BindingPhoneForm')")
        .security__card__icon
          i.fas.fa-mobile-alt
        .security__card__main
          p 手机验证
          p {{ IndexDetail.phone ? IndexDetail.phone : '未绑定'}}
        .security__card__arrow
          i.fas.fa-chevron-right
      .security__card(@click="setCardOpen('bl_BindingEmailForm')")
        .security__card__icon
          i.fas.fa-envelope
        .security__card__main
          p 邮箱验证
          p {{ IndexDetail.email ? IndexDetail.email : '未绑定'}}
        .security__card__arrow
          i.fas.fa-chevron-right
      .security__card(@click="setCardOpen('bl_BankManage')")
        .security__card__icon
          i.fas.fa-credit-card
        .security__card__main
          p 银行卡管理
          p(v-if="filterBankName()") {{ filterBankName() }} {{ defaultBankCard.memberBankNo }}
        .security__card__arrow
          i.fas.fa-chevron-right
      .security__card(@click="setCardOpen('bl_ChangePasswordForm')")
        .security__card__icon
          i.fas.fa-lock
        .security__card__main
          p 密码管理
        .security__card__arrow
          i.fas.fa-chevron-right
      .security__card(v-if="!IndexDetail.accountChanged" @click="setCardOpen('bl_ChangeAccountForm')")
        .security__card__icon
          i.fas.fa-user
        .security__card__main
          p 帐号管理
          p {{ IndexDetail.account ? IndexDetail.account : '未绑定'}}
        .security__card__arrow
          i.fas.fa-chevron-right
      //- .security__card
      //-   .security__card__icon
      //-     i.fas.fa-fingerprint
      //-   .security__card__main
      //-     p 脸部与指纹辨识
      //-   .security__card__arrow
      //-     el-switch(v-model="value" active-color="#13ce66" inactive-color="#ff4949")
      .security__card(@click="logout")
        .security__card__icon
          i.fas.fa-sign-out-alt
        .security__card__main
          p 登出
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      bgImage_light: `${window.CDN_ASSETS}/static/img/bluebg.png`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/bluebg_night.png`,
    };
  },
  methods: {
    setCardOpen(type) {
      this.$store.dispatch('index/setCardOpen', true);
      // 未綁定電話不可添加銀行卡
      if (type === 'bl_BankManage') {
        this.$matomo_detail_bank();
        if (this.IndexDetail.phone) {
          this.$store.dispatch('index/setCardName', {
            card: 'bl_BankManage',
          });
        } else {
          this.$store.dispatch('index/setCardName', {
            card: 'bl_BindingPhoneForm',
          });
        }
      } else if (type === 'bl_BindingPhoneForm') {
        this.$matomo_detail_phone();
        this.$store.dispatch('index/setCardName', { card: type });
      } else if (type === 'bl_BindingEmailForm') {
        this.$matomo_detail_mail();
        this.$store.dispatch('index/setCardName', { card: type });
      } else if (type === 'bl_ChangePasswordForm') {
        this.$matomo_detail_password();
        this.$store.dispatch('index/setCardName', { card: type });
      } else if (type === 'bl_ChangeAccountForm') {
        this.$store.dispatch('index/setCardName', { card: type });
      }
    },
    logout() {
      this.$store.dispatch('member/API_MemberLogout')
        .then((res) => {
          this.$router.push('/').catch((err) => {});
        });
    },
    filterBankName() {
      if (this.IndexBankList && this.defaultBankCard) {
        const result = this.IndexBankList.filter(item => item.bankCode === this.defaultBankCard.memberBankCode);
        // 如果被停用則顯示未綁定
        let bankName = '未綁定';
        if (this.defaultBankCard.memberStatus.value === 1) bankName = result[0].bankName;
        return bankName;
      }
    },
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
    ...mapState('member', [
      'IndexDetail',
      'IndexBankCard',
      'IndexBankList',
    ]),
    ...mapGetters('member', [
      'defaultBankCard',
    ]),
  },
  created() {
    this.$store.dispatch('member/API_MemberDetail');
    this.$store.dispatch('member/API_MemberBankCard');
    this.$store.dispatch('member/API_MemberBankList');
  },
};
</script>

<style lang="scss" scoped>
.security {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    font-size: $text-20;
    color: white;
    padding: $height-36 $width-24;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;

    a {
      position: absolute;
      left: $width-24;
      color: white;
    }

    p {
      margin: 0;
    }
  }

  &__main {
    padding-top: $height-24;
    padding-left: $width-24;
    flex: 1;
    overflow: auto;

    .security__card {
      padding: $height-20 $width-28 $height-20 $width-36;
      display: flex;
      background-color: white;
      border-top-left-radius: 100px;
      border-bottom-left-radius: 100px;
      align-items: center;
      margin-bottom: $height-12;
      position: relative;

      &__icon {
        width: $width-48;
        height: $width-48;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(to right, rgb(101, 0, 255), rgb(59, 109, 238));
        border-radius: 50%;
        margin-right: $width-24;
        color: white;
      }

      &__main {
        p {
          margin: 0;
          font-size: $text-14;
          color: $origin_dark;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 50vw;

          &:first-child {
            font-size: $text-16;
            color: $navy_dark;
          }
        }
      }

      &__arrow {
        position: absolute;
        right: $width-28;
        font-size: $text-20;
        color: $theme;
      }
    }
  }
}
</style>
