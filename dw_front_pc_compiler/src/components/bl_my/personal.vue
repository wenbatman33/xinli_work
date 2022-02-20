<template lang="pug">
.BLOCK.d-flex.justify-content-start.flex-wrap.flex-row.personalWrap
  .personalBlock.mx-2(:style='{backgroundImage: "url("+bgImage+")"}')
    .avater
      img(:src='memberPofilePicture')
    .memberName.my-2 {{memberStatus.account}}
    .memberLoginStatus.text-center.my-2 
      p.my-2 {{memberProfile.greetings}}
      span 最近登录 
      br
      span {{memberProfile.memberLastLogin}}
    .memberWallet
      .amoutBlock.my-3
        .walletAmout(v-if='memberWallet!=null') ¥ {{ (memberWallet.cash + memberWallet.gameCash ) | commaFormat}}
        .walletTitle 总资产
      .amoutBlock
        .row.no-gutters
          .col-6.gameWallet.text-center
            .gameAmout(v-if='memberWallet!=null') ¥ {{ memberWallet.cash  | commaFormat}}
            .gameTitle 中心钱包
          .col-6.gameWallet.text-center
            .gameAmout(v-if='memberWallet!=null') ¥ {{ memberWallet.gameCash | commaFormat}}
            .gameTitle(@click='getAllWallet') 游戏钱包 
              i.fa.fa-info-circle
          //- .col-3.detail.text-center
          //-   el-button(round,size="small")  钱包明细
    .amoutBlock.my-4
      el-button.px-5(type='primary',round, @click='recylingAllWallet')  一键收回
    .verifyStatus
      .icon(:class='[memberProfile.memberEmailCert===1 ? "" : "disabled"]')
        i.fas.fa-envelope
        .success
          i.fas.fa-check
      .icon(:class='[memberProfile.memberPhoneCert===1 ? "" : "disabled"]')
        i.fas.fa-mobile-alt
        .success
          i.fas.fa-check
      .icon(:class='[memberProfile.memberRealName===1 ? "" : "disabled"]')
        i.fas.fa-user
        .success
          i.fas.fa-check
      .icon(:class='[memberProfile.memberBankCard===1 ? "" : "disabled"]')  
        i.fas.fa-credit-card
        .success
          i.fas.fa-check

  .personalBlock.mx-2
    .DW_factory
      img(:src='dreamworkADImage')
      .DW_title.my-4 
        h6 我的梦基金
      .DW_point.m-3 
        i.fas.fa-chess-knight.mr-2
        span {{memberWallet.point | commaFormatDefault}}
      p.p-3
        el-button.w-100(round, @click='gotoCastle')  兑换商品
      p.p-3
        el-button.w-100(round, @click='gotoMission')  我要赚基金

  .personalForm.flex-grow-1.mx-2
    .personalHead
      .title 个人资料
    .content.p-4
      el-form.my-3(:model='PersonalDetailForm', 
              ref='personalInfoForm', 
              label-width='80px',
              label-position='left')
        el-form-item.avaterItem(prop="Avater", label="头像")
          span
            img.avater(:src='memberPofilePicture')
          span.ml-5
            el-button(type='primary', @click='changeMemberPofilePicture') 更换头像
        el-divider
        el-form-item(prop="memberRealname", label="姓名")
          el-input.w-75(type='text'
                    v-model.trim='PersonalDetailForm.realname'
                    placeholder='输入您的真实姓名'
                    name='RealName',
                    :disabled ='PersonalDetail.memberRealname != null')
        el-divider
        el-form-item(prop="memberBirthday", label="生日")
          el-date-picker.w-75(v-model='PersonalDetailForm.birthday', format="yyyy-MM-dd" value-format="yyyy-MM-dd" type='date', :disabled ='PersonalDetail.memberBirthday !=null' , :default-value='Date.now()-(18*365*24*60*60*1000)', :picker-options="pickerOptions")
        el-divider
        el-form-item(prop="gender", label="性别", v-if='PersonalDetailForm')
          el-radio-group(v-model="PersonalDetailForm.gender")
            el-radio(:label='1') 男
            el-radio(:label='2') 女
        el-divider
        el-form-item(label="收货地址")
          .row.no-gutters
            el-cascader.col-5.mr-2(:props="props", v-model='addressValue', :placeholder='placeholder', separator=' ')
            el-input.col-3(type='text'
              v-model.trim='PersonalDetailForm.address'
              placeholder='输入您的收货地址'
              name='address')
        el-divider
        el-form-item
          el-button(type='primary',@click='formSubmit') 提交
</template>

<script>
import axios from 'axios';
import router from '@/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

