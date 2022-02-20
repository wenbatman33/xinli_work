<template lang="pug">
  .setting
    .setting__header(:style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}")
      router-link(to="/my")
        i.fas.fa-chevron-left
      p 偏好设定
    .setting__main
      .setting__main__all 通知设定
        el-switch(v-model="allNotice" active-color="#13ce66" inactive-color="#ff4949" @change="allSetting")
      .setting__main__card
        .setting__main__card--title 存款通知
        .setting__main__card--remind 有存款异动时，以下列选择方式通知您。
        .setting__main__card--item
          p 短信
          el-switch(v-model="noticeForm.deposit_sms" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
        .setting__main__card--item
          p 邮箱
          el-switch(v-model="noticeForm.deposit_email" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
        .setting__main__card--item
          p 推播
          el-switch(v-model="noticeForm.deposit_broadcast" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
        .setting__main__card--item
          p 站内信
          el-switch(v-model="noticeForm.deposit_inbox" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
      .setting__main__card
        .setting__main__card--title 提款通知
        .setting__main__card--remind 有提款异动时，以下列选择方式通知您。
        .setting__main__card--item
          p 短信
          el-switch(v-model="noticeForm.withdraw_sms" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
        .setting__main__card--item
          p 邮箱
          el-switch(v-model="noticeForm.withdraw_email" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
        .setting__main__card--item
          p 推播
          el-switch(v-model="noticeForm.withdraw_broadcast" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
        .setting__main__card--item
          p 站内信
          el-switch(v-model="noticeForm.withdraw_inbox" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
      .setting__main__card
        .setting__main__card--title 优惠通知
        .setting__main__card--remind 有新的优惠时，以下列选择方式通知您。
        .setting__main__card--item
          p 短信
          el-switch(v-model="noticeForm.promotion_sms" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
        .setting__main__card--item
          p 邮箱
          el-switch(v-model="noticeForm.promotion_email" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
        .setting__main__card--item
          p 推播
          el-switch(v-model="noticeForm.promotion_broadcast" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
        .setting__main__card--item
          p 站内信
          el-switch(v-model="noticeForm.promotion_inbox" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="setting")
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      bgImage_light: `${window.CDN_ASSETS}/static/img/bluebg.png`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/bluebg_night.png`,
      noticeForm: {
        id: 0,
        deposit_sms: 0,
        deposit_email: 0,
        deposit_broadcast: 1,
        deposit_inbox: 1,
        withdraw_sms: 0,
        withdraw_email: 0,
        withdraw_broadcast: 1,
        withdraw_inbox: 1,
        promotion_sms: 0,
        promotion_email: 0,
        promotion_broadcast: 1,
        promotion_inbox: 1,
      },
    };
  },
  methods: {
    allSetting(value) {
      if (value) {
        this.noticeForm.deposit_sms = 1;
        this.noticeForm.deposit_email = 1;
        this.noticeForm.deposit_broadcast = 1;
        this.noticeForm.deposit_inbox = 1;

        this.noticeForm.withdraw_sms = 1;
        this.noticeForm.withdraw_email = 1;
        this.noticeForm.withdraw_broadcast = 1;
        this.noticeForm.withdraw_inbox = 1;

        this.noticeForm.promotion_sms = 1;
        this.noticeForm.promotion_email = 1;
        this.noticeForm.promotion_broadcast = 1;
        this.noticeForm.promotion_inbox = 1;
      } else {
        this.noticeForm.deposit_sms = 0;
        this.noticeForm.deposit_email = 0;
        this.noticeForm.deposit_broadcast = 0;
        this.noticeForm.deposit_inbox = 0;

        this.noticeForm.withdraw_sms = 0;
        this.noticeForm.withdraw_email = 0;
        this.noticeForm.withdraw_broadcast = 0;
        this.noticeForm.withdraw_inbox = 0;

        this.noticeForm.promotion_sms = 0;
        this.noticeForm.promotion_email = 0;
        this.noticeForm.promotion_broadcast = 0;
        this.noticeForm.promotion_inbox = 0;
      }
      this.$store.dispatch('member/API_MemberModifyNotice', this.noticeForm);
    },
    setting() {
      this.$store.dispatch('member/API_MemberModifyNotice', this.noticeForm);
    },
    init() {
      this.$store.dispatch('member/API_MemberNotice').then((res) => {
        this.noticeForm.id = res.data.data[0].id;
        // deposit
        this.noticeForm.deposit_sms = res.data.data[0].noticeDepositSms.value;
        this.noticeForm.deposit_email = res.data.data[0].noticeDepositEmail.value;
        this.noticeForm.deposit_broadcast = res.data.data[0].noticeDepositBroadcast.value;
        this.noticeForm.deposit_inbox = res.data.data[0].noticeDepositInbox.value;
        // withdraw
        this.noticeForm.withdraw_sms = res.data.data[0].noticeWithdrawSms.value;
        this.noticeForm.withdraw_email = res.data.data[0].noticeWithdrawEmail.value;
        this.noticeForm.withdraw_broadcast = res.data.data[0].noticeWithdrawBroadcast.value;
        this.noticeForm.withdraw_inbox = res.data.data[0].noticeWithdrawInbox.value;
        // promotion
        this.noticeForm.promotion_sms = res.data.data[0].noticePromotionSms.value;
        this.noticeForm.promotion_email = res.data.data[0].noticePromotionEmail.value;
        this.noticeForm.promotion_broadcast = res.data.data[0].noticePromotionBroadcast.value;
        this.noticeForm.promotion_inbox = res.data.data[0].noticePromotionInbox.value;
      });
    },
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
    allNotice: {
      get() {
        return Object.values(this.noticeForm).some(item => item === 1);
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  created() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.setting {
  background-color: $origin_lightest;
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
    padding: $height-24 $width-24;
    flex: 1;
    overflow: auto;

    &__all {
      padding: $height-20 $width-20;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: white;
      border-radius: $width-12;
      color: $navy_dark;
      margin-bottom: $height-16;
      font-size: $text-16;
    }

    &__card {
      padding: $width-28 $width-28 $width-24 $width-20;
      color: $navy_dark;
      background-color: white;
      border-radius: $width-12;
      margin-bottom: $height-16;

      p {
          margin-bottom: 0;
        }

      &--title {
        font-size: $text-16;
        margin-bottom: $height-16;
      }

      &--remind {
        color: $origin_dark;
        font-size: $text-14;
        margin-bottom: $height-8;
      }

      &--item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: $text-14;
        border-bottom: 1px solid $origin_lightest;
        padding: $height-12 0;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
