<template lang="pug">
  .page
    .headBg
    .p-3
      //- 標题
      h2.text-white.mt-3
        .icon(:style="`background-image: url(${userIcon})`")
        span.ml-2 {{ $t('admin.name') }}
      .d-flex
        .info.px-4.text-center.pt-5.pb-5.mr-2(style="width: 350px;")
          .infoBg
          .d-block(style="z-index: 1")
            .d-block.mb-4
              .font-20.text-white {{ $t('admin.hello') }} {{ memberInfo.username }}
            .d-block.mb-4
              b-avatar(:src="memberInfo.avatar" size="8rem")
            .d-block.mb-4
              label(for="file-upload")
                .changeAvatar.py-2.px-3
                  .font-12 {{ $t('admin.changeAvatar') }}
              input#file-upload.d-none(type="file" @change="changeAvatar" accept="image/*")
            .d-flex.flex-column.mb-5
              .info-title.font-16 {{ $t('admin.allMoney') }}
              .font-24 ¥{{ (memberInfo.money + memberInfo.freeze_money) | toMoney }}
            .d-flex.flex-column.mb-4
              .info-title.font-16 {{ $t('admin.centerWallet') }}
              .font-20 ¥{{ memberInfo.money | toMoney }}
            .d-flex.flex-column.mb-4
              .info-title.font-16 {{ $t('admin.lockMoney') }}
              .font-20 ¥{{ memberInfo.freeze_money | toMoney }}
        .d-flex.flex-wrap(style="flex: 1;")
          .d-flex.flex-column.mr-2(style="width: 350px;")
            .d-flex.justify-content-around.align-items-center.px-3.py-3.mb-2.info-detail
              .d-flex.justify-content-center.align-items-center.p-2.iconBg
                img(:src="img_mobile_fill")
              .d-flex.flex-column.col-5
                .detail-title.font-14 {{ $t('admin.cellphone') }}
                span {{ memberInfo.mobile }}
              button.detail-button.font-12.py-2.px-3(@click="showPhoneChange = !showPhoneChange") 变更
            .d-flex.justify-content-around.align-items-center.px-3.py-3.mb-2.info-detail
              .d-flex.justify-content-center.align-items-center.p-2.iconBg
                img(:src="img_lock_fill")
              .d-flex.flex-column.col-5
                .detail-title.font-14 {{ $t('admin.password') }}
                span {{ memberInfo.password }}
              button.detail-button.font-12.py-2.px-3(
                @click="showPasswordChange = !showPasswordChange"
              ) {{ $t('admin.change') }}
            .d-flex.justify-content-around.align-items-center.px-3.py-3.mb-2.info-detail
              .d-flex.justify-content-center.align-items-center.p-2.iconBg
                img(:src="img_qq_fill")
              .d-flex.flex-column.col-5
                .detail-title.font-14 {{ $t('admin.qq') }}
                span {{ memberInfo.qq }}
              button.detail-button.font-12.py-2.px-3(@click="showQQChange = !showQQChange") 变更
            .d-flex.justify-content-around.align-items-center.px-3.py-3.mb-2.info-detail
              .d-flex.justify-content-center.align-items-center.p-2.iconBg
                img(:src="img_wechat_fill")
              .d-flex.flex-column.col-5
                .detail-title.font-14 {{ $t('admin.wechat') }}
                span {{ memberInfo.wechat }}
              button.detail-button.font-12.py-2.px-3(@click="changeWechat") {{ $t('admin.change') }}
          .bankcard.d-flex.justify-content-center.align-items-center.p-2(
            v-if="bankcardList.length === 0"
            @click="addBankCard"
          )
            .bankcard-inner.h-100.w-100.d-flex.justify-content-center.align-items-center
              div
                b-icon.mr-2(icon="credit-card")
                span {{ $t('admin.addBankcard.name') }}
          .d-flex.flex-column(v-else)
            .bankcard.bankcard-have.mb-2.d-flex.flex-column(
              v-for="item in bankcardList"
              :key="item.id"
            )
              img(:src="img_card")
              .p-4.flex-fill.d-flex.flex-column.justify-content-between
                .d-flex
                  .mr-3.text-white {{ $t('admin.bankcardUser') }}
                  .text-white {{ item.name }}
                .d-flex
                  .mr-3.text-white {{ $t('admin.bankcardAccount') }}
                  .text-white {{ item.card_number }}
                .d-flex
                  .mr-3.text-white {{ $t('admin.bankName') }}
                  .text-white {{ item.bank_name }}
                .d-flex
                  .mr-3.text-white {{ $t('admin.bankBranch') }}
                  .text-white {{ item.opening_bank }}
    //- 換电話
    b-modal(
      v-model="showPhoneChange"
      :title="$t('admin.changePhone.name')"
      :ok-title="$t('admin.confirm')"
      :cancel-title="$t('admin.cancel')"
      @ok="phoneSubmit"
    )
      b-form
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.changePhone.phoneNumber') }}
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="phoneForm.mobile"
                :placeholder="$t('admin.changePhone.phoneNumberRemind')"
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.changePhone.newPhoneNumber') }}
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="phoneForm.new_mobile"
                :placeholder="$t('admin.changePhone.newPhoneNumberRemind')"
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.changePhone.verifyCode') }}
            .d-flex.p-0.w-100.align-items-center
              b-form-input.form-input.mr-2(
                v-model="phoneForm.vcode"
                type="text"
                :placeholder="$t('admin.changePhone.verifyCodeRemind')"
              )
              button(
                @click.prevent="getVerifyCode"
                :disabled="counting"
              ) {{ counting ? `${$t('admin.changePhone.countDown')}${ time }${$t('admin.changePhone.second')}`: $t('admin.changePhone.getVerifyCode') }}
    //- 換密码
    b-modal(
      v-model="showPasswordChange"
      :title="$t('admin.changePassword.name')"
      :ok-title="$t('admin.confirm')"
      :cancel-title="$t('admin.cancel')"
      @ok="passwordSubmit"
    )
      b-form
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.changePassword.oldPassword') }}
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="passwordForm.oldpwd"
                type="password"
                :placeholder="$t('admin.changePassword.oldPasswordRemind')"
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.changePassword.newPassword') }}
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="passwordForm.newpwd"
                type="password"
                :placeholder="$t('admin.changePassword.newPasswordRemind')"
              )
    b-modal(
      v-model="showQQChange"
      :title="$t('admin.changeQQ.name')"
      :ok-title="$t('admin.confirm')"
      :cancel-title="$t('admin.cancel')"
      @ok="qqSubmit"
    )
      b-form
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.changeQQ.qq') }}
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="qqForm.qq"
                :placeholder="$t('admin.changeQQ.qqRemind')"
              )
    b-modal(
      v-model="showWechatChange"
      :title="$t('admin.changeWechat.name')"
      :ok-title="$t('admin.confirm')"
      :cancel-title="$t('admin.cancel')"
      @ok="wechatSubmit"
    )
      b-form
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.changeWechat.wechat') }}
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="wechatForm.wechat"
                :placeholder="$t('admin.changeWechat.wechatRemind')"
              )
    b-modal(
      v-model="showBankcardChange"
      :title="$t('admin.addBankcard.name')"
      :ok-title="$t('admin.confirm')"
      :cancel-title="$t('admin.cancel')"
      @ok="bankcardSubmit"
      @cancel="bankcardReset"
    )
      b-form
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.addBankcard.bankcardNumber') }}
            .d-flex.p-0.w-100.mr-2
              b-form-input.form-input(
                v-model="bankcardForm.card_number"
                :placeholder="$t('admin.addBankcard.bankcardNumberRemind')"
                :disabled="bankcardForm.bank_name !== ''"
              )
            button(@click.prevent="verifyBankcard") {{ $t('admin.addBankcard.verifyBankcard') }}
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.addBankcard.bankName') }}
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="bankcardForm.bank_name"
                :placeholder="$t('admin.addBankcard.bankNameRemind')"
                disabled
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.addBankcard.bankBranch') }}
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="bankcardForm.opening_bank"
                :placeholder="$t('admin.addBankcard.bankBranchRemind')"
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.addBankcard.realName') }}
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="bankcardForm.real_name"
                :placeholder="$t('admin.addBankcard.realNameRemind')"
                :disabled="hasRealname"
              )
        b-form-group
          .d-flex.align-items-center
            .form-title.col-2.p-0.mr-3.text-right {{ $t('admin.addBankcard.wechat') }}
            .d-flex.p-0.w-100
              b-form-input.form-input(
                v-model="bankcardForm.wechat"
                :placeholder="$t('admin.addBankcard.wechatRemind')"
                :disabled="hasWechat"
              )