const id = 0;
export default {
  name: 'info',
  components: {
  },
  data() {
    return {
      link: '',
      bgImage: `${window.CDN_ASSETS}/static/img/dw/personalBG.png`,
      memberWalletBgImage: `${window.CDN_ASSETS}/static/img/memberWalletBg.png`,
      dreamworkADImage: `${window.CDN_ASSETS}/static/img/dw/dreamwork_ad.png`,
      PersonalDetailForm: {
        realname: '',
        birthday: '',
        gender: '',
        province: '',
        city: '',
        state: '',
        address: '',
      },
      addressValue: [],
      placeholder: '',
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          if (level === 0) {
            axios.get('/api/Member/Personal/Address')
              .then((res) => {
                const nodes = res.data.data.map(item => ({
                  value: item.memberProvinceId,
                  label: item.memberProvinceName,
                  leaf: level >= 2,
                }));
                resolve(nodes);
              });
          } else if (level === 1) {
            axios.get(`/api/Member/Personal/Address?province_id=${node.path[0]}`)
              .then((res) => {
                const nodes = res.data.data.map(item => ({
                  value: item.memberCityId,
                  label: item.memberCityName,
                  leaf: level >= 2,
                }));
                resolve(nodes);
              });
          } else if (level === 2) {
            axios.get(`/api/Member/Personal/Address?province_id=${node.path[0]}&city_id=${node.path[1]}`)
              .then((res) => {
                const nodes = res.data.data.map(item => ({
                  value: item.memberStateId,
                  label: item.memberStateName,
                  leaf: level >= 2,
                }));
                resolve(nodes);
              });
          }
        },
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > (Date.now() - ((18 * 365 * 24 * 60 * 60 * 1000) + (4 * 24 * 60 * 60 * 1000)));
        },
      },
    };
  },
  computed: {
    ...mapState('member', [
      'memberLogined',
      'memberStatus',
      'memberProfile',
      'memberInbox',
      'memberInboxLength',
      'PersonalDetail', 
    ]),
    ...mapState('wallet', [
      'memberWallet',
      'bankCodeMappingList',
      'memberBankCard',
    ]),
    memberPofilePicture() {
      return `${window.CDN_ASSETS}/static/img/memberPofilePicture/avater_${this.PersonalDetail.memberPofilePicture}.png`;
    },
  },
  watch: {
    PersonalDetail(val) {
      const vm = this;
      vm.PersonalDetailForm.realname = val.memberRealname;
      vm.PersonalDetailForm.birthday = val.memberBirthday;
      vm.PersonalDetailForm.gender = val.memberGender.value;
      // // 比对 json
      vm.init();
    },
  },
  methods: {
    init() {
      const vm = this;
      vm.PersonalDetailForm.realname = vm.PersonalDetail.memberRealname;
      vm.PersonalDetailForm.birthday = vm.PersonalDetail.memberBirthday;
      vm.PersonalDetailForm.gender = vm.PersonalDetail.memberGender.value;
      // 
      vm.PersonalDetailForm.province = vm.PersonalDetail.memberProvince;
      vm.PersonalDetailForm.city = vm.PersonalDetail.memberCity;
      vm.PersonalDetailForm.state = vm.PersonalDetail.memberState;
      vm.PersonalDetailForm.address = vm.PersonalDetail.memberAddress;
      if (!vm.PersonalDetail.memberProvince) {
        vm.placeholder = '请选择';
      } else {
        this.$axios.get(`/api/Member/Personal/Address?province_id=${vm.PersonalDetail.memberProvince}&city_id=${vm.PersonalDetail.memberCity}&state_id=${vm.PersonalDetail.memberState}`)
          .then((res) => {
            vm.placeholder = `${res.data.data[0].memberProvinceName} ${res.data.data[0].memberCityName} ${res.data.data[0].memberStateName}`;
          });
      }
    },
    formSubmit() {
      const vm = this;
      vm.PersonalDetailForm.province = vm.addressValue[0];
      vm.PersonalDetailForm.city = vm.addressValue[1];
      vm.PersonalDetailForm.state = vm.addressValue[2];
      this.$store.dispatch('member/PersonalDataPatch', vm.PersonalDetailForm)
        .then((res) => {
          if (res.status === 200) {
            vm.$message({ message: '修改成功', type: 'success' });
            vm.$store.dispatch('member/PersonalGetData');
            vm.$store.dispatch('member/getMemberProfile');
          }
        });
    },
    changeMemberPofilePicture() {
      this.$matomo_my_changePicture();
      this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_MemberPofilePicture' });
    },
    getAllWallet() {
      // const vm = this;
      this.$router.push({ path: this.$route.fullPath, query: { card: 'bl_AllWallet' } });
    },
    recylingAllWallet() {
      const vm = this; 
      this.$matomo_my_recylingAllWallet();
      this.$store.dispatch('wallet/recylingAllWallet')
        .then((res) => {
          vm.$message({ message: '回收游戏钱包成功', type: 'success' });
          vm.$store.dispatch('wallet/getMemberWallet');
        });
    },
    gotoCastle() {
      this.$matomo_my_gotoCastle();
      window.location.replace(window.CASTLEDOMAIN);
    },
    gotoMission() {
      this.$matomo_my_gotoMission();
      window.location.replace(`${window.CASTLEDOMAIN}/mission`);
    },
  },
  mounted() {
    const vm = this;
    vm.init();
  },
};
</script>
<style lang="scss" scoped>
.personalWrap{
  .personalBlock{
    position: relative;
    overflow: auto;
    width: 244px;
    min-width: 244px;
    min-height: 500px;
    border-radius: 16px;
    text-align: center;
    box-shadow: 0 2px 8px 0 $balckAlpha_20;
    background-color: white;
    // background-image: url('/static/img/upload/CentreCourt.jpg');
    background-repeat: no-repeat;
  }
  .personalForm{
    min-height: 500px;
    border-radius: 16px;
    box-shadow: 0 2px 8px 0 $balckAlpha_10;
    border: solid 1px $garyBlue_lightest;
    background-color: white;
    .personalHead{
      padding: 12px 24px;
      width: 100%;
      height: auto;
      .title{
        font-size: 20px;
        color: $blueDark_light;
      }
      .des{
        font-size: 14px;
        line-height: 2;
        color: $garyBlue_Dark;
      }
    }
  }
  .avaterItem{
    line-height: 120px;
    .avater{
      display: inline-block;
      width: 120px;
      height: 120px;
      text-align: center;
      line-height: 120px;
      border: solid 1px $DW_ColorLight;
      border-radius: 100%;
      color: #DFD8F5;
      font-size: 50px;
      background-color: $DW_ColorAlpha_10;
    }
  }


  .avater{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    background: $gray_ccc;
    margin: 40px auto;
    box-shadow: 0 2px 20px 0 $blueDarkAlpha_40;
    img{
      width: 100px;
      // border-radius: 100%;
      height: auto;
    }
  }
  .memberName {
    text-shadow: 0 0 4px $balckAlpha_80;
    font-family: PingFangSC;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: center;
    color: white;
  }
  .memberLoginStatus{
    color: $garyBlue_Darkest;
    font-size: 12px;
  }
  .memberWallet{
    overflow: auto;
    width: 200px;
    height: 146px;
    border-radius: 16px;
    margin: auto auto;
    color: white;
    text-align: center;
    background: $blueDarkAlpha_100;
    .walletAmout{
      font-size: $text-20;
    }
    .walletTitle{
      font-size: $text-12;
    }
    .gameAmout{
      font-size: $text-12;
    }
    .gameTitle{
      font-size: $text-12;
    }
  }
  .verifyStatus{
    text-align: center;
    .icon{
      position: relative;
      display: inline-block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      opacity: 0.8;
      border-radius: 100%;
      margin: 2px 6px;
      color: white;
      background: linear-gradient(to bottom, $DW_Color, $DW_purple);
      .success{
        position: absolute;
        width: 10px;
        height: 10px;
        box-shadow: 0 0 3px 0 $balckAlpha_50;
        background-color: $DW_greenMiddle;
        border-radius: 100%;
        line-height: 10px;
        top: 24px;
        left: 24px;
        color: white;
        font-size: 6px;
        i{
          position: absolute;
          left: -5px;
          width: 20px;
          transform: scale(.5,.5);
        }
      }
    }
    .disabled{
      background: $blueDark;
      .success{
        display: none;
      }
    }
  }
  .DW_factory{
    .DW_title{
      font-size: $text-16;
      color: $DW_Color;
    }
    .DW_point{
      // width: 200px;
      height: 68px;
      color: white;
      line-height: 68px;
      margin: auto auto;
      font-size: $text-20;
      border-radius: 16px;
      background-color: $DW_Color;
    }
  }
}
</style>
<style lang="scss">
.MAIN_LIGHT{
  .personalWrap{
    .avaterItem{
      .avater{border: solid 1px $L_DW_ColorLight; background-color: $L_DW_ColorAlpha_10;}
    }
    .verifyStatus{
      .icon{
        background: linear-gradient(to bottom, $L_DW_Color, $L_DW_ColorDark);
        .success{background-color: $L_DW_greenMiddle;}
        
      }
      .disabled{
        background: $blueDark;
      }
    }
    .DW_factory{
      .DW_title{ color: $L_DW_Color; }
      .DW_point{ background-color: $L_DW_Color;}
    }
  }
}
</style>