</template>

<script>
export default {
  name: 'admin',
  data() {
    return {
      userIcon: `${process.env.VUE_APP_STATIC}/img/user-white.svg`,
      img_mobile_fill: `${process.env.VUE_APP_STATIC}/img/mobile-fill.svg`,
      img_lock_fill: `${process.env.VUE_APP_STATIC}/img/lock-fill.svg`,
      img_qq_fill: `${process.env.VUE_APP_STATIC}/img/qq-fill.svg`,
      img_wechat_fill: `${process.env.VUE_APP_STATIC}/img/wechat-fill.svg`,
      img_card: `${process.env.VUE_APP_STATIC}/img/pic-card.png`,
      showPhoneChange: false,
      showPasswordChange: false,
      showQQChange: false,
      showWechatChange: false,
      showBankcardChange: false,
      phoneForm: {
        mobile: '',
        new_mobile: '',
        vcode: '',
        mid: Number(window.localStorage.getItem('uid')),
      },
      passwordForm: {
        newpwd: '',
        oldpwd: '',
      },
      qqForm: {
        qq: '',
      },
      wechatForm: {
        wechat: '',
      },
      bankcardForm: {
        mid: Number(window.localStorage.getItem('uid')),
        card_number: '',
        bank_name: '',
        opening_bank: '',
        real_name: '',
        wechat: '',
      },
      bankcardList: [],
      countDownTimer: null,
      counting: false,
      time: 0,
    };
  },
  computed: {
    memberInfo() {
      return this.$store.state.admin.memberInfo;
    },
    hasRealname() {
      return this.$store.getters['admin/hasRealname'];
    },
    hasWechat() {
      return this.$store.getters['admin/hasWechat'];
    },
  },
  methods: {
    countDown(time = 90) {
      this.time = time;
      this.countDownTimer = setInterval(() => {
        this.time -= 1;
        if (this.time === 0) {
          this.counting = false;
        }
      }, 1000);
    },
    changeAvatar(e) {
      const uploadedFile = e.target.files[0];
      const formData = new FormData();
      formData.append('image', uploadedFile);
      this.$store.dispatch('admin/publicUpload', formData).then((res) => {
        this.$store.dispatch('admin/memberEdit', {
          avatar: res.data.data.file_name,
        }).then(() => {
          this.$store.dispatch('admin/getMemberInfo');
        });
      });
    },
    getVerifyCode() {
      this.$store.dispatch('admin/memberVerification', {
        mobile: this.phoneForm.new_mobile,
        type: 2,
        mid: Number(window.localStorage.getItem('uid')),
      }).then(() => {
        this.counting = true;
        this.countDown();
      });
    },
    phoneSubmit() {
      this.$store.dispatch('admin/changePhone', this.phoneForm).then(() => {
        this.$store.dispatch('admin/getMemberInfo');
        this.$message.success(this.$t('admin.modifySuccess'));
      });
    },
    passwordSubmit() {
      this.$store.dispatch('admin/changePassowrd', this.passwordForm).then(() => {
        this.$message.success(this.$t('admin.modifySuccess'));
        this.$store.dispatch('admin/memberLogout');
        this.$router.push({ name: 'dashboard' });
      });
    },
    qqSubmit() {
      this.$store.dispatch('admin/memberEdit', this.qqForm).then(() => {
        this.$store.dispatch('admin/getMemberInfo');
        this.$message.success(this.$t('admin.modifySuccess'));
      });
    },
    changeWechat() {
      if (this.memberInfo.wechat) {
        this.$message.info(this.$t('admin.connectService'));
      } else {
        this.showWechatChange = true;
      }
    },
    wechatSubmit() {
      this.$store.dispatch('admin/memberEdit', this.wechatForm).then(() => {
        this.$store.dispatch('admin/getMemberInfo');
        this.$message.success(this.$t('admin.modifySuccess'));
      });
    },
    verifyBankcard() {
      this.$store.dispatch('admin/memberGetCardinfo', {
        CardNumber: this.bankcardForm.card_number,
      }).then((res) => {
        this.bankcardForm.bank_name = res.data.data.bank_name;
      });
    },
    addBankCard() {
      this.showBankcardChange = !this.showBankcardChange;
      this.bankcardForm.real_name = this.memberInfo.realname;
      this.bankcardForm.wechat = this.memberInfo.wechat;
    },
    bankcardSubmit() {
      this.$store.dispatch('admin/memberBindcard', this.bankcardForm).then(() => {
        this.$message.success(this.$t('admin.addSuccess'));
        this.getBankcardList();
        this.$store.dispatch('admin/getMemberInfo');
      }).catch((err) => {
        this.bankcardReset();
        console.log(err);
      });
    },
    bankcardReset() {
      this.bankcardForm = {
        mid: Number(window.localStorage.getItem('uid')),
        card_number: '',
        bank_name: '',
        opening_bank: '',
        real_name: '',
        wechat: '',
      };
    },
    getBankcardList() {
      this.$store.dispatch('admin/memberGetCards').then((res) => {
        this.bankcardList = res.data.data.list;
      });
    },
    getData() {
      this.getBankcardList();
    },
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    clearInterval(this.countDownTimer);
  },
};
</script>

<style lang="scss" scoped>
  .info {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 4px 0 rgba(0, 172, 171, 0.3);
    position: relative;
    z-index: 0;

    .infoBg {
      background: linear-gradient(to bottom, #404040, #1e1e1e);
      width: 80%;
      height: 200px;
      z-index: -1;
      position: absolute;
      top: 0;
      left: 10%;
      border-radius: 0 0 40px 40px;
    }

    .changeAvatar {
      background-color: #f76b1c;
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
    }

    .info-title {
      color: #8e8e93;
    }
  }

  .info-detail {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 4px 0 rgba(0, 172, 171, 0.3);

    .detail-title {
      color: #22d8da;
    }

    .iconBg {
      background: linear-gradient(to bottom, #00afaf, #00ffeb);
      box-shadow: 0 2px 4px 0 rgba(0, 255, 235, 0.4);
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }

    .detail-button {
      color: white;
      background-color: #f76b1c;
      border: none;
      border-radius: 4px;
    }
  }

  .bankcard {
    background-color: white;
    height: 212px;
    border-radius: 16px;
    box-shadow: 0 0 4px 0 rgba(0, 172, 171, 0.3);
    width: 350px;

    &.bankcard-have {
      background: linear-gradient(to bottom, #404040, #1e1e1e);
      border-radius: 16px;
    }

    .bankcard-inner {
      border-style: dashed;
      border-color: #22d8da;
      border-radius: 8px;
    }
  }

  .icon {
    width: 40px;
    height: 40px;
    display: inline-block;
    background-size: cover;
    vertical-align: bottom;
  }
</style>
